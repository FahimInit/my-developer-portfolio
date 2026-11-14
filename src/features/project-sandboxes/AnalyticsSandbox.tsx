'use client';

import { useState } from 'react';
import { Activity, Database, Flame, Server, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type EventFilter = 'all' | 'payments.succeeded' | 'auth.login' | 'courier.dispatched';

interface TelemetryEvent {
  id: string;
  type: Exclude<EventFilter, 'all'>;
  latencyMs: number;
  cacheHit: boolean;
  timestamp: string;
}

const INITIAL_EVENTS: TelemetryEvent[] = [
  {
    id: 'evt_9041',
    type: 'payments.succeeded',
    latencyMs: 14,
    cacheHit: true,
    timestamp: '23:08:11',
  },
  {
    id: 'evt_9040',
    type: 'courier.dispatched',
    latencyMs: 19,
    cacheHit: true,
    timestamp: '23:08:09',
  },
  {
    id: 'evt_9039',
    type: 'auth.login',
    latencyMs: 12,
    cacheHit: true,
    timestamp: '23:08:06',
  },
  {
    id: 'evt_9038',
    type: 'payments.succeeded',
    latencyMs: 31,
    cacheHit: false,
    timestamp: '23:08:02',
  },
];

const INITIAL_BUCKETS = [42, 58, 65, 51, 78, 84, 72, 91];

export function AnalyticsSandbox() {
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [filter, setFilter] = useState<EventFilter>('all');
  const [rpm, setRpm] = useState(12400);
  const [buckets, setBuckets] = useState<number[]>(INITIAL_BUCKETS);
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS);

  const avgLatency = cacheEnabled ? 18 : 64;
  const cacheRatio = cacheEnabled ? '94.8%' : '0.0%';

  const pushSimulatedBurst = (count: number) => {
    const eventTypes: Exclude<EventFilter, 'all'>[] = [
      'payments.succeeded',
      'auth.login',
      'courier.dispatched',
    ];
    const nextType = eventTypes[count % eventTypes.length] ?? 'payments.succeeded';
    const nextLatency = cacheEnabled ? 12 + (count % 11) : 48 + (count % 28);
    const nowLabel = new Date().toTimeString().slice(0, 8);

    const nextEvent: TelemetryEvent = {
      id: `evt_${Math.floor(1000 + Math.random() * 8999)}`,
      type: nextType,
      latencyMs: nextLatency,
      cacheHit: cacheEnabled,
      timestamp: nowLabel,
    };

    setRpm((prev) => prev + count);
    setBuckets((prev) => [
      ...prev.slice(1),
      Math.min(100, Math.max(35, Math.round(55 + (count % 45)))),
    ]);
    setEvents((prev) => [nextEvent, ...prev.slice(0, 5)]);
  };

  const visibleEvents =
    filter === 'all' ? events : events.filter((evt) => evt.type === filter);

  return (
    <div className="space-y-5 rounded-xl border border-line-subtle bg-canvas/90 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle pb-3">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent-primary">
            High-Throughput Ingestion Pipeline
          </span>
          <h4 className="text-base font-semibold text-ink-primary sm:text-lg">
            PulseMetrics — Redis Cache &amp; Webhook Telemetry Simulator
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCacheEnabled((prev) => !prev)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition',
              cacheEnabled
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                : 'border-amber-500/40 bg-amber-500/15 text-amber-300'
            )}
          >
            <Database className="h-3.5 w-3.5" />
            Redis Cache: {cacheEnabled ? 'ON' : 'BYPASSED'}
          </button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => pushSimulatedBurst(250)}
          >
            <Zap className="h-3.5 w-3.5 text-accent-primary" />
            +250 Webhooks
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => pushSimulatedBurst(1200)}
          >
            <Flame className="h-3.5 w-3.5" />
            Simulate Spike
          </Button>
        </div>
      </div>

      {/* Live KPI Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-line-subtle bg-elevated/90 p-3.5">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <Activity className="h-3.5 w-3.5 text-accent-primary" />
            Ingestion Throughput
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-ink-primary">
            {rpm.toLocaleString()} req/min
          </p>
        </div>
        <div className="rounded-xl border border-line-subtle bg-elevated/90 p-3.5">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <Server className="h-3.5 w-3.5 text-emerald-400" />
            Mean Query Latency
          </span>
          <p
            className={cn(
              'mt-1 font-mono text-xl font-bold',
              cacheEnabled ? 'text-emerald-400' : 'text-amber-300'
            )}
          >
            {avgLatency}ms avg
          </p>
        </div>
        <div className="rounded-xl border border-line-subtle bg-elevated/90 p-3.5">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <Database className="h-3.5 w-3.5 text-accent-primary" />
            Redis Hit Ratio
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-ink-primary">
            {cacheRatio}
          </p>
        </div>
      </div>

      {/* Bar Chart + Stream Filter */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="rounded-xl border border-line-subtle bg-elevated/70 p-4 lg:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-ink-primary">
              Window Throughput
            </span>
            <Badge variant="accent">Rolling 8m</Badge>
          </div>
          <div className="flex h-36 items-end gap-2 pt-2">
            {buckets.map((value, idx) => (
              <div
                key={`bar-${idx}`}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <div className="flex h-28 w-full items-end rounded-t bg-canvas/80 p-0.5">
                  <div
                    style={{ height: `${value}%` }}
                    className="w-full rounded-t bg-gradient-to-t from-accent-secondary to-accent-primary transition-all duration-300"
                  />
                </div>
                <span className="font-mono text-[10px] text-ink-muted">
                  T-{buckets.length - idx}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line-subtle bg-elevated/70 p-4 lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-ink-primary">
              Event Stream Log
            </span>
            <div className="flex flex-wrap gap-1">
              {(
                [
                  'all',
                  'payments.succeeded',
                  'auth.login',
                  'courier.dispatched',
                ] as EventFilter[]
              ).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    'rounded-md border px-2 py-0.5 font-mono text-[10px] transition',
                    filter === item
                      ? 'border-accent-primary/60 bg-accent-glow text-accent-primary'
                      : 'border-line-subtle bg-canvas text-ink-muted hover:text-ink-primary'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="custom-scrollbar max-h-36 space-y-1.5 overflow-y-auto pr-1">
            {visibleEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex items-center justify-between rounded-lg border border-line-subtle bg-canvas/90 px-3 py-2 font-mono text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-ink-muted">{evt.timestamp}</span>
                  <span className="text-ink-primary">{evt.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[10px]',
                      evt.cacheHit
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/15 text-amber-300'
                    )}
                  >
                    {evt.cacheHit ? 'REDIS HIT' : 'PG QUERY'}
                  </span>
                  <span className="text-accent-primary">{evt.latencyMs}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

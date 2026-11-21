'use client';

import { useState } from 'react';
import { Cpu, RefreshCw, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type PresetId = 'nordic' | 'industrial' | 'biophilic';

interface RenderPreset {
  name: string;
  lighting: string;
  materials: string;
  accentColor: string;
}

const PRESETS: Record<PresetId, RenderPreset> = {
  nordic: {
    name: 'Warm Nordic Minimal',
    lighting: 'Natural Daylight (5500K)',
    materials: 'Whitewashed Oak, Boucle Fabric, Matte Travertine',
    accentColor: 'from-amber-500/20 via-stone-800 to-slate-900',
  },
  industrial: {
    name: 'Midnight Architectural Loft',
    lighting: 'Warm Recessed Spotlights (3000K)',
    materials: 'Architectural Concrete, Brushed Steel, Cognac Leather',
    accentColor: 'from-indigo-500/20 via-slate-900 to-zinc-950',
  },
  biophilic: {
    name: 'Biophilic Sanctuary Studio',
    lighting: 'Diffused Skylight + Rim Glow',
    materials: 'Terrazzo Stone, Teak Wood, Organic Linen',
    accentColor: 'from-emerald-500/20 via-teal-950 to-slate-900',
  },
};

export function VisualizerSandbox() {
  const [sliderPos, setSliderPos] = useState(52);
  const [preset, setPreset] = useState<PresetId>('nordic');
  const [queueing, setQueueing] = useState(false);
  const [jobStatus, setJobStatus] = useState('Worker #04 Ready · 60 FPS');

  const activePreset = PRESETS[preset];

  const handleQueueRender = () => {
    if (queueing) return;
    setQueueing(true);
    setJobStatus('BullMQ Job Queued → Raytracing Passes...');
    window.setTimeout(() => {
      setQueueing(false);
      setJobStatus(`Completed "${activePreset.name}" in 410ms · 60 FPS`);
    }, 700);
  };

  return (
    <div className="space-y-5 rounded-xl border border-line-subtle bg-canvas/90 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle pb-3">
        <div>
          <h4 className="text-base font-semibold text-ink-primary">SpatialAI</h4>
          <p className="mt-0.5 text-sm text-ink-muted">
            Drag the slider to compare the sketch with the render.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(PRESETS) as PresetId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPreset(key)}
              className={cn(
                'rounded-lg border px-2.5 py-1 text-xs font-medium capitalize transition',
                preset === key
                  ? 'border-accent-primary/60 bg-accent-primary text-[#05080D]'
                  : 'border-line-subtle bg-elevated text-ink-muted hover:text-ink-primary'
              )}
            >
              {key} Style
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Split Viewport */}
      <div className="relative h-64 select-none overflow-hidden rounded-xl border border-line-subtle sm:h-72">
        {/* Background Layer: Final 3D Render */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-between bg-gradient-to-br p-5 sm:p-6',
            activePreset.accentColor
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="rounded border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
              FINAL 3D RENDER · {activePreset.name}
            </span>
            <span className="rounded bg-black/60 px-2 py-1 font-mono text-[11px] text-slate-200">
              Raytraced GI Enabled
            </span>
          </div>

          <div className="my-auto grid grid-cols-3 items-end gap-3 pt-4 sm:gap-4">
            <div className="flex h-24 flex-col justify-end rounded-t-lg border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
              <span className="font-mono text-[10px] text-white/80">
                Material: Acoustic Wall Panel
              </span>
            </div>
            <div className="flex h-32 flex-col justify-between rounded-t-xl border border-white/25 bg-white/15 p-3 shadow-2xl backdrop-blur-md">
              <div className="mx-auto h-8 w-8 rounded-full border border-amber-200/50 bg-amber-300/30" />
              <span className="text-center font-mono text-[10px] text-white/95">
                Focal Lounge Area
              </span>
            </div>
            <div className="flex h-20 flex-col justify-end rounded-t-lg border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
              <span className="font-mono text-[10px] text-white/80">
                Lighting: {activePreset.lighting}
              </span>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-200">
            Active Shader Pipeline: {activePreset.materials}
          </div>
        </div>

        {/* Clipped Foreground Layer: Raw 2D CAD Wireframe */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-accent-primary bg-[#05080E]"
        >
          <div
            className="flex h-full w-[640px] max-w-none flex-col justify-between p-5 sm:w-[880px] sm:p-6"
            style={{
              backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          >
            <div>
              <span className="rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-[11px] text-sky-400">
                RAW 2D CAD WIREFRAME (DXF/DWG INPUT)
              </span>
            </div>

            <div className="my-auto grid grid-cols-3 items-end gap-3 pt-4 opacity-85 sm:gap-4">
              <div className="flex h-24 items-end border border-dashed border-sky-400/60 p-2">
                <span className="font-mono text-[10px] text-sky-400">
                  ELEV_A [2400mm]
                </span>
              </div>
              <div className="flex h-32 flex-col justify-between border border-sky-400 p-2">
                <div className="mx-auto h-8 w-8 rounded-full border border-dashed border-sky-400" />
                <span className="text-center font-mono text-[10px] text-sky-300">
                  AXIS_CENTER_01
                </span>
              </div>
              <div className="flex h-20 items-end border border-dashed border-sky-400/60 p-2">
                <span className="font-mono text-[10px] text-sky-400">
                  LUX_NODE_02
                </span>
              </div>
            </div>

            <div className="font-mono text-xs text-sky-400/80">
              Mesh Geometry: 14,820 vertices · Ortho Snap Active
            </div>
          </div>
        </div>

        {/* Split Divider Handle Indicator */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="pointer-events-none absolute inset-y-0 -translate-x-1/2 flex items-center"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent-primary bg-canvas text-accent-primary shadow-glow-sm">
            <Sliders className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 rounded-xl border border-line-subtle bg-elevated/80 p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <label
            htmlFor="cad-split-slider"
            className="whitespace-nowrap font-mono text-xs text-ink-muted"
          >
            Split: {sliderPos}%
          </label>
          <input
            id="cad-split-slider"
            type="range"
            min={5}
            max={95}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-accent-primary"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <Cpu className="h-3.5 w-3.5 text-accent-primary" />
            {jobStatus}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleQueueRender}
            isLoading={queueing}
          >
            {!queueing && <RefreshCw className="h-3 w-3" />}
            Queue BullMQ Render
          </Button>
        </div>
      </div>
    </div>
  );
}

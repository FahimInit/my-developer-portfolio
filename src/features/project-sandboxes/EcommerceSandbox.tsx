'use client';

import { useState } from 'react';
import {
  Check,
  Copy,
  Globe,
  Plus,
  ShoppingBag,
  Trash2,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn, formatCurrency } from '@/lib/utils';

interface CatalogItem {
  id: number;
  name: string;
  price: number;
  stock: string;
}

interface CartItem extends CatalogItem {
  qty: number;
}

type CourierZone = 'metro' | 'suburban' | 'intl';

const CATALOG: CatalogItem[] = [
  { id: 3, name: 'Nordic Oak Coffee Table', price: 210, stock: 'In Stock' },
  { id: 4, name: 'Brushed Brass Wall Sconce', price: 64, stock: 'In Stock' },
];

const INITIAL_CART: CartItem[] = [
  { id: 1, name: 'Minimalist Terracotta Vase', price: 48, qty: 1, stock: 'In Stock' },
  { id: 2, name: 'Handwoven Jute Pendant Lamp', price: 85, qty: 1, stock: 'Low Stock' },
];

const COURIER_ZONES: { id: CourierZone; label: string; fee: number }[] = [
  { id: 'metro', label: 'Metro Express ($8)', fee: 8 },
  { id: 'suburban', label: 'Suburban ($15)', fee: 15 },
  { id: 'intl', label: 'Global Air ($28)', fee: 28 },
];

export function EcommerceSandbox() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [zone, setZone] = useState<CourierZone>('metro');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const addToCart = (item: CatalogItem) => {
    setOrderPlaced(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setOrderPlaced(false);
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => {
    setOrderPlaced(false);
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const activeZone = COURIER_ZONES.find((z) => z.id === zone) ?? COURIER_ZONES[0];
  const courierFee = cart.length === 0 ? 0 : (activeZone?.fee ?? 8);
  const total = subtotal + courierFee;
  const totalUnits = cart.reduce((acc, item) => acc + item.qty, 0);

  const webhookPayload = JSON.stringify(
    {
      event: 'order.dispatched',
      idempotencyKey: `ord_${zone}_${totalUnits}_${total}`,
      courierZone: zone,
      courierFeeUsd: courierFee,
      totalUsd: total,
      items: cart.map((c) => ({ sku: `ART-${c.id}`, qty: c.qty, unitPrice: c.price })),
    },
    null,
    2
  );

  const handleCopyPayload = async () => {
    try {
      await navigator.clipboard.writeText(webhookPayload);
      setCopiedPayload(true);
      window.setTimeout(() => setCopiedPayload(false), 1800);
    } catch {
      // Clipboard API may be blocked in non-HTTPS contexts.
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 rounded-xl border border-line-subtle bg-canvas/90 p-4 sm:p-6 lg:grid-cols-12">
      {/* Left: Catalog & Courier Rate Selector */}
      <div className="space-y-4 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle pb-3">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
              Live Component Demo
            </span>
            <h4 className="text-base font-semibold text-ink-primary sm:text-lg">
              Aura Storefront &amp; Courier Calculator
            </h4>
          </div>
          <Badge variant="emerald">Optimistic UI State</Badge>
        </div>

        <p className="text-xs text-ink-muted">
          Add catalog items or switch courier zones to inspect instant React state updates
          and the serialized Node.js order webhook payload:
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CATALOG.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-line-subtle bg-elevated/90 p-3.5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-sm font-medium text-ink-primary">{item.name}</h5>
                  <span className="font-mono text-xs font-semibold text-emerald-400">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <span className="mt-1 inline-block text-[11px] text-ink-muted">
                  {item.stock}
                </span>
              </div>
              <button
                type="button"
                onClick={() => addToCart(item)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent-primary px-3 py-1.5 text-xs font-semibold text-[#05080D] transition hover:brightness-110"
              >
                <Plus className="h-3.5 w-3.5" /> Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2 rounded-xl border border-line-subtle bg-elevated/60 p-3.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-ink-primary">
            <Globe className="h-3.5 w-3.5 text-accent-primary" />
            Select Courier Dispatch Zone (Dynamic API Rate):
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {COURIER_ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => {
                  setZone(z.id);
                  setOrderPlaced(false);
                }}
                className={cn(
                  'rounded-lg border px-2.5 py-2 text-xs font-medium transition',
                  zone === z.id
                    ? 'border-accent-primary/60 bg-accent-glow text-accent-primary'
                    : 'border-line-subtle bg-canvas text-ink-muted hover:text-ink-primary'
                )}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live JSON Webhook Payload Preview */}
        <div className="rounded-xl border border-line-subtle bg-[#05070B] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              POST /api/v1/orders · JSON Payload
            </span>
            <button
              type="button"
              onClick={handleCopyPayload}
              className="inline-flex items-center gap-1 rounded border border-line-subtle px-2 py-0.5 font-mono text-[10px] text-ink-muted transition hover:text-ink-primary"
            >
              {copiedPayload ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy JSON
                </>
              )}
            </button>
          </div>
          <pre className="custom-scrollbar max-h-32 overflow-auto font-mono text-[11px] leading-relaxed text-sky-300">
            <code>{webhookPayload}</code>
          </pre>
        </div>
      </div>

      {/* Right: Interactive Cart Drawer */}
      <div className="flex flex-col justify-between rounded-xl border border-line-subtle bg-elevated p-4 lg:col-span-5">
        <div>
          <div className="flex items-center justify-between border-b border-line-subtle pb-3">
            <h5 className="flex items-center gap-1.5 text-sm font-semibold text-ink-primary">
              <ShoppingBag className="h-4 w-4 text-emerald-400" />
              Active Cart Drawer
            </h5>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-muted">{totalUnits} items</span>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  title="Clear cart"
                  className="rounded p-1 text-ink-muted transition hover:bg-white/5 hover:text-rose-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="custom-scrollbar my-3 max-h-52 space-y-2 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="rounded-lg border border-dashed border-line-subtle py-8 text-center">
                <p className="text-xs text-ink-muted">
                  Cart is empty. Add a product from the catalog to test calculations.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-line-subtle bg-canvas/80 p-2.5 text-xs"
                >
                  <div>
                    <p className="font-medium text-ink-primary">{item.name}</p>
                    <p className="font-mono text-ink-muted">${item.price} each</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label={`Decrease quantity for ${item.name}`}
                      className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-ink-primary transition hover:bg-white/15"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-mono text-ink-primary">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      aria-label={`Increase quantity for ${item.name}`}
                      className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-ink-primary transition hover:bg-white/15"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-2 border-t border-line-subtle pt-3">
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Subtotal</span>
            <span className="font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Courier API ({zone.toUpperCase()})</span>
            <span className="font-mono">${courierFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-1 text-sm font-semibold text-ink-primary">
            <span>Total Payable</span>
            <span className="font-mono text-emerald-400">${total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            disabled={cart.length === 0}
            onClick={() => setOrderPlaced(true)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-[#05080D] transition hover:bg-emerald-400 disabled:pointer-events-none disabled:opacity-40"
          >
            <Zap className="h-3.5 w-3.5" /> Simulate Stripe &amp; Courier Webhook
          </button>

          {orderPlaced && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/50 p-2.5 font-mono text-[11px] text-emerald-300">
              POST /api/v1/orders → 201 Created (Dispatched in 38ms)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

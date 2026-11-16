'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useTheme } from '@/components/layout/ThemeProvider';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  useSecondary: boolean;
}

interface ParticleFieldProps {
  containerRef: RefObject<HTMLElement | null>;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.trim().replace('#', '');
  if (cleaned.length !== 6) return null;
  const num = Number.parseInt(cleaned, 16);
  if (Number.isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function ParticleField({ containerRef }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = window.getComputedStyle(document.body);
    const primaryRgb =
      hexToRgb(styles.getPropertyValue('--accent-primary')) ?? { r: 0, g: 240, b: 255 };
    const secondaryRgb =
      hexToRgb(styles.getPropertyValue('--accent-secondary')) ?? { r: 59, g: 130, b: 246 };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const targetCount = Math.min(54, Math.max(28, Math.floor(width / 26)));
    const particles: Particle[] = Array.from({ length: targetCount }, (_, i) => {
      const baseVx = (Math.random() - 0.5) * 0.45;
      const baseVy = (Math.random() - 0.5) * 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        radius: 1.3 + Math.random() * 1.9,
        alpha: 0.25 + Math.random() * 0.45,
        useSecondary: i % 3 === 0,
      };
    });

    const pointer = { x: -9999, y: -9999, active: false };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let rafId = 0;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const interactionRadius = 150;
      const linkRadius = 110;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        if (!reducedMotion) {
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 0 && dist < interactionRadius) {
              const force = (interactionRadius - dist) / interactionRadius;
              p.vx += (dx / dist) * force * 0.55;
              p.vy += (dy / dist) * force * 0.55;
            }
          }

          // Smoothly relax back toward baseline ambient drift
          p.vx += (p.baseVx - p.vx) * 0.04;
          p.vy += (p.baseVy - p.vy) * 0.04;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const color = p.useSecondary ? secondaryRgb : primaryRgb;
        let boost = 0;

        if (pointer.active) {
          const distToMouse = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (distToMouse < interactionRadius) {
            boost = (1 - distToMouse / interactionRadius) * 0.5;

            // Subtle interactive line to cursor
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${
              (1 - distToMouse / interactionRadius) * 0.28
            })`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect nearby particles for a subtle engineering mesh feel
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          if (!other) continue;
          const dist = Math.hypot(p.x - other.x, p.y - other.y);
          if (dist < linkRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${
              (1 - dist / linkRadius) * 0.14
            })`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const drawRadius = p.radius + boost * 2.2;
        const drawAlpha = Math.min(0.95, p.alpha + boost);

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${drawAlpha})`;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.65)`;
        ctx.shadowBlur = boost > 0 ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
    };
  }, [containerRef, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Factory, Rocket, GraduationCap, ShieldCheck, Wallet, Network, type LucideIcon } from 'lucide-react';

export const ICONS: Record<string, LucideIcon> = { Cpu, Factory, Rocket, GraduationCap, ShieldCheck, Wallet, Network };

export function Eyebrow({ children, color = '#F5B841' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 eyebrow" style={{ color }}>
      <span className="h-px w-8" style={{ background: color }} />
      <span>{children}</span>
    </div>
  );
}

export function Title({ a, b, className = '' }: { a: string; b?: string; className?: string }) {
  return (
    <h2 className={`font-display font-bold tracking-tight text-white leading-[1.08] text-[28px] sm:text-[34px] xl:text-[42px] ${className}`}>
      {a} {b && <span className="gold">{b}</span>}
    </h2>
  );
}

/** Animated number: animates the leading numeric part of a string like "2 500", "50+", "10–20%". */
export function CountUp({ value, active, duration = 1300 }: { value: string; active: boolean; duration?: number }) {
  const m = value.match(/^([\d\s]+)(.*)$/);
  const target = m ? parseInt(m[1].replace(/\s/g, ''), 10) : NaN;
  const [n, setN] = useState(active ? 0 : target);
  const raf = useRef(0);
  useEffect(() => {
    if (!m || isNaN(target)) return;
    if (!active) { setN(0); return; }
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setN(Math.round(target * e));
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, value]);
  if (!m || isNaN(target)) return <>{value}</>;
  const fmt = target >= 1000 ? n.toLocaleString('en-US').replace(/,/g, ' ') : String(n);
  return <>{fmt}{m[2]}</>;
}

export function Chip({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold"
      style={{ borderColor: (color ?? '#ffffff') + '33', color: color ?? '#cbd5e1', background: (color ?? '#ffffff') + '10' }}
    >
      {children}
    </span>
  );
}

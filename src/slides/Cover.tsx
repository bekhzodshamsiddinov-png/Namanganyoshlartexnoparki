import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SlideProps, DIR_START } from '../types';
import { CountUp, Eyebrow, ICONS } from '../ui';

export function Cover({ t, active, go }: SlideProps) {
  const u = t.ui;
  return (
    <div className="grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
      <div className="enter flex flex-col gap-5 [@media(min-height:820px)]:gap-6">
        <Eyebrow>{u.coverEyebrow}</Eyebrow>
        <h1 className="font-display font-bold leading-[1.05] tracking-tight text-slate-900" style={{ fontSize: 'clamp(30px, min(4.3vw, 6.6vh), 60px)' }}>
          {u.coverTitleA} <span className="gold">{u.coverTitleB}</span> {u.coverTitleC}
        </h1>
        <p className="max-w-[620px] text-[16px] leading-relaxed text-slate-600 xl:text-[18px]">{u.coverLead}</p>
        <div className="flex flex-wrap gap-2">
          {u.coverChips.map((c, i) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ['#0E7490', '#6D28D9', '#047857'][i] }} />
              {c}
            </span>
          ))}
        </div>
        <div className="glass grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4">
          {u.coverStats.map(([v, unit, label], i) => (
            <div key={i} className={`p-4 xl:p-5 ${i > 0 ? 'sm:border-l' : ''} ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t sm:border-t-0' : ''} border-slate-200`}>
              <div className="font-display text-[26px] font-bold text-ink xl:text-[34px]">
                <CountUp value={v} active={active} />
                {unit && <span className="ml-1 text-[14px] font-semibold text-ink/60">{unit}</span>}
              </div>
              <div className="mt-1 text-[12.5px] leading-snug text-slate-500">{label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-bold text-white transition hover:brightness-110"
        >
          {u.nav[1]} <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </button>
      </div>
      <Orbit t={t} go={go} />
    </div>
  );
}

function Orbit({ t, go }: Pick<SlideProps, 't' | 'go'>) {
  const R = 190;
  const n = t.directions.length;
  return (
    <div className="mx-auto w-full max-w-[640px] 2xl:max-w-[760px] px-10 sm:px-[110px] fade-in"><div className="relative aspect-square w-full">
      <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="core" r="1">
            <stop offset="0" stopColor="#B7791F" stopOpacity=".25" />
            <stop offset="1" stopColor="#B7791F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="235" fill="none" stroke="rgba(11,42,91,.08)" />
        <circle r={R} fill="none" stroke="rgba(11,42,91,.18)" strokeDasharray="2 6" className="orbit-spin" />
        <circle r="120" fill="url(#core)" />
        <g className="orbit-spin" style={{ animationDuration: '120s' }}>
          <rect x="-78" y="-78" width="156" height="156" fill="none" stroke="rgba(183,121,31,.35)" />
          <rect x="-78" y="-78" width="156" height="156" fill="none" stroke="rgba(183,121,31,.35)" transform="rotate(45)" />
        </g>
        {t.directions.map((d, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return <line key={d.id} x1={0} y1={0} x2={Math.cos(a) * R} y2={Math.sin(a) * R} stroke={d.color} strokeOpacity=".25" />;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-[110px] font-extrabold leading-none gold sm:text-[140px]">7</div>
        <div className="eyebrow mt-1 text-slate-600">{t.ui.directionsWord}</div>
      </div>
      {t.directions.map((d, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (Math.cos(a) * R * 100) / 520;
        const y = 50 + (Math.sin(a) * R * 100) / 520;
        const Icon = ICONS[d.icon];
        const left = Math.cos(a) < -0.2;
        const right = Math.cos(a) > 0.2;
        const top = Math.sin(a) < -0.9;
        return (
          <button
            key={d.id}
            onClick={() => go(DIR_START + i)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={d.title}
          >
            <span
              className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white transition group-hover:scale-110 sm:h-12 sm:w-12"
              style={{ borderColor: d.color, boxShadow: `0 6px 18px ${d.color}26` }}
            >
              <Icon size={18} color={d.color} />
            </span>
            <span
              className={`pointer-events-none absolute top-1/2 hidden w-[130px] -translate-y-1/2 text-[12px] font-semibold leading-tight text-slate-800 sm:block ${
                left ? 'right-[56px] text-right' : right ? 'left-[56px] text-left' : top ? 'bottom-[54px] left-1/2 top-auto -translate-x-1/2 translate-y-0 text-center' : 'left-1/2 top-[64px] -translate-x-1/2 translate-y-0 text-center'
              }`}
            >
              <span className="block text-[10px] font-bold tracking-widest" style={{ color: d.color }}>{d.roman}</span>
              {d.short}
            </span>
          </button>
        );
      })}
    </div></div>
  );
}

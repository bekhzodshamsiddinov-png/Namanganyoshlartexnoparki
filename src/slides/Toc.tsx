import React from 'react';
import { ArrowUpRight, Map } from 'lucide-react';
import { SlideProps, DIR_START } from '../types';
import { Eyebrow, ICONS, Title } from '../ui';

export function Toc({ t, go }: SlideProps) {
  const u = t.ui;
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="enter flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow>{u.tocEyebrow}</Eyebrow>
          <Title a={u.tocTitleA} b={u.tocTitleB} />
        </div>
        <p className="max-w-[460px] text-[14px] leading-relaxed text-slate-400">{u.tocLead}</p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {t.directions.map((d, i) => {
          const Icon = ICONS[d.icon];
          return (
            <button
              key={d.id}
              onClick={() => go(DIR_START + i)}
              className="glass group relative flex min-h-[170px] flex-col overflow-hidden rounded-[20px] p-5 text-left transition hover:-translate-y-1 fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="outline-num pointer-events-none absolute -right-2 -top-3 text-[96px] opacity-25" style={{ ['--c' as string]: d.color }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute inset-x-0 top-0 h-[2px] opacity-70" style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: d.color + '1f' }}>
                  <Icon size={16} color={d.color} />
                </span>
                <span className="eyebrow" style={{ color: d.color }}>{d.roman}{u.dirEyebrow}</span>
              </div>
              <div className="mt-3 font-display text-[16px] font-semibold leading-snug text-white">{d.title}</div>
              <div className="mt-2 text-[13px] leading-relaxed text-slate-400">{d.desc}</div>
              <div className="mt-auto flex items-end justify-between pt-4">
                <div>
                  <span className="font-display text-[30px] font-bold" style={{ color: d.color }}>{d.items.length}</span>
                  <span className="ml-1.5 text-[12px] text-slate-400">{u.proposalsCount}</span>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition group-hover:bg-white/10">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </button>
          );
        })}
        <button
          onClick={() => go(10)}
          className="group relative flex min-h-[170px] flex-col overflow-hidden rounded-[20px] border border-gold/30 bg-gradient-to-br from-gold/20 via-gold/[.06] to-transparent p-5 text-left transition hover:-translate-y-1 fade-in"
          style={{ animationDelay: '420ms' }}
        >
          <span className="outline-num pointer-events-none absolute -right-1 -top-3 text-[96px] opacity-30">Σ</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20"><Map size={16} className="text-gold" /></span>
          <div className="mt-3 font-display text-[16px] font-semibold text-white">{u.roadmapCard}</div>
          <div className="mt-2 text-[13px] leading-relaxed text-slate-300">{u.roadmapCardDesc}</div>
          <div className="mt-auto flex items-end justify-between pt-4">
            <span className="font-display text-[30px] font-bold text-gold">30</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 transition group-hover:bg-gold/20">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

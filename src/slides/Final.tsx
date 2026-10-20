import React from 'react';
import { Building2, GraduationCap, Store, Users } from 'lucide-react';
import { SlideProps } from '../types';
import { CountUp, Eyebrow, Title } from '../ui';

const FUNNEL = ['#0E7490', '#6D28D9', '#BE185D', '#047857', '#B7791F', '#C2410C'];
const TILE_ICONS = [Building2, Users, GraduationCap, Store];
const TILE_COLORS = ['#047857', '#6D28D9', '#0E7490', '#C2410C'];

export function Final({ t, active }: SlideProps) {
  const u = t.ui;
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="enter flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow>{u.finalEyebrow}</Eyebrow>
          <Title a={u.finalTitleA} b={u.finalTitleB} />
        </div>
        <p className="max-w-[520px] text-[14px] leading-relaxed text-slate-500">{u.finalLead}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:gap-0">
        {u.funnel.map(([v, l], i) => {
          const c = FUNNEL[i];
          return (
            <div
              key={i}
              className="relative flex min-h-[150px] flex-1 xl:min-h-[170px] flex-col items-center justify-center px-6 py-6 text-center fade-in lg:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%,22px_50%)] lg:first:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)] max-lg:rounded-2xl"
              style={{
                background: `linear-gradient(160deg, ${c}40, ${c}12)`,
                animationDelay: `${i * 90}ms`,
                marginLeft: i ? undefined : 0,
              }}
            >
              <div className="font-display text-[34px] font-bold leading-none xl:text-[42px]" style={{ color: c }}>
                <CountUp value={v} active={active} />
              </div>
              <div className="mt-2 max-w-[150px] text-[12.5px] leading-snug text-slate-800">{l}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {u.finalTiles.map(([v, l], i) => {
          const Icon = TILE_ICONS[i];
          return (
            <div key={i} className="glass flex items-center gap-4 rounded-2xl p-4 fade-in" style={{ animationDelay: `${500 + i * 60}ms` }}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: TILE_COLORS[i] + '1f' }}>
                <Icon size={20} color={TILE_COLORS[i]} />
              </span>
              <div>
                <div className="font-display text-[26px] font-bold leading-none" style={{ color: TILE_COLORS[i] }}>
                  <CountUp value={v} active={active} />
                </div>
                <div className="mt-1 text-[12.5px] text-slate-500">{l}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {u.phases.map(([when, name, text], i) => (
          <div key={i} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-5 fade-in" style={{ animationDelay: `${700 + i * 80}ms` }}>
            <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${['#0E7490', '#6D28D9', '#B7791F'][i]}, transparent)` }} />
            <div className="flex items-center justify-between">
              <span className="eyebrow" style={{ color: ['#0E7490', '#6D28D9', '#B7791F'][i] }}>{when}</span>
              <span className="font-display text-[12px] text-slate-400">0{i + 1}</span>
            </div>
            <div className="mt-2 font-display text-[18px] font-semibold text-slate-900">{name}</div>
            <div className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{text}</div>
          </div>
        ))}
      </div>

      <div className="glass mt-auto flex flex-col items-start justify-between gap-4 rounded-2xl px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-11 w-11" />
          <div>
            <div className="text-[14px] font-bold text-slate-900">{u.footerOrg}</div>
            <div className="text-[12px] text-slate-500">{u.footerSub}</div>
          </div>
        </div>
        <div className="font-display text-[20px] font-bold gold sm:text-[24px]">{u.thanks}</div>
      </div>
    </div>
  );
}

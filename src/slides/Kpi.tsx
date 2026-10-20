import React from 'react';
import { SlideProps } from '../types';
import { CountUp, Eyebrow, Title } from '../ui';

const num = (s: string) => {
  const m = s.replace(/\s/g, '').match(/\d+/);
  return m ? parseInt(m[0], 10) : NaN;
};
const COLORS = ['#94A3B8', '#0E7490', '#B7791F'];

export function Kpi({ t, active }: SlideProps) {
  const u = t.ui;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="enter flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow>{u.kpiEyebrow}</Eyebrow>
          <Title a={u.kpiTitleA} b={u.kpiTitleB} />
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="flex gap-4">
            {u.kpiCols.map((c, i) => (
              <span key={c} className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i] }} /> {c}
              </span>
            ))}
          </div>
          <p className="max-w-[440px] text-[12.5px] leading-relaxed text-slate-400 lg:text-right">{u.kpiLead}</p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 md:grid-cols-2">
        {t.kpi.map((k, i) => {
          const vals = [k.now, k.y2027, k.y2028];
          const nums = vals.map(num);
          const max = Math.max(...nums.filter((n) => !isNaN(n)), 1);
          return (
            <div key={i} className="glass flex flex-col justify-center gap-1.5 rounded-2xl px-5 py-2.5 fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13.5px] font-semibold text-slate-800">{k.label}</span>
                <span className={`shrink-0 font-display font-bold leading-none text-ink ${isNaN(nums[2]) ? 'text-[13px]' : 'text-[20px]'}`}>
                  <CountUp value={k.y2028} active={active} />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {vals.map((v, j) => {
                  const n = nums[j];
                  const w = isNaN(n) ? (v === '—' ? 0 : 100) : Math.max(2, (n / max) * 100);
                  return (
                    <div key={j} className="flex items-center gap-3">
                      <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full transition-[width] duration-[1200ms] ease-out"
                          style={{ width: active ? `${w}%` : '0%', background: COLORS[j], transitionDelay: `${200 + j * 150}ms` }}
                        />
                      </div>
                      <span className="w-[86px] shrink-0 truncate text-right text-[11px] leading-none font-semibold text-slate-500">{v}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

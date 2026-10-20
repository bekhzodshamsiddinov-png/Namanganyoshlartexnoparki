import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { SlideProps, findProposal } from '../types';
import { CountUp, Eyebrow, Title } from '../ui';

export function State({ t, active, openProposal }: SlideProps) {
  const u = t.ui;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="enter flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow>{u.stateEyebrow}</Eyebrow>
          <Title a={u.stateTitleA} b={u.stateTitleB} />
        </div>
        <p className="max-w-[460px] text-[14px] leading-relaxed text-slate-500">{u.stateLead}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {u.baseline.map(([v, unit, label], i) => (
          <div key={i} className="glass rounded-2xl px-4 py-3 fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="font-display text-[26px] font-bold text-slate-900">
              <CountUp value={v} active={active} />
              {unit && <span className="ml-1 text-[13px] font-semibold text-slate-500">{unit}</span>}
            </div>
            <div className="mt-1 text-[12.5px] leading-snug text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="glass flex-1 overflow-hidden rounded-[20px]">
        <div className="hidden grid-cols-[1fr_auto_1.15fr] gap-4 border-b border-slate-200 px-5 py-3 md:grid">
          <div className="eyebrow text-rose-600">{u.problemsTitle}</div>
          <div />
          <div className="eyebrow text-emerald-700">{u.solutionTitle}</div>
        </div>
        <div className="divide-y divide-slate-100">
          {u.problems.map(([text, nums], i) => (
            <div key={i} className="grid grid-cols-1 items-center gap-3 px-5 py-2 md:grid-cols-[1fr_auto_1.15fr] md:gap-4 fade-in" style={{ animationDelay: `${150 + i * 60}ms` }}>
              <div className="flex items-start gap-3 text-[14px] text-slate-800">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-500" />
                <span>{text as string}</span>
              </div>
              <ArrowRight size={16} className="hidden text-slate-400 md:block" />
              <div className="flex flex-wrap gap-2">
                {(nums as number[]).map((n) => {
                  const f = findProposal(t, n);
                  if (!f) return null;
                  return (
                    <button
                      key={n}
                      onClick={() => openProposal(n)}
                      className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[12px] font-semibold transition hover:brightness-125"
                      style={{ borderColor: f.dir.color + '55', background: f.dir.color + '14', color: f.dir.color }}
                    >
                      <span className="font-display text-[11px] opacity-80">#{n}</span>
                      <span className="text-slate-800">{f.p.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

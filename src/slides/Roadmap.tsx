import React, { useState } from 'react';
import { SlideProps } from '../types';
import { Eyebrow, Title } from '../ui';

export function Roadmap({ t, openProposal }: SlideProps) {
  const u = t.ui;
  const [f, setF] = useState<number | null>(null);
  const dirs = t.directions.map((d, i) => ({ ...d, i })).filter((d) => f === null || d.i === f);

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="enter flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow>{u.roadmapEyebrow}</Eyebrow>
          <Title a={u.roadmapTitleA} b={u.roadmapTitleB} />
        </div>
        <p className="max-w-[420px] text-[13.5px] leading-relaxed text-slate-400">{u.roadmapLead}</p>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <FilterBtn on={f === null} onClick={() => setF(null)} color="#F5B841">{u.all}</FilterBtn>
        {t.directions.map((d, i) => (
          <FilterBtn key={d.id} on={f === i} onClick={() => setF(f === i ? null : i)} color={d.color}>
            {d.roman}. {d.short}
          </FilterBtn>
        ))}
      </div>

      <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px]">
        <div className="grid grid-cols-[minmax(150px,1.1fr)_2fr] border-b border-white/[.07] text-[11px] font-bold uppercase tracking-wider text-slate-400 sm:grid-cols-[minmax(220px,1fr)_2fr]">
          <div className="px-4 py-3">#</div>
          <div className="grid grid-cols-4">
            {u.quarters.map((q) => (
              <div key={q} className="border-l border-white/[.07] px-3 py-3 text-center">{q}</div>
            ))}
          </div>
        </div>
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto">
          {dirs.map((d) => (
            <div key={d.id}>
              <div className="sticky top-0 z-10 flex items-center gap-2 bg-[#0b1631]/95 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur" style={{ color: d.color }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} /> {d.roman}. {d.title}
              </div>
              {d.items.map((p) => (
                <button
                  key={p.n}
                  onClick={() => openProposal(p.n)}
                  className="grid w-full grid-cols-[minmax(150px,1.1fr)_2fr] items-center text-left transition hover:bg-white/[.04] sm:grid-cols-[minmax(220px,1fr)_2fr]"
                >
                  <div className="flex items-center gap-2.5 px-4 py-2">
                    <span className="w-6 shrink-0 font-display text-[11px] font-bold text-slate-500">{p.n}</span>
                    <span className="truncate text-[13px] font-semibold text-slate-200">{p.short}</span>
                  </div>
                  <div className="relative grid h-full grid-cols-4">
                    {[0, 1, 2, 3].map((q) => (
                      <div key={q} className="border-l border-white/[.05]" />
                    ))}
                    <div className="absolute inset-y-0 flex items-center" style={{ left: `${(p.q / 4) * 100}%`, right: 0 }}>
                      <div className="flex h-[18px] w-full items-center overflow-hidden rounded-full">
                        <div className="h-full shrink-0 rounded-full" style={{ width: `${100 / (4 - p.q)}%`, background: d.color }} />
                        <div className="h-full flex-1" style={{ background: `linear-gradient(90deg, ${d.color}55, ${d.color}10)` }} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ on, onClick, color, children }: { on: boolean; onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
      style={on ? { background: color, borderColor: color, color: '#070F22' } : { borderColor: color + '40', color }}
    >
      {children}
    </button>
  );
}

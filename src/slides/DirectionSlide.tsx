import React from 'react';
import { CalendarClock, CheckCircle2, FileText, Handshake, Target, Workflow } from 'lucide-react';
import { Dict } from '../types';
import { Eyebrow, ICONS } from '../ui';

interface Props {
  t: Dict;
  d: number;
  sel: number;
  setSel: (i: number) => void;
}

export function DirectionSlide({ t, d, sel, setSel }: Props) {
  const u = t.ui;
  const dir = t.directions[d];
  const p = dir.items[Math.min(sel, dir.items.length - 1)];
  const Icon = ICONS[dir.icon];
  const c = dir.color;

  return (
    <div className="flex h-full flex-col gap-5">
      {/* header */}
      <div className="enter flex items-start gap-5">
        <span className="outline-num hidden text-[88px] sm:block xl:text-[104px]" style={{ ['--c' as string]: c }}>
          {String(d + 1).padStart(2, '0')}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
          <Eyebrow color={c}>{dir.roman}{u.dirEyebrow}</Eyebrow>
          <h2 className="font-display text-[24px] font-bold leading-tight text-slate-900 sm:text-[30px] xl:text-[36px]">{dir.title}</h2>
          <p className="text-[14px] text-slate-500 xl:text-[15px]">{dir.desc}</p>
        </div>
        <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl md:flex" style={{ background: c + '1a', boxShadow: `0 8px 24px ${c}1f` }}>
          <Icon size={26} color={c} />
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] xl:grid-cols-[330px_1fr]">
        {/* proposal list */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {dir.items.map((it, i) => {
            const on = it.n === p.n;
            return (
              <button
                key={it.n}
                onClick={() => setSel(i)}
                className={`group flex min-w-[220px] items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition lg:min-w-0 ${
                  on ? 'bg-white' : 'border-slate-200 bg-white/70 hover:bg-slate-50'
                }`}
                style={on ? { borderColor: c + '88', boxShadow: `inset 3px 0 0 ${c}` } : undefined}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-[13px] font-bold"
                  style={{ background: on ? c : c + '1a', color: on ? '#FFFFFF' : c }}
                >
                  {it.n}
                </span>
                <span className={`text-[13.5px] font-semibold leading-snug ${on ? 'text-slate-900' : 'text-slate-600'}`}>{it.short}</span>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <div key={p.n + t.meta.lang} className="flex min-h-0 flex-col gap-4 fade-in">
          <div className="glass flex flex-col gap-3 rounded-[20px] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="eyebrow" style={{ color: c }}>{u.proposal} #{p.n}</div>
              <div className="mt-1.5 text-[16px] font-bold leading-snug text-slate-900 xl:text-[18px]">{p.title}</div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] text-slate-600">
                <CalendarClock size={13} style={{ color: c }} /> {u.term}: <b className="text-slate-900">{p.term}</b>
              </span>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-3">
            <Card title={u.what} icon={<FileText size={15} />} c={c}>
              <p className="text-[13.5px] leading-relaxed text-slate-600">{p.what}</p>
            </Card>
            <Card title={u.how} icon={<Workflow size={15} />} c={c}>
              <ol className="flex flex-col gap-3">
                {p.how.map((h, i) => (
                  <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-slate-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold" style={{ borderColor: c + '55', color: c }}>
                      {i + 1}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[12.5px] text-slate-500">
                <Handshake size={14} className="mt-0.5 shrink-0" style={{ color: c }} />
                <span><b className="text-slate-800">{u.partners}:</b> {p.partners}</span>
              </div>
            </Card>
            <Card title={u.result} icon={<Target size={15} />} c={c}>
              <div className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-600">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: c }} />
                <span>{p.result}</span>
              </div>
              <div
                className="mt-auto rounded-2xl p-4"
                style={{ background: `linear-gradient(135deg, ${c}26, ${c}08)`, border: `1px solid ${c}40` }}
              >
                <div className="font-display text-[34px] font-bold leading-none" style={{ color: c }}>{p.metric.v}</div>
                <div className="mt-2 text-[12.5px] leading-snug text-slate-600">{p.metric.l}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, c, children }: { title: string; icon: React.ReactNode; c: string; children: React.ReactNode }) {
  return (
    <div className="glass flex min-h-0 flex-col gap-4 overflow-y-auto rounded-[20px] p-5 thin-scroll">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: c + '1f', color: c }}>{icon}</span>
        <span className="eyebrow text-slate-800">{title}</span>
      </div>
      {children}
    </div>
  );
}

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize2, Menu, Minimize2, X } from 'lucide-react';
import { DICTS, DIR_START, LANGS, Lang, SLIDE_COUNT, SlideProps, findProposal } from './types';
import { Cover } from './slides/Cover';
import { Toc } from './slides/Toc';
import { State } from './slides/State';
import { DirectionSlide } from './slides/DirectionSlide';
import { Roadmap } from './slides/Roadmap';
import { Kpi } from './slides/Kpi';
import { Final } from './slides/Final';

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang') as Lang | null;
    if (q && LANGS.includes(q)) return q;
    const s = localStorage.getItem('nyt-lang') as Lang | null;
    if (s && LANGS.includes(s)) return s;
  } catch { /* ignore */ }
  return 'uz';
}
function initialSlide() {
  const n = parseInt(location.hash.replace('#', ''), 10);
  return n >= 1 && n <= SLIDE_COUNT ? n - 1 : 0;
}
function useDeckMode() {
  const q = () => window.innerWidth >= 1024 && window.innerHeight >= 620;
  const [deck, setDeck] = useState(q);
  useEffect(() => {
    const on = () => setDeck(q());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return deck;
}

export function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [idx, setIdx] = useState(initialSlide);
  const [sel, setSel] = useState<number[]>(() => Array(7).fill(0));
  const [overview, setOverview] = useState(false);
  const [menu, setMenu] = useState(false);
  const [fs, setFs] = useState(false);
  const deck = useDeckMode();
  const t = DICTS[lang];
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    try { localStorage.setItem('nyt-lang', lang); } catch { /* ignore */ }
  }, [lang, t]);

  useEffect(() => {
    const on = () => setIdx(initialSlide());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  useEffect(() => {
    if (deck) history.replaceState(null, '', `${location.pathname}${location.search}#${idx + 1}`);
  }, [idx, deck]);

  const go = useCallback(
    (i: number) => {
      const n = Math.max(0, Math.min(SLIDE_COUNT - 1, i));
      setIdx(n);
      setOverview(false);
      setMenu(false);
      if (!deck) sections.current[n]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [deck]
  );

  const openProposal = useCallback(
    (n: number) => {
      const f = findProposal(t, n);
      if (!f) return;
      setSel((s) => s.map((v, k) => (k === f.d ? f.i : v)));
      go(DIR_START + f.d);
    },
    [t, go]
  );

  // keyboard
  useEffect(() => {
    if (!deck) return;
    const on = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(idx + 1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(idx - 1); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(SLIDE_COUNT - 1);
      else if (e.key === 'Escape') setOverview(false);
      else if (e.key.toLowerCase() === 'g') setOverview((v) => !v);
      else if (idx >= DIR_START && idx < DIR_START + 7 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const d = idx - DIR_START;
        const len = t.directions[d].items.length;
        setSel((s) => s.map((v, k) => (k === d ? (v + (e.key === 'ArrowDown' ? 1 : len - 1)) % len : v)));
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [deck, idx, go, t]);

  // mobile: track visible section
  useEffect(() => {
    if (deck) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setIdx(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, [deck]);

  useEffect(() => {
    const on = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  useEffect(() => {
    document.querySelector(`[data-nav="${idx}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [idx]);

  const render = (i: number, active: boolean) => {
    const p: SlideProps = { t, active, go, openProposal };
    if (i === 0) return <Cover {...p} />;
    if (i === 1) return <Toc {...p} />;
    if (i === 2) return <State {...p} />;
    if (i >= DIR_START && i < DIR_START + 7) {
      const d = i - DIR_START;
      return <DirectionSlide t={t} d={d} sel={sel[d]} setSel={(v) => setSel((s) => s.map((x, k) => (k === d ? v : x)))} />;
    }
    if (i === 10) return <Roadmap {...p} />;
    if (i === 11) return <Kpi {...p} />;
    return <Final {...p} />;
  };

  const navColor = (i: number) => (i >= DIR_START && i < DIR_START + 7 ? t.directions[i - DIR_START].color : '#B7791F');

  const header = (
    <header className="relative z-30 flex items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-10 lg:py-4">
      <button onClick={() => go(0)} className="flex min-w-0 items-center gap-3 text-left">
        <img src="/logo.png" alt="" className="h-10 w-10 shrink-0 lg:h-11 lg:w-11" />
        <div className="min-w-0">
          <div className="truncate text-[12.5px] font-extrabold tracking-[.12em] text-slate-900 sm:text-[13.5px]">{t.ui.org}</div>
          <div className="hidden truncate text-[12px] text-slate-500 sm:block">{t.ui.orgSub}</div>
        </div>
      </button>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex rounded-full border border-slate-200 bg-white p-1">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wider transition sm:px-3 ${
                l === lang ? 'bg-ink text-white' : 'text-slate-600 hover:text-ink'
              }`}
            >
              {l === 'uz' ? 'UZ' : l.toUpperCase()}
            </button>
          ))}
        </div>
        {deck ? (
          <>
            <span className="hidden font-display text-[13px] text-slate-500 xl:inline">
              <span className="text-slate-900">{String(idx + 1).padStart(2, '0')}</span> / {SLIDE_COUNT}
            </span>
            <IconBtn label={t.ui.overview} onClick={() => setOverview(true)}><LayoutGrid size={16} /></IconBtn>
            <IconBtn label={t.ui.fullscreen} onClick={toggleFs}>{fs ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</IconBtn>
          </>
        ) : (
          <IconBtn label="Menu" onClick={() => setMenu((v) => !v)}>{menu ? <X size={18} /> : <Menu size={18} />}</IconBtn>
        )}
      </div>
    </header>
  );

  const bg = (
    <div className="bg-stage">
      <div className="aurora a1" /><div className="aurora a2" /><div className="aurora a3" />
      <div className="pattern" />
    </div>
  );

  if (!deck) {
    return (
      <div className="relative min-h-full">
        {bg}
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">{header}</div>
        {menu && (
          <nav className="fixed inset-x-0 top-[64px] z-40 max-h-[75vh] overflow-y-auto border-b border-slate-200 bg-white/95 p-3 backdrop-blur-xl">
            {t.ui.nav.map((n, i) => (
              <button key={i} onClick={() => go(i)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] ${i === idx ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>
                <span className="font-display text-[11px]" style={{ color: navColor(i) }}>{String(i).padStart(2, '0')}</span> {n}
              </button>
            ))}
          </nav>
        )}
        <main className="relative z-10">
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            <section
              key={i}
              data-i={i}
              ref={(el) => (sections.current[i] = el)}
              className="scroll-mt-[64px] border-b border-slate-200 px-4 py-10 sm:px-8"
            >
              {render(i, idx === i)}
            </section>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {bg}
      {header}
      <main className="relative z-10 min-h-0 flex-1 px-10 pb-4 pt-2 xl:px-14 2xl:px-20">
        <div key={`${idx}-${lang}`} className="h-full overflow-y-auto thin-scroll fade-in">
          <div className="mx-auto h-full max-w-[1560px]">{render(idx, true)}</div>
        </div>
      </main>

      {/* bottom navigator */}
      <footer className="relative z-30 flex items-center gap-3 border-t border-slate-200 bg-white/85 px-6 py-2.5 backdrop-blur-xl xl:px-10">
        <IconBtn label={t.ui.overview} onClick={() => setOverview(true)}><LayoutGrid size={15} /></IconBtn>
        <div className="no-scrollbar flex min-w-0 flex-1 overflow-x-auto">
          {t.ui.nav.map((n, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              data-nav={i}
              className={`relative shrink-0 px-2 py-2 text-[11px] font-semibold transition 2xl:px-3 ${i === idx ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
            >
              <span className="mr-1.5 font-display text-[10px]" style={{ color: i === idx ? navColor(i) : undefined }}>{String(i).padStart(2, '0')}</span>
              {n}
              <span
                className="absolute inset-x-2 bottom-0 h-[2px] rounded-full transition-all"
                style={{ background: navColor(i), opacity: i === idx ? 1 : i < idx ? 0.25 : 0 }}
              />
            </button>
          ))}
        </div>
        <IconBtn label={t.ui.prev} onClick={() => go(idx - 1)} disabled={idx === 0}><ChevronLeft size={17} /></IconBtn>
        <IconBtn label={t.ui.next} onClick={() => go(idx + 1)} disabled={idx === SLIDE_COUNT - 1}><ChevronRight size={17} /></IconBtn>
      </footer>
      <div className="absolute inset-x-0 bottom-0 z-40 h-[2px] bg-slate-100">
        <div className="h-full bg-gold transition-all duration-500" style={{ width: `${((idx + 1) / SLIDE_COUNT) * 100}%` }} />
      </div>

      {overview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 p-10 backdrop-blur-xl fade-in" onClick={() => setOverview(false)}>
          <div className="grid w-full max-w-[1200px] grid-cols-3 gap-4 xl:grid-cols-4" onClick={(e) => e.stopPropagation()}>
            {t.ui.nav.map((n, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`glass group flex h-[110px] flex-col justify-between rounded-2xl p-4 text-left transition hover:-translate-y-1 ${i === idx ? 'ring-2 ring-gold' : ''}`}
              >
                <span className="font-display text-[26px] font-bold" style={{ color: navColor(i) }}>{String(i).padStart(2, '0')}</span>
                <span className="text-[14px] font-semibold text-slate-900">{n}</span>
              </button>
            ))}
          </div>
          <button className="absolute right-8 top-8 text-slate-600 hover:text-ink" onClick={() => setOverview(false)} aria-label="close"><X size={26} /></button>
        </div>
      )}
    </div>
  );
}

function IconBtn({ children, label, onClick, disabled }: { children: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-100 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

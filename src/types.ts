import uz from './i18n/uz.json';
import ru from './i18n/ru.json';
import en from './i18n/en.json';

export type Dict = typeof uz;
export type Direction = Dict['directions'][number];
export type Proposal = Direction['items'][number];
export type Lang = 'uz' | 'ru' | 'en';

export const DICTS: Record<Lang, Dict> = { uz, ru: ru as Dict, en: en as Dict };
export const LANGS: Lang[] = ['uz', 'ru', 'en'];

export interface SlideProps {
  t: Dict;
  active: boolean;
  go: (i: number) => void;
  openProposal: (n: number) => void;
}

/** slide index helpers */
export const DIR_START = 3; // first direction slide
export const SLIDE_COUNT = 13;

export function findProposal(t: Dict, n: number) {
  for (let d = 0; d < t.directions.length; d++) {
    const i = t.directions[d].items.findIndex((p) => p.n === n);
    if (i >= 0) return { d, i, p: t.directions[d].items[i], dir: t.directions[d] };
  }
  return null;
}

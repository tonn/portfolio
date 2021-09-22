import { slugify } from 'transliteration';

export function normalizeName(name: string) {
    return 'a_' + slugify(name).replace(/-/g, '_');
}
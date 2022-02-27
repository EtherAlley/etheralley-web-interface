import en from './lang/en.json';
import fr from './lang/fr.json';
import hr from './lang/hr.json';
import ro from './lang/ro.json';

export type Translations = {
  [x: string]: any;
};

const translations: Translations = {
  'en-US': en,
  fr,
  hr,
  ro,
};

export default translations;

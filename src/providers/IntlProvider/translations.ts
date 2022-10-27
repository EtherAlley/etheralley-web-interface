import { MessageFormatElement } from 'react-intl';
import en from './lang/en.json';
import fr from './lang/fr.json';
import hr from './lang/hr.json';
import ro from './lang/ro.json';

export type Translations = {
  [x: string]: Record<string, string> | Record<string, MessageFormatElement[]> | undefined;
};

const translations: Translations = {
  'en-US': en,
  fr,
  hr,
  ro,
};

export default translations;

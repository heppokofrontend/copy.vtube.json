import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      '移植元.vtube.json': 'template.vtube.json',
      '移植先.vtube.json': 'new-model.vtube.json',
      'ここにファイルをドロップしてください': 'Drop here!',
      '静的な置換のみを行う': 'Only replacing as string',
      'VTSパラメータ': 'VTS Params',
      'キーバインド': 'Hot Key Params',
    },
  },
  ja: {
    translation: {
      '移植元.vtube.json': '移植元.vtube.json',
      '移植先.vtube.json': '移植先.vtube.json',
      'ここにファイルをドロップしてください': 'ここにファイルをドロップしてください',
      '静的な置換のみを行う': '静的な置換のみを行う',
      'VTSパラメータ': 'VTSパラメータ',
      'キーバインド': 'キーバインド',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: ['en', 'ja'],
    lng: window.navigator.languages[0] === 'ja' ? 'ja' : 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;

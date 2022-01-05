import React from 'react';
import ReactDOM from 'react-dom';
import './locales/i18n';
// import {useTranslation} from 'react-i18next';
import {Header} from './component/Header';
import {Footer} from './component/Footer';
import {UI} from './component/UI';
import reportWebVitals from './reportWebVitals';
import './styles/common.scss';

const Main = () => {
  // const { t } = useTranslation();

  return (
    <main>
      <UI />


    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Header />

    <Main />

    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

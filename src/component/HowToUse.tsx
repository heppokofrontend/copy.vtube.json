import React from 'react';
import '../locales/i18n';
import {useTranslation} from 'react-i18next';
import styles from './HowToUse.module.scss';

export function HowToUse() {
  const {t} = useTranslation();

  return (
    <div className={styles.wrap}>
      <h2>⚠ お願い</h2>

      <p>必ず引き継ぎ元・引き継ぎ先<strong>両方のバックアップ</strong>をとってから作業してください。</p>
      <p>ご利用は自己責任でお願いします。</p>

      <p style={{
        marginTop: '1em',
      }}>不具合のご報告・ご要望などがありましたら、<a href="https://github.com/heppokofrontend/copy.vtube.json/issues/new">Issues</a>または<a href="https://twitter.com/KawarabeEcma">Twitter</a>でお知らせください。</p>

      <h2>🔰 使い方</h2>

      <ol>
      <li>引き継ぎ元の<b>「●●●.vtube.json」</b>を<b>「{t('移植元.vtube.json')}」</b>に指定します</li>
      <li>引き継ぎ先の<b>「●●●.vtube.json」</b>を<b>「{t('移植先.vtube.json')}」</b>に指定します</li>
      <li>完成したら<b>Result</b>を<b>「Downloadボタン」</b>からダウンロードします</li>
      <li>ダウンロードしたファイルで、引き継ぎ先の<b>「●●●.vtube.json」</b>を上書きします</li>
      </ol>

      <h3>⚙ 技術的な内容</h3>

      <h4>✅ {t('静的な置換のみを行う')}</h4>

      <p>JSONをJavaScriptでパースすると小数点の値が変わってしまいます（1.0 → 1、長い桁数だと最後の下1桁が繰り上がるなど）。</p>
      <p>それによって不具合が起こる可能性は低いですが、万が一を避けるために次の項目のみを文字列置換するだけのモードです。</p>

      <ul>
        <li><code>JSON.Name</code></li>
        <li><code>JSON.ModelID</code></li>
        <li><code>JSON.FileReferences.Icon</code></li>
        <li><code>JSON.FileReferences.Model</code></li>
        <li><code>JSON.FileReferences.IdleAnimation</code></li>
        <li><code>JSON.FileReferences.IdleAnimationWhenTrackingLost</code></li>
      </ul>

      <p>このモードが有効の時は、他のチェックボックスの値は変更できません。</p>
      <p>このモードが有効になった時、他のすべてのチェックボックスが有効化されます。</p>

      <h4>✅ {t('キーバインド')}</h4>

      <p>有効時、キーバインドの値を引き継ぎます。</p>

      <h4>✅ {t('VTSパラメータ')}</h4>

      <p>有効時、キーバインド以外の値を引き継ぎます。</p>
    </div>
  );
}

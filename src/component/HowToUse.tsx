import React from 'react';
import '../locales/i18n';
import i18n from 'i18next';
import {useTranslation} from 'react-i18next';
import styles from './HowToUse.module.scss';

export function HowToUse() {
  const isJP = i18n.language === 'ja';
  const {t} = useTranslation();

  return (
    <div className={styles.wrap}>
      <h2>⚠ {isJP ? 'お願い' : 'Terms'}</h2>

      {
        isJP ?
        (<p>必ず引き継ぎ元・引き継ぎ先<strong>両方のバックアップ</strong>をとってから作業してください。</p>) :
        (<p>Be sure to <strong>make backups of both</strong> the vtube.json of the base model and the new model before working on it.</p>)
      }

      {
        isJP ?
        (<p>ご利用は自己責任でお願いします。</p>) :
        (<p>Please use at your own risk.</p>)
      }

      <p style={{
        marginTop: '1em',
      }}>
      {
        isJP ?
        (<p>JSONというものは非常に繊細です。カンマのつけ忘れ、クオートの書き間違いなどで容易に壊れてしまいます。</p>) :
        (<p>JSON is fragile. Just a misplaced comma or a double-quote will break JSON.</p>)
      }
      </p>

      {
        isJP ?
        (<p>手作業の際は、優しく丁寧に扱ってあげてください。</p>) :
        (<p>When working with your hands, please handle them gently and carefully.</p>)
      }

      <p style={{
        marginTop: '1em',
      }}>
      {
        isJP ?
        (<p>不具合のご報告・ご要望などがありましたら、<a href="https://github.com/heppokofrontend/copy.vtube.json/issues/new">Issues</a>または<a href="https://twitter.com/KawarabeEcma">Twitter</a>でお知らせください。</p>) :
        (<p>Bug reports and requests can be sent to <a href="https://github.com/heppokofrontend/copy.vtube.json/issues/new">GitHub Issues</a> or <a href="https://twitter.com/KawarabeEcma">Twitter</a>.</p>)
      }
      </p>

      <h2>🔰 {isJP ? '使い方' : 'How To Use'}</h2>

      {
        isJP ?
        (<p>⚠「animations」「expressions」フォルダが引き継ぎ元にある場合は、引き継ぎ先にもコピーしておく必要があります。</p>) :
        (<p>If the "animations" and "expressions" folders are already in the base model folder, you will need to copy them to the new model folder as well.</p>)
      }

      {
        isJP ?
        (
          <ol>
            <li>引き継ぎ元の<b>「●●●.vtube.json」</b>を<b>「{t('移植元.vtube.json')}」</b>に指定します</li>
            <li>引き継ぎ先の<b>「●●●.vtube.json」</b>を<b>「{t('移植先.vtube.json')}」</b>に指定します</li>
            <li>完成したら<b>Result</b>の<b>「Downloadボタン」</b>からダウンロードします</li>
            <li>ダウンロードしたファイルで、引き継ぎ先の<b>「●●●.vtube.json」</b>を上書きします</li>
          </ol>
        ) :
        (
          <ol>
            <li>Load the <b>"***.vtube.json"</b> file of the base model into <b>"{t('移植元.vtube.json')}"</b>.</li>
            <li>Load the <b>"***.vtube.json"</b> file of the new model into <b>"{t('移植先.vtube.json')}"</b>.</li>
            <li>When completed, download the result vtube.json from <b>the Download button of Result</b>.</li>
            <li>Overwrite <b>"***.vtube.json"</b> of the new model with the downloaded file.</li>
          </ol>
        )
      }

      <h3>⚙ {isJP ? '技術的な内容' : 'Technical details'}</h3>

      <h4>✅ {t('静的な置換のみを行う')}</h4>

      {
        isJP ?
        (<p>JSONをJavaScriptでパースすると小数点の値が変わってしまいます（1.0 → 1、長い桁数だと最後の下1桁が繰り上がるなど）。</p>) :
        (
          <>
            <p>When JavaScript reads JSON as JSON, changes occur in the value.</p>
            <p>For example, 1.0 becomes 1, or the last digit of a decimal point with many digits is increased.</p>
          </>
        )
      }

      {
        isJP ?
        (<p>それによって不具合が起こる可能性は低いですが、万が一を避けるために次の項目のみを文字列置換するだけのモードです。</p>) :
        (
          <>
            <p>I consider those to be minor issues. However, just in case, we will not let JSON be read as JSON, but only do string substitution.</p>
            <p>The following items will be replaced.</p>
          </>
        )
      }

      <ul>
        <li><code>JSON.Name</code></li>
        <li><code>JSON.ModelID</code></li>
        <li><code>JSON.FileReferences.Icon</code></li>
        <li><code>JSON.FileReferences.Model</code></li>
        <li><code>JSON.FileReferences.IdleAnimation</code></li>
        <li><code>JSON.FileReferences.IdleAnimationWhenTrackingLost</code></li>
      </ul>

      {
        isJP ?
        (<p>このモードが有効の時は、他のチェックボックスの値は変更できません。</p>) :
        (<p>When this mode is enabled, the values of the other checkboxes cannot be changed.</p>)
      }

      {
        isJP ?
        (<p>このモードが有効になった時、他のすべてのチェックボックスが有効化されます。</p>) :
        (<p>When this mode is enabled, all other checkboxes will be activated.</p>)
      }

      <h4>✅ {t('キーバインド')}</h4>

      {
        isJP ?
        (<p>有効時、キーバインドの値を引き継ぎます。</p>) :
        (<p>When enabled, takes over the hot key settings.</p>)
      }

      <h4>✅ {t('VTSパラメータ')}</h4>

      {
        isJP ?
        (<p>有効時、キーバインド以外の値を引き継ぎます。</p>) :
        (<p>When enabled, takes over all settings except for the hot key settings.</p>)
      }
    </div>
  );
}

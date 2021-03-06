import React, { useState, useRef, ChangeEventHandler, DragEventHandler, FocusEventHandler } from 'react';
import styles from './UI.module.scss';
import {useTranslation} from 'react-i18next';

export function UI() {
  const { t } = useTranslation();
  const [source, setSource] = useState('');
  const [sourceFileName, setSourceFileName] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');
  const [isStaticReplace, setIsStaticReplace] = useState(true);
  const [isNeedVTSParam, setIsNeedVTSParam] = useState(true);
  const [isNeedKeyBindParam, setIsNeedKeyBindParam] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const sourceTextArea = useRef(null) as unknown as React.MutableRefObject<HTMLTextAreaElement>;
  const targetTextarea = useRef(null) as unknown as React.MutableRefObject<HTMLTextAreaElement>;
  const sourceInput = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
  const targetInput = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
  const fileRead = (
    file: File,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const fr = new FileReader();

    fr.onload = function(e) {
      setter((e.target?.result as string) || '');
      makeNewVtubeJson();
    };
    fr.readAsText(file);

    if (targetInput.current.files?.[0]?.name) {
      setSourceFileName(targetInput.current.files[0].name);
    }
  }
  const makeNewVtubeJson = (options: any = {}) => {
    try {
      if (
        !sourceTextArea.current?.value ||
        !targetTextarea.current?.value
      ) {
        setResult('');
        setIsCompleted(false);

        return;
      }

      const sourceValue = sourceTextArea.current.value;
      const targetValue = targetTextarea.current.value;
      const sourceJSON = JSON.parse(sourceValue);
      const targetJSON = JSON.parse(targetValue);
      const isReplaceOnly = (options.isStaticReplace ?? isStaticReplace);

      if (isReplaceOnly) {
        // ! JSON.parseをすると小数点が削れたり、繰り上がったりするので文字列として処理する
        // "Name": "**********",
        // "ModelID": "**********",
        // "FileReferences": {
        //     "Icon": "**********",
        //     "Model": "**********.model3.json",
        //     "IdleAnimation": "**********",
        //     "IdleAnimationWhenTrackingLost": "**********"
        // },

        if (/\\/.test(sourceValue + targetValue)) {
          setResult(`申し訳ございません。現在のバージョンでは「\\」が含まれているJSONをサポートしていません。`);

          return;
        }

        const patterns = [
          [new RegExp(`"Icon"?\\s*:\\s*"${sourceJSON.FileReferences.Icon}"`, 'um'), `"Icon": "${targetJSON.FileReferences.Icon}"`],
          [new RegExp(`"Model"?\\s*:\\s*"${sourceJSON.FileReferences.Model}"`, 'um'), `"Model": "${targetJSON.FileReferences.Model}"`],
          [new RegExp(`"IdleAnimation"?\\s*:\\s*"${sourceJSON.FileReferences.IdleAnimation}"`, 'um'), `"IdleAnimation": "${targetJSON.FileReferences.IdleAnimation}"`],
          [new RegExp(`"IdleAnimationWhenTrackingLost"?\\s*:\\s*"${sourceJSON.FileReferences.IdleAnimationWhenTrackingLost}"`, 'um'), `"IdleAnimationWhenTrackingLost": "${targetJSON.FileReferences.IdleAnimationWhenTrackingLost}"`],
          [new RegExp(`"ModelID"?\\s*:\\s*"${sourceJSON.ModelID}"`, 'um'), `"ModelID": "${targetJSON.ModelID}"`],
          [new RegExp(`"Name"?\\s*:\\s*"${sourceJSON.Name}"`, 'um'), `"Name": "${targetJSON.Name}"`],
        ] as [RegExp, string][];
        let resultJSON = sourceValue;

        for (const [regExp, replacement] of patterns) {
          resultJSON = resultJSON.replace(regExp, replacement);
        }

        setResult(resultJSON);
      } else {
        const useSrcVTS = (options.isNeedVTSParam ?? isNeedVTSParam);
        const useSrcHotKey = (options.isNeedKeyBindParam ?? isNeedKeyBindParam);
        const resultJSON = useSrcVTS ? sourceJSON : targetJSON;

        if (useSrcHotKey) {
          resultJSON.Hotkeys = sourceJSON.Hotkeys;
        } else {
          resultJSON.Hotkeys = targetJSON.Hotkeys;
        }

        resultJSON.Name = targetJSON.Name;
        resultJSON.ModelID = targetJSON.ModelID;
        resultJSON.FileReferences = targetJSON.FileReferences;

        setResult(JSON.stringify(resultJSON, undefined, '    '));
      }

      setIsCompleted(true);
    } catch (e) {
      setResult('ERROR');
      console.log(e);
    }
  }
  const onchange = (setter: React.Dispatch<React.SetStateAction<string>>) => function (e) {
    if (!e.target.files) {
      return;
    }

    for (const file of e.target.files) {
      fileRead(file, setter);
    }
  } as ChangeEventHandler<HTMLInputElement>
  const ondrop = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    ref: React.MutableRefObject<any>
  ) => function (e) {
    e.preventDefault();
    e.stopPropagation();

    ref.current.files = e.dataTransfer.files;

    for (const file of e.dataTransfer.files) {
      fileRead(file, setter);
    }

    (e.target as HTMLTextAreaElement).style.background = '';
  } as DragEventHandler<HTMLTextAreaElement>;
  const ondragover = function(e) {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLTextAreaElement).style.background = '#7fbfbf';
  } as DragEventHandler<HTMLTextAreaElement>;
  const ondragleave = function(e) {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLTextAreaElement).style.background = '';
  } as DragEventHandler<HTMLTextAreaElement>;
  const onfocus = function (e) {
    e.target.select();
  } as FocusEventHandler<HTMLTextAreaElement>
  const download = (() => {
    const a = document.createElement('a');
    const {body} = document;

    return function () {
      const blob = new Blob([result], {
        type: 'application/json',
      });

      a.href = URL.createObjectURL(blob);
      a.download = sourceFileName;
      body.append(a);
      a.click();
      a.remove();
    };
  })();

  return (
    <>
      <div className={styles.filter}>
        <ul className={styles.list}>
          <li className={styles.listitem}>
            <label>
              <input
                type="checkbox"
                checked={isStaticReplace}
                onChange={() => {
                  setIsNeedVTSParam(true);
                  setIsNeedKeyBindParam(true);
                  setIsStaticReplace(!isStaticReplace);
                  makeNewVtubeJson({
                    isStaticReplace: !isStaticReplace,
                    isNeedVTSParam: true,
                    isNeedKeyBindParam: true,
                  });
                }}
              />
              <span className={styles.checkboxLabel}>{t('静的な置換のみを行う')}</span>
            </label>
          </li>
          <li className={styles.listitem}>
            <label>
              <input
                type="checkbox"
                checked={isNeedKeyBindParam}
                onChange={() => {
                  setIsNeedKeyBindParam(!isNeedKeyBindParam);
                  makeNewVtubeJson({
                    isStaticReplace,
                    isNeedVTSParam,
                    isNeedKeyBindParam: !isNeedKeyBindParam,
                  });
                }}
                disabled={isStaticReplace}
              />
              <span className={styles.checkboxLabel}>{t('キーバインド')}</span>
            </label>
          </li>
          <li className={styles.listitem}>
            <label>
              <input
                type="checkbox"
                checked={isNeedVTSParam}
                onChange={() => {
                  setIsNeedVTSParam(!isNeedVTSParam);
                  makeNewVtubeJson({
                    isStaticReplace,
                    isNeedVTSParam: !isNeedVTSParam,
                    isNeedKeyBindParam,
                  });
                }}
                disabled={isStaticReplace}
              />
              <span className={styles.checkboxLabel}>{t('VTSパラメータ')}</span>
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.wrap}>
        <div className={styles.col}>
          <label>
            <span id="label-source" className={styles.label}>{t('移植元.vtube.json')}</span>
            <textarea
              className={styles.textarea}
              ref={sourceTextArea}
              value={source}
              placeholder={t('ここにファイルをドロップしてください')}
              onDrop={ondrop(setSource, sourceInput)}
              onDragOver={ondragover}
              onDragLeave={ondragleave}
              onFocus={onfocus}
              readOnly
            />
          </label>
          <input
            type="file"
            ref={sourceInput}
            className={styles.input}
            accept="application/json"
            onChange={onchange(setSource)}
            aria-labelledby="label-source"
          />
        </div>
        <div className={styles.col}>
          <label>
            <span id="label-target" className={styles.label}>{t('移植先.vtube.json')}</span>
            <textarea
              className={styles.textarea}
              ref={targetTextarea}
              value={target}
              placeholder={t('ここにファイルをドロップしてください')}
              onDrop={ondrop(setTarget, targetInput)}
              onDragOver={ondragover}
              onDragLeave={ondragleave}
              onFocus={onfocus}
              readOnly
            />
          </label>
          <input
            type="file"
            ref={targetInput}
            className={styles.input}
            accept="application/json"
            onChange={onchange(setTarget)}
            aria-labelledby="label-target"
          />
        </div>
        <div className={styles.col}>
          <label>
            <span className={styles.label}>Result</span>
            <textarea
              className={styles.textarea}
              value={result}
              onFocus={onfocus}
              readOnly
            />
          </label>

          <button
            type="button"
            className={styles.download}
            onClick={download}
            disabled={!isCompleted}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}

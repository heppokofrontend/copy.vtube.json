import React, { useState, useRef, ChangeEventHandler, DragEventHandler } from 'react';
import styles from './UI.module.scss';
import {useTranslation} from 'react-i18next';

export function UI() {
  const { t } = useTranslation();
  const [source, setSource] = useState('');
  const [sourceFileName, setSourceFileName] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');
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
    setSourceFileName(file.name);
  }
  const makeNewVtubeJson = () => {
    try {
      if (
        !sourceTextArea.current?.value ||
        !targetTextarea.current?.value
      ) {
        setResult('');
        setIsCompleted(false);

        return;
      }

      const sourceJson = JSON.parse(sourceTextArea.current.value);
      const targetJSON = JSON.parse(targetTextarea.current.value);

      sourceJson.Name = targetJSON.Name;
      sourceJson.ModelID = targetJSON.ModelID;
      sourceJson.FileReferences = targetJSON.FileReferences;

      setResult(JSON.stringify(sourceJson, undefined, '  '));
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
    <div className={styles.wrap}>
      <div className={styles.col}>
        <label>
          <span id="label-source" className={styles.label}>{t('移植元.vtube.json')}</span>
          <textarea
            className={styles.textarea}
            ref={sourceTextArea}
            value={source}
            onDrop={ondrop(setSource, sourceInput)}
            onDragOver={ondragover}
            onDragLeave={ondragleave}
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
            onDrop={ondrop(setTarget, targetInput)}
            onDragOver={ondragover}
            onDragLeave={ondragleave}
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
  );
}

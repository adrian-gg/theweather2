import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { SettingsContext } from '../../context/SettingsContext';
import calculateAnimationTextStyles from '../../utils/calculateAnimationTextStyles';

type TextProps = {
  text: string;
  animationDelay: number;
  order: number;
  reloadEffect: boolean;
} & (
  | { alignText?: never } // For LineTextProps
  | { alignText: 'l' | 'r' } // For MultilineTextProps
);

export interface AnimateTextEffectProps {
  text: string;
  animationDelay?: number;
  order?: number;
  multiline?: boolean;
  alignText?: 'l' | 'r';
}

function LineText({
  text, // Text to animate
  animationDelay,
  order,
  reloadEffect,
}: TextProps) {
  const wordLength = text.length;
  const animationStyles = calculateAnimationTextStyles(
    wordLength,
    order,
    animationDelay
  );

  return (
    <span className="scrabletext" style={{ width: `${wordLength}ch` }}>
      <span
        className="scrabletext__text"
        style={reloadEffect ? animationStyles : {}}
      >
        {text}
      </span>
    </span>
  );
}

function MultilineText({
  text, // Text to animate
  animationDelay,
  order,
  alignText,
  reloadEffect,
}: TextProps) {
  const words = text.split(' ');

  return words.map((word, index) => {
    const wordLength = word.length + 1;

    const delayPreviousWords = words
      .slice(0, index)
      .reduce((acc, w) => acc + w.length + 1, 0);

    const animationStyles = calculateAnimationTextStyles(
      wordLength,
      order,
      animationDelay,
      delayPreviousWords
    );

    return (
      <span
        key={`${text}_${word}`}
        className="scrabletext"
        style={{
          width: `${word.length}ch`,
          margin: alignText === 'r' ? '0 0 0 1ch' : '0 1ch 0 0',
        }}
      >
        <span
          className="scrabletext__text"
          style={reloadEffect ? animationStyles : {}}
        >
          {word}
        </span>
      </span>
    );
  });
}

function AnimateTextEffect({
  text, // Text to animate
  animationDelay = 0,
  order = 0,
  multiline = false,
  alignText = 'l',
}: AnimateTextEffectProps) {
  const { currentLanguage, getTranslation } = useContext(LanguageContext);
  const { isAnimationEnabled } = useContext(SettingsContext);
  const [reloadEffect, setReloadEffect] = useState(false);

  useEffect(() => {
    if (text && isAnimationEnabled) {
      setTimeout(() => setReloadEffect(true), 80);
    }
    return () => setReloadEffect(false);
  }, [text, currentLanguage, isAnimationEnabled]);

  if (!text || !isAnimationEnabled) return <>{getTranslation(text)}</>;

  return multiline ? (
    <MultilineText
      text={getTranslation(text)}
      animationDelay={animationDelay}
      order={order}
      alignText={alignText}
      reloadEffect={reloadEffect}
    />
  ) : (
    <LineText
      text={getTranslation(text)}
      animationDelay={animationDelay}
      order={order}
      reloadEffect={reloadEffect}
    />
  );
}

export default AnimateTextEffect;

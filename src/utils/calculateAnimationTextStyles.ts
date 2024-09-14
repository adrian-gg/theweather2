const ANIMATION_DURATION: number = 300; // 0.3s
const ANIMATION_DELAY: number = 500; // 0.5s
const ANIMATION_DURATION_LETTER: number = 40; // 0.04s

/*
 * Calculates the CSS styles for animating a text typing effect based on the length
 * of the word and order of appearance.
 */
const calculateAnimationTextStyles = (
  wordLength: number,
  order: number, // The order in which the word appears.
  animationDelay: number,
  delayPreviousWords: number = 0 // The cumulative delay of the previous words (optional).
) => {
  const timeWord =
    ANIMATION_DURATION !== 0
      ? ANIMATION_DURATION / 1000
      : (ANIMATION_DURATION_LETTER * wordLength) / 1000;

  // Calculate the total delay before the animation starts:
  // This includes a base delay between words, the specific animation delay passed in,
  // and any delay from previous words
  const delayWord =
    (ANIMATION_DELAY * order +
      animationDelay +
      ANIMATION_DURATION_LETTER * delayPreviousWords) /
    1000;

  return {
    width: `${wordLength}ch`, // Set the width to the number of characters ('ch' = character width unit)
    animation: `typing-text-effect ${timeWord}s steps(${wordLength}) ${delayWord}s backwards`,
  };
};

export default calculateAnimationTextStyles;

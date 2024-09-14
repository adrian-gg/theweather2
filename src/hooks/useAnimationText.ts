import { useCallback, useState } from 'react';

function useAnimationText() {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const toggleAnimation = useCallback(() => {
    setIsAnimationEnabled((prevState) => !prevState);
  }, []);

  return {
    isAnimationEnabled,
    toggleAnimation,
  };
}

export default useAnimationText;

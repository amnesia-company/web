import { useCopyHint } from 'features/copyButton';
import { copyClickHandler } from './copyClickHandler';

/**
 * Combines server address copy logic with hint visibility management.
 *
 * @param text - The string to be written to the clipboard on copy.
 * @returns `handleCopy` — click handler; `hintVisible` — whether to show
 *          the hint; `hintKey` — key to force hint remount.
 */
export function useHandleCopy(text: string) {
  const { visible: hintVisible, show: showHint, key: hintKey } = useCopyHint();

  const handleCopy = () => {
    copyClickHandler(text).then(showHint);
  };

  return { handleCopy, hintVisible, hintKey };
}

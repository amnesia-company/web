import { useState, useCallback, useRef } from 'react';

/**
 * Manages the visibility state of a transient copy-confirmation hint.
 *
 * Calling `show` makes the hint visible and starts a timer to hide it
 * after `duration` ms. Each call increments `key` so the caller can
 * remount the hint element and restart its CSS animation even if the
 * hint is already visible.
 *
 * @param duration - How long (ms) to keep the hint visible. Defaults to 2000.
 * @returns `visible` — whether to render the hint; `show` — trigger function;
 *          `key` — incrementing value to force remount.
 */
export function useCopyHint(duration = 2000) {
  const [key, setKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback(() => {
    setKey((k) => k + 1);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), duration);
  }, [duration]);

  return { visible, show, key };
}

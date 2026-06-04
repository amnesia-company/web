import { renderHook, act } from '@testing-library/react';
import { useCopyHint } from './useCopyHint';

describe('useCopyHint — manages copy-confirmation hint visibility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with hint hidden', () => {
    const { result } = renderHook(() => useCopyHint());
    expect(result.current.visible).toBe(false);
  });

  it('show makes the hint visible', () => {
    const { result } = renderHook(() => useCopyHint());
    act(() => result.current.show());
    expect(result.current.visible).toBe(true);
  });

  it('hint hides after the duration expires', () => {
    const { result } = renderHook(() => useCopyHint(1000));
    act(() => result.current.show());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.visible).toBe(false);
  });

  it('increments key on each show call to force remount', () => {
    const { result } = renderHook(() => useCopyHint());
    const initial = result.current.key;
    act(() => result.current.show());
    act(() => result.current.show());
    expect(result.current.key).toBe(initial + 2);
  });

  it('calling show again resets the hide timer', () => {
    const { result } = renderHook(() => useCopyHint(1000));
    act(() => result.current.show());
    act(() => vi.advanceTimersByTime(800));
    act(() => result.current.show());
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.visible).toBe(true);
  });
});

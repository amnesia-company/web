import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import { useWindowWidth } from './useWindowWidth';

describe('useWindowWidth — returns browser window width', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('returns the initial window width', () => {
    const { result } = renderHook(() => useWindowWidth());
    expect(result.current).toBe(1024);
  });

  it('updates width on resize', () => {
    const { result } = renderHook(() => useWindowWidth());
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe(1200);
  });
});

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMousePosition } from './useMousePosition';

describe('useMousePosition — tracks mouse cursor position', () => {
  it('returns initial position { x: 0, y: 0 }', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('updates position on mousemove event', () => {
    const { result } = renderHook(() => useMousePosition());
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
    });
    expect(result.current).toEqual({ x: 100, y: 200 });
  });
});

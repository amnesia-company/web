import { useEffect, useState } from 'react'

/**
 * Mouse cursor coordinates relative to the viewport.
 *
 * @property x - Horizontal position in pixels.
 * @property y - Vertical position in pixels.
 */
interface IMousePosition {
    x: number
    y: number
}

/**
 * Tracks the current mouse cursor position on the page.
 * Subscribes to the mousemove event and unsubscribes on unmount.
 *
 * @returns An object with the cursor coordinates { x, y } relative to the viewport.
 */
export function useMousePosition() {
    const [position, setPosition] = useState<IMousePosition>({ x: 0, y: 0 })

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY })
        }
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, [])

    return position;
}

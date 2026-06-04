import { startTransition, useEffect, useState } from 'react'

/**
 * Returns the current browser window width in pixels.
 * Subscribes to the resize event and unsubscribes on unmount.
 *
 * @returns The current viewport width in pixels.
 */
export function useWindowWidth() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handler = () => startTransition(() => setWidth(window.innerWidth));
        handler();

        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [])

    return width;
}

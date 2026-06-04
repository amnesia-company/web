/**
 * Writes `text` to the system clipboard via the Clipboard API.
 *
 * @param text - The string to copy.
 * @returns A promise that resolves when the text has been written.
 */
export function copyClickHandler(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

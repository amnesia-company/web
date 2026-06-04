import { copyClickHandler } from './copyClickHandler';

describe('copyClickHandler — writes text to the system clipboard', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('calls navigator.clipboard.writeText with the provided text', async () => {
    await copyClickHandler('amnesia.ru');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('amnesia.ru');
  });

  it('returns the promise from navigator.clipboard.writeText', () => {
    const promise = Promise.resolve();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockReturnValue(promise) },
      configurable: true,
    });
    expect(copyClickHandler('test')).toBe(promise);
  });
});

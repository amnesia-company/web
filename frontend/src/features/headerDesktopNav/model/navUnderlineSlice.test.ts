import {
  navUnderlineSlice,
  setNavUnderlinePosition,
  setNavUnderlineAppeared,
} from './navUnderlineSlice';

const reducer = navUnderlineSlice.reducer;

describe('navUnderlineSlice — manages animated underline position for the active desktop nav link', () => {
  it('returns initial state with position null and hasAppeared false', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ position: null, hasAppeared: false });
  });

  it('setNavUnderlinePosition stores the given left and width values', () => {
    const pos = { left: 10, width: 100 };
    const state = reducer(undefined, setNavUnderlinePosition(pos));
    expect(state.position).toEqual(pos);
  });

  it('setNavUnderlinePosition(null) clears position and resets hasAppeared to false', () => {
    let state = reducer(undefined, setNavUnderlinePosition({ left: 10, width: 100 }));
    state = reducer(state, setNavUnderlineAppeared());
    state = reducer(state, setNavUnderlinePosition(null));
    expect(state.position).toBeNull();
    expect(state.hasAppeared).toBe(false);
  });

  it('setNavUnderlinePosition with a new value does not reset hasAppeared', () => {
    let state = reducer(undefined, setNavUnderlineAppeared());
    state = reducer(state, setNavUnderlinePosition({ left: 20, width: 80 }));
    expect(state.hasAppeared).toBe(true);
  });

  it('setNavUnderlineAppeared sets hasAppeared to true', () => {
    const state = reducer(undefined, setNavUnderlineAppeared());
    expect(state.hasAppeared).toBe(true);
  });
});

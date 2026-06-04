import { userSlice, setUserInfo } from './userSlice';

const reducer = userSlice.reducer;

const initialState = {
  id: 0,
  name: '',
  rating: 0,
  avatarUrl: '',
  backgroundUrl: '',
  status: '',
  borderAvatarType: '',
  createdAt: '',
};

describe('userSlice — stores the authenticated user profile', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('setUserInfo updates only the provided fields and leaves the rest unchanged', () => {
    const state = reducer(
      { ...initialState, name: 'Alice', rating: 5 },
      setUserInfo({ name: 'Bob' })
    );
    expect(state.name).toBe('Bob');
    expect(state.rating).toBe(5);
  });

  it('setUserInfo with an empty object does not change the state', () => {
    const existing = { ...initialState, name: 'Alice' };
    const state = reducer(existing, setUserInfo({}));
    expect(state).toEqual(existing);
  });
});

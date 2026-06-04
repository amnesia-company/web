import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/rootReducer';
import { selectUserInfo } from './selectors';
import { setUserInfo } from './userSlice';

describe('selectUserInfo — memoized selector for the user profile', () => {
  it('returns the full user profile object from Redux state', () => {
    const store = configureStore({ reducer: rootReducer });
    store.dispatch(
      setUserInfo({
        id: 42,
        name: 'Alice',
        rating: 10,
        avatarUrl: '/avatar.png',
        backgroundUrl: '/bg.png',
        status: 'online',
        borderAvatarType: 'gold',
        createdAt: '2024-01-01T00:00:00.000Z',
      })
    );
    const result = selectUserInfo(store.getState());
    expect(result).toEqual({
      id: 42,
      name: 'Alice',
      rating: 10,
      avatarUrl: '/avatar.png',
      backgroundUrl: '/bg.png',
      status: 'online',
      borderAvatarType: 'gold',
      createdAt: '2024-01-01T00:00:00.000Z',
    });
  });
});

import type { RootState } from 'app/store';
import { createSelector } from '@reduxjs/toolkit';

const selectUser = (state: RootState) => state.user;

/** Memoized selector that returns the full user profile object. */
export const selectUserInfo = createSelector([selectUser], (user) => {
  return {
    id: user.id,
    name: user.name,
    rating: user.rating,
    avatarUrl: user.avatarUrl,
    backgroundUrl: user.backgroundUrl,
    status: user.status,
    borderAvatarType: user.borderAvatarType,
    createdAt: user.createdAt,
  };
});

import { createSelector } from 'reselect';

export const AppSelector = (state) => state.get('app');

export const getSpacexListSelector = createSelector(
  AppSelector,
  (app) => app.get('spacexList'),
);

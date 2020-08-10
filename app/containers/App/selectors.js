import { createSelector } from 'reselect';

export const AppSelector = (state) => state.get('app');

export const getSpacexListSelector = createSelector(
  AppSelector,
  (app) => app.get('spacexList'),
);

export const getLoadingSelector = createSelector(
  AppSelector,
  (app) => app.get('isLoading'),
);

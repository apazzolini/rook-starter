export const initialState = {};

export const reducers = {

  'random/load': (state, action) => state,

  'random/loadOk': (state, action) => state.merge({
    ...action.result,
    loadedOnServer: action.isOnServer
  }),

  'random/loadFail': (state, action) => state

};

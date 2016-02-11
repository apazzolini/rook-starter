// Initial State ---------------------------------------------------------------

export const initialState = {};

// Reducers --------------------------------------------------------------------

export const reducers = {

  'random/load': (state, action) => state,

  'random/loadOk': (state, action) => state.merge({
    ...action.result
  }),

  'random/loadFail': (state, action) => state

};

// Action Creators -------------------------------------------------------------

export const actions = {

  loadNewRandom: () => ({
    type: 'random/load',
    apiRequest: (api) => api.get(`/random`)
  })

};


// Selectors -------------------------------------------------------------------

export const selectors = {

  currentNumber: (globalState) => globalState.random.get('number')

};

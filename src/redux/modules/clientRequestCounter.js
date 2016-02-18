export const initialState = {
  count: 0
};

export const reducers = {

  'random/loadOk': (state, action) => {
    if (action.isOnServer) {
      return state;
    }

    return state.merge({
      count: state.get('count') + 1
    });
  }

};

// You must export your Redux modules keyed by their reducer name.
export default {
  random: require('./random')
};

// The Rook renderer will call this method when setting up the store to allow you
// to set the initial Redux state based on properties specific to this request,
// such as a cookie or session information. Modify the initialState object as you
// see fit.
export const updateInitialServerState = (request, initialState) => {};

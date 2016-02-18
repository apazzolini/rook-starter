export default {

  loadNewRandom: () => ({
    type: 'random/load',
    apiRequest: (api) => api.get(`/random`),
    isOnServer: __SERVER__
  })

};

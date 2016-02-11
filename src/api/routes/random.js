export const routes = [
  {
    path: '/random', method: 'GET', handler: async (request, reply) => {
      return {
        number: Math.random(),
        time: new Date()
      };
    }
  }
];

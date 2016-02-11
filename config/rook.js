const projectRoot = process.cwd();
const sourceRoot = `${projectRoot}/src`;

module.exports = {
  verbose: false,

  routes: sourceRoot + '/views/routes.js',

  apiRoutes: sourceRoot + '/api/routes',

  hapiExtensions: sourceRoot + '/api/extensions',
  
  html: {
    head: sourceRoot + '/views/_app/Head.js'
  }
};

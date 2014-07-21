CWB.routes = SC.Object.create({
  login: function(params) {
    CWB.statechart.gotoState('loginState');
  },

  files: function(params) {
    CWB.statechart.gotoState('readyState');
  },

  setRoute: function(route) {
    SC.routes.set('informLocation', route);
  },

  initRoutes: function() {
    SC.routes.add('login', CWB, CWB.login);
    SC.routes.add('files', CWB, CWB.files);
    SC.routes.add('projects', CWB, CWB.projects);
  }
});

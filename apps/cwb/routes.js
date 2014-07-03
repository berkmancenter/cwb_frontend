CWB.routes = SC.Object.create({
  login: function(params) {
    CWB.statechart.gotoState('loginState');
  },

  setRoute: function(route) {
    SC.routes.set('informLocation', route);
  },

  initRoutes: function() {
    SC.routes.add('login', CWB, CWB.login);
  }
});

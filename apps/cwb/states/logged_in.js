CWB.LOGGED_IN = SC.State.extend({

    initialSubstate: 'MANAGING_PROJECTS',

    MANAGING_PROJECTS: SC.State.plugin('CWB.MANAGING_PROJECTS'),

    enterState: function(context) {
        CWB.loginController.sessionToken = context.sessionToken;
    
        var allProjects = CWB.store.find(CWB.PROJECTS_QUERY);
        CWB.projectsController.set('content', allProjects);
        CWB.projectsController.selectObject(allProjects.firstObject());
    
//        CWB.SELECTED_FILES = CWB.store.find(CWB.SELECTED_FILES_QUERY);
    
        for (var i = 1; i <= 6; i++) {
            CWB.TERMS_IN_VOCABULARY[i] = CWB.store.find(CWB.TERMS_IN_VOCABULARY_QUERIES[i]);
        }
    },

  exitState: function() {},

  logout: function() {
    // send logout request to the backend, wait for response
    SC.Request.getUrl('/logout?token=' + CWB.loginController.sessionToken)
      .notify(this, 'didCompleteLogout').json().send();
  },

  notImplemented: function() {
    alert("This functionality has not yet been implemented.");
  },

  didCompleteLogout: function(response) {
    if (SC.ok(response)) {
      CWB.setPath('loginPage.loginPane.boxView.password.field.value', '');
      this.gotoState('LOGGED_OUT');
    } else {
      SC.AlertPane.error('Sorry. We were unable to process your request.')
    }
  }
});

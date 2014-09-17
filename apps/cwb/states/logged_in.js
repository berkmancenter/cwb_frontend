CWB.LOGGED_IN = SC.State.extend({

  initialSubstate: 'MANAGING_PROJECTS',

  MANAGING_PROJECTS: SC.State.plugin('CWB.MANAGING_PROJECTS'),
  MANAGING_FILES: SC.State.plugin('CWB.MANAGING_FILES'),

  enterState: function(context) {
      CWB.loginController.sessionToken = context.sessionToken;
  },

  exitState: function() {},

  logout: function() {
    // send logout request to the backend, wait for response
    SC.Request.getUrl('/logout?token=' + CWB.loginController.sessionToken)
      .notify(this, 'didCompleteLogout').json().send();
  },

  gotoFiles: function() {
    this.gotoState('MANAGING_FILES');
  },

  gotoProjects: function() {
    this.gotoState('MANAGING_PROJECTS');
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

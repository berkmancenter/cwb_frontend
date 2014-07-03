CWB.LOGGED_IN = SC.State.extend({

  enterState: function(context) {
    CWB.loginController.sessionToken = context.sessionToken;

    // TODO just showing the mainPane as a placeholder for now
    CWB.getPath('mainPage.mainPane').append();
    CWB.routes.setRoute('');
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

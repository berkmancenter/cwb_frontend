CWB.LOGGED_OUT = SC.State.extend({
  enterState: function() {
    CWB.getPath('loginPage.loginPane').append();
    CWB.getPath('loginPage.loginPane.boxView.username.field').becomeFirstResponder();
    CWB.routes.setRoute('login');
  },

  exitState: function() {
    CWB.getPath('loginPage.loginPane').remove();
  },

  authenticate: function() {
    var username = CWB.getPath('loginPage.loginPane.boxView.username.field.value');
    var password = CWB.getPath('loginPage.loginPane.boxView.password.field.value');
    var authenticated = false;

    // send auth request to backend
    SC.Request.postUrl('/sessions', {username: username, password: password})
      .notify(this, 'didCompleteAuthentication').json().send();
  },

  didCompleteAuthentication: function(response) {
    if (SC.ok(response)) {
        var body = response.body();
        this.gotoState('LOGGED_IN',
            {
                sessionToken: body.token,
                id: body.id,
                name: body.name,
                username: body.username,
                email: body.email,
                isAdmin: body.isAdmin
            });
    } else if (response.status == 401) {
      SC.AlertPane.error('Incorrect username or password. Please try again.');
    } else {
      SC.AlertPane.error('Sorry. We were unable to process your request.')
    }
  }
});

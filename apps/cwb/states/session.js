CWB.SESSION = SC.State.extend({
  enterState: function() {
    SC.Request.getUrl('/authenticated')
      .notify(this, 'didCompleteAuthentication').json().send();
  },

  didCompleteAuthentication: function(response) {
    if (SC.ok(response) && response.body().authenticated) {
      this.gotoState('LOGGED_IN', {sessionToken: response.body().token});
    } else {
      this.gotoState('LOGGED_OUT');
    }
  },

  exitState: function() {},
});

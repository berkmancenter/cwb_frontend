CWB.SESSION = SC.State.extend({
    enterState: function() {
        SC.Request.getUrl('/authenticated')
            .notify(this, 'didCompleteAuthentication').json().send();
    },

    didCompleteAuthentication: function(response) {
        if (SC.ok(response) && response.body().authenticated) {
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
        } else {
            this.gotoState('LOGGED_OUT');
        }
    },

    exitState: function() {}
});

CWB.MANAGING_ACCOUNTS = SC.State.extend({
    enterState: function() {
        CWB.accountsController.get('content').refresh();

        CWB.getPath('mainPage.accountsPane').append();
        CWB.routes.setRoute('accounts');
    },

    exitState: function() {
        CWB.getPath('mainPage.accountsPane').remove();
    },

    createAccount: function() {
        var that = this;
        CWB.accountFormController.clearAccount();
        CWB.accountFormController.set('requirePassword', true);
        CWB.accountFormController.showAccountForm(function(result) {
            if (result) {
                // user clicked save
                CWB.mainPage.set('accountFormMessage', 'Saving account...');
                CWB.accountFormController.set('enableSaveButton', NO);

                var editedAccount = CWB.accountFormController.getEditedAccount();
                SC.Request.postUrl("/accounts", {
                    'name': editedAccount.name,
                    'username': editedAccount.username,
                    'email': editedAccount.email,
                    'password': editedAccount.password1,
                    'account_manager': editedAccount.account_manager
                })
                .notify(this, function(response) {
                    if (SC.ok(response)) {
                        CWB.mainPage.set('accountFormMessage', '');
                        CWB.mainPage.set('accountFormIsVisible', NO);
                        CWB.accountFormController.clearAccount();
                        CWB.accountsController.selectObject(null);
                        that.reenter();
                    } else {
                        var error = null; // TODO pull error from response?
                        CWB.mainPage.set('accountFormMessage', error || 'Unable to save account.');
                        CWB.accountFormController.set('enableSaveButton', YES);
                    }
                }).json().send();
            } else {
                // user canceled
                CWB.mainPage.set('accountFormMessage', '');
                CWB.accountFormController.clearAccount();
            }
        });
    },

    editAccount: function() {
        var accountID = CWB.accountController.get('id');
        var account = CWB.store.find(CWB.Account, accountID);

        CWB.accountFormController.setupAccount(account);
        CWB.accountFormController.showAccountForm(function(result) {
            if (result) {
                // user clicked save
                CWB.mainPage.set('accountFormMessage', 'Saving account...');
                CWB.accountFormController.set('enableSaveButton', NO);

                var editedAccount = CWB.accountFormController.getEditedAccount();
                SC.Request.putUrl("/accounts/" + encodeURIComponent(accountID), {
                    'name': editedAccount.name,
                    'username': editedAccount.username,
                    'email': editedAccount.email,
                    'password': editedAccount.password1,
                    'account_manager': editedAccount.account_manager
                })
                .notify(this, function(response) {
                    if (SC.ok(response)) {
                        CWB.accountFormController.updateAccountRecord();
                        CWB.mainPage.set('accountFormMessage', '');
                        CWB.mainPage.set('accountFormIsVisible', NO);
                        CWB.accountFormController.clearAccount();
                    } else {
                        var error = null; // TODO pull error from response?
                        CWB.mainPage.set('accountFormMessage', error || 'Unable to save account.');
                        CWB.accountFormController.set('enableSaveButton', YES);
                    }
                }).json().send();
            } else {
                // user canceled
                CWB.mainPage.set('accountFormMessage', '');
                CWB.accountFormController.clearAccount();
            }
        });
    },

    showRemoveAccountAlert: function() {
        SC.AlertPane.warn({
            message: "Are you sure?",
            buttons: [
                { title: "Remove", action: "removeAccount", target: this },
                { title: "Cancel" },
            ]
        });
    },

    removeAccount: function() {
        var accountID = CWB.accountController.get('id');
        var account = CWB.store.find(CWB.Account, accountID);
        SC.Request.deleteUrl("/accounts/" + encodeURIComponent(accountID))
        .notify(this, function(response, account) {
            if (SC.ok(response)) {
                account.destroy();
                CWB.accountsController.set('selection', null);
            } else {
                SC.AlertPane.error('Sorry. We were unable to process your request.');
            }
        }, account).json().send();
    }
});

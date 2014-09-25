sc_require('core');

CWB.loginController = SC.ObjectController.create({
    id: '',
    username: '',
    password: '',
    name: '',
    email: '',
    isAdmin: NO,
    errorMessage: '',
    isLoggingIn: NO,
    sessionToken: false,
    mainPane: 'mainPage.mainPane',

    showEditProfilePane: function() {
        var accountID = this.get('id');
        var account = CWB.store.find(CWB.Account, accountID);

        if (account) {
            CWB.accountFormController.setupAccount(account);
            CWB.accountFormController.set('displayAdminCheckbox', false);
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
                    .notify(this, function(response, editedAccount) {
                        if (SC.ok(response)) {
                            CWB.accountFormController.updateAccountRecord();
                            CWB.loginController.copyProfileToController(editedAccount);
                            CWB.mainPage.set('accountFormMessage', '');
                            CWB.mainPage.set('accountFormIsVisible', NO);
                            CWB.accountFormController.clearAccount();
                        } else {
                            var error = null; // TODO pull error from response?
                            CWB.mainPage.set('accountFormMessage', error || 'Unable to save account.');
                            CWB.accountFormController.set('enableSaveButton', YES);
                        }
                    }, editedAccount).json().send();
                } else {
                    // user canceled
                    CWB.mainPage.set('accountFormMessage', '');
                    CWB.accountFormController.clearAccount();
                }
            });
        }
    },

    copyProfileToController: function(profile) {
        this.set('name', profile.name);
        this.set('username', profile.username);
        this.set('email', profile.email);
    }
});

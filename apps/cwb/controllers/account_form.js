sc_require('core');

CWB.accountFormController = SC.ObjectController.create({

    name: null,
    username: null,
    email: null,
    password1: null,
    password2: null,
    account_manager: null,

    accountRecord: null,
    requirePassword: false,
    enableSaveButton: NO,
    displayAdminCheckbox: true,

    clearAccount: function() {
        this.set('name', '');
        this.set('username', '');
        this.set('email', '');
        this.set('password1', null);
        this.set('password2', null);
        this.set('account_manager', null);
        this.set('accountRecord', null);
        this.set('requirePassword', false);
        this.set('displayAdminCheckbox', true);
        CWB.mainPage.set('accountFormMessage', '');
    },

    setupAccount: function(account) {
        if (!!account.get) {
            this.set('name', account.get('name') || '');
            this.set('username', account.get('username') || '');
            this.set('email', account.get('email') || '');
            this.set('password1', account.get('password1') || '');
            this.set('password2', account.get('password2') || '');
            this.set('account_manager', account.get('isAdmin') || false);
            this.set('accountRecord', account);
        } else {
            this.set('name', account.name || '');
            this.set('username', account.username || '');
            this.set('email', account.email || '');
            this.set('password1', account.password1 || '');
            this.set('password2', account.password2 || '');
            this.set('account_manager', account.account_manager || false);
        }
    },

    getEditedAccount: function() {
        return {
            'name': this.get('name'),
            'username': this.get('username'),
            'email': this.get('email'),
            'password1': this.get('password1'),
            'password2': this.get('password2'),
            'account_manager': this.get('account_manager')
        };
    },

    updateAccountRecord: function() {
        this.get('accountRecord').set('name', this.get('name'));
        this.get('accountRecord').set('username', this.get('username'));
        this.get('accountRecord').set('email', this.get('email'));
        this.get('accountRecord').set('account_manager', this.get('account_manager'));
    },

    showAccountForm: function(callback) {
        CWB.mainPage.set('accountFormIsVisible', YES);
        CWB.mainPage.set('accountFormCallback', function (result) {
            if (callback !== null && callback !== undefined) {
                return callback(result);
            }
        });
    },

    haveValidPasswordChange: function() {
        if (!this.havePasswordEdits()) {
            CWB.mainPage.set('accountFormMessage', '');
            if (this.get('requirePassword')) {
                return false;
            } else {
                return true;
            }
        }

        if(this.get('password1') !== this.get('password2')) {
            CWB.mainPage.set('accountFormMessage', 'Passwords do not match');
            return false;
        } else {
            CWB.mainPage.set('accountFormMessage', '');
            return true;
        }
    },

    havePasswordEdits: function() {
        var considerPassword1 = this.get('password1') !== null && this.get('password1').length > 0;
        var considerPassword2 = this.get('password2') !== null && this.get('password2').length > 0;
        return considerPassword1 || considerPassword2;
    },

    accountDetailsDidChange: function() {
        if(!this.haveValidPasswordChange()) {
            this.set('enableSaveButton', NO);
            return;
        }

        if ((this.get('name') !== null && this.get('name').length > 0)
            && (this.get('username') !== null && this.get('username').length > 0)
            && (this.get('email') !== null && this.get('email').length > 0))
        {
            this.set('enableSaveButton', YES);
        } else {
            this.set('enableSaveButton', NO);
        }
    }.observes('name', 'username', 'email', 'password1', 'password2'),

});

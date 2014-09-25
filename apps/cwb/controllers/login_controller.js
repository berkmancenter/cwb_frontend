sc_require('core');

CWB.loginController = SC.ObjectController.create({
    id: '',
    username: '',
    password: '',
    errorMessage: '',
    isLoggingIn: NO,
    sessionToken: false,
    mainPane: 'mainPage.mainPane',

    name: '',
    email: '',
    isAdmin: NO,

    newName: null,
    newUsername: null,
    newEmail: null,
    newPassword1: null,
    newPassword2: null,

    enableProfileSaveButton: NO,
    savingProfileObject: null,

    showEditProfilePane: function() {
        CWB.loginController.resetNewProfile();
        
        CWB.mainPage.set('editProfilePaneIsVisible', YES);
        CWB.mainPage.set('editProfilePaneCallback', function (saved) {
            if (saved) {
                var newProfile = {
                    name: CWB.loginController.get('newName'),
                    username: CWB.loginController.get('newUsername'),
                    email: CWB.loginController.get('newEmail'),
                    password1: CWB.loginController.get('newPassword1'),
                    password2: CWB.loginController.get('newPassword2')
                };
                CWB.loginController.setSavingProfileObject(newProfile);
                SC.Request.putUrl("/accounts/" + CWB.loginController.get('id'), {
                    name: newProfile.name,
                    username:newProfile.username,
                    email:newProfile.email,
                    password:newProfile.password1
                }).notify(this, function(response) {
                        if (SC.ok(response)) {
                            CWB.loginController.savingProfileSuccess(newProfile);
                        } else {
                            CWB.loginController.savingProfileError();
                        }
                    }).json().send();
            } else {
                CWB.loginController.resetNewProfile();
            }
        });
    },

    savingProfileSuccess: function (profile) {
        CWB.mainPage.set('editProfilePaneIsVisible', NO);
        CWB.loginController.copyProfileToController(profile);
        CWB.loginController.resetNewProfile();
    },

    savingProfileError: function(error) {
        CWB.mainPage.set('editProfilePaneMessage', error || 'Unable to save profile.');
        this.set('enableProfileSaveButton', YES);
        this.set('savingProfileObject', null);
    },

    setSavingProfileObject: function(profile) {
        this.set('savingProfileObject', profile);
        CWB.mainPage.set('editProfilePaneMessage', 'Saving profile...');
        this.set('enableSaveButton', NO);
    },

    resetNewProfile: function() {
        this.set('newName', this.get('name'));
        this.set('newUsername', this.get('username'));
        this.set('newEmail', this.get('email'));
        this.set('newPassword1', null);
        this.set('newPassword2', null);
        this.set('savingProfileObject', null);
        CWB.mainPage.set('editProfilePaneMessage', '');
    },
    
    copyProfileToController: function(profile) {
        this.set('name', profile.name);
        this.set('username', profile.username);
        this.set('email', profile.email);
    },

    newProfileDetailsDidChange: function() {
        if(!this.haveValidPasswordChange()) {
            this.set('enableProfileSaveButton', NO);
            return;            
        }
        
        if (this.get('name') !== this.get('newName')
            || this.get('username') !== this.get('newUsername')
            || this.get('email') !== this.get('newEmail')
            || this.havePasswordEdits())
        {
            this.set('enableProfileSaveButton', YES);
        }
        else
        {
            this.set('enableProfileSaveButton', NO);
        }
    }.observes('newName', 'newUsername', 'newEmail', 'newPassword1', 'newPassword2'),

    havePasswordEdits: function() {
        var considerPassword1 = this.get('newPassword1') !== null && this.get('newPassword1').length > 0;
        var considerPassword2 = this.get('newPassword2') !== null && this.get('newPassword2').length > 0;
        return considerPassword1 || considerPassword2;
    },
    
    haveValidPasswordChange: function() {
        if (!this.havePasswordEdits()) {
            CWB.mainPage.set('editProfilePaneMessage', '');
            return true;
        }
        
        if(this.get('newPassword1') !== this.get('newPassword2')) {
            CWB.mainPage.set('editProfilePaneMessage', 'Passwords do not match');
            return false;
        } else {
            CWB.mainPage.set('editProfilePaneMessage', '');
            return true;
        }
    }
});

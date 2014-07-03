sc_require('core');

CWB.loginController = SC.ObjectController.create({
  username: '',
  password: '',
  errorMessage: '',
  isLoggingIn: NO,
  sessionToken: false,
  mainPane: 'mainPage.mainPane'
});

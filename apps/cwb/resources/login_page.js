// ==========================================================================
// Project:   CWB - loginPage
// ==========================================================================
/*globals CWB */

CWB.loginPage = SC.Page.design({
  loginPane: SC.MainPane.design({
    layout: { width: 360, height: 155, centerX: 0, centerY: 0 },
    classNames: ['login-pane'],
    childViews: 'boxView'.w(),

    boxView: SC.View.design({
      childViews: 'appTitle username password loginButton loadingImage errorMessage'.w(),

      appTitle: SC.LabelView.design({
        controlSize: SC.LARGE_CONTROL_SIZE,
        layout: { top: 17, centerX: 0, height: 30, width: 300 },
        fontWeight: SC.BOLD_WEIGHT,
        textAlign: SC.ALIGN_CENTER,
        value: "Curator's Workbench"
      }),

      username: SC.View.design({
        layout: { left: 17, right: 14, top: 47, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 77, height: 18, centerY: 0 },
          value: 'Username',
          textAlign: SC.ALIGN_RIGHT
        }),
        field: SC.TextFieldView.design({
          layout: { width: 230, height: 22, right: 3, centerY: 0 },
          valueBinding: 'CWB.loginController.username'
        })
      }), // username

      password: SC.View.design({
        layout: { left: 17, right: 14, top: 75, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 77, height: 18, centerY: 0 },
          value: 'Password',
          textAlign: SC.ALIGN_RIGHT
        }),
        field: SC.TextFieldView.design({
          layout: { width: 230, height: 22, right: 3, centerY: 0 },
          type: 'password',
          // TODO
          valueBinding: 'CWB.loginController.password'
        })
      }), // password

      loginButton: SC.ButtonView.design({
        layout: { height: 24, width: 80, bottom: 17, right: 17 },
        title: 'Log In',
        isDefault: YES,
        isEnabledBinding: SC.Binding.from("LoginSample.loginController.isLoggingIn")
          .bool().transform(function(value, isForward) { return !value; }),
        action: 'authenticate'
      }), // loginButton

      loadingImage: SC.ImageView.design({
        layout: { width: 16, height: 16, bottom: 20, right: 110 },
        value: sc_static('images/loading.png'),
        useImageCache: NO,
        isVisibleBinding: 'CWB.loginController.isLoggingIn'
      }), // loadingImage

      errorMessage: SC.LabelView.design({
        layout: { height: 40, width: 230, right: 120, bottom: 7 },
        classNames: ['error-message'],
        valueBinding: 'CWB.loginController.errorMessage'
      }), // errorMessage
    }) // boxView
  }) // loginPane
}); // loginPage

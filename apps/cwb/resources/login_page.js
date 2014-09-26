// ==========================================================================
// Project:   CWB - loginPage
// ==========================================================================
/*globals CWB */

CWB.loginPage = SC.Page.design({
  loginPane: SC.MainPane.design({
    classNames: ['login-page'],
    childViews: 'boxView footer'.w(),

    boxView: SC.View.design({
      classNames: ['login-box-view'],
      layout: { width: 360, height: 155, centerX: 0, centerY: -100 },
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
        useImageQueue: NO,
        isVisibleBinding: 'CWB.loginController.isLoggingIn'
      }), // loadingImage

      errorMessage: SC.LabelView.design({
        layout: { height: 40, width: 230, right: 120, bottom: 7 },
        classNames: ['error-message'],
        valueBinding: 'CWB.loginController.errorMessage'
      }) // errorMessage
    }), // boxView

    footer: SC.View.design({
      classNames: ['login-footer'],
      layout: { left: 20, right: 20, bottom: 20, height: 170 },
      childViews: 'divider logo credits'.w(),

      divider: SC.SeparatorView.design({
        classNames: ['footer-hr'],
        render: function (context) {
          context.push('<hr>');
        }
      }),

      logo: SC.ImageView.design({
        classNames: ['footer-logo'],
        layout: { centerX: 0, height: 46, width: 36, top: 32 },
        value: sc_static('images/LL_mini.png'),
      }),

      credits: SC.LabelView.design({
        classNames: ['footer-credits'],
        layout: { top: 112, width: 940, centerX: 0 },
        textAlign: SC.ALIGN_CENTER,
        render: function (context) {
          context.push("<div>Thanks to the generous support of the <a href='http://lab.library.harvard.edu/' target='_blank'>Harvard Library Lab</a>, the <a href='https://osc.hul.harvard.edu/' target='_blank'>Harvard Library Office for Scholarly Communication</a>,<br />the <a href='http://cyber.law.harvard.edu/' target='_blank'>Berkman Center for Internet & Society</a> and the <a href='http://www.arcadiafund.org.uk/' target='_blank'>Arcadia Fund</a>.</div>");
        }
      })
    })
  }), // loginPane
}); // loginPage

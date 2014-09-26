sc_require('core');
sc_require('views/popup_button_view');
sc_require('views/source_list_view');
sc_require('views/account_list_item_view');

CWB.AccountsScreen = SC.WorkspaceView.extend({
  topToolbar: SC.ToolbarView.extend({
    anchorLocation: SC.ANCHOR_TOP,
    childViews: 'projectsButton titleLabel'.w(),

    projectsButton: SC.ButtonView.extend({
      controlSize: SC.HUGE_CONTROL_SIZE,
      layout: { centerY: 0, height: 30, left: 12, width: 90 },
      themeName: 'point-left',
      //icon: sc_static('icons/project.png'),
      title: "Projects",
      action: 'gotoProjects'
    }),

    titleLabel: SC.LabelView.extend({
      controlSize: SC.LARGE_CONTROL_SIZE,
      layout: { centerY: 0, centerX: 0, height: 30, width: 400 },
      fontWeight: SC.BOLD_WEIGHT,
      textAlign: SC.ALIGN_CENTER,
      value: "CWB (v" + CWB.VERSION + ") - Accounts"
    })

  }),

  contentView: SC.SplitView.extend({
    dividerThickness: 1,
    layoutDirection: SC.LAYOUT_HORIZONTAL,
    childViews: ['accountList'],

    accountList: SC.WorkspaceView.extend(SC.SplitChild, {
      size: 840,
      topToolbar: SC.ToolbarView.extend({
					classNames: ['account-toolbar'],
          anchorLocation: SC.ANCHOR_TOP,
          childViews: 'nameHeader usernameHeader emailHeader adminHeader dateHeader sortSelect'.w(),

          nameHeader: SC.LabelView.extend({
							classNames: ['account-header', 'name'],
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              value: 'Name'
          }),

          usernameHeader: SC.LabelView.extend({
							classNames: ['account-header', 'username'],
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              value: 'Username'
          }),

          emailHeader: SC.LabelView.extend({
							classNames: ['account-header', 'email'],
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              value: 'Email Address'
          }),

          adminHeader: SC.LabelView.extend({
							classNames: ['account-header', 'admin'],
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              value: 'Type'
          }),

          dateHeader: SC.LabelView.extend({
							classNames: ['account-header', 'date'],
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              value: 'Created'
          }),

          sortSelect: CWB.PopupButtonView.extend({
              isEnabledBinding: SC.Binding.from('CWB.accountsController.arrangedObjects.length').bool(),
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, right: 8, width: 64 },
              title: 'Sort',
              //icon: 'sc-icon-down-16',
              menu: SC.MenuPane.extend({
                  layout: { width: 130 },

                  itemValueKey: 'value',
                  itemTitleKey: 'title',
                  itemIconKey: 'icon',
                  items: [
                      SC.Object.create({ value: 'name', title: 'By Name', checkbox: YES }),
                      SC.Object.create({ value: 'username', title: 'By Username' }),
                      SC.Object.create({ value: 'email', title: 'By Email' }),
                      SC.Object.create({ value: 'isAdmin', title: 'By Type' }),
                      SC.Object.create({ value: 'createdAt', title: 'By Date' })
                  ],

                  selectedItemChanged: function(menu) {
                      menu.get('items').setEach('checkbox', NO);
                      var selectedItem = menu.get('selectedItem');
                      selectedItem.set('checkbox', YES);
                      var selectedItemValue = selectedItem.get('value');
                      CWB.accountsController.set('orderBy', selectedItemValue);
                      return YES;
                  }.observes('.selectedItem')
              })
          }),
      }),

      contentView: SC.ScrollView.extend({
          hasHorizontalScroller: NO,
          contentView: CWB.SourceListView.extend({
							classNames: ['accounts-list'],
              contentBinding: 'CWB.accountsController.arrangedObjects',
              selectionBinding: 'CWB.accountsController.selection',

              showAlternatingRows: YES,

              exampleView: CWB.AccountListItemView.extend({
                  contentValueKey: 'name',
                  contentUsernameKey: 'username',
                  contentEmailKey: 'email',
                  contentIsAdminKey: 'isAdmin',
                  contentCreatedAtKey: 'createdAt',
              }),

              doubleClick: function(evt) {
                  CWB.statechart.sendAction('editAccount');
                  return YES;
              },
          })
      }),

      bottomToolbar: SC.ToolbarView.extend({
          anchorLocation: SC.ANCHOR_BOTTOM,
          childViews: 'addAccountButton editAccountButton deleteAccountButton'.w(),

          addAccountButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, left: 12, width: 120 },
              icon: sc_static('icons/add.png'),
              title: 'Add Account',
              action: 'createAccount'
          }),

          editAccountButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, left: 142, width: 120 },
              icon: sc_static('icons/edit.png'),
              title: 'Edit Account',
              isEnabled: NO,
							isEnabledBinding: SC.Binding.oneWay('CWB.accountController.id').bool(),
							action: 'editAccount'
          }),

          deleteAccountButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, right: 12, width: 140 },
              icon: sc_static('icons/remove.png'),
              title: "Remove Account",
              isEnabled: NO,
							isEnabledBinding: SC.Binding.oneWay('CWB.accountController.id').bool(),
							action: 'showRemoveAccountAlert'
          })
      })
    })
	})
});


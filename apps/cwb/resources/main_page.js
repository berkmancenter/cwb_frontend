// ==========================================================================
// Project:   CWB - mainPage
// ==========================================================================
/*globals CWB */
sc_require('views/files_screen');
sc_require('views/projects_screen');

// This page describes the main user interface for the application.
CWB.mainPage = SC.Page.design({
    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
   mainPane: SC.MainPane.design({
       childViews: 'filesScreen'.w(),
       filesScreen: CWB.FilesScreen.design()
   }),

    accountsPane: SC.MainPane.design({
        childViews: 'accountsScreen'.w(),
        accountsScreen: CWB.AccountsScreen.design(),
    }),

    projectPane: SC.MainPane.design({
        childViews: 'projectsScreen'.w(),
        projectsScreen: CWB.ProjectsScreen.design()
    }),

    tagEditPane: SC.PanelPane.design({
        layout: { width: 640, height: 174, centerX: 0, centerY: 0 },

        contentView: SC.View.extend({
            layout: { top: 12, left: 12, bottom: 12, right: 12 },
            childViews: 'name description message saveButton cancelButton'.w(),

            name: SC.View.design({
                layout: { left: 0, right: 0, top: 0, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Term Label",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    maxLength: 255,
                    valueBinding: SC.Binding.from('CWB.termController.label')
                })
            }), // name

            description: SC.View.design({
                layout: { left: 0, right: 0, top: 34, height: 50 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, top: 2 },
                    value: "Term Description",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 44, right: 0, centerY: 0 },
                    isTextArea: YES,
                    maxLength: 255,
                    valueBinding: SC.Binding.from('CWB.termController.description')
                })
            }), // description

            message: SC.View.design({
                layout: { left: 0, right: 0, bottom: 40, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, right: 0, height: 18, centerY: 0 },
                    textAlign: SC.ALIGN_CENTER,
                    isVisible: YES,
                    valueBinding: SC.Binding.from('CWB.mainPage.tagEditPaneMessage')
                })
            }),

            saveButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 5, left: 200, height: 30, width: 80 },
                title: "Save",
                action: function(unused) {
                    var callback = CWB.mainPage.get('tagEditPaneCallback');
                    if (callback) {
                        return callback(YES);
                    }
                },
                isDefault: YES
            }),

            cancelButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 5, right: 200, height: 30, width: 80 },
                title: "Cancel",
                action: function(unused) {
                    CWB.mainPage.set('tagEditPaneIsVisible', NO);
                    var callback = CWB.mainPage.get('tagEditPaneCallback');
                    if (callback) {
                        return callback(NO);
                    }
                },
                isCancel: YES
            })
        })
    }),

    tagEditPaneIsVisible: NO,
    tagEditPaneCallback: null,
    tagEditPaneMessage: '',

    tagEditPaneIsVisibleDidChange: function() {
        var pane = this.get('tagEditPane');
        if (this.get('tagEditPaneIsVisible')) {
            pane.append();
            // TODO: set focus using field.becomeFirstResponder();
        }
        else {
            pane.remove();
        }
    }.observes('tagEditPaneIsVisible'),

    tagPane: SC.PanelPane.design({
        layout: { width: 760, height: 480, centerX: 0, centerY: 0 },

        contentView: SC.View.extend({
            childViews: 'tagGroups saveButton cancelButton'.w(),

            tagGroups: SC.View.extend({
                layout: { top: 20, bottom: 60 },
                childViews: 'a b c d e f'.w(),

                a: SC.WorkspaceView.extend({
                    layout: { width: 120, left: 20 },
                    topToolbar: SC.ToolbarView.extend({
                        layout: { height: 50 },
                        childViews: ['title'],
                        title: SC.LabelView.extend({
                            controlSize: SC.REGULAR_CONTROL_SIZE,
                            fontWeight: SC.BOLD_WEIGHT,
                            textAlign: SC.ALIGN_CENTER,
                            value: 'Architectural Discipline'
                        })
                    }),
                    contentView: SC.SegmentedView.extend({
                        layoutDirection: SC.LAYOUT_VERTICAL,
                        allowsEmptySelection: YES,
                        itemValueKey: 'id',
                        itemTitleKey: 'label',
                        //items: CWB.TERMS_IN_VOCABULARY[1],
                        itemsBinding: 'CWB.termsController.content1',
                        //contentValueKey: 'id',
                        valueBinding: 'CWB.tagsController.tag1',
                        segmentViewClass: SC.SegmentView.extend({
                            toolTip: function() {
                                return ''; // TODO
                            }.property()
                        })
                    })
                }),

                b: SC.WorkspaceView.extend({
                    layout: { width: 120, left: 140 },
                    topToolbar: SC.ToolbarView.extend({
                        layout: { height: 50 },
                        childViews: ['title'],
                        title: SC.LabelView.extend({
                            controlSize: SC.REGULAR_CONTROL_SIZE,
                            fontWeight: SC.BOLD_WEIGHT,
                            textAlign: SC.ALIGN_CENTER,
                            value: 'Document Type'
                        })
                    }),
                    contentView: SC.SegmentedView.extend({
                        layoutDirection: SC.LAYOUT_VERTICAL,
                        allowsEmptySelection: YES,
                        itemValueKey: 'id',
                        itemTitleKey: 'label',
                        //items: CWB.TERMS_IN_VOCABULARY[2],
                        itemsBinding: 'CWB.termsController.content2',
                        //contentValueKey: 'id',
                        valueBinding: 'CWB.tagsController.tag2'
                    })
                }),

                c: SC.WorkspaceView.extend({
                    layout: { width: 120, left: 260 },
                    topToolbar: SC.ToolbarView.extend({
                        layout: { height: 50 },
                        childViews: ['title'],
                        title: SC.LabelView.extend({
                            controlSize: SC.REGULAR_CONTROL_SIZE,
                            fontWeight: SC.BOLD_WEIGHT,
                            textAlign: SC.ALIGN_CENTER,
                            value: 'Format'
                        })
                    }),
                    contentView: SC.SegmentedView.extend({
                        layoutDirection: SC.LAYOUT_VERTICAL,
                        allowsEmptySelection: YES,
                        itemValueKey: 'id',
                        itemTitleKey: 'label',
                        //items: CWB.TERMS_IN_VOCABULARY[3],
                        itemsBinding: 'CWB.termsController.content3',
                        //contentValueKey: 'id',
                        valueBinding: 'CWB.tagsController.tag3'
                    })
                }),

                d: SC.WorkspaceView.extend({
                    layout: { width: 120, left: 380 },
                    topToolbar: SC.ToolbarView.extend({
                        layout: { height: 50 },
                        childViews: ['title'],
                        title: SC.LabelView.extend({
                            controlSize: SC.REGULAR_CONTROL_SIZE,
                            fontWeight: SC.BOLD_WEIGHT,
                            textAlign: SC.ALIGN_CENTER,
                            value: 'Phase'
                        })
                    }),
                    contentView: SC.SegmentedView.extend({
                        layoutDirection: SC.LAYOUT_VERTICAL,
                        allowsEmptySelection: YES,
                        itemValueKey: 'id',
                        itemTitleKey: 'label',
                        //items: CWB.TERMS_IN_VOCABULARY[4],
                        itemsBinding: 'CWB.termsController.content4',
                        //contentValueKey: 'id',
                        valueBinding: 'CWB.tagsController.tag4'
                    })
                }),

                e: SC.WorkspaceView.extend({
                    layout: { width: 120, left: 500 },
                    topToolbar: SC.ToolbarView.extend({
                        layout: { height: 50 },
                        childViews: ['title'],
                        title: SC.LabelView.extend({
                            controlSize: SC.REGULAR_CONTROL_SIZE,
                            fontWeight: SC.BOLD_WEIGHT,
                            textAlign: SC.ALIGN_CENTER,
                            value: 'Rights'
                        })
                    }),
                    contentView: SC.SegmentedView.extend({
                        layoutDirection: SC.LAYOUT_VERTICAL,
                        allowsEmptySelection: YES,
                        itemValueKey: 'id',
                        itemTitleKey: 'label',
                        //items: CWB.TERMS_IN_VOCABULARY[5],
                        itemsBinding: 'CWB.termsController.content5',
                        //contentValueKey: 'id',
                        valueBinding: 'CWB.tagsController.tag5'
                    })
                }),

                f: SC.WorkspaceView.extend({
                    layout: { width: 120, left: 620 },
                    topToolbar: SC.ToolbarView.extend({
                        layout: { height: 50 },
                        childViews: ['title'],
                        title: SC.LabelView.extend({
                            controlSize: SC.REGULAR_CONTROL_SIZE,
                            fontWeight: SC.BOLD_WEIGHT,
                            textAlign: SC.ALIGN_CENTER,
                            value: 'Zone'
                        })
                    }),
                    contentView: SC.SegmentedView.extend({
                        layoutDirection: SC.LAYOUT_VERTICAL,
                        allowsEmptySelection: YES,
                        itemValueKey: 'id',
                        itemTitleKey: 'label',
                        //items: CWB.TERMS_IN_VOCABULARY[6],
                        itemsBinding: 'CWB.termsController.content6',
                        //contentValueKey: 'id',
                        valueBinding: 'CWB.tagsController.tag6'
                    })
                })
            }),

            saveButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 20, right: 110, height: 30, width: 80 },
                title: "Save",
                action: function(unused) {
                    CWB.mainPage.set('tagPaneIsVisible', NO);
                    var callback = CWB.mainPage.get('tagPaneCallback');
                    if (callback) {
                        return callback(YES);
                    }
                },
                isDefault: YES
                //isEnabledBinding: '...' // TODO
                //isVisibleBinding: '...' // TODO
            }),

            cancelButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 20, right: 20, height: 30, width: 80 },
                title: "Cancel",
                action: function(unused) {
                    CWB.mainPage.set('tagPaneIsVisible', NO);
                    var callback = CWB.mainPage.get('tagPaneCallback');
                    if (callback) {
                        return callback(NO);
                    }
                },
                isCancel: YES
                //isVisibleBinding: '...' // TODO
            })
        })
    }),

    tagPaneIsVisible: NO,
    tagPaneCallback: null,

    tagPaneIsVisibleDidChange: function() {
        var pane = this.get('tagPane');
        if (this.get('tagPaneIsVisible')) {
            pane.get('contentView').get('tagGroups').get('a').get('contentView').set('items', CWB.termsController.content1());
            pane.get('contentView').get('tagGroups').get('b').get('contentView').set('items', CWB.termsController.content2());
            pane.get('contentView').get('tagGroups').get('c').get('contentView').set('items', CWB.termsController.content3());
            pane.get('contentView').get('tagGroups').get('d').get('contentView').set('items', CWB.termsController.content4());
            pane.get('contentView').get('tagGroups').get('e').get('contentView').set('items', CWB.termsController.content5());
            pane.get('contentView').get('tagGroups').get('f').get('contentView').set('items', CWB.termsController.content6());
            pane.append();
            // TODO: set focus using field.becomeFirstResponder();
        }
        else {
            pane.remove();
        }
    }.observes('tagPaneIsVisible'),

    createProjectPaneIsVisible: NO,
    createProjectPaneCallback: null,
    createProjectPaneMessage: '',

    createProjectPaneIsVisibleDidChange: function() {
        var pane = this.get('createProjectPane');
        if (this.get('createProjectPaneIsVisible')) {
            pane.append();
            pane.get('contentView').get('name').get('field').becomeFirstResponder();
        }
        else {
            pane.remove();
        }
    }.observes('createProjectPaneIsVisible'),

    createProjectPane: SC.PanelPane.design({
        layout: { width: 320, height: 240, centerX: 0, centerY: 0 },

        contentView: SC.View.extend({
            layout: { top: 12, left: 12, bottom: 12, right: 12 },
            childViews: 'name description path message saveButton cancelButton'.w(),
            isVisible: YES,

            name: SC.View.design({
                layout: { left: 0, right: 0, top: 0, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Project Name",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.projectsController.newName')
                })
            }),

            description: SC.View.design({
                layout: { left: 0, right: 0, top: 34, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Project Description",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.projectsController.newDescription')
                })
            }),

            path: SC.View.design({
                layout: { left: 0, right: 0, top: 68, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Project Path",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.projectsController.newPath')
                })
            }),

            message: SC.View.design({
                layout: { left: 0, right: 0, bottom: 60, height: 42 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, right: 0, height: 36, centerY: 0 },
                    textAlign: SC.ALIGN_CENTER,
                    isVisible: YES,
                    valueBinding: SC.Binding.from('CWB.mainPage.createProjectPaneMessage')
                })
            }),

            saveButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 20, left: 40, height: 30, width: 80 },
                title: "Save",
                action: function(unused) {
                    var callback = CWB.mainPage.get('createProjectPaneCallback');
                    if (callback) {
                        return callback(YES);
                    }
                },
                isDefault: YES,
                isEnabled: NO,
                isEnabledBinding: SC.Binding.oneWay('CWB.projectsController.enableSaveButton').bool()
            }),

            cancelButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 20, right: 40, height: 30, width: 80 },
                title: "Cancel",
                action: function(unused) {
                    CWB.mainPage.set('createProjectPaneIsVisible', NO);
                    var callback = CWB.mainPage.get('createProjectPaneCallback');
                    if (callback) {
                        return callback(NO);
                    }
                },
                isCancel: YES
            })
        })
    }),

    accountFormIsVisible: NO,
    accountFormCallback: null,
    accountFormMessage: '',

    accountFormIsVisibleDidChange: function() {
        var pane = this.get('accountForm');
        if (this.get('accountFormIsVisible')) {
            pane.append();
            pane.get('contentView').get('saveButton').set('isEnabled', NO);
            pane.get('contentView').get('name').get('field').becomeFirstResponder();
        }
        else {
            pane.remove();
        }
    }.observes('accountFormIsVisible'),

    accountForm: SC.PanelPane.design({
        layout: { width: 320, height: 334, centerX: 0, centerY: 0 },

        contentView: SC.View.extend({
            layout: { top: 12, left: 12, bottom: 12, right: 12 },
            childViews: 'name username email password1 password2 accountManager message saveButton cancelButton'.w(),
            isVisible: YES,

            name: SC.View.design({
                layout: { left: 0, right: 0, top: 0, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Name",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.accountFormController.name')
                })
            }),

            username: SC.View.design({
                layout: { left: 0, right: 0, top: 34, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Username",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.accountFormController.username')
                })
            }),

            email: SC.View.design({
                layout: { left: 0, right: 0, top: 68, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Email",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.accountFormController.email')
                })
            }),

            password1: SC.View.design({
                layout: { left: 0, right: 0, top: 102, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Password",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    type: 'password',
                    valueBinding: SC.Binding.from('CWB.accountFormController.password1')
                })
            }),

            password2: SC.View.design({
                layout: { left: 0, right: 0, top: 136, height: 26 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Confirm Password",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.TextFieldView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    type: 'password',
                    valueBinding: SC.Binding.from('CWB.accountFormController.password2')
                })
            }),

            accountManager: SC.View.design({
                layout: { left: 0, right: 0, top: 170, height: 26 },
                childViews: 'label field'.w(),
                isVisibleBinding: SC.Binding.oneWay('CWB.accountFormController.displayAdminCheckbox').bool(),
                label: SC.LabelView.design({
                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
                    value: "Account Manager",
                    textAlign: SC.ALIGN_LEFT
                }),
                field: SC.CheckboxView.design({
                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
                    valueBinding: SC.Binding.from('CWB.accountFormController.account_manager')
                })
            }),

            message: SC.View.design({
                layout: { left: 0, right: 0, bottom: 60, height: 42 },
                childViews: 'label field'.w(),
                label: SC.LabelView.design({
                    layout: { left: 0, right: 0, height: 36, centerY: 0 },
                    textAlign: SC.ALIGN_CENTER,
                    isVisible: YES,
                    valueBinding: SC.Binding.from('CWB.mainPage.accountFormMessage')
                })
            }),

            saveButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 20, left: 40, height: 30, width: 80 },
                title: "Save",
                action: function(unused) {
                    var callback = CWB.mainPage.get('accountFormCallback');
                    if (callback) {
                        return callback(YES);
                    }
                },
                isDefault: YES,
                isEnabled: NO,
                isEnabledBinding: SC.Binding.oneWay('CWB.accountFormController.enableSaveButton').bool()
            }),

            cancelButton: SC.ButtonView.extend({
                controlSize: SC.HUGE_CONTROL_SIZE,
                layout: { bottom: 20, right: 40, height: 30, width: 80 },
                title: "Cancel",
                action: function(unused) {
                    CWB.mainPage.set('accountFormIsVisible', NO);
                    var callback = CWB.mainPage.get('accountFormCallback');
                    if (callback) {
                        return callback(NO);
                    }
                },
                isCancel: YES
            })
        })
    })
});

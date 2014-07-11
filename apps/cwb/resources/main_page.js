// ==========================================================================
// Project:   CWB - mainPage
// ==========================================================================
/*globals CWB */
sc_require('views/projects_screen');

// This page describes the main user interface for the application.
CWB.mainPage = SC.Page.design({
//    accountPane: SC.MainPane.design({
//        childViews: 'accountsScreen'.w(),
//        accountsScreen: CWB.AccountsScreen.design()
//    }),

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
//    mainPane: SC.MainPane.design({
//        childViews: 'filesScreen'.w(),
//        filesScreen: CWB.FilesScreen.design()
//    }),

    projectPane: SC.MainPane.design({
        childViews: 'projectsScreen'.w(),
        projectsScreen: CWB.ProjectsScreen.design()
    })

//    tagEditPane: SC.PanelPane.create({
//        layout: { width: 640, height: 144, centerX: 0, centerY: 0 },
//
//        contentView: SC.View.extend({
//            layout: { top: 12, left: 12, bottom: 12, right: 12 },
//            childViews: 'name description saveButton cancelButton'.w(),
//
//            name: SC.View.design({
//                layout: { left: 0, right: 0, top: 0, height: 26 },
//                childViews: 'label field'.w(),
//                label: SC.LabelView.design({
//                    layout: { left: 0, width: 110, height: 18, centerY: 0 },
//                    value: "Term Label",
//                    textAlign: SC.ALIGN_LEFT
//                }),
//                field: SC.TextFieldView.design({
//                    layout: { left: 112, height: 22, right: 0, centerY: 0 },
//                    maxLength: 255,
//                    valueBinding: SC.Binding.from('CWB.termController.label')
//                })
//            }), // name
//
//            description: SC.View.design({
//                layout: { left: 0, right: 0, top: 34, height: 50 },
//                childViews: 'label field'.w(),
//                label: SC.LabelView.design({
//                    layout: { left: 0, width: 110, height: 18, top: 2 },
//                    value: "Term Description",
//                    textAlign: SC.ALIGN_LEFT
//                }),
//                field: SC.TextFieldView.design({
//                    layout: { left: 112, height: 44, right: 0, centerY: 0 },
//                    isTextArea: YES,
//                    maxLength: 255,
//                    valueBinding: SC.Binding.from('CWB.termController.description')
//                })
//            }), // description
//
//            saveButton: SC.ButtonView.extend({
//                controlSize: SC.HUGE_CONTROL_SIZE,
//                layout: { bottom: 0, right: 90, height: 30, width: 80 },
//                title: "Save",
//                action: function(unused) {
//                    CWB.mainPage.set('tagEditPaneIsVisible', NO);
//                    var callback = CWB.mainPage.get('tagEditPaneCallback');
//                    if (callback) {
//                        return callback(YES);
//                    }
//                },
//                isDefault: YES
//            }),
//
//            cancelButton: SC.ButtonView.extend({
//                controlSize: SC.HUGE_CONTROL_SIZE,
//                layout: { bottom: 0, right: 0, height: 30, width: 80 },
//                title: "Cancel",
//                action: function(unused) {
//                    CWB.mainPage.set('tagEditPaneIsVisible', NO);
//                    var callback = CWB.mainPage.get('tagEditPaneCallback');
//                    if (callback) {
//                        return callback(NO);
//                    }
//                },
//                isCancel: YES
//            })
//        })
//    }),
//
//    tagEditPaneIsVisible: NO,
//    tagEditPaneCallback: null,
//
//    tagEditPaneIsVisibleDidChange: function() {
//        var pane = this.get('tagEditPane');
//        if (this.get('tagEditPaneIsVisible')) {
//            pane.append();
//            // TODO: set focus using field.becomeFirstResponder();
//        }
//        else {
//            pane.remove();
//        }
//    }.observes('tagEditPaneIsVisible'),

//    tagPane: SC.PanelPane.create({
//        layout: { width: 640, height: 480, centerX: 0, centerY: 0 },
//
//        contentView: SC.View.extend({
//            childViews: 'tagGroups saveButton cancelButton'.w(),
//
//            tagGroups: SC.View.extend({
//                layout: { top: 20, bottom: 60 },
//                childViews: 'a b c d e f'.w(),
//
//                a: SC.WorkspaceView.extend({
//                    layout: { width: 100, left: 20 },
//                    topToolbar: SC.ToolbarView.extend({
//                        layout: { height: 50 },
//                        childViews: ['title'],
//                        title: SC.LabelView.extend({
//                            controlSize: SC.REGULAR_CONTROL_SIZE,
//                            fontWeight: SC.BOLD_WEIGHT,
//                            value: 'Format'
//                        })
//                    }),
//                    contentView: SC.SegmentedView.extend({
//                        layoutDirection: SC.LAYOUT_VERTICAL,
//                        allowsEmptySelection: YES,
//                        itemValueKey: 'id',
//                        itemTitleKey: 'label',
//                        //items: CWB.TERMS_IN_VOCABULARY[1],
//                        itemsBinding: 'CWB.termsController.content1',
//                        //contentValueKey: 'id',
//                        valueBinding: 'CWB.tagsController.tag1',
//                        segmentViewClass: SC.SegmentView.extend({
//                            toolTip: function() {
//                                return ''; // TODO
//                            }.property()
//                        })
//                    })
//                }),
//
//                b: SC.WorkspaceView.extend({
//                    layout: { width: 100, left: 120 },
//                    topToolbar: SC.ToolbarView.extend({
//                        layout: { height: 50 },
//                        childViews: ['title'],
//                        title: SC.LabelView.extend({
//                            controlSize: SC.REGULAR_CONTROL_SIZE,
//                            fontWeight: SC.BOLD_WEIGHT,
//                            value: 'Document Type'
//                        })
//                    }),
//                    contentView: SC.SegmentedView.extend({
//                        layoutDirection: SC.LAYOUT_VERTICAL,
//                        allowsEmptySelection: YES,
//                        itemValueKey: 'id',
//                        itemTitleKey: 'label',
//                        //items: CWB.TERMS_IN_VOCABULARY[2],
//                        itemsBinding: 'CWB.termsController.content2',
//                        //contentValueKey: 'id',
//                        valueBinding: 'CWB.tagsController.tag2'
//                    })
//                }),
//
//                c: SC.WorkspaceView.extend({
//                    layout: { width: 100, left: 220 },
//                    topToolbar: SC.ToolbarView.extend({
//                        layout: { height: 50 },
//                        childViews: ['title'],
//                        title: SC.LabelView.extend({
//                            controlSize: SC.REGULAR_CONTROL_SIZE,
//                            fontWeight: SC.BOLD_WEIGHT,
//                            value: 'Zone'
//                        })
//                    }),
//                    contentView: SC.SegmentedView.extend({
//                        layoutDirection: SC.LAYOUT_VERTICAL,
//                        allowsEmptySelection: YES,
//                        itemValueKey: 'id',
//                        itemTitleKey: 'label',
//                        //items: CWB.TERMS_IN_VOCABULARY[3],
//                        itemsBinding: 'CWB.termsController.content3',
//                        //contentValueKey: 'id',
//                        valueBinding: 'CWB.tagsController.tag3'
//                    })
//                }),
//
//                d: SC.WorkspaceView.extend({
//                    layout: { width: 100, left: 320 },
//                    topToolbar: SC.ToolbarView.extend({
//                        layout: { height: 50 },
//                        childViews: ['title'],
//                        title: SC.LabelView.extend({
//                            controlSize: SC.REGULAR_CONTROL_SIZE,
//                            fontWeight: SC.BOLD_WEIGHT,
//                            value: 'Phase'
//                        })
//                    }),
//                    contentView: SC.SegmentedView.extend({
//                        layoutDirection: SC.LAYOUT_VERTICAL,
//                        allowsEmptySelection: YES,
//                        itemValueKey: 'id',
//                        itemTitleKey: 'label',
//                        //items: CWB.TERMS_IN_VOCABULARY[4],
//                        itemsBinding: 'CWB.termsController.content4',
//                        //contentValueKey: 'id',
//                        valueBinding: 'CWB.tagsController.tag4'
//                    })
//                }),
//
//                e: SC.WorkspaceView.extend({
//                    layout: { width: 100, left: 420 },
//                    topToolbar: SC.ToolbarView.extend({
//                        layout: { height: 50 },
//                        childViews: ['title'],
//                        title: SC.LabelView.extend({
//                            controlSize: SC.REGULAR_CONTROL_SIZE,
//                            fontWeight: SC.BOLD_WEIGHT,
//                            value: 'Architectural Discipline'
//                        })
//                    }),
//                    contentView: SC.SegmentedView.extend({
//                        layoutDirection: SC.LAYOUT_VERTICAL,
//                        allowsEmptySelection: YES,
//                        itemValueKey: 'id',
//                        itemTitleKey: 'label',
//                        //items: CWB.TERMS_IN_VOCABULARY[5],
//                        itemsBinding: 'CWB.termsController.content5',
//                        //contentValueKey: 'id',
//                        valueBinding: 'CWB.tagsController.tag5'
//                    })
//                }),
//
//                f: SC.WorkspaceView.extend({
//                    layout: { width: 100, left: 520 },
//                    topToolbar: SC.ToolbarView.extend({
//                        layout: { height: 50 },
//                        childViews: ['title'],
//                        title: SC.LabelView.extend({
//                            controlSize: SC.REGULAR_CONTROL_SIZE,
//                            fontWeight: SC.BOLD_WEIGHT,
//                            value: 'Rights'
//                        })
//                    }),
//                    contentView: SC.SegmentedView.extend({
//                        layoutDirection: SC.LAYOUT_VERTICAL,
//                        allowsEmptySelection: YES,
//                        itemValueKey: 'id',
//                        itemTitleKey: 'label',
//                        //items: CWB.TERMS_IN_VOCABULARY[6],
//                        itemsBinding: 'CWB.termsController.content6',
//                        //contentValueKey: 'id',
//                        valueBinding: 'CWB.tagsController.tag6'
//                    })
//                })
//            }),
//
//            saveButton: SC.ButtonView.extend({
//                controlSize: SC.HUGE_CONTROL_SIZE,
//                layout: { bottom: 20, right: 110, height: 30, width: 80 },
//                title: "Save",
//                action: function(unused) {
//                    CWB.mainPage.set('tagPaneIsVisible', NO);
//                    var callback = CWB.mainPage.get('tagPaneCallback');
//                    if (callback) {
//                        return callback(YES);
//                    }
//                },
//                isDefault: YES
//                //isEnabledBinding: '...' // TODO
//                //isVisibleBinding: '...' // TODO
//            }),
//
//            cancelButton: SC.ButtonView.extend({
//                controlSize: SC.HUGE_CONTROL_SIZE,
//                layout: { bottom: 20, right: 20, height: 30, width: 80 },
//                title: "Cancel",
//                action: function(unused) {
//                    CWB.mainPage.set('tagPaneIsVisible', NO);
//                    var callback = CWB.mainPage.get('tagPaneCallback');
//                    if (callback) {
//                        return callback(NO);
//                    }
//                },
//                isCancel: YES
//                //isVisibleBinding: '...' // TODO
//            })
//        })
//    }),

//    tagPaneIsVisible: NO,
//    tagPaneCallback: null,
//
//    tagPaneIsVisibleDidChange: function() {
//        var pane = this.get('tagPane');
//        if (this.get('tagPaneIsVisible')) {
//            pane.append();
//            // TODO: set focus using field.becomeFirstResponder();
//        }
//        else {
//            pane.remove();
//        }
//    }.observes('tagPaneIsVisible')
});

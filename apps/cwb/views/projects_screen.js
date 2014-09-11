sc_require('core');
sc_require('resources/queries');
sc_require('views/source_list_view');

CWB.TermSourceListView = CWB.SourceListView.extend({
    exampleView: SC.ListItemView.extend({
        hasContentIcon: YES,
        contentUnreadCountKey: 'fileCount',
        contentValueKey: 'label',
        contentIconKey: 'icon',
        renderLabel: function(context, label) {
            var term = this.get('content');
            var toolTip = term.description;
            context.push('<label title="').text(toolTip).push('">', label || '', '</label>');
        }
    }),

    doubleClick: function(evt) {
        CWB.statechart.sendAction('editTermFromDoubleClick', this);
        return YES;
    }
});

CWB.VocabularyView = SC.WorkspaceView.extend({
    topToolbar: null,
    contentView: SC.ScrollView.extend({
        contentView: CWB.TermSourceListView.extend({
            isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool(),
            contentBinding: 'CWB.termsController.content',
            selectionBinding: 'CWB.termsController.selection'
        })
    }),
    bottomToolbar: SC.ToolbarView.extend({
        childViews: 'addTermButton editTermButton removeTermButton'.w(),
        addTermButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, left: 12, width: 110 },
            icon: sc_static('icons/add.png'),
            title: "Add Term",
            isEnabled: YES,
            action: 'createTerm'
        }),
        editTermButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, left: 132, width: 110 },
            icon: sc_static('icons/edit.png'),
            title: "Edit Term",
            isEnabled: NO,
            isEnabledBinding: SC.Binding.oneWay('CWB.termController.id').bool(),
            action: 'editTerm'
        }),
        removeTermButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, right: 12, width: 130 },
            icon: sc_static('icons/remove.png'),
            title: "Remove Term",
            isEnabled: NO,
            isEnabledBinding: SC.Binding.oneWay('CWB.termController.id').bool(),
            action: 'removeTerm'
        })
    })
});

CWB.Vocabulary1View = CWB.VocabularyView.extend({});
CWB.Vocabulary2View = CWB.VocabularyView.extend({});
CWB.Vocabulary3View = CWB.VocabularyView.extend({});
CWB.Vocabulary4View = CWB.VocabularyView.extend({});
CWB.Vocabulary5View = CWB.VocabularyView.extend({});
CWB.Vocabulary6View = CWB.VocabularyView.extend({});

CWB.ProjectsScreen = SC.WorkspaceView.extend({
    topToolbar: SC.ToolbarView.extend({
        anchorLocation: SC.ANCHOR_TOP,
        childViews: 'createProjectButton removeProjectButton titleLabel logoutButton filesButton'.w(),

        createProjectButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, left: 12, width: 120 },
            icon: sc_static('icons/add.png'),
            title: "Add Project",
            isEnabled: YES,
            target: 'CWB.projectsController',
            action: 'showCreateProjectPane'
        }),

        removeProjectButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, left: 140, width: 140 },
            icon: sc_static('icons/remove.png'),
            title: "Remove Project",
            isEnabled: NO,
            isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool(),
            target: 'CWB.projectsController',
            action: 'showRemoveProjectAlert'
        }),

        titleLabel: SC.LabelView.extend({
            controlSize: SC.LARGE_CONTROL_SIZE,
            layout: { centerY: 0, centerX: 0, height: 30, width: 200 },
            fontWeight: SC.BOLD_WEIGHT,
            textAlign: SC.ALIGN_CENTER,
            value: "CWB (v" + CWB.VERSION + ") - Projects"
        }),

        logoutButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, right: 102, width: 90 },
            icon: sc_static('icons/logout.png'),
            title: "Log Out",
            action: 'logout',
            isEnabled: YES
        }),

        filesButton: SC.ButtonView.extend({
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, right: 12, width: 90 },
            themeName: 'point-right',
            title: "Files",
            action: 'gotoFiles',
            isEnabled: NO,
            isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool()
        })
    }),

    bottomToolbar: null,

    contentView: SC.SplitView.extend({
        dividerThickness: 1,
//        defaultThickness: 250,
        layoutDirection: SC.LAYOUT_HORIZONTAL,

        topLeftView: CWB.SourceListView.extend(SC.SplitChild, {
            size: 300,
            contentValueKey: 'name',
            contentBinding: 'CWB.projectsController.arrangedObjects',
            selectionBinding: 'CWB.projectsController.selection',

            exampleView: SC.ListItemView.extend({
                hasContentIcon: YES,
                contentValueKey: 'name',
                contentIconKey: 'icon',
                renderLabel: function(context, label) {
                    var project = this.get('content');
                    var projectName = project.get('name');
                    var folderCount = project.getPath('folders.length');
                    var fileCount = project.getPath('files.length');
                    var toolTip = '%@ contains %@ folder%@ and %@ file%@.'.fmt(projectName,
                        (folderCount === 0) ? 'no' : folderCount,
                        (folderCount === 1) ? '' : 's',
                        (fileCount === 0) ? 'no' : fileCount,
                        (fileCount === 1) ? '' : 's');
                    context.push('<label title="').text(toolTip).push('">', label || '', '</label>');
                }
            }),

            doubleClick: function(evt) {
                var selectedSet = CWB.projectsController.get('selection');
                var selectedProject = selectedSet.firstObject();
                if (selectedProject) {
                    CWB.statechart.sendAction('gotoFiles');
                    return YES;
                }
                return NO;
            }
        }),

        bottomRightView: SC.ScrollView.extend(SC.SplitChild, {
            layout: { top: 0, left: 0, bottom: 0, right: 0 },
            //hasHorizontalScroller: NO,

            contentView: SC.View.extend({
                layout: { top: 12, left: 12, bottom: 12, right: 12 },
                childViews: 'name description path vocabularyTabs'.w(),
                isVisible: NO,
                isVisibleBinding: SC.Binding.oneWay('CWB.projectController.id').bool(),

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
                        valueBinding: SC.Binding.from('CWB.projectController.name'),
                        isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool(),
                        isEditable: NO
                    })
                }), // name

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
                        valueBinding: SC.Binding.from('CWB.projectController.description'),
                        isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool(),
                        isEditable: NO
                    })
                }), // description

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
                        valueBinding: SC.Binding.from('CWB.projectController.path'),
                        isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool(),
                        isEditable: NO
                    })
                }), // path

                /*status: SC.View.design({
                 layout: { left: 0, right: 0, top: 102, height: 26 },
                 childViews: 'label field'.w(),
                 label: SC.LabelView.design({
                 layout: { left: 0, width: 110, height: 18, centerY: 0 },
                 value: "Import Status",
                 textAlign: SC.ALIGN_LEFT
                 }),
                 field: SC.ProgressView.design({
                 layout: { left: 112, height: 22, right: 0, centerY: 0 },
                 value: 50,
                 //valueBinding: SC.Binding.from('CWB.projectController.status'),
                 isEnabledBinding: SC.Binding.oneWay('CWB.projectController.id').bool()
                 })
                 }), // status*/

                vocabularyTabs: SC.TabView.extend({
                    layout: { left: 0, right: 0, top: 102, bottom: 0 },
                    itemTitleKey: 'title',
                    itemValueKey: 'value',
                    nowShowing: 'CWB.Vocabulary1View',
                    tabLocation: SC.TOP_TOOLBAR_LOCATION,
                    items: [ // FIXME
                        { title: "Format", value: 'CWB.Vocabulary1View', index: 0 },
                        { title: "Document Type", value: 'CWB.Vocabulary2View', index: 1 },
                        { title: "Zone", value: 'CWB.Vocabulary3View', index: 2 },
                        { title: "Phase", value: 'CWB.Vocabulary4View', index: 3 },
                        { title: "Architectural Discipline", value: 'CWB.Vocabulary5View', index: 4 },
                        { title: "Rights", value: 'CWB.Vocabulary6View', index: 5 }
                    ],
                    itemValueKey: 'value',
                    segmentedView: SC.SegmentedView.extend({
                        triggerItemAtIndex: function(index) {
                            var result = sc_super();
                            CWB.termsController.set('vocabularyIndex', index);
                            return result;
                        }
                    })
                }) // vocabularies
            })
        })
    })
});

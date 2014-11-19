sc_require('core');
sc_require('views/popup_button_view');
sc_require('views/search_field_view');
sc_require('views/source_view');
sc_require('views/source_list_view');
sc_require('views/file_list_item_view');

CWB.FilesScreen = SC.WorkspaceView.extend({
  topToolbar: SC.ToolbarView.extend({
    anchorLocation: SC.ANCHOR_TOP,
    childViews: 'projectsButton titleLabel downloadLabel downloadMenu'.w(),

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
      valueBinding: 'CWB.projectController.versionPlusName'
    }),

    downloadMenu: SC.PopupButtonView.extend({
      controlSize: SC.HUGE_CONTROL_SIZE,
      layout: { centerY: 0, height: 30, right: 12, width: 100 },
      title: 'Download',
      icon: sc_static('icons/download.png'),
      menu: SC.MenuPane.extend({
        layout: { width: 130 },
        itemTitleKey:'title',
        itemActionKey:'action',
        itemTargetKey:'target',
        items: [
          {title:'RDF/XML PIM', action:'downloadRDF'},
          {title:'Turtle PIM', action:'downloadTurtle'},
          {title:'Derivatives ZIP', action:'downloadDerivatives'},
        ],
      })
    })
  }),

  contentView: SC.SplitView.extend({
    dividerThickness: 1,
//    defaultThickness: 250,
    layoutDirection: SC.LAYOUT_HORIZONTAL,
    childViews: ['c1', 'c2', 'c3'],

    c1: CWB.SourceView.extend(SC.SplitChild, {
      classNames: ['file-source-pane'],
      size: 350,
      minimumSize: 260,
      //contentBinding: 'CWB.foldersController.arrangedObjects',
      //selectionBinding: 'CWB.foldersController.selection'
    }),

    c2: SC.WorkspaceView.extend(SC.SplitChild, {
      classNames: ['file-list-pane'],
      topToolbar: SC.ToolbarView.extend({
          anchorLocation: SC.ANCHOR_TOP,
          childViews: 'selectionSelect sortSelect filterSelect searchField'.w(),

          selectionSelect: CWB.PopupButtonView.extend({
              isEnabledBinding: SC.Binding.from('CWB.filesController.arrangedObjects.length').bool(),
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, left: 8, width: 64 },
              title: 'Select',
              //icon: 'sc-icon-document-16',
              menu: SC.MenuPane.extend({
                  layout: { width: 180 },

                  itemValueKey: 'value',
                  itemTitleKey: 'title',
                  itemIconKey: 'icon',
                  items: [
                      SC.Object.create({ value: 'none_all', title: 'None (all folders)', icon: sc_static('icons/empty.png') }),
                      SC.Object.create({ value: 'none', title: 'None (current folder)', icon: sc_static('icons/empty.png') }),
                      SC.Object.create({ value: 'all', title: 'All (current folder)', icon: sc_static('icons/empty.png') }),
                      SC.Object.create({ value: 'isTagged=YES', title: 'Tagged', icon: sc_static('icons/tag-on.png') }),
                      SC.Object.create({ value: 'isTagged=NO', title: 'Untagged', icon: sc_static('icons/tag-off.png') }),
                      SC.Object.create({ value: 'isStarred=YES', title: 'Starred', icon: sc_static('icons/star-on.png') }),
                      SC.Object.create({ value: 'isStarred=NO', title: 'Unstarred', icon: sc_static('icons/star-off.png') })
                  ],

                  selectedItemChanged: function(menu) {
                      var selectedItem = menu.get('selectedItem');
                      if (selectedItem) {
                        var selectedItemValue = selectedItem.get('value');
                        if (selectedItemValue == 'all') {
                            var allFiles = CWB.filesController.get('content');
                            allFiles.setEach('isSelected', YES);
                        }
                        else if (selectedItemValue == 'none') {
                            var selectedFiles = CWB.filesController.get('content');
                            selectedFiles.setEach('isSelected', NO);
                        }
                        else if (selectedItemValue == 'none_all') {
                            CWB.SELECTED_FILES.setEach('isSelected', NO);
                        }
                        else {
                            var selectedFiles = CWB.filesController.get('content');
                            selectedFiles.setEach('isSelected', NO);
                            selectedFiles = selectedFiles.find(SC.Query.local(CWB.File, selectedItemValue));
                            selectedFiles.setEach('isSelected', YES);
                        }
                        menu.set('selectedItem', null);
                        return YES;
                      }
                      return NO;
                  }.observes('.selectedItem')
              })
          }),

          sortSelect: CWB.PopupButtonView.extend({
              isEnabledBinding: SC.Binding.from('CWB.filesController.arrangedObjects.length').bool(),
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, left: 80, width: 64 },
              title: 'Sort',
              //icon: 'sc-icon-down-16',
              menu: SC.MenuPane.extend({
                  layout: { width: 130 },

                  itemValueKey: 'value',
                  itemTitleKey: 'title',
                  itemIconKey: 'icon',
                  items: [
                      SC.Object.create({ value: 'name', title: 'By Name', checkbox: YES }),
                      SC.Object.create({ value: 'type', title: 'By Type' }),
                      SC.Object.create({ value: 'modified', title: 'By Date Modified' }),
                      SC.Object.create({ value: 'created', title: 'By Date Created' }),
                      SC.Object.create({ value: 'size', title: 'By Size' })
                  ],

                  selectedItemChanged: function(menu) {
                      menu.get('items').setEach('checkbox', NO);
                      var selectedItem = menu.get('selectedItem');
                      selectedItem.set('checkbox', YES);
                      var selectedItemValue = selectedItem.get('value');
                      CWB.filesController.set('orderBy', selectedItemValue);
                      return YES;
                  }.observes('.selectedItem')
              })
          }),

          filterSelect: CWB.PopupButtonView.extend({
              isEnabledBinding: SC.Binding.oneWay('CWB.filesController.content').bool(),
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, left: 152, width: 64 },
              title: 'Filter',
              //icon: 'sc-icon-down-16',
              menu: SC.MenuPane.extend({
                  layout: { width: 130 },

                  itemValueKey: 'title',
                  itemTitleKey: 'title',
                  itemIconKey: 'icon',
                  items: [
                      SC.Object.create({ value: '', title: 'All', icon: sc_static('icons/empty.png'), checkbox: YES }),
                      SC.Object.create({ value: 'isTagged=YES', title: 'Tagged', icon: sc_static('icons/tag-on.png') }),
                      SC.Object.create({ value: 'isTagged=NO', title: 'Untagged', icon: sc_static('icons/tag-off.png') }),
                      SC.Object.create({ value: 'isStarred=YES', title: 'Starred', icon: sc_static('icons/star-on.png') }),
                      SC.Object.create({ value: 'isStarred=NO', title: 'Unstarred', icon: sc_static('icons/star-off.png') })
                  ],

                  selectedItemChanged: function(menu) {
                      menu.get('items').setEach('checkbox', NO);
                      var selectedItem = menu.get('selectedItem');
                      selectedItem.set('checkbox', YES);
                      var selectedItemValue = selectedItem.get('value');
                      CWB.filesController.set('filterConditions', selectedItemValue);
                      return YES;
                  }.observes('.selectedItem')
              })
          }),

          searchField: CWB.SearchFieldView.extend({
              isEnabledBinding: SC.Binding.oneWay('CWB.filesController.content').bool(),
              layout: { centerY: 0, height: 30, right: 8, width: 200 }
          })
      }),

      contentView: SC.ScrollView.extend({
          hasHorizontalScroller: NO,
          contentView: CWB.SourceListView.extend({
              contentBinding: 'CWB.filesController.arrangedObjects',
              selectionBinding: 'CWB.filesController.selection',

              showAlternatingRows: YES,

              exampleView: CWB.FileListItemView.extend({
                  contentCheckboxKey: 'isSelected',
                  contentIconKey: 'typeIcon',
                  contentValueKey: 'name',
                  contentSizeKey: 'sizeString',
                  contentTypeKey: 'type',
                  contentTagIconKey: 'tagIcon',
                  contentStarIconKey: 'starIcon',

                  tagClick: function(evt) {
                      var files = [this.get('content')];
                      CWB.filesController.startTaggingFiles(files);
                  },

                  starClick: function(evt) {
                      var node = this.get('content');
                      CWB.filesController.sendStarRequest(node);
                  }
              }),

              doubleClick: function(evt) {
                  var selectedSet = CWB.filesController.get('selection');
                  var selectedFile = selectedSet.firstObject();
                  if (selectedFile) {
                      CWB.filesController.startTaggingFiles([selectedFile]);
                  }
                  return NO;
              },

              insertText: function(chr, evt) {
                  if (chr === ' ') {
                      var highlightedNodes = CWB.filesController.get('selection');
                      highlightedNodes.forEach(function(object) {
                          object.set('isSelected', !object.get('isSelected'));
                      });
                      return YES;
                  }
                  return sc_super();
              }
          })
      }),

      bottomToolbar: SC.ToolbarView.extend({
          anchorLocation: SC.ANCHOR_BOTTOM,
          childViews: 'addToWorkQueueButton summaryLabel addTagsButton markImportantButton'.w(),

          addToWorkQueueButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, left: 12, width: 160 },
              icon: sc_static('icons/queue.png'),
              //title: "Add to Work Queue",
              titleBinding: SC.Binding.oneWay('CWB.filesController.queueButtonTitle'),
              action: function(unused) {
                  var selectedSource = CWB.filesController.selectedSource;
                  var isQueued = (selectedSource != 'queued');
                  var selectedNodes = CWB.filesController.get('content').find(CWB.SELECTED_NODES_QUERY);
                  var totalSelectedNodes = CWB.SELECTED_FILES;

                  if (selectedNodes.length() == totalSelectedNodes.get('length')) {
                    selectedNodes.setEach('isQueued', isQueued);
                  } else {
                    SC.AlertPane.warn({
                        message: "Background Items Selected",
                        description: "There are files from multiple folders currently selected. Do you want to apply this action to all folders or only the currently selected folder?",
                        buttons: [
                            { title: "Current Folder", action: function() {
                              selectedNodes.setEach('isQueued', isQueued);
                            }},
                            { title: "Cancel" },
                            { title: "All Folders", action:function() {
                              totalSelectedNodes.setEach('isQueued', isQueued);
                            }}
                        ]
                    });
                  }
              },
              isEnabledBinding: SC.Binding.oneWay('CWB.filesController.selectedFilesCount').bool()
          }),

          summaryLabel: SC.LabelView.extend({
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              selectedCountBinding: SC.Binding.oneWay('CWB.filesController.selectedFilesCount'),
              value: function() {
                  var selectedCount = CWB.filesController.get('selectedFilesCount');
                  return '' + (selectedCount > 0 ? selectedCount : 'No') + ' ' + (selectedCount == 1 ? 'file' : 'files') + ' selected';
              }.property('selectedCount').cacheable(),
              isEnabledBinding: SC.Binding.oneWay('CWB.filesController.selectedFilesCount').bool()
          }),

          addTagsButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, right: 174, width: 110 },
              icon: sc_static('icons/tag-on.png'),
              title: "Add Tags",
              action: function(unused) {
                  var selectedNodes = CWB.filesController.get('content').find(CWB.SELECTED_NODES_QUERY);
                  var totalSelectedNodes = CWB.SELECTED_FILES;

                  if (selectedNodes.length() == totalSelectedNodes.get('length')) {
                    CWB.filesController.startTaggingFiles(selectedNodes);
                  } else {
                    SC.AlertPane.warn({
                        message: "Background Items Selected",
                        description: "There are files from multiple folders currently selected. Do you want to apply this action to all folders or only the currently selected folder?",
                        buttons: [
                            { title: "Current Folder", action: function() {
                              CWB.filesController.startTaggingFiles(selectedNodes);
                            }},
                            { title: "Cancel" },
                            { title: "All Folders", action:function() {
                              CWB.filesController.startTaggingFiles(totalSelectedNodes);
                            }}
                        ]
                    });
                  }
              },
              isEnabledBinding: SC.Binding.oneWay('CWB.filesController.selectedFilesCount').bool()
          }),

          markImportantButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, right: 12, width: 150 },
              iconBinding: SC.Binding.oneWay('CWB.filesController.starButtonIcon'),
              //title: "Mark Important",
              titleBinding: SC.Binding.oneWay('CWB.filesController.starButtonTitle'),
              action: function(unused) {
                  var selectedNodes = CWB.filesController.get('content').find(CWB.SELECTED_NODES_QUERY);
                  var doStar = (CWB.filesController.selectedSource != 'starred');
                  var totalSelectedNodes = CWB.SELECTED_FILES;

                  if (selectedNodes.length() == totalSelectedNodes.get('length')) {
                    CWB.filesController.sendBatchStarRequest(selectedNodes, doStar);
                  } else {
                    SC.AlertPane.warn({
                        message: "Background Items Selected",
                        description: "There are files from multiple folders currently selected. Do you want to apply this action to all folders or only the currently selected folder?",
                        buttons: [
                            { title: "Current Folder", action: function() {
                              CWB.filesController.sendBatchStarRequest(selectedNodes, doStar);
                            }},
                            { title: "Cancel" },
                            { title: "All Folders", action:function() {
                              CWB.filesController.sendBatchStarRequest(totalSelectedNodes, doStar);
                            }}
                        ]
                    });
                  }
              },
              isEnabledBinding: SC.Binding.oneWay('CWB.filesController.selectedFilesCount').bool()
          })
      })
      }),

    c3: SC.WorkspaceView.extend(SC.SplitChild, {
      classNames: ['file-details-pane'],
      size: 250,
      minimumSize: 250,
      topToolbar: SC.ToolbarView.extend({
          childViews: ['titleLabel'],

          titleLabel: SC.LabelView.extend({
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, height: 30, left: 0, right: 0, top: 12 },
              textAlign: SC.ALIGN_CENTER,
              fontWeight: SC.BOLD_WEIGHT,
              valueBinding: 'CWB.fileController.name'
          })
      }),

      contentView: SC.View.extend({
          isVisible: NO,
          isVisibleBinding: SC.Binding.oneWay('CWB.fileController.id').bool(),
          childViews: 'infoBox derivativeBox previewImage previewPlaceHolder addDerivativeButton'.w(),

          infoBox: SC.View.extend({
              backgroundColor: '#eee',
              childViews: 'typeLabel typeValue sizeLabel sizeValue createdLabel createdValue lastModifiedLabel lastModifiedValue modifiedByLabel modifiedByValue pathLabel pathValue pathCopyButton derivativeLabel derivativeValue'.w(),

              typeLabel: SC.LabelView.design({
                  layout: { top: 20, left: 20, width: 80, height: 18 },
                  value: 'Type:'
              }),

              typeValue: SC.LabelView.design({
                  layout: { top: 20, left: 120, width: 120, height: 35 },
                  valueBinding: 'CWB.fileController.type'
              }),

              sizeLabel: SC.LabelView.design({
                  layout: { top: 54, left: 20, width: 80, height: 18 },
                  value: 'Size:'
              }),

              sizeValue: SC.LabelView.design({
                  layout: { top: 54, left: 120, width: 120, height: 18 },
                  valueBinding: 'CWB.fileController.sizeString'
              }),

              createdLabel: SC.LabelView.design({
                  layout: { top: 78, left: 20, width: 80, height: 18 },
                  value: 'Date Created:'
              }),

              createdValue: SC.LabelView.design({
                  layout: { top: 78, left: 120, width: 120, height: 18 },
                  valueBinding: SC.Binding.dateTime('%Y-%m-%d %H:%M:%S').from('CWB.fileController.created')
              }),

              lastModifiedLabel: SC.LabelView.design({
                  layout: { top: 102, left: 20, width: 80, height: 18 },
                  value: 'Last Modified:'
              }),

              lastModifiedValue: SC.LabelView.design({
                  layout: { top: 102, left: 120, width: 120, height: 18 },
                  valueBinding: SC.Binding.dateTime('%Y-%m-%d %H:%M:%S').from('CWB.fileController.last_tag_change')
              }),

              modifiedByLabel: SC.LabelView.design({
                  layout: { top: 126, left: 20, width: 80, height: 18 },
                  value: 'Modified by:'
              }),

              modifiedByValue: SC.LabelView.design({
                  layout: { top: 126, left: 120, width: 120, height: 18 },
                  valueBinding: 'CWB.fileController.last_modified_by'
              }),

              pathLabel: SC.LabelView.design({
                  layout: { top: 150, left: 20, width: 80, height: 18 },
                  value: 'Path:'
              }),

              pathValue: SC.LabelView.design({ // FIXME
                  //pathValue: SC.TextFieldView.design({
                  classNames: ['break-word-wrap'],
                  layout: { top: 150, left: 120, width: 120, height: 64 },
                  valueBinding: 'CWB.fileController.path'
                  //isEditable: NO,
                  //isTextArea: YES,
                  //shouldRenderBorder: NO,
                  //backgroundColor: '#eee'
              }),

              pathCopyButton: SC.ButtonView.design({
                  layout: { top: 170, left: 20, width: 80, height: 23 },
                  title: 'Copy Path',
                  action: function() {
                      var modifier = (navigator.platform.toUpperCase().indexOf('MAC') >= 0) ? 'Cmd' : 'Ctrl';
                      window.prompt("Copy to clipboard: " + modifier + "+C, Enter", CWB.fileController.get('path'));
                  }
              }),

              derivativeLabel: SC.LabelView.design({
                  layout: { top: 220, left: 20, width: 80, height: 18 },
                  value: 'Derivative of:'
              }),

              derivativeValue: SC.LabelView.design({
                  layout: { top: 220, left: 120, width: 120, height: 64 },
                  valueBinding: 'CWB.fileController.prettyDerivative'
              }),
          }),

          previewImage: SC.ImageView.extend({
              classNames: ['preview-image'],
              layout: { left: 20, top: 280, bottom: 40, right: 20, zIndex: 10 },
              scale: SC.BEST_FIT,
              valueBinding: 'CWB.fileController.previewURL',
              didLoad: function(image) {
                CWB.fileController.set('previewPlaceHolder', '');
                return sc_super();
              },
              didError: function(error) {
                CWB.fileController.set('previewPlaceHolder', 'Preview not available');
              }
          }),

          previewPlaceHolder: SC.LabelView.design({
              classNames: ['preview-placeholder'],
              layout: { left: 20, top: 300, right: 20, height:18, zIndex: 9 },
              textAlign: SC.ALIGN_CENTER,
              valueBinding: 'CWB.fileController.previewPlaceHolder'
          }),

          addDerivativeButton: SC.ButtonView.design({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { bottom: 6, left: 20, right: 20, height: 30 },
              title: 'Add Derivative',
              icon: sc_static('icons/add.png'),
              target: 'CWB.filesController',
              action: 'showAddDerivativePane'
          }),
      })
      })
  })
});

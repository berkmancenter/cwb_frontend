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

    downloadLabel: SC.LabelView.design({
      layout: { centerY: 0, height: 20, right: 150, width: 100 },
      value: 'Download PIM:',
      textAlign: SC.ALIGN_RIGHT
    }),

    downloadMenu: SC.SegmentedView.design({
      layout: { centerY: 0, height: 30, right: 12, width: 130 },
      items: [
        {title:'RDF/XML', action:'downloadRDF'},
        {title:'Turtle', action:'downloadTurtle'},
      ],
      itemTitleKey:'title',
      itemActionKey:'action',
      itemTargetKey:'target'
    })
  }),

  contentView: SC.SplitView.extend({
    dividerThickness: 1,
//    defaultThickness: 250,
    layoutDirection: SC.LAYOUT_HORIZONTAL,
    childViews: ['c1', 'c2', 'c3'],

    c1: CWB.SourceView.extend(SC.SplitChild, {
      size: 350
      //contentBinding: 'CWB.foldersController.arrangedObjects',
      //selectionBinding: 'CWB.foldersController.selection'
    }),

    c2: SC.WorkspaceView.extend(SC.SplitChild, {
      size: 840,
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
                  layout: { width: 130 },

                  itemValueKey: 'value',
                  itemTitleKey: 'title',
                  itemIconKey: 'icon',
                  items: [
                      SC.Object.create({ value: 'none', title: 'None', icon: sc_static('icons/empty.png'), checkbox: YES }),
                      SC.Object.create({ value: 'all', title: 'All', icon: sc_static('icons/empty.png') }),
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
                      if (selectedItemValue == 'all') {
                          var allFiles = CWB.filesController.get('content');
                          allFiles.setEach('isSelected', YES);
                      }
                      else if (selectedItemValue == 'none') {
                          //var selectedFiles = CWB.SELECTED_FILES;
                          var selectedFiles = CWB.filesController.get('content');
                          selectedFiles.setEach('isSelected', NO);
                      }
                      else {
                          var selectedFiles = CWB.filesController.get('content')
                          selectedFiles.setEach('isSelected', NO);
                          selectedFiles = selectedFiles.find(SC.Query.local(CWB.Node, selectedItemValue));
                          selectedFiles.setEach('isSelected', YES);
                      }
                      //CWB.filesController.updateSelectionAfterContentChange();
                      return YES;
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
                  contentSizeKey: 'size',
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
                  selectedNodes.setEach('isQueued', isQueued);
              },
              isEnabledBinding: SC.Binding.oneWay('CWB.SELECTED_FILES.length').bool()
          }),

          summaryLabel: SC.LabelView.extend({
              controlSize: SC.REGULAR_CONTROL_SIZE,
              layout: { centerY: 0, centerX: 0, width: 200, height: 18 },
              selectedCountBinding: SC.Binding.oneWay('CWB.SELECTED_FILES.length'),
              value: function() {
                  var selectedCount = CWB.SELECTED_FILES.get('length');
                  return '' + (selectedCount > 0 ? selectedCount : 'No') + ' ' + (selectedCount == 1 ? 'file' : 'files') + ' selected';
              }.property('selectedCount').cacheable(),
              isEnabledBinding: SC.Binding.oneWay('CWB.SELECTED_FILES.length').bool()
          }),

          addTagsButton: SC.ButtonView.extend({
              controlSize: SC.HUGE_CONTROL_SIZE,
              layout: { centerY: 0, height: 30, right: 174, width: 110 },
              icon: sc_static('icons/tag-on.png'),
              title: "Add Tags",
              action: function(unused) {
                  var selectedNodes = CWB.filesController.get('content').find(CWB.SELECTED_NODES_QUERY);
                  CWB.filesController.startTaggingFiles(selectedNodes);
              },
              isEnabledBinding: SC.Binding.oneWay('CWB.SELECTED_FILES.length').bool()
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
                  CWB.filesController.sendBatchStarRequest(selectedNodes, doStar);
              },
              isEnabledBinding: SC.Binding.oneWay('CWB.SELECTED_FILES.length').bool()
          })
      })
      }),

    c3: SC.WorkspaceView.extend(SC.SplitChild, {
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
          childViews: 'infoBox previewImage'.w(),

          infoBox: SC.View.extend({
              backgroundColor: '#eee',
              childViews: 'typeLabel typeValue sizeLabel sizeValue createdLabel createdValue lastModifiedLabel lastModifiedValue modifiedByLabel modifiedByValue pathLabel pathValue'.w(),

              typeLabel: SC.LabelView.design({
                  layout: { top: 20, left: 20, width: 80, height: 18 },
                  value: 'Type:'
              }),

              typeValue: SC.LabelView.design({
                  layout: { top: 20, left: 120, width: 120 },
                  valueBinding: 'CWB.fileController.type'
              }),

              sizeLabel: SC.LabelView.design({
                  layout: { top: 54, left: 20, width: 80, height: 18 },
                  value: 'Size:'
              }),

              sizeValue: SC.LabelView.design({
                  layout: { top: 54, left: 120, width: 120, height: 18 },
                  valueBinding: SC.Binding.number('bytes').from('CWB.fileController.size')
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
                  layout: { top: 150, left: 120, width: 120, height: 72 },
                  valueBinding: 'CWB.fileController.path'
                  //isEditable: NO,
                  //isTextArea: YES,
                  //shouldRenderBorder: NO,
                  //backgroundColor: '#eee'
              })
          }),

          previewImage: SC.ImageView.extend({
              layout: { left: 20, top: 254, bottom: 20, right: 20 }, // TODO
              scale: SC.BEST_FIT
              // valueBinding: 'CWB.fileController.previewURL'
          })
      })
      })
  })
});

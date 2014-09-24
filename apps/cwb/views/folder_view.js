sc_require('core');
sc_require('views/source_list_view');
sc_require('views/folder_list_item_view');

CWB.FolderView = SC.View.extend({
  layout: { top: 0, left: 0, bottom: 0, right: 0 },
  childViews: 'titleLabel expandButton collapseButton listView'.w(),

    titleLabel: SC.LabelView.extend({
        layout: { top: 15, left: 24, height: 24, right: 120 },
        controlSize: SC.REGULAR_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value: 'FOLDERS',
        backgroundColor: '#eee'
    }),

    collapseButton: SC.ButtonView.extend({
        layout: { top: 10, width: 85, height: 24, right: 5 },
        controlSize: SC.REGULAR_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        title: 'Collapse All',
        backgroundColor: '#eee',
        action: 'collapseAll'
    }),

    expandButton: SC.ButtonView.extend({
        layout: { top: 10, width: 85, height: 24, right: 95 },
        controlSize: SC.REGULAR_CONTROL_SIZE,
        title: 'Expand All',
        backgroundColor: '#eee',
        action: 'expandAll'
    }),

    listView: SC.ScrollView.extend({
    layout: { top: 42, left: 0, bottom: 0, right: 0 },
    hasHorizontalScroller: NO,

    contentView: CWB.SourceListView.extend({
      contentValueKey: 'name',
      contentBinding: 'CWB.foldersController.arrangedObjects',
      selectionBinding: 'CWB.foldersController.selection',
      backgroundColor: '#eee',

      exampleView: CWB.FolderListItemView.extend({
        contentValueKey: 'name',
        contentIconKey: 'icon',
        contentUnreadCountKey: 'untaggedCount'
      })
    })
  })
});

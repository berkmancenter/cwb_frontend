sc_require('core');
sc_require('views/source_list_view');
sc_require('views/folder_view');

CWB.SourceView = SC.View.extend({
  layout: { top: 0, left: 0, bottom: 0, right: 0 },
  childViews: 'sourceView folderView'.w(),

  sourceView: CWB.SourceListView.extend({
    layout: { top: 0, left: 0, bottom: 0, right: 0 },
    backgroundColor: '#eee',

    exampleView: SC.ListItemView.extend({
      hasContentIcon: true,
      contentValueKey: 'title',
      contentIconKey: 'icon',
      contentUnreadCountKey: 'count'
    }),

    contentBinding: 'CWB.sourcesController.arrangedObjects', // FIXME
    selectionBinding: 'CWB.sourcesController.selection'     // FIXME
  }),

  folderView: CWB.FolderView.extend({
    layout: { top: 64, left: 0, bottom: 0, right: 0 }
  })
});

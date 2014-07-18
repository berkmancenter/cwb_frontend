CWB.MANAGING_FILES = SC.State.extend({
  enterState: function() {
    var vocabularyID = 1; // FIXME
    CWB.termsController.set('vocabularyID', vocabularyID);

    var projectID = CWB.projectController.get('id');

    var rootFolders = CWB.store.find(SC.Query.local(CWB.Folder, {
      conditions: 'project.id = %@ AND parent = 0',
      parameters: [projectID],
      orderBy: 'name ASC'
    }));

    var rootNode = SC.Object.create(SC.TreeItemContent, {
      treeItemIsGrouped: YES,
      treeItemIsExpanded: YES,
      treeItemChildren: rootFolders,
      count: rootFolders.get('length')
    });

    CWB.filesController.set('content', null);
    CWB.foldersController.set('content', rootNode);
    CWB.foldersController.selectObject(rootFolders.firstObject());

    CWB.getPath('mainPage.mainPane').append();
    CWB.routes.setRoute('files');
  },

  exitState: function() {
    CWB.getPath('mainPage.mainPane').remove();
  },

  showTagPane: function(callback) {
    CWB.mainPage.set('tagPaneIsVisible', YES);
    CWB.mainPage.set('tagPaneCallback', callback);
  },

  downloadPIM: function() {
    window.location.href = '/download'; /* @see RootController#download */
  }
});

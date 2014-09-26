CWB.MANAGING_FILES = SC.State.extend({
  enterState: function() {
    CWB.projectController.fetchRootFolders();
    var projectID = CWB.projectController.get('id');

    CWB.getPath('mainPage.mainPane').append();
    CWB.routes.setRoute('files');
//    CWB.routes.setRoute("project/%@/files".fmt(encodeURIComponent(projectID)));
  },

  exitState: function() {
    var folderIDs = [];
    CWB.projectController.get('folders').forEach(function (folder) {
      folderIDs.push(folder.get('id'));
    });
    CWB.store.refreshRecords(CWB.Folder, folderIDs);

    var fileIDs = [];
    CWB.projectController.get('files').forEach(function (file) {
      fileIDs.push(file.get('id'));
    });
    CWB.store.refreshRecords(CWB.File, fileIDs);

    CWB.getPath('mainPage.mainPane').remove();
  },

  showTagPane: function(callback) {
    CWB.mainPage.set('tagPaneIsVisible', YES);
    CWB.mainPage.set('tagPaneCallback', callback);
  },

  downloadRDF: function() {
    window.location.href = '/projects/' + encodeURIComponent(CWB.projectController.get('id')) + '/download?choice=rdfxml';
  },

  downloadTurtle: function() {
    window.location.href = '/projects/' + encodeURIComponent(CWB.projectController.get('id')) + '/download?choice=n3';
  },

    expandAll: function() {
        CWB.foldersController.arrangedObjects().toArray().forEach(function(folder) {
            folder.expandAll();
        });
    },

    collapseAll: function() {
        CWB.foldersController.arrangedObjects().toArray().forEach(function(folder) {
            folder.collapseAll();
        });
    }
});

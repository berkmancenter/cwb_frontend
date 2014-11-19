CWB.MANAGING_FILES = SC.State.extend({
  enterState: function() {
    if (typeof window.hasFetchedData !== 'undefined' && window.currentProject) {
      console.log('cleaning up project state');
      delete window.hasFetchedData[window.currentProject];
    }

    CWB.projectController.fetchRootFolders();
    var projectID = CWB.projectController.get('id');

    CWB.getPath('mainPage.mainPane').append();
    CWB.routes.setRoute('files');
//    CWB.routes.setRoute("project/%@/files".fmt(encodeURIComponent(projectID)));
  },

  exitState: function() {
    // trash the current store and recreate
    // this solves a myriad of performance problems because of the state SC keeps around
    CWB.store.flush();
    CWB.store.reset();
    CWB.store = SC.Store.create().from('CWB.RailsDataSource');

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

  downloadDerivatives: function() {
    window.location.href = '/projects/' + encodeURIComponent(CWB.projectController.get('id')) + '/derivatives_download';
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

CWB.MANAGING_FILES = SC.State.extend({
  enterState: function() {
    var vocabularyIndex = 0; // FIXME
    CWB.termsController.set('vocabularyIndex', vocabularyIndex);

    CWB.projectController.fetchRootFolders();
    var projectID = CWB.projectController.get('id');

    CWB.getPath('mainPage.mainPane').append();
    CWB.routes.setRoute('files');
//    CWB.routes.setRoute("project/%@/files".fmt(encodeURIComponent(projectID)));
      
  },

  exitState: function() {
    CWB.getPath('mainPage.mainPane').remove();
  },

  showTagPane: function(callback) {
    CWB.mainPage.set('tagPaneIsVisible', YES);
    CWB.mainPage.set('tagPaneCallback', callback);
  },

  downloadRDF: function() {
    window.location.href = '/download?choice=rdfxml';
  },

  downloadTurtle: function() {
    window.location.href = '/download?choice=n3';
  }
});

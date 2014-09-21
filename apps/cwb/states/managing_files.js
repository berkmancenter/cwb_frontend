CWB.MANAGING_FILES = SC.State.extend({
  enterState: function() {
    var vocabularyIndex = 0; // FIXME
    CWB.termsController.set('vocabularyIndex', vocabularyIndex);

    var projectID = CWB.projectController.get('id');

    var rootFolders = CWB.store.find(SC.Query.local(CWB.Folder, {
      conditions: 'project.id = %@ AND parent = null',
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
//    CWB.routes.setRoute("project/%@/files".fmt(encodeURIComponent(projectID)));

      CWB.zeroclient = new ZeroClipboard();
  },

  exitState: function() {
      CWB.zeroclient.destroy();
    CWB.getPath('mainPage.mainPane').remove();
  },

    setupclip: function() {
        CWB.zeroclient.destroy();
        CWB.zeroclient = new ZeroClipboard( document.getElementById("file-path-clip-button") );
        CWB.zeroclient.on( "ready", function( readyEvent ) {
            console.log( "ZeroClipboard SWF is ready!" );

//            CWB.zeroclient.on( "copy", function(event) {
//                console.log("ZeroClipboard: Copying text to clipboard: " + event.data["text/plain"] );
//                event.clipboardData.setData('text/plain', CWB.fileController.get('path'));
//            });

            CWB.zeroclient.on( "aftercopy", function( event ) {
                console.log("ZeroClipboard: Copied text to clipboard: " + event.data["text/plain"] );
            });

            CWB.zeroclient.on( "destroy", function( event ) {
                console.log("ZeroClipboard destroyed");
            });
        });
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

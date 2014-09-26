CWB.MANAGING_FILES = SC.State.extend({
  enterState: function() {
    CWB.projectController.fetchRootFolders();
    var projectID = CWB.projectController.get('id');

    CWB.getPath('mainPage.mainPane').append();
    CWB.routes.setRoute('files');
//    CWB.routes.setRoute("project/%@/files".fmt(encodeURIComponent(projectID)));

      CWB.zeroclient = new ZeroClipboard();
  },

  exitState: function() {
    CWB.zeroclient.destroy();

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

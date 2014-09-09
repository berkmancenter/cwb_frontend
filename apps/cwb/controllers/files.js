sc_require('core');

CWB.filesController = SC.ArrayController.create({
  allowsMultipleSelection: YES,

  selectedProject: null,
  selectedSource: null,
  selectedFolder: null,

  orderBy: 'name',
  filterConditions: null,
  searchText: null,

  starButtonTitle: "Mark Important",
  starButtonIcon: sc_static('icons/star-on.png'),
  queueButtonTitle: "Add to Work Queue",

  projectDidChange: function() {
    // TODO
  }.observes('.selectedProject'),

  orderByDidChange: function() {
    this.reload();
  }.observes('.orderBy'),

  filterConditionsDidChange: function() {
    this.reload();
  }.observes('.filterConditions'),

  searchTextDidChange: function() {
    this.reload();
  }.observes('.searchText'),

  sourceDidChange: function() {
    if (!CWB.sourcesController.hasSelection()) {
      this.set('content', null);
    }
    else {
      CWB.foldersController.selectObject(null);

      var selectedSource = CWB.sourcesController.get('selection').firstObject().value;

      this.set('starButtonTitle',
        (selectedSource != 'starred') ? "Mark Important" : "Mark Unimportant");
      this.set('starButtonIcon',
        (selectedSource != 'starred') ? sc_static('icons/star-on.png') : sc_static('icons/star-off.png'));
      this.set('queueButtonTitle',
        (selectedSource != 'queued') ? "Add to Work Queue" : "Remove from Work Queue");

      this.set('selectedSource', selectedSource);
      this.set('selectedFolder', null);
      this.reload();
    }
  }.observes('CWB.sourcesController.selection'),

  folderDidChange: function() {
    if (!CWB.foldersController.hasSelection()) {
      this.set('content', null);
    }
    else {
      CWB.sourcesController.selectObject(null);

      var selectedFolder = CWB.foldersController.get('selection').firstObject().get('id');

      this.set('starButtonTitle', "Mark Important");
      this.set('starButtonIcon', sc_static('icons/star-on.png'));
      this.set('queueButtonTitle', "Add to Work Queue");
      this.set('selectedFolder', selectedFolder);
      this.set('selectedSource', null);
      this.reload();
    }
  }.observes('CWB.foldersController.selection'),

  reload: function() {
    var selectedSource = this.get('selectedSource');
    var selectedFolder = this.get('selectedFolder');
    var orderBy = '' + this.get('orderBy') + ' ASC';
    var filterConditions = this.get('filterConditions');
    var searchText = this.get('searchText');

    if (!selectedSource && !selectedFolder) {
      this.set('content', null);
      return;
    }

    var conditions = '';
    var parameters = {};

    if (selectedSource) {
      if (selectedSource == 'starred') {
        conditions = 'isStarred = YES';
      }
      else if (selectedSource == 'queued') {
        conditions = 'isQueued = YES';
      }
    }
    else if (selectedFolder) {
      conditions = 'folder.id = {folder}';
      parameters.folder = selectedFolder;
    }

    if (filterConditions && filterConditions != '') {
      conditions += ' AND ' + filterConditions;
    }

    if (searchText && searchText != '') {
      conditions += ' AND name CONTAINS {search}';
      parameters.search = searchText;
    }

    this.set('content', CWB.store.find(SC.Query.local(CWB.File, {
      conditions: conditions,
      parameters: parameters,
      orderBy: orderBy
    })));
  },

  sendStarRequest: function(file) {
    var projectID = encodeURIComponent(CWB.projectController.get('id'));
    var fileID = encodeURIComponent(file.get('id'));
    var star_path = file.isStarred() ? "unstar_file" : "star_file";

    file.toggleStarred();

    // send star/unstar request to backend
    SC.Request.putUrl("/projects/" + projectID + "/" + star_path + "/" + fileID)
      .notify(this, function(response) {
        if (!SC.ok(response)) {
          SC.AlertPane.error('Sorry. We were unable to process your request.');
          file.toggleStarred();
        }
      }).json().send();
  },

  sendBatchStarRequest: function(selectedFiles, doStar) {
    var selectedIds = [];
    var oldStarStates = [];

    selectedFiles.forEach(function(file) {
      selectedIds.push(file.get('id'));
      oldStarStates.push(file.get('starred'));
      file.set('starred', doStar);
    });

    // send batch star/unstar request to backend
    var projectID = encodeURIComponent(CWB.projectController.get('id'));
    var star_path = doStar ? "star_files" : "unstar_files";
    SC.Request.putUrl("/projects/" + projectID + "/" + star_path, {'ids': selectedIds})
      .notify(this, function(response, files, oldStarStates) {
        if (!SC.ok(response)) {
          SC.AlertPane.error('Sorry. We were unable to process your request.');
          // something went wrong, set files back to original starred state
          files.forEach(function(file, i) {
            file.set('starred', oldStarStates[i]);
          });
        }
      }, selectedFiles, oldStarStates).json().send();
  }
});

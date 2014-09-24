// ==========================================================================
// Project:   CWB.Folder
// ==========================================================================
/*globals CWB */
sc_require('models/node_model');

/** @class

  (Document your Model here)

  @extends CWB.Node
  @version 0.1
*/
CWB.Folder = CWB.Node.extend(
/** @scope CWB.Folder.prototype */ {

  project: SC.Record.toOne('CWB.Project', { isMaster: NO, inverse: 'folders' }),
  parent: SC.Record.attr(String),
  files: SC.Record.toMany('CWB.File', { isMaster: NO, inverse: 'folder' }),

  name: SC.Record.attr(String),

  subfolders: SC.Record.attr(Array, { defaultValue: [] }),
  alreadyInstalledSubfolders: SC.Record.attr(Boolean, { defaultValue: false }),
  installSubfolders: function(force) {
    if (!this.get('alreadyInstalledSubfolders') || !!force) {
      this.set('alreadyInstalledSubfolders', true);
      var ret = CWB.store.find(SC.Query.local(CWB.Folder,
          { conditions: 'parent = %@', parameters: [this.get('id')], orderBy: 'name ASC' }));
      this.set('subfolders', ret);
    }
  },

  subfoldersDidUpdate: function() {
    this.get('subfolders').forEach(function (folder) {
      folder.installSubfolders();
    });
  }.observes('subfolders'),

  treeItemIsExpanded: NO,

  treeItemChildren: function() {
    return this.get('subfolders');
  }.property('subfolders').cacheable(),

  count: function() {
    return this.getPath('subfolders.length');
  }.property('subfolders.length').cacheable(),

  path: SC.Record.attr(String),

  typeTitle: function() {
    return 'Folder';
  }.property(),

  icon: function() {
    return sc_static('icons/files/folder.png');
  }.property('name').cacheable(),

  starred_count: SC.Record.attr(Number, { defaultValue: null }),

  untaggedCount: function() {
    return this.get('file_count') - this.get('tagged_count');
  }.property(),

    expandAll: function() {
        this.set('treeItemIsExpanded', YES);
        if(this.get('count') > 0) {
            this.get('subfolders').toArray().forEach(function(folder) {
               folder.expandAll();
            });
        }
    },

    collapseAll: function() {
        this.set('treeItemIsExpanded', NO);
        if(this.get('count') > 0) {
            this.get('subfolders').toArray().forEach(function(folder) {
                folder.collapseAll();
            });
        }
    }
});

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

  parent: SC.Record.attr(Number, { defaultValue: 0 }), // FIXME
  files: SC.Record.toMany('CWB.File', { isMaster: YES, inverse: 'folder' }),

  name: SC.Record.attr(String),

  subfolders: function() {
    return CWB.store.find(SC.Query.local(CWB.Folder,
      { conditions: 'parent = %@', parameters: [this.get('id')], orderBy: 'name ASC' }));
  }.property().cacheable(),

  treeItemIsExpanded: NO,

  treeItemChildren: function() {
    return this.get('subfolders');
  }.property('subfolders').cacheable(),

  count: function() {
    return this.getPath('subfolders.length');
  }.property('*subfolders.length').cacheable(),

  path: function() {
    var name = this.get('name');
    var parentID = this.getPath('parent');
    var parent = null;
    if (parentID !== 0) {
      parent = CWB.store.find(CWB.Folder, parentID);
    }
    return (parent != null) ? parent.get('path') + '/' + name : name;
  }.property('name').cacheable(),

  typeTitle: function() {
    return 'Folder';
  }.property(),

  icon: function() {
    return sc_static('icons/files/folder.png');
  }.property('name').cacheable(),

  fileCount: function() {
    return this.get('untaggedCount');
  }.property('untaggedCount'),

  starredCount: function() {
    var query = SC.Query.local(CWB.File, { conditions: 'folder.id = %@ AND isStarred = YES', parameters: [this.get('id')] });
    var count = CWB.store.find(query).get('length');
    return count;
  }.property(),

  untaggedCount: function() {
    var query = SC.Query.local(CWB.File, { conditions: 'folder.id = %@ AND tag1 = null AND tag2 = null AND tag3 = null AND tag4 = null AND tag5 = null AND tag6 = null', parameters: [this.get('id')] });
    var count = CWB.store.find(query).get('length');
    return count;
  }.property()
});

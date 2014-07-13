// ==========================================================================
// Project:   CWB.Term
// ==========================================================================
/*globals CWB */

/** @class

  (Document your Model here)

  @extends CWB.Resource
  @version 0.1
*/
CWB.Term = CWB.Resource.extend(
/** @scope CWB.Term.prototype */ {

  project: function() {
    return this.getPath('vocabulary.project');
  }.property('vocabulary').cacheable(),

  vocabulary: SC.Record.toOne('CWB.Vocabulary', { isMaster: NO }),

  label: SC.Record.attr(String),
  description: SC.Record.attr(String),

  icon: function() {
    return sc_static('icons/tag-on.png');
  }.property().cacheable(),

  files: function() {
    var vocabularyID = this.getPath('vocabulary.id');
    return CWB.store.find(SC.Query.local(CWB.File, {
      conditions: 'tag' + vocabularyID + ' = %@',
      parameters: [this.get('id')]
    }));
  }.property('vocabulary'),

  fileCount: function() {
    return this.getPath('files.length');
  }.property('files').cacheable()
});

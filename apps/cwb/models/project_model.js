// ==========================================================================
// Project:   CWB.Project
// ==========================================================================
/*globals CWB */
sc_require('models/resource_model');

/** @class

    (Document your Model here)

 @extends CWB.Resource
 @version 0.1
 */
CWB.Project = CWB.Resource.extend(
    /** @scope CWB.Project.prototype */ {

        vocabularies: SC.Record.toMany('CWB.Vocabulary', { isMaster: YES, inverse: 'project' }),

//        nodes: SC.Record.toMany('CWB.Node', { isMaster: YES, inverse: 'project' }),
//
//        folders: function() {
//            return CWB.store.find(SC.Query.local(CWB.Folder, {
//                conditions: 'project.id = %@',
//                parameters: [this.get('id')]
//            }));
//        }.property('nodes').cacheable(),
//
//        files: function() {
//            return CWB.store.find(SC.Query.local(CWB.File, {
//                conditions: 'project.id = %@',
//                parameters: [this.get('id')]
//            }));
//        }.property('nodes').cacheable(),

        name: SC.Record.attr(String),
        description: SC.Record.attr(String),
        path: SC.Record.attr(String),

//        isArchived: SC.Record.attr(Boolean, { defaultValue: NO }),

        icon: function() {
            return sc_static('icons/project.png');
        }.property().cacheable()
    });

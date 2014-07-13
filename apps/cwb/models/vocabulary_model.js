// ==========================================================================
// Project:   CWB.Vocabulary
// ==========================================================================
/*globals CWB */

/** @class

    (Document your Model here)

 @extends CWB.Resource
 @version 0.1
 */
CWB.Vocabulary = CWB.Resource.extend(
    /** @scope CWB.Vocabulary.prototype */ {

        project: SC.Record.toOne('CWB.Project', { isMaster: NO }),

        terms: SC.Record.toMany('CWB.Term', { isMaster: YES, inverse: 'vocabulary' }),

        label: SC.Record.attr(String),
        description: SC.Record.attr(String)
    });

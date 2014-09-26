// ==========================================================================
// Project:   CWB.Node
// ==========================================================================
/*globals CWB */
sc_require('models/resource_model');

/** @class

  (Document your Model here)

  @extends CWB.Resource
  @version 0.1
*/
CWB.Node = CWB.Resource.extend(SC.TreeItemContent,
/** @scope CWB.Node.prototype */ {

  treeItemIsExpanded: NO,
  treeItemChildren: [],
  count: 0,

  query: function(conditions) {
    return SC.Query.local(CWB.Node, conditions);
  }
});

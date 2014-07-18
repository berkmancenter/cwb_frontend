sc_require('core');

CWB.foldersController = SC.TreeController.create({
  treeItemIsGrouped: YES,
  canSelectGroups: YES,
  allowsMultipleSelection: NO,

  firstSelectableObject: function() {
    SC.Logger.log('' + new Date() + ' CWB.foldersController#firstSelectableObject()'); // DEBUG
    return sc_super();
  }.property()
});

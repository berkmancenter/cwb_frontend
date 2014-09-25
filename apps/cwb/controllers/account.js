sc_require('core');

CWB.accountController = SC.ObjectController.create({
  contentBinding: SC.Binding.single('CWB.accountsController.selection')
});

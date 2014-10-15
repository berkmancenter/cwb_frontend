sc_require('core');

CWB.termController = SC.ObjectController.create({
  contentBinding: 'CWB.termsController.selection',

  isEditable: false,
  lockedDidChange: function() {
		if (this.get('locked') == 'false') {
			this.set('isEditable', true);
		} else {
			this.set('isEditable', false);
		}
  }.observes('locked')
});

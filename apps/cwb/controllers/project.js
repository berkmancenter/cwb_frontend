sc_require('core');

CWB.projectController = SC.ObjectController.create({
    contentBinding: 'CWB.projectsController.selection',

    versionPlusName: 'CWB (v' + CWB.VERSION + ')',
    nameDidChange: function() {
			this.set('versionPlusName', 'CWB (v' + CWB.VERSION + ') - ' + this.get('name'));
    }.observes('name')
});

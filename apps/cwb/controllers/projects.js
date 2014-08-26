sc_require('core');

CWB.projectsController = SC.ArrayController.create({
    allowsMultipleSelection: NO,

    selectionDidChange: function() {
        var vocabularyID = CWB.termsController.get('vocabularyID');
        CWB.termsController.set('content', CWB.TERMS_IN_VOCABULARY[vocabularyID]);
    }.observes('selection'),

    newName: null,
    newDescription: null,
    newPath: null,
    newFiles: [],

    resetNewProject: function() {
			this.set('newName', null);
			this.set('newDescription', null);
			this.set('newPath', null);
    },

    newProjectIsValid: NO,

		newProjectDetailsDidChange: function() {
			if (this.get('newName') !== null && this.get('newName').length > 0 &&
						this.get('newDescription') !== null && this.get('newDescription').length > 0 &&
						this.get('newPath') !== null && this.get('newPath').length > 0)
				this.set('newProjectIsValid', YES);
			else
				this.set('newProjectIsValid', NO);
		}.observes('newName', 'newDescription', 'newPath'),
});

sc_require('core');

CWB.projectsController = SC.ArrayController.create({
    allowsMultipleSelection: NO,

    selectionDidChange: function() {
        var vocabularyIndex = CWB.termsController.get('vocabularyIndex');
        CWB.termsController.set('content', CWB.TERMS_IN_VOCABULARY[vocabularyIndex]);
    }.observes('selection'),

    newName: null,
    newDescription: null,
    newPath: null,

    showCreateProjectPane: function() {
        CWB.mainPage.set('createProjectPaneIsVisible', YES);
        CWB.mainPage.set('createProjectPaneCallback', function (saved) {
            if (saved) {
                var project = CWB.store.createRecord(CWB.Project, {
                    name: CWB.projectsController.newName,
                    description: CWB.projectsController.newDescription,
                    path: CWB.projectsController.newPath
                });
                CWB.projectsController.setSavingProjectRecord(project);
                project.commitRecord();
            } else {
                CWB.projectsController.resetNewProject();
            }
        });
    },

    showRemoveProjectAlert: function() {
        SC.AlertPane.warn({
            message: "Are you sure?",
            description: "Removing this project is permanent and cannot be undone. Make sure you export the PIM before continuing.",
            buttons: [
                { title: "Remove", action: "removeProject", target: this },
                { title: "Cancel" },
            ]
        });
    },

    removeProject: function() {
        var projectID = CWB.projectController.get('id');
        var project = CWB.store.find(CWB.Project, projectID);
        project.destroy();
        project.commitRecord();
        CWB.projectsController.set('selection', null);
    },

    setSavingProjectRecord: function(project) {
			this.set('savingProjectRecord', project);
      CWB.mainPage.set('createProjectPaneMessage', 'Creating project...');
      this.set('enableSaveButton', NO);
    },

    resetNewProject: function() {
			this.set('newName', null);
			this.set('newDescription', null);
			this.set('newPath', null);
			this.set('savingProjectRecord', null);
			CWB.mainPage.set('createProjectPaneMessage', '');
    },

    enableSaveButton: NO,

		newProjectDetailsDidChange: function() {
			if (this.get('newName') !== null && this.get('newName').length > 0 &&
						this.get('newDescription') !== null && this.get('newDescription').length > 0 &&
						this.get('newPath') !== null && this.get('newPath').length > 0)
				this.set('enableSaveButton', YES);
			else
				this.set('enableSaveButton', NO);
		}.observes('newName', 'newDescription', 'newPath'),

		savingProjectRecord: null,

		savingProjectSuccess: function (project) {
            var project_name = project.get('name');
            project.destroy();
			CWB.mainPage.set('createProjectPaneIsVisible', NO);
            CWB.projectsController.set('selection', null);
			CWB.projectsController.resetNewProject();
            SC.AlertPane.info("Your project (" + project_name+ ") is being created. You'll receive an email at " + CWB.loginController.email + " once it is ready.");
		},

		savingProjectError: function(error) {
			this.savingProjectRecord.destroy();
			CWB.mainPage.set('createProjectPaneMessage', 'Unable to create project.\nPlease make sure Path is a valid directory.');
			this.set('enableSaveButton', YES);
			this.set('savingProjectRecord', null);
		},

		savingProjectRecordStatusDidChange: function() {
      var project = this.get('savingProjectRecord');
			if (project !== null) {
				var status = project.get("status");
				if (status === SC.Record.READY_CLEAN) {
					this.savingProjectSuccess(project);
				} else if (project.get('isError')) {
					this.savingProjectError(project.get('errorObject'));
				}
			}
    }.observes('*savingProjectRecord.status')
});

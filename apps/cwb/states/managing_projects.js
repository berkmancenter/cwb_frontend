CWB.MANAGING_PROJECTS = SC.State.extend({
    projectNo: 0,
    termNo: 0,

    enterState: function() {
        var vocabularyIndex = 0; // FIXME
        CWB.termsController.set('vocabularyIndex', vocabularyIndex);

        // we should NOT have to do this... but this is sproutcore afterall
        CWB.store.reset();

        var allProjects = CWB.store.find(CWB.PROJECTS_QUERY);
        CWB.projectsController.set('content', allProjects);
        CWB.projectsController.selectObject(allProjects.firstObject());
        CWB.store.find(CWB.FOLDERS_QUERY);
        CWB.store.find(CWB.FILES_QUERY);

        CWB.SELECTED_FILES = CWB.store.find(CWB.SELECTED_FILES_QUERY);

        CWB.projectController.set('rootFolders', []);
        CWB.filesController.set('content', null);
        CWB.foldersController.set('content', null);

        CWB.getPath('mainPage.projectPane').append();
        CWB.routes.setRoute(''); //('projects');
    },

    exitState: function() {
        CWB.getPath('mainPage.projectPane').remove();
    },

    createTerm: function() {
        var vocabularyIndex = CWB.termsController.get('vocabularyIndex');
        var vocabulary = CWB.VOCABULARIES[vocabularyIndex];
        var projectID = CWB.projectController.get('id');
        var termNo = ++this.termNo;
        var term = CWB.store.createRecord(CWB.Term, {
            label: 'New Term #' + termNo,
            project: projectID,
            vocabulary: vocabularyIndex
        });
        CWB.termsController.selectObject(term);
        this.showTermEditPane(null, function(result) {
            if (result) {
                // user clicked save
                CWB.mainPage.set('tagEditPaneMessage', 'Saving term...');
                var label = term.get('label') || '';
                var description = term.get('description') || '';
                SC.Request.postUrl("/projects/" + encodeURIComponent(projectID) + "/vocabularies/" + encodeURIComponent(vocabulary.id) + "/terms", {'label':label, 'description':description})
                    .notify(this, function(response, term) {
                        if (SC.ok(response)) {
                            CWB.mainPage.set('tagEditPaneMessage', '');
                            CWB.mainPage.set('tagEditPaneIsVisible', NO);
                            term.destroy();
                            CWB.projectController.cacheVocabulariesForSelectedProject();
                        } else {
                            CWB.mainPage.set('tagEditPaneMessage', 'Unable to save term. Please try again.');
                        }
                    }, term).json().send();
            } else {
                // user canceled
                term.destroy();
                CWB.mainPage.set('tagEditPaneMessage', '');
                CWB.termsController.selectObject(null);
            }
        });
    },

    removeTerm: function() {
        var termID = CWB.termController.get('id');
        var projectID = CWB.projectController.get('id');
        var vocabularyIndex = CWB.termsController.get('vocabularyIndex');
        var vocabulary = CWB.VOCABULARIES[vocabularyIndex];

        SC.Request.deleteUrl("/projects/" + encodeURIComponent(projectID) + "/vocabularies/" + encodeURIComponent(vocabulary.id) + "/terms/" + encodeURIComponent(termID))
            .notify(this, function(response) {
                if (SC.ok(response)) {
                    CWB.projectController.cacheVocabulariesForSelectedProject();
                } else {
                    SC.AlertPane.error('Sorry. We were unable to process your request.');
                }
            }).json().send();
    },

    editTerm: function(view) {
        var listView = (view.classNames.contains("sc-button-view")) ? view.getPath('parentView.parentView.contentView.contentView') : view;
        var original = {id: CWB.termController.get('id'), label: CWB.termController.get('label'), description: CWB.termController.get('description')};
        var projectID = CWB.projectController.get('id');
        var vocabularyIndex = CWB.termsController.get('vocabularyIndex');
        var vocabulary = CWB.VOCABULARIES[vocabularyIndex];

        this.showTermEditPane(listView, function(result) {
            if (result) {
                // user clicked save
                CWB.mainPage.set('tagEditPaneMessage', 'Saving term...');
                var newLabel = CWB.termController.get('label');
                var newDescription = CWB.termController.get('description');
                SC.Request.putUrl("/projects/" + encodeURIComponent(projectID) + "/vocabularies/" + encodeURIComponent(vocabulary.id) + "/terms/" + encodeURIComponent(original.id), {'label':newLabel, 'description':newDescription})
                    .notify(this, function(response) {
                        if (SC.ok(response)) {
                            CWB.mainPage.set('tagEditPaneMessage', '');
                            CWB.mainPage.set('tagEditPaneIsVisible', NO);
                            CWB.projectController.cacheVocabulariesForSelectedProject();
                        } else {
                            CWB.mainPage.set('tagEditPaneMessage', 'Unable to save term. Please try again.');
                        }
                    }).json().send();
            } else {
                // user canceled
                CWB.mainPage.set('tagEditPaneMessage', '');
                CWB.termController.set('label', original.label);
                CWB.termController.set('description', original.description);
            }
        });
    },

    showTermEditPane: function(listView, callback) {
        CWB.mainPage.set('tagEditPaneIsVisible', YES);
        CWB.mainPage.set('tagEditPaneCallback', function(result) {
            if (listView !== null && listView !== undefined) {
                listView.reload(null); /* updates the tool tips for all displayed terms */
            }
            if (callback !== null && callback !== undefined) {
                return callback(result);
            }
        });
        CWB.getPath('mainPage.tagEditPane.contentView.name.field').becomeFirstResponder();
    }
});

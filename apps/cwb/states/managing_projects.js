CWB.MANAGING_PROJECTS = SC.State.extend({
    projectNo: 0,
    termNo: 0,

    enterState: function() {
        var vocabularyIndex = 0; // FIXME
        CWB.termsController.set('vocabularyIndex', vocabularyIndex);

        CWB.getPath('mainPage.projectPane').append();
        CWB.routes.setRoute(''); //('projects');
    },

    exitState: function() {
        CWB.getPath('mainPage.projectPane').remove();
    },

    createTerm: function() {
        var vocabularyIndex = CWB.termsController.get('vocabularyIndex');
        var vocabulary = CWB.store.find(CWB.Vocabulary, vocabularyIndex);
        var projectID = vocabulary.getPath('project.id');
        var termID = -Math.floor(Math.random() * 99999999); /* a temporary identifier */
        var termNo = ++this.termNo;
        var term = CWB.store.createRecord(CWB.Term, {
            label: 'New Term #' + termNo,
            project: projectID,
            vocabulary: vocabularyIndex
        }, termID);
        CWB.TERMS_IN_VOCABULARY[vocabularyIndex].reload();
        CWB.termsController.selectObject(term);
        this.showTermEditPane(null, function(result) {
            if (!result) {
                term.destroy();
            }
        });
    },

    removeTerm: function() {
        var termID = CWB.termController.get('id');
        var term = CWB.store.find(CWB.Term, termID);
        term.destroy();
    },

    editTerm: function(buttonView) {
        var original = {label: CWB.termController.get('label'), description: CWB.termController.get('description')};
        var listView = buttonView.getPath('parentView.parentView.contentView.contentView');
        this.showTermEditPane(listView, function(result) {
            if (!result) {
                CWB.termController.set('label', original.label);
                CWB.termController.set('description', original.description);
            }
        });
    },

    editTermFromDoubleClick: function(listView) {
        var original = {label: CWB.termController.get('label'), description: CWB.termController.get('description')};
        this.showTermEditPane(listView, function(result) {
            if (!result) {
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

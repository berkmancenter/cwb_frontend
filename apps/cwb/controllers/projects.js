sc_require('core');

CWB.projectsController = SC.ArrayController.create({
    allowsMultipleSelection: NO,

    selectionDidChange: function() {
        var vocabularyID = CWB.termsController.get('vocabularyID');
        CWB.termsController.set('content', CWB.TERMS_IN_VOCABULARY[vocabularyID]);
    }.observes('selection')
});

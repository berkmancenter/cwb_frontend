sc_require('core');

CWB.projectController = SC.ObjectController.create({
    contentBinding: 'CWB.projectsController.selection',

    versionPlusName: 'CWB (v' + CWB.VERSION + ')',
    selectedVocabularyIndex: null,

    idDidChange: function() {
			this.set('versionPlusName', 'CWB (v' + CWB.VERSION + ') - ' + this.get('name'));

			// go ahead and cache vocabs and terms for this project
			this.cacheVocabulariesForSelectedProject();
    }.observes('id'),

    cacheVocabulariesForSelectedProject: function() {
        CWB.VOCABULARIES = [];
				CWB.TERMS_IN_VOCABULARY = [];
				this.selectedVocabularyIndex = CWB.termsController.get('vocabularyIndex');
				CWB.termsController.set('vocabularyIndex', null);

        var projectID = encodeURIComponent(this.get('id'));

        SC.Request.getUrl("/projects/" + projectID + "/vocabularies")
            .notify(this, function(response, that) {
                if (SC.ok(response)) {
                    CWB.VOCABULARIES = response.get('body') || [];
                    CWB.VOCABULARIES.forEach(function(vocab, index) {
												that.getTermsForVocabulary(index);
                    });
                } else {
                    console.warn('Sorry, we were unable to fetch vocabularies for project: ' + projectID);
                    CWB.VOCABULARIES = [];
                }
            }, this).json().send();
    },

    getTermsForVocabulary: function(vocabIndex) {
				CWB.TERMS_IN_VOCABULARY = CWB.TERMS_IN_VOCABULARY || [];

				var projectID = encodeURIComponent(this.get('id'));
				var vocab = CWB.VOCABULARIES[vocabIndex];

				if (!!vocab) {
						var vocabId = encodeURIComponent(vocab.id);
						SC.Request.getUrl("/projects/" + projectID + "/vocabularies/" + vocabId + "/terms")
								.notify(this, function(response, vocabIndex) {
										if (SC.ok(response)) {
												CWB.TERMS_IN_VOCABULARY[vocabIndex] = response.get('body') || [];

												if ((this.selectedVocabularyIndex || 0) == vocabIndex) {
													CWB.termsController.set('vocabularyIndex', this.selectedVocabularyIndex || 0);
												}
										} else {
												console.warn('Sorry, we were unable to fetch terms for vocab: ' + vocabId);
												CWB.TERMS_IN_VOCABULARY[vocabIndex] = [];
										}
								}, vocabIndex).json().send();
				}
    }
});

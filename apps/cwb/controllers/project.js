sc_require('core');

CWB.projectController = SC.ObjectController.create({
    contentBinding: 'CWB.projectsController.selection',

    versionPlusName: 'FWB (v' + CWB.VERSION + ')',
    selectedVocabularyIndex: null,

    idDidChange: function() {
			this.set('versionPlusName', 'FWB (v' + CWB.VERSION + ') - ' + this.get('name'));

			// go ahead and cache vocabs and terms for this project
			this.cacheVocabulariesForSelectedProject();

      window.currentProject = CWB.projectController.get('id');
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
                    for(var i = 0; i < CWB.VOCABULARIES.length; i++) {
                      that.getTermsForVocabulary(i);
                    }
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
    },

    rootFolders: [],

    fetchRootFolders: function() {
			var projectID = CWB.projectController.get('id');

			this.set('rootFolders', CWB.store.find(SC.Query.local(CWB.Folder, {
				conditions: 'project.id = %@ AND parent = null',
				parameters: [projectID],
				orderBy: 'name ASC'
			})));
    },

		fetchingRootFoldersStatusDidChange: function() {
      var promise = this.get('rootFolders');
			if (promise !== null) {
				var status = promise.get("status");
				if (status === SC.Record.READY_CLEAN) {
					this.fetchingRootFoldersSuccess(promise);
				} else if (promise.get('isError')) {
					// console.error(promise.get('errorObject'));
					SC.AlertPane.error('Sorry. We were unable to process your request.');
				}
			}
    }.observes('*rootFolders.status'),

    fetchingRootFoldersSuccess: function(rootFolders) {
			rootFolders.toArray().forEach(function(root) {
				root.installSubfolders();
			});

			var rootNode = SC.Object.create(SC.TreeItemContent, {
				treeItemIsGrouped: YES,
				treeItemIsExpanded: YES,
				treeItemChildren: rootFolders,
				count: rootFolders.get('length')
			});

			CWB.filesController.set('content', null);
			CWB.foldersController.set('content', rootNode);
			// this is ugly and I'm not entirely sure why it works
			// but the proper file events don't get triggered until the second folder selection
			CWB.foldersController.selectObject(rootFolders.firstObject());
			CWB.foldersController.selectObject(rootFolders.firstObject());
    }
});

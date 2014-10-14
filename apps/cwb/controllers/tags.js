sc_require('core');

CWB.tagsController = SC.ArrayController.create({
  content: null,
  allowsMultipleSelection: YES,

  tagSet1: [],
  tagSet2: [],
  tagSet3: [],
  tagSet4: [],
  tagSet5: [],
  tagSet6: [],

  contentDidChange: function() {
    var content = this.get('content');
    if (!!content) {
      this.set('tagSet1', content[0] || []);
      this.set('tagSet2', content[1] || []);
      this.set('tagSet3', content[2] || []);
      this.set('tagSet4', content[3] || []);
      this.set('tagSet5', content[4] || []);
      this.set('tagSet6', content[5] || []);
    } else {
      this.set('tagSet1', []);
      this.set('tagSet2', []);
      this.set('tagSet3', []);
      this.set('tagSet4', []);
      this.set('tagSet5', []);
      this.set('tagSet6', []);
    }
  }.observes('content'),

  getTagSets: function() {
    return [
      this.get('tagSet1'),
      this.get('tagSet2'),
      this.get('tagSet3'),
      this.get('tagSet4'),
      this.get('tagSet5'),
      this.get('tagSet6')
    ];
  },

  isTagged: function() {
    if (this.get('tagSet1').length > 0 ) return YES;
    if (this.get('tagSet2').length > 0 ) return YES;
    if (this.get('tagSet3').length > 0 ) return YES;
    if (this.get('tagSet4').length > 0 ) return YES;
    if (this.get('tagSet5').length > 0 ) return YES;
    if (this.get('tagSet6').length > 0 ) return YES;
    return NO;
  },

  setupTagVocabArray: function(tagIds) {
    var that = this;
    var tagArray = [[], [], [], [], [], []];
    tagIds.forEach(function (tagId) {
      var index = that.findTagIndex(tagId);
      if (index >= 0 && index <= 5) tagArray[index].push(tagId);
    });
    return tagArray;
  },

  findTagIndex: function(tagId) {
    for(var i = 0; i <= 5; i++) {
      var vocab = CWB.TERMS_IN_VOCABULARY[i];
      if (vocab) {
        var result = $.grep(vocab, function(term) {
          return term.id === tagId;
        });

        if (result.length > 0) {
          return i;
        }
      }
    }
    return -1;
  },

  findTag: function(tagId) {
    for(var i = 0; i <= 5; i++) {
      var vocab = CWB.TERMS_IN_VOCABULARY[i];
      if (vocab) {
        var result = $.grep(vocab, function(t) {
          return t.id === tagId;
        });

        if (result.length > 0) {
          return result[0];
        }
      }
    }
    return;
  },

  findCommonTags: function (filesArray) {
    var common = [];
    var cntObj = {};
    var vocabsArray, tagsArray, item, cnt;
    // for each file
    for (var i = 0; i < filesArray.length; i++) {
        vocabsArray = filesArray[i];
        // for each vocab of the current file
        for (var j = 0; j < vocabsArray.length; j++) {
            tagsArray = vocabsArray[j];
            // for each tag within the vocab
            for(var k = 0; k < tagsArray.length; k++) {
              item = "-" + tagsArray[k];
              cnt = cntObj[item] || 0;
              // if cnt is exactly the number of files,
              // then increment by one so we count only one per array
              if (cnt == i) {
                  cntObj[item] = cnt + 1;
              }
            }
        }
    }

    // now collect all results that are in all arrays
    for (item in cntObj) {
        if (cntObj.hasOwnProperty(item) && cntObj[item] === filesArray.length) {
            common.push(item.substring(1));
        }
    }

    return this.setupTagVocabArray(common);
  }
});

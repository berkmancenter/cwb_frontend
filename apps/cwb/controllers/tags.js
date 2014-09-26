sc_require('core');

CWB.tagsController = SC.ObjectController.create({
  content: null,

  setupTagVocabArray: function(tagIds) {
    var that = this;
    var tagArray = [null, null, null, null, null, null];
    tagIds.forEach(function (tagId) {
      var index = that.findTagIndex(tagId);
      if (index >= 0 && index <= 5) tagArray[index] = tagId;
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

  findCommonTags: function (tagArrays) {
    var common = [];
    var cntObj = {};
    var array, item, cnt;
    // for each array passed as an argument to the function
    for (var i = 0; i < tagArrays.length; i++) {
        array = tagArrays[i];
        // for each element in the array
        for (var j = 0; j < array.length; j++) {
            item = "-" + array[j];
            cnt = cntObj[item] || 0;
            // if cnt is exactly the number of previous arrays, 
            // then increment by one so we count only one per array
            if (cnt == i) {
                cntObj[item] = cnt + 1;
            }
        }
    }
    // now collect all results that are in all arrays
    for (item in cntObj) {
        if (cntObj.hasOwnProperty(item) && cntObj[item] === tagArrays.length) {
            common.push(item.substring(1));
        }
    }

    return this.setupTagVocabArray(common);
  }
});

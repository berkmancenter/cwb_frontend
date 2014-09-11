sc_require('core');

CWB.termsController = SC.ArrayController.create({
  allowsMultipleSelection: NO,
  vocabularyIndex: null,

  vocabularyIndexDidChange: function() {
    var vocabularyIndex = this.get('vocabularyIndex');
    CWB.termsController.set('content', CWB.TERMS_IN_VOCABULARY[vocabularyIndex]);
  }.observes('vocabularyIndex'),

  content1: function() { return CWB.TERMS_IN_VOCABULARY[0]; }.property(),
  content2: function() { return CWB.TERMS_IN_VOCABULARY[1]; }.property(),
  content3: function() { return CWB.TERMS_IN_VOCABULARY[2]; }.property(),
  content4: function() { return CWB.TERMS_IN_VOCABULARY[3]; }.property(),
  content5: function() { return CWB.TERMS_IN_VOCABULARY[4]; }.property(),
  content6: function() { return CWB.TERMS_IN_VOCABULARY[5]; }.property()
});

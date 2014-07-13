sc_require('core');

CWB.termsController = SC.ArrayController.create({
  allowsMultipleSelection: NO,
  vocabularyID: null,

  vocabularyIDDidChange: function() {
    var vocabularyID = this.get('vocabularyID');
    CWB.termsController.set('content', CWB.TERMS_IN_VOCABULARY[vocabularyID]);
  }.observes('vocabularyID'),

  content1: function() { return CWB.TERMS_IN_VOCABULARY[1]; }.property(),
  content2: function() { return CWB.TERMS_IN_VOCABULARY[2]; }.property(),
  content3: function() { return CWB.TERMS_IN_VOCABULARY[3]; }.property(),
  content4: function() { return CWB.TERMS_IN_VOCABULARY[4]; }.property(),
  content5: function() { return CWB.TERMS_IN_VOCABULARY[5]; }.property(),
  content6: function() { return CWB.TERMS_IN_VOCABULARY[6]; }.property()
});

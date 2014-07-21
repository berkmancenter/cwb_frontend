sc_require('core');

CWB.SearchFieldView = SC.TextFieldView.extend({
  //classNames: ['search-field'], // FIXME
  controlSize: SC.HUGE_CONTROL_SIZE,
  layout: { height: 30, width: 200 },
  hint: 'Search',

  keyUp: function(event) {
    var searchText = this.get('value');
    CWB.filesController.set('searchText', searchText);
    return YES;
  }
});

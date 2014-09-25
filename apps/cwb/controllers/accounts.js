sc_require('core');

CWB.accountsController = SC.ArrayController.create({
  allowsMultipleSelection: NO,

  orderBy: 'name',

  orderByDidChange: function() {
    this.reload();
  }.observes('.orderBy'),

  reload: function() {
    var orderBy = '' + this.get('orderBy') + ' ASC';

    this.set('content', CWB.store.find(SC.Query.local(CWB.Account, {
      orderBy: orderBy
    })));
  },

});

// ==========================================================================
// Project:   CWB
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals CWB */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
CWB = SC.Application.create(
  /** @scope CWB.prototype */ {

  NAMESPACE: 'CWB',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
//  store: SC.Store.create().from(SC.Record.fixtures)
//  store: SC.Store.create().from('CWB.FixturesDataSource')
  store: SC.Store.create().from('CWB.RailsDataSource')

  // TODO: Add global constants or singleton objects needed by your app here.

});

SC.Binding.number = function(unit) {
    return this.transform(function(value, binding) {
        if (SC.typeOf(value) !== SC.T_NUMBER) return '';
        var output = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (unit !== undefined && unit != null) {
            output += ' ' + unit;
        }
        return output;
    });
};

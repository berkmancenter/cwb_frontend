CWB.statechart = SC.Statechart.create({
  initialState: 'LOGGED_OUT',

  LOGGED_OUT: SC.State.plugin('CWB.LOGGED_OUT'),
  LOGGED_IN: SC.State.plugin('CWB.LOGGED_IN')
});

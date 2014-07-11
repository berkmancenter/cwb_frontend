CWB.statechart = SC.Statechart.create({
  initialState: 'SESSION',

  SESSION: SC.State.plugin('CWB.SESSION'),
  LOGGED_OUT: SC.State.plugin('CWB.LOGGED_OUT'),
  LOGGED_IN: SC.State.plugin('CWB.LOGGED_IN')
});

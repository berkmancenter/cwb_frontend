sc_require('core');

CWB.sourcesController = SC.ArrayController.create({
  allowsMultipleSelection: NO,

  content: [
    {
      value: 'starred',
      title: "Important Files",
      count: 0,
      icon: sc_static('icons/star-on.png')
    },
    {
      value: 'queued',
      title: "Work Queue",
      count: 0,
      icon: sc_static('icons/queue.png')
    }
  ]
});

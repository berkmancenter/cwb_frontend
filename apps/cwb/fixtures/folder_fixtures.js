// ==========================================================================
// Project:   CWB.Folder Fixtures
// ==========================================================================
/*globals CWB */

sc_require('models/folder_model');

CWB.Folder.FIXTURES = [
  {
    id: 1,
    project: 'usip-sample',
    name: "Atrium",
  },
  {
    id: 2,
    project: 'usip-sample',
    name: "Exterior Renderings",
  },
  {
    id: 3,
    project: 'usip-sample',
    name: "Revit Views",
  },
  {
    id: 4,
    project: 'usip-sample',
    name: "Roof Mockup",
  },

  /* Atrium: */

  /* Exterior Renderings: */

  /* Revit Views: */
  {
    id: 31,
    project: 'usip-sample',
    parent: 3,
    name: "Lobby Views JPG",
  },

  /* Roof Mockup: */
  {
    id: 41,
    project: 'usip-sample',
    parent: 4,
    name: "070308 Glass Roof Samples",
  },
  {
    id: 42,
    project: 'usip-sample',
    parent: 4,
    name: "Seele",
  }
];

// ==========================================================================
// Project:   CWB.Vocabulary Fixtures
// ==========================================================================
/*globals CWB */

sc_require('models/vocabulary_model');

CWB.Vocabulary.FIXTURES = [
  {
    id: 1,
    project: 'usip-sample',
    label: "Format",
    description: null,
    terms: [101, 102]
  },
  {
    id: 2,
    project: 'usip-sample',
    label: "Document Type",
    description: null,
    terms: [201, 202, 203, 204, 205, 206, 207, 208, 209, 218]
  },
  {
    id: 3,
    project: 'usip-sample',
    label: "Zone",
    description: "Physical area of the building represented.",
    terms: [301, 302]
  },
  {
    id: 4,
    project: 'usip-sample',
    label: "Phase",
    description: "Temporal section of project activities this file belongs to.",
    terms: [401, 402]
  },
  {
    id: 5,
    project: 'usip-sample',
    label: "Architectural Discipline",
    description: "Area of technical specialty to which this resource belongs.",
    terms: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517]
  },
  {
    id: 6,
    project: 'usip-sample',
    label: "Rights",
    description: "Access control policy, documents read access and/or embargo.",
    terms: [601]
  },
  {
    id: 7,
    project: 'zzz',
    label: "Format",
    description: "Test vocabulary 1 documents.",
    terms: [701, 702]
  }
];

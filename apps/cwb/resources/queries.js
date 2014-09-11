sc_require('models/file_model');
sc_require('models/project_model');
sc_require('models/term_model');

//CWB.ACCOUNTS_QUERY =
//    SC.Query.local(CWB.Account, {orderBy: 'nick ASC'});

CWB.PROJECTS_QUERY =
    SC.Query.local(CWB.Project, {orderBy: 'name ASC'});

CWB.SELECTED_NODES_QUERY =
   SC.Query.local(CWB.Node, 'isSelected = YES');

CWB.SELECTED_FILES_QUERY =
   SC.Query.local(CWB.File, 'isSelected = YES');

CWB.SELECTED_FILES = null;

// CWB.TERMS_IN_VOCABULARY_QUERIES = [
//     null,
//     SC.Query.local(CWB.Term, {conditions:'vocabulary.id = {id}', parameters: {id: 1}}),
//     SC.Query.local(CWB.Term, {conditions:'vocabulary.id = {id}', parameters: {id: 2}}),
//     SC.Query.local(CWB.Term, {conditions:'vocabulary.id = {id}', parameters: {id: 3}}),
//     SC.Query.local(CWB.Term, {conditions:'vocabulary.id = {id}', parameters: {id: 4}}),
//     SC.Query.local(CWB.Term, {conditions:'vocabulary.id = {id}', parameters: {id: 5}}),
//     SC.Query.local(CWB.Term, {conditions:'vocabulary.id = {id}', parameters: {id: 6}})
// ];

// CWB.TERMS_IN_VOCABULARY = [null, null, null, null, null, null];

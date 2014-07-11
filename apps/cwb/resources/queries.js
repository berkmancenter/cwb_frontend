sc_require('models/project_model');

//CWB.ACCOUNTS_QUERY =
//    SC.Query.local(CWB.Account, {orderBy: 'nick ASC'});

CWB.PROJECTS_QUERY =
    SC.Query.local(CWB.Project, {orderBy: 'name ASC'});

//CWB.SELECTED_NODES_QUERY =
//    SC.Query.local(CWB.Node, 'isSelected = YES');
//
//CWB.SELECTED_FILES_QUERY =
//    SC.Query.local(CWB.File, 'isSelected = YES');
//
//CWB.SELECTED_FILES = null;
//
//CWB.TERMS_IN_VOCABULARY_QUERIES = [
//    null,
//    SC.Query.local(CWB.Term, 'vocabulary.id = %@', [1]),
//    SC.Query.local(CWB.Term, 'vocabulary.id = %@', [2]),
//    SC.Query.local(CWB.Term, 'vocabulary.id = %@', [3]),
//    SC.Query.local(CWB.Term, 'vocabulary.id = %@', [4]),
//    SC.Query.local(CWB.Term, 'vocabulary.id = %@', [5]),
//    SC.Query.local(CWB.Term, 'vocabulary.id = %@', [6])
//];
//
//CWB.TERMS_IN_VOCABULARY = [null, null, null, null, null, null];

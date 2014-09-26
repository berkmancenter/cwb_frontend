sc_require('models/file_model');
sc_require('models/project_model');
sc_require('models/term_model');

//CWB.ACCOUNTS_QUERY =
//    SC.Query.local(CWB.Account, {orderBy: 'nick ASC'});

CWB.PROJECTS_QUERY =
    SC.Query.local(CWB.Project, {orderBy: 'name ASC'});

CWB.FOLDERS_QUERY =
    SC.Query.local(CWB.Folder);

CWB.FILES_QUERY =
    SC.Query.local(CWB.File);

CWB.SELECTED_NODES_QUERY =
   SC.Query.local(CWB.Node, 'isSelected = YES');

CWB.SELECTED_FILES_QUERY =
   SC.Query.local(CWB.File, 'isSelected = YES');

CWB.SELECTED_FILES = null;

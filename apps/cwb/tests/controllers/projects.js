
var store;
var pc;
var projects;

module("CWB.projectsController", {
    setup: function() {
        store = SC.Store.create().from(SC.Record.fixtures);
        projects = store.find(CWB.PROJECTS_QUERY);

        pc = CWB.projectsController;
        pc.set('content', projects);
    },
    teardown: function() {
        projects = null;
        pc = null;
        store.destroy();
        store = null;
    }
});

test("project controller", function() {
    equals(pc.content.firstObject().get('name'), "USIP-Sample", "found content");
    equals(pc.content.length(), 2, "have all content");
    equals(pc.get('selection').length(), 0, "should not have a selection");
});

test("project controller", function() {
    pc.selectObject(projects.firstObject());
    equals(pc.get('selection').length(), 1, "should have a selection");
    equals(pc.get('selection').firstObject().get('name'), "USIP-Sample", "found selection");
});

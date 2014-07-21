
var pc;
var tc;
var projects;
var screen;

module("CWB.projectsController", {
    setup: function() {
        store = SC.Store.create().from(SC.Record.fixtures);
        projects = store.find(CWB.PROJECTS_QUERY);
        
        tc = CWB.termsController;
        
        pc = CWB.projectsController;
        pc.set('content', projects);
        
        screen = CWB.ProjectsScreen.create();
    },
    teardown: function() {
        screen = null;
        projects = null;
        pc = null;
        tc = null;
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

test("screen title", function() {
    equals(screen.topToolbar.titleLabel.value, "Projects", "has proper label");
});

test("format tab", function() {
    screen.contentView.bottomRightView.contentView.vocabularyTabs.segmentedView.triggerItemAtIndex(0);
    equals(screen.contentView.bottomRightView.contentView.vocabularyTabs.items[0].title, "Format", "has proper title");
//    equals(tc.content.firstObject().label, "Unknown", "has proper first term");
});

test("document type tab", function() {
    screen.contentView.bottomRightView.contentView.vocabularyTabs.segmentedView.triggerItemAtIndex(1);
    equals(screen.contentView.bottomRightView.contentView.vocabularyTabs.items[1].title, "Document Type", "has proper title");
//    equals(tc.content.firstObject().label, "Agreement", "has proper first term");
});

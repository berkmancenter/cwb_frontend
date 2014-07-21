
var screen;

module("CWB.projectsController", {
    setup: function() {
        screen = CWB.ProjectsScreen.create();
    },
    teardown: function() {
        screen = null;
    }
});

test("screen title", function() {
    equals(screen.topToolbar.titleLabel.value, "Projects", "has proper label");
});

test("format tab", function() {
//    screen.contentView.bottomRightView.contentView.vocabularyTabs.segmentedView.triggerItemAtIndex(0);
    equals(screen.contentView.bottomRightView.contentView.vocabularyTabs.items[0].title, "Format", "has proper title");
});

test("document type tab", function() {
//    screen.contentView.bottomRightView.contentView.vocabularyTabs.segmentedView.triggerItemAtIndex(1);
    equals(screen.contentView.bottomRightView.contentView.vocabularyTabs.items[1].title, "Document Type", "has proper title");
});

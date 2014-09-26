CWB.FolderListItemView = SC.ListItemView.extend({
  classNames: ['cwb-folder-list-item-view'],

  hasContentIcon: YES,
  hasContentRightIcon: NO,

  renderLabel: function(context, label) {
    var folder = this.get('content');
    var folderPath = folder.get('path');
    var file_count = folder.get('file_count');
    var subfolderCount = folder.get('count');
    var toolTip = '%@ contains %@ file%@ and %@ subfolder%@.'.fmt(folderPath,
      (file_count === 0) ? 'no' : file_count,
      (file_count === 1) ? '' : 's',
      (subfolderCount === 0) ? 'no' : subfolderCount,
      (subfolderCount === 1) ? '' : 's');
    context.push('<label title="').text(toolTip).push('">', label || '', '</label>');
  },

  renderCount: function(context, count) {
    var folder = this.get('content');
    var starred_count = folder.get('starred_count') || 0;
    var untaggedCount = folder.get('untaggedCount') || 0;
    context.push(
      '<span class="pill">',
      '<span class="pill-inner pill-left">', starred_count, '</span>',
      '<span class="pill-inner pill-right">', untaggedCount, '</span>',
      '</span>');
  },

  doUpdateLayer: function() {
    if (this.get('content').get('starred_count') !== null) {
      this.updateLayer();
    }
  }.observes('*content.starred_count', '*content.untaggedCount'),

  render: function(context, firstTime) {
    var folder = this.get('content'),
        del     = this.displayDelegate,
        level   = this.get('outlineLevel'),
        indent  = this.get('outlineIndent'),
        key, value, working, classArray = [];

    // add alternating row classes:
    classArray.push((this.get('contentIndex') % 2 === 0) ? 'even' : 'odd');
    context.setClass('disabled', !this.get('isEnabled'));
    context.setClass('drop-target', this.get('isDropTarget'));

    // outline level wrapper:
    working = context.begin("div").addClass("sc-outline");
    if (level >= 0 && indent > 0) {
      working.addStyle("left", indent * (level + 1));
    }

    // handle disclosure triangle:
    value = this.get('disclosureState');
    if (value !== SC.LEAF_NODE && folder.count() != 0) {
      this.renderDisclosure(working, value);
      classArray.push('has-disclosure');
    }

    // handle checkbox:
    key = this.getDelegateProperty('contentCheckboxKey', del);
    if (key) {
      value = folder ? (folder.get ? folder.get(key) : folder[key]) : NO;
      if (value !== null) {
        this.renderCheckbox(working, value);
        classArray.push('has-checkbox');
      }
    }

    // handle icon:
    if (this.getDelegateProperty('hasContentIcon', del)) {
      key = this.getDelegateProperty('contentIconKey', del);
      value = (key && folder) ? (folder.get ? folder.get(key) : folder[key]) : null;
      if (value) {
        this.renderIcon(working, value, 'icon');
        classArray.push('has-icon');
      }
    }
    else if (this.get('icon')) {
      value = this.get('icon');
      this.renderIcon(working, value, 'icon');
      classArray.push('has-icon');
    }

    // handle label -- always invoke:
    key = this.getDelegateProperty('contentValueKey', del);
    value = (key && folder) ? (folder.get ? folder.get(key) : folder[key]) : folder;
    if (value && SC.typeOf(value) !== SC.T_STRING) {
      value = value.toString();
    }
    if (this.get('escapeHTML')) {
      value = SC.RenderContext.escapeHTML(value);
    }
    this.renderLabel(working, value);

    // handle size:
    if (this.getDelegateProperty('hasContentSize', del)) {
      key = this.getDelegateProperty('contentSizeKey', del);
      value = (key && folder) ? (folder.get ? folder.get(key) : folder[key]) : null;
      this.renderSize(working, value);
      classArray.push('has-size');
    }

    // handle unread count:
    key = this.getDelegateProperty('contentUnreadCountKey', del);
    value = (key && folder) ? (folder.get ? folder.get(key) : folder[key]) : null;
    if (!SC.none(value)) {
      this.renderCount(working, value);
/*
      var digits = ['zero', 'one', 'two', 'three', 'four', 'five'];
      var valueLength = value.toString().length;
      var digitsLength = digits.length;
      var digit = (valueLength < digitsLength) ? digits[valueLength] : digits[digitsLength - 1];
      classArray.push('has-count ' + digit + '-digit');
*/
    }

    // handle action:
    key = this.getDelegateProperty('listItemActionProperty', del);
    value = (key && folder) ? (folder.get ? folder.get(key) : folder[key]) : null;
    if (value) {
      this.renderAction(working, value);
      classArray.push('has-action');
    }

    // handle branch:
    if (this.getDelegateProperty('hasContentBranch', del)) {
      key = this.getDelegateProperty('contentIsBranchKey', del);
      value = (key && folder) ? (folder.get ? folder.get(key) : folder[key]) : NO;
      this.renderBranch(working, value);
      classArray.push('has-branch');
    }
    context.addClass(classArray);
    context = working.end();
  },

  renderSpan: function(context, value, className) {
    context.push('<span class="' + className + '">', value || '', '</span>');
  }
});

CWB.FileListItemView = SC.ListItemView.extend({
  classNames: ['cwb-file-list-item-view'],

  hasContentIcon: YES,
  hasContentRightIcon: NO,

  hasContentSize: YES,
  size: null,
  contentSizeKey: null,

  hasContentType: YES,
  type: null,
  contentTypeKey: null,

  hasContentStarIcon: YES,
  starIcon: null,
  contentStarIconKey: null,

  hasContentTagIcon: YES,
  tagIcon: null,
  contentTagIconKey: null,

  contentKeys: {
    contentCheckboxKey: 'checkbox',
    contentIconKey:  'icon',
    contentValueKey: 'title',
    contentSizeKey: 'size',
    contentTypeKey: 'type',
    contentTagIconKey: 'tagIcon',
    contentStarIconKey: 'starIcon',
    contentUnreadCountKey: 'count',
    contentIsBranchKey: 'branch'
  },

  /** @private
    Returns YES if the file list item has a tag icon and the event
    occurred inside of it.
  */
  _isInsideTagIcon: function(event) {
    var tagIconKey = this.getDelegateProperty('hasContentTagIcon', this.displayDelegate) || !SC.none(this.tagIcon);
    return tagIconKey && this._isInsideElementWithClassName('tag-icon', event);
  },

  /** @private
    Returns YES if the file list item has a star icon and the event
    occurred inside of it.
  */
  _isInsideStarIcon: function(event) {
    var starIconKey = this.getDelegateProperty('hasContentStarIcon', this.displayDelegate) || !SC.none(this.starIcon);
    return starIconKey && this._isInsideElementWithClassName('star-icon', event);
  },

  /** @private */
  _setTagIconActiveState: function(state) {
    var element = this.$('img.tag-icon');
    state ? element.setClass('active', YES) : element.removeClass('active');
  },

  /** @private */
  _setStarIconActiveState: function(state) {
    var element = this.$('img.star-icon');
    state ? element.setClass('active', YES) : element.removeClass('active');
  },

  /** @private */
  mouseDown: function(event) {
    //SC.Logger.log("mouseDown");
    if (this._isInsideTagIcon(event)) {
      //SC.Logger.log("mouseDown on tag icon");
      this._setTagIconActiveState(YES);
      this._isMouseDownOnTagIcon = YES;
      this._isMouseInsideTagIcon = YES;
      return YES;
    }
    else if (this._isInsideStarIcon(event)) {
      //SC.Logger.log("mouseDown on star icon");
      this._setStarIconActiveState(YES);
      this._isMouseDownOnStarIcon = YES;
      this._isMouseInsideStarIcon = YES;
      return YES;
    }
    return sc_super();
  },

  /** @private */
  mouseUp: function(event) {
    //SC.Logger.log("mouseUp");
    var result = NO;
    if (this._isMouseDownOnTagIcon) {
      //SC.Logger.log("mouseUp on tag icon");
      this._setTagIconActiveState(NO);
      result = YES;
      if (this.tagClick) {
        this.tagClick(event);
      }
    }
    else if (this._isMouseDownOnStarIcon) {
      //SC.Logger.log("mouseUp on star icon");
      this._setStarIconActiveState(NO);
      result = YES;
      if (this.starClick) {
        this.starClick(event);
      }
    }
    this._isMouseInsideTagIcon = this._isMouseDownOnTagIcon = NO;
    this._isMouseInsideStarIcon = this._isMouseDownOnStarIcon = NO;
    return result ? YES : sc_super();
  },

  render: function(context, firstTime) {
    var content = this.get('content'),
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
    if (value !== SC.LEAF_NODE) {
      this.renderDisclosure(working, value);
      classArray.push('has-disclosure');
    }

    // handle checkbox:
    key = this.getDelegateProperty('contentCheckboxKey', del);
    if (key) {
      value = content ? (content.get ? content.get(key) : content[key]) : NO;
      if (value !== null) {
        this.renderCheckbox(working, value);
        classArray.push('has-checkbox');
      }
    }

    // handle icon:
    if (this.getDelegateProperty('hasContentIcon', del)) {
      key = this.getDelegateProperty('contentIconKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
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
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : content;
    if (value && SC.typeOf(value) !== SC.T_STRING) {
      value = value.toString();
    }
    if (this.get('escapeHTML')) {
      value = SC.RenderContext.escapeHTML(value);
    }
    this.renderSpan(working, value, 'name file-details');

    // handle type:
    if (this.getDelegateProperty('hasContentType', del)) {
      key = this.getDelegateProperty('contentTypeKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderType(working, value);
      classArray.push('has-type');
    }

    // handle size:
    if (this.getDelegateProperty('hasContentSize', del)) {
      key = this.getDelegateProperty('contentSizeKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderSize(working, value);
      classArray.push('has-size');
    }

    // handle tag icon:
    if (this.getDelegateProperty('hasContentTagIcon', del)) {
      key = this.getDelegateProperty('contentTagIconKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderIcon(working, value, 'tag-icon');
      classArray.push('has-tag-icon');
    }

    // handle star icon:
    if (this.getDelegateProperty('hasContentStarIcon', del)) {
      key = this.getDelegateProperty('contentStarIconKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderIcon(working, value, 'star-icon');
      classArray.push('has-star-icon');
    }

    // handle unread count:
    key = this.getDelegateProperty('contentUnreadCountKey', del);
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
    if (!SC.none(value) && (value !== 0)) {
      this.renderCount(working, value);
      var digits = ['zero', 'one', 'two', 'three', 'four', 'five'];
      var valueLength = value.toString().length;
      var digitsLength = digits.length;
      var digit = (valueLength < digitsLength) ? digits[valueLength] : digits[digitsLength - 1];
      classArray.push('has-count ' + digit + '-digit');
    }

    // handle action:
    key = this.getDelegateProperty('listItemActionProperty', del);
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
    if (value) {
      this.renderAction(working, value);
      classArray.push('has-action');
    }

    // handle branch:
    if (this.getDelegateProperty('hasContentBranch', del)) {
      key = this.getDelegateProperty('contentIsBranchKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : NO;
      this.renderBranch(working, value);
      classArray.push('has-branch');
    }
    context.addClass(classArray);
    context = working.end();
  },

  renderSize: function(context, size) {
    if (size && size > 1024) {
      var sizePower = Math.floor(Math.log(size) / Math.log(1024));
      var sizePowers = ['KB', 'MB', 'GB', 'TB', 'PB'];
      size /= Math.pow(1024, sizePower);
      size = size.toFixed(1) + ' ' + sizePowers[sizePower - 1];
      this.renderSpan(context, size, 'size file-details');
    }
    else if (size > 0) {
      this.renderSpan(context, '1 KB', 'size file-details');
    }
    else {
      this.renderSpan(context, '0 KB', 'size file-details');
    }
  },

  renderType: function(context, type) {
    this.renderSpan(context, type, 'type file-details');
  },

  renderSpan: function(context, value, className) {
    context.push('<span class="' + className + '">', value || '', '</span>');
  },

  renderIcon: function(context, icon, cssName) {
    // get a class name and URL to include if relevant
    var url = null, className = null, classArray = [];
    if (icon && SC.ImageView.valueIsUrl(icon)) {
      className = '';
      url = icon;
    }
    else {
      className = icon;
      url = SC.BLANK_IMAGE_URL;
    }

    // generate the img element...
    classArray.push(cssName, className);
    context.begin('img').addClass(classArray).attr('src', url).end();
  }
});

CWB.AccountListItemView = SC.ListItemView.extend({
  classNames: ['cwb-account-list-item-view'],

  hasContentIcon: NO,
  hasContentRightIcon: NO,

  hasContentUsername: YES,
  username: null,
  contentUsernameKey: null,

  hasContentEmail: YES,
  email: null,
  contentEmailKey: null,

  hasContentIsAdmin: YES,
  isAdmin: null,
  contentIsAdminKey: null,

  hasContentCreatedAt: YES,
  createdAt: null,
  contentCreatedAtKey: null,

  contentKeys: {
    contentValueKey: 'name',
    contentUsernameKey: 'username',
    contentEmailKey: 'email',
    contentIsAdminKey: 'isAdmin',
    contentCreatedAtKey: 'createdAt'
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

    // handle label -- always invoke:
    key = this.getDelegateProperty('contentValueKey', del);
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : content;
    if (value && SC.typeOf(value) !== SC.T_STRING) {
      value = value.toString();
    }
    if (this.get('escapeHTML')) {
      value = SC.RenderContext.escapeHTML(value);
    }
    this.renderSpan(working, value, key);

    // handle username:
    if (this.getDelegateProperty('hasContentUsername', del)) {
      key = this.getDelegateProperty('contentUsernameKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderSpan(working, value, key);
      classArray.push('has-size');
    }

    // handle email:
    if (this.getDelegateProperty('hasContentEmail', del)) {
      key = this.getDelegateProperty('contentEmailKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderSpan(working, value, key);
      classArray.push('has-size');
    }

    // handle isAdmin:
    if (this.getDelegateProperty('hasContentIsAdmin', del)) {
      key = this.getDelegateProperty('contentIsAdminKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderSpan(working, value ? 'Admin' : '', key);
      classArray.push('has-type');
    }

    // handle created_at:
    if (this.getDelegateProperty('hasContentCreatedAt', del)) {
      key = this.getDelegateProperty('contentCreatedAtKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
      this.renderSpan(working, value, key);
      classArray.push('has-size');
    }

    context.addClass(classArray);
    context = working.end();
  },

  renderSpan: function(context, value, className) {
    context.push('<span class="' + className + '">', value || '', '</span>');
  },
});

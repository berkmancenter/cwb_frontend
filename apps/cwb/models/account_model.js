// ==========================================================================
// Project:   CWB.Account
// ==========================================================================
/*globals CWB */

/** @class

    (Document your Model here)

    @version 0.1
*/
CWB.Account = CWB.Resource.extend({

    name: SC.Record.attr(String),
    username: SC.Record.attr(String),
    email: SC.Record.attr(String),
    password1: SC.Record.attr(String),
    password2: SC.Record.attr(String),
    account_manager: SC.Record.attr(String),
    created_at: SC.Record.attr(SC.DateTime, { defaultValue: SC.DateTime.create() }),

    isAdmin: function() {
        if (this.get('account_manager') == 'true') {
            return YES;
        } else {
            return NO;
        }
    }.property('account_manager').cacheable(),

    createdAt: function() {
        return this.get('created_at').toFormattedString('%m/%d/%Y');
    }.property('created_at').cacheable(),
});

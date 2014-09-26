sc_require('core');

CWB.SourceListView = SC.SourceListView.extend({
    /**
     Overrides `SC.CollectionView#select()` in order that the view support
     selection of top-level folders (grouped items, in SproutCore parlance),
     which for some unfathomable reason is not possible in the vanilla
     `SC.SourceListView` implementation.

     @see SC.CollectionView#select
     */
    select: function(indexes, extend) {
        var content = this.get('content'),
            del     = this.get('selectionDelegate'),
            groupIndexes = this.get('_contentGroupIndexes'),
            sel;

        if(!this.get('isSelectable') || !this.get('isEnabled')) return this;

        // normalize
        if (SC.typeOf(indexes) === SC.T_NUMBER) {
            indexes = SC.IndexSet.create(indexes, 1);
        }

        // if we are passed an empty index set or null, clear the selection.
        if (indexes && indexes.get('length')>0) {

            /*
             // first remove any group indexes - these can never be selected
             if (groupIndexes && groupIndexes.get('length')>0) {
             indexes = indexes.copy().remove(groupIndexes);
             }
             */

            // give the delegate a chance to alter the items
            indexes = del.collectionViewShouldSelectIndexes(this, indexes, extend);
            if (!indexes || indexes.get('length')===0) return this; // nothing to do

        } else indexes = null;

        // build the selection object, merging if needed
        if (extend && (sel = this.get('selection'))) sel = sel.copy();
        else sel = SC.SelectionSet.create();

        if (indexes && indexes.get('length')>0) {

            // when selecting only one item, always select by content
            if (indexes.get('length')===1) {
                sel.addObject(content.objectAt(indexes.get('firstObject')));

                // otherwise select an index range
            } else sel.add(content, indexes);

        }

        // give delegate one last chance
        sel = del.collectionViewSelectionForProposedSelection(this, sel);
        if (!sel) sel = SC.SelectionSet.create(); // empty

        // if we're not extending the selection, clear the selection anchor
        this._selectionAnchor = null ;
        this.set('selection', sel.freeze()) ;
        return this;
    },

    /**
     Overrides `SC.CollectionView#mouseDown()` in order that the view
     deselect any selected items when the user clicks on a "whitespace" area
     of the view.

     @see SC.CollectionView#mouseDown
     */
    mouseDown: function(evt) {
        if (!this._isInsideElementWithClassName('sc-collection-item', evt)) {
            this.set('selection', null);
            return YES;
        }
        return sc_super();
    },

    /** @private
     Determines if the event occurred inside an element with the specified
     classname or not.

     @see SC.ListItemView#_isInsideElementWithClassName
     */
    _isInsideElementWithClassName: function(className, evt) {
        var layer = this.get('layer');
        if (!layer) return NO ; // no layer yet -- nothing to do

        var el = SC.$(evt.target) ;
        var ret = NO;
        while(!ret && el.length>0 && (el[0] !== layer)) {
            if (el.hasClass(className)) ret = YES ;
            el = el.parent() ;
        }
        el = layer = null; //avoid memory leaks
        return ret ;
    }
});

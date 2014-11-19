// ==========================================================================
// Project:   CWB.File
// ==========================================================================
/*globals CWB */
sc_require('models/node_model');

/** @class

  (Document your Model here)

  @extends CWB.Node
  @version 0.1
*/
CWB.File = CWB.Node.extend(
/** @scope CWB.File.prototype */ {

  project: SC.Record.toOne('CWB.Project', { isMaster: NO, inverse: 'files' }),
  folder: SC.Record.toOne('CWB.Folder', { isMaster: YES, inverse: 'files' }),

  tagSet1: SC.Record.attr(Array, { defaultValue: [] }),
  tagSet2: SC.Record.attr(Array, { defaultValue: [] }),
  tagSet3: SC.Record.attr(Array, { defaultValue: [] }),
  tagSet4: SC.Record.attr(Array, { defaultValue: [] }),
  tagSet5: SC.Record.attr(Array, { defaultValue: [] }),
  tagSet6: SC.Record.attr(Array, { defaultValue: [] }),

  name: SC.Record.attr(String),
  size: SC.Record.attr(Number, { defaultValue: 0 }),
  type: SC.Record.attr(String, { defaultValue: 'application/octet-stream' }),
  created: SC.Record.attr(SC.DateTime),
  modified: SC.Record.attr(SC.DateTime),
  last_modified_by: SC.Record.attr(String),
  last_tag_change: SC.Record.attr(SC.DateTime),
  derivative: SC.Record.attr(String),
  starred: SC.Record.attr(String),
  isQueued: SC.Record.attr(Boolean, { defaultValue: NO }),
  isSelected: SC.Record.attr(Boolean, { defaultValue: NO }),
  //isSelected: NO,

  isStarred: function() {
    if (this.get('starred') == 'true')
      return YES;
    else
      return NO;
  }.property('starred').cacheable(),

  toggleStarred: function(doStar) {
    var folder = this.get('folder');
    var old_count = folder.get('starred_count');

    if (this.isStarred() && (doStar === undefined || !doStar)) {
      // unstar the file
      if (old_count >= 1) folder.set('starred_count', old_count - 1);
      this.set('starred', 'false');
    } else if (!this.isStarred() && (doStar === undefined || !!doStar)) {
      // star the file
      folder.set('starred_count', old_count + 1);
      this.set('starred', 'true');
    }
  },

  isDerivative: function() {
    if (this.get('derivative') == 'false')
      return NO;
    else
      return YES;
  }.property('derivative').cacheable(),

  prettyDerivative: function() {
    if (this.get('isDerivative')) {
      return this.get('derivative');
    } else {
      return 'N/A';
    }
  }.property('derivative').cacheable(),

  statusDidChange: function() {
    var status = this.get("status");
    if (status === SC.Record.READY_CLEAN) {
      if (this.get('tag').length > 0) {
        var tagIdsFromStore = CWB.tagsController.setupTagVocabArray(this.get('tag'));
        this.set('tagIDs', tagIdsFromStore);
      }
    }
  }.observes('status'),

  isTagged: function() {
    if (this.get('tagSet1').length > 0 ) return YES;
    if (this.get('tagSet2').length > 0 ) return YES;
    if (this.get('tagSet3').length > 0 ) return YES;
    if (this.get('tagSet4').length > 0 ) return YES;
    if (this.get('tagSet5').length > 0 ) return YES;
    if (this.get('tagSet6').length > 0 ) return YES;
    return NO;
  }.property('tagSet1', 'tagSet2', 'tagSet3', 'tagSet4', 'tagSet5', 'tagSet6').cacheable(),

  tagIDs: function(key, value) {
    if (value !== undefined) {
      this.set('tagSet1', value[0] || []);
      this.set('tagSet2', value[1] || []);
      this.set('tagSet3', value[2] || []);
      this.set('tagSet4', value[3] || []);
      this.set('tagSet5', value[4] || []);
      this.set('tagSet6', value[5] || []);
    }
    return [this.get('tagSet1'), this.get('tagSet2'), this.get('tagSet3'),
            this.get('tagSet4'), this.get('tagSet5'), this.get('tagSet6')];
  }.property('tagSet1', 'tagSet2', 'tagSet3', 'tagSet4', 'tagSet5', 'tagSet6').cacheable(),

  path: function() {
    return this.getPath('folder.path') + '/' + this.get('name');
  }.property('folder', 'name').cacheable(),

  typeTitles: {
    'application/x-directory':   'Folder',
    'application/pdf':           'PDF document',
    'application/vnd.ms-office': 'Microsoft Office document',
    'image/gif':                 'GIF image',
    'image/jpeg':                'JPEG image',
    'image/png':                 'PNG image',
    'image/tiff':                'TIFF image',
    'image/vnd.adobe.photoshop': 'Adobe Photoshop document'
  },

  typeIcons: {
    'application/x-directory':   sc_static('icons/files/folder.png'),
    'application/pdf':           sc_static('icons/files/pdf.png'),
    'application/vnd.ms-office': sc_static('icons/files/office.png'),
    'image/gif':                 sc_static('icons/files/image.png'),
    'image/jpeg':                sc_static('icons/files/image.png'),
    'image/png':                 sc_static('icons/files/image.png'),
    'image/tiff':                sc_static('icons/files/image.png'),
    'image/vnd.adobe.photoshop': sc_static('icons/files/psd.png')
  },

  // we can probably remove this now that we're passing type from the backend
  typeTitle: function() {
    var type = this.get('type');
    return this.typeTitles[type] ? this.typeTitles[type] : 'Document';
  }.property('type').cacheable(),

  typeIcon: function() {
    var type = this.get('type');
    return this.typeIcons[type] ? this.typeIcons[type] : sc_static('icons/files/generic.png');
  }.property('type').cacheable(),

  tagIcon: function() {
    var tagCount = 0;
    if (this.get('tagSet1').length > 0) tagCount += 1;
    if (this.get('tagSet2').length > 0) tagCount += 1;
    if (this.get('tagSet3').length > 0) tagCount += 1;
    if (this.get('tagSet4').length > 0) tagCount += 1;
    if (this.get('tagSet5').length > 0) tagCount += 1;
    if (this.get('tagSet6').length > 0) tagCount += 1;
    if (tagCount === 0) return sc_static('icons/tag-off.png');
    if (tagCount === 6) return sc_static('icons/tag-on.png');
    return sc_static('icons/tag-partial.png');
  }.property('isTagged').cacheable(),

  starIcon: function() {
    return this.isStarred() ? sc_static('icons/star-on.png') : sc_static('icons/star-off.png');
  }.property('isStarred').cacheable(),

  sizeString: function() {
    var size = this.get('size');
    if (size && size > 1024) {
      var sizePower = Math.floor(Math.log(size) / Math.log(1024));
      var sizePowers = ['KB', 'MB', 'GB', 'TB', 'PB'];
      size /= Math.pow(1024, sizePower);
      size = size.toFixed(1) + ' ' + sizePowers[sizePower - 1];
    }
    else if (size > 0) {
      size = '1 KB';
    }
    else {
      size = '0 KB';
    }
    return size;
  }.property('size').cacheable(),

  previewURL: function() {
    return '/projects/' + encodeURIComponent(CWB.projectController.get('id')) + '/files/' + encodeURIComponent(this.get('id')) + '/thumb';
  }.property('folder', 'name').cacheable(),

  previewPlaceHolder: 'Loading preview...',

  isSelectedDidChange: function() {
    CWB.filesController.set('selectedFilesCount', CWB.SELECTED_FILES.get('length'));
    CWB.SELECTED_FILES.reload();
  }.observes('isSelected')
});

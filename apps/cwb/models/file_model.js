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

  tag1: SC.Record.attr(String, { defaultValue: null }),
  tag2: SC.Record.attr(String, { defaultValue: null }),
  tag3: SC.Record.attr(String, { defaultValue: null }),
  tag4: SC.Record.attr(String, { defaultValue: null }),
  tag5: SC.Record.attr(String, { defaultValue: null }),
  tag6: SC.Record.attr(String, { defaultValue: null }),
/*
  tag1: SC.Record.toOne('CWB.Term', { isMaster: NO }),
  tag2: SC.Record.toOne('CWB.Term', { isMaster: NO }),
  tag3: SC.Record.toOne('CWB.Term', { isMaster: NO }),
  tag4: SC.Record.toOne('CWB.Term', { isMaster: NO }),
  tag5: SC.Record.toOne('CWB.Term', { isMaster: NO }),
  tag6: SC.Record.toOne('CWB.Term', { isMaster: NO }),
*/

  name: SC.Record.attr(String),
  size: SC.Record.attr(Number, { defaultValue: 0 }),
  type: SC.Record.attr(String, { defaultValue: 'application/octet-stream' }),
  created: SC.Record.attr(SC.DateTime),
  modified: SC.Record.attr(SC.DateTime),
  last_modified_by: SC.Record.attr(String),
  last_tag_change: SC.Record.attr(SC.DateTime),

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
    if (this.get('tag1') !== null) return YES;
    if (this.get('tag2') !== null) return YES;
    if (this.get('tag3') !== null) return YES;
    if (this.get('tag4') !== null) return YES;
    if (this.get('tag5') !== null) return YES;
    if (this.get('tag6') !== null) return YES;
    return NO;
  }.property('tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6').cacheable(),

  tagIDs: function(key, value) {
    if (value !== undefined) {
      this.set('tag1', value[0]);
      this.set('tag2', value[1]);
      this.set('tag3', value[2]);
      this.set('tag4', value[3]);
      this.set('tag5', value[4]);
      this.set('tag6', value[5]);
    }
    return [this.get('tag1'), this.get('tag2'), this.get('tag3'),
            this.get('tag4'), this.get('tag5'), this.get('tag6')];
  }.property('tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6').cacheable(),

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
    if (this.get('tag1') !== null) tagCount += 1;
    if (this.get('tag2') !== null) tagCount += 1;
    if (this.get('tag3') !== null) tagCount += 1;
    if (this.get('tag4') !== null) tagCount += 1;
    if (this.get('tag5') !== null) tagCount += 1;
    if (this.get('tag6') !== null) tagCount += 1;
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
    CWB.SELECTED_FILES.reload();
  }.observes('isSelected')
});

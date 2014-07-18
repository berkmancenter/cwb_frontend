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

  folder: SC.Record.toOne('CWB.Folder', { isMaster: NO }),

  tag1: SC.Record.attr(Number, { defaultValue: null }),
  tag2: SC.Record.attr(Number, { defaultValue: null }),
  tag3: SC.Record.attr(Number, { defaultValue: null }),
  tag4: SC.Record.attr(Number, { defaultValue: null }),
  tag5: SC.Record.attr(Number, { defaultValue: null }),
  tag6: SC.Record.attr(Number, { defaultValue: null }),
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

  isStarred: SC.Record.attr(Boolean, { defaultValue: NO }),
  isQueued: SC.Record.attr(Boolean, { defaultValue: NO }),
  isSelected: SC.Record.attr(Boolean, { defaultValue: NO }),
  //isSelected: NO,

  isTagged: function() {
    if (this.get('tag1') != null) return YES;
    if (this.get('tag2') != null) return YES;
    if (this.get('tag3') != null) return YES;
    if (this.get('tag4') != null) return YES;
    if (this.get('tag5') != null) return YES;
    if (this.get('tag6') != null) return YES;
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
    if (this.get('tag1') != null) tagCount += 1;
    if (this.get('tag2') != null) tagCount += 1;
    if (this.get('tag3') != null) tagCount += 1;
    if (this.get('tag4') != null) tagCount += 1;
    if (this.get('tag5') != null) tagCount += 1;
    if (this.get('tag6') != null) tagCount += 1;
    if (tagCount == 0) return sc_static('icons/tag-off.png');
    if (tagCount == 6) return sc_static('icons/tag-on.png');
    return sc_static('icons/tag-partial.png');
  }.property('isTagged').cacheable(),

  starIcon: function() {
    return this.get('isStarred') ? sc_static('icons/star-on.png') : sc_static('icons/star-off.png');
  }.property('isStarred').cacheable(),

  previewURL: function() {
    //return 'http://showcase.sproutcore.com/static/showcase/en/0dbf2f1989cd4b4345e346425fedf590c45f9453/source/resources/images/sproutcore-logo.png'; // TODO
    return '/static/cwb/en/current/source/resources/previews/' + this.get('path'); // FIXME
  }.property('folder', 'name').cacheable(),

  isSelectedDidChange: function() {
    CWB.SELECTED_FILES.reload();
  }.observes('isSelected')
});

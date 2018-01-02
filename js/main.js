// Split Panerls
// See: https://nathancahill.github.io/Split.js/
Split(['#left', '#center', '#right'], {
  sizes: [25, 50, 25]
});

// Helper that will add menu items to a panel
function addMenuItems(panelDiv) {
  panelDiv.lobiPanel({
    sortable: true,
    reload: false,
    unpin: false,
    expand: false,
    editTitle: false
  });

  // Add pencil to 'edit' the source code.
  panelDiv.find(".dropdown-menu-right").prepend(`
    <li>
      <a data-toggle="tooltip" data-placement="bottom" title="Edit Sourcecode"><i class="panel-control-icon glyphicon glyphicon-pencil"></i><span class="control-title">Edit Sourcecode</span></a>
    </li>
  `);
  var tooltip = panelDiv.find('*[title="Edit Sourcecode"]');
  tooltip.tooltip();
  tooltip.click(function() {
    $('#editSourcecodeModal').modal();
  });
}

// Drag & Drop panels
// See: https://lobianijs.com/site/lobipanel
$(function(){
  $('#panel-parent').children().each(function() {
    addMenuItems($(this));
  });

  // Insert new nodes
  var hidden = $('#hidden-panel');
  hidden.removeAttr('id');

  $('#add-button').click(function() {
    var clone = hidden.clone();
    clone.appendTo('#panel-parent');
    clone.show();

    // Update the UI-Sortable collection
    $('#panel-parent').sortable("refresh");
    $('#panel-parent').sortable("refreshPositions");

      addMenuItems(clone);
  });
});

// Drag & Drop panels
// See: https://lobianijs.com/site/lobipanel
$(function(){
  var graph_parent = $('#graph-parent');
  graph_parent.children().lobiPanel({
    sortable: true,
    reload: false,
    unpin: false,
    expand: false,
    editTitle: false
  });
});

// Drag & Drop Program Operations
// See: https://lobianijs.com/site/lobipanel
$(function(){
  var list_parent = $('#list-parent');
  list_parent.children().lobiPanel({
    sortable: true,
    reload: false,
    unpin: false,
    expand: false,
    editTitle: false,
    minimize: false
  });

  // Insert new nodes
  var hidden = $('#hidden-item');
  hidden.removeAttr('id');

  $('#add-operation-button').click(function() {
    var clone = hidden.clone();
    clone.appendTo('#list-parent');
    clone.show();

    list_parent.sortable("refresh");
    list_parent.sortable("refreshPositions");

    clone.lobiPanel({
      sortable: true,
      reload: false,
      unpin: false,
      expand: false,
      editTitle: false,
      minimize: false
    });
  });
});

// Experiment Browser
// See: https://www.jstree.com/api/
$('#experiment-browser').jstree({
  'plugins' : ['contextmenu', 'dnd', 'wholerow'],
  'core' : {
    'check_callback' : true,
    'multiple' : true,
    'data' : [
      {
        "text" : "All Experiments",
        "state" : { "opened" : true },
        "children" : [
          {
            "text" : "Interesting Findings",
            "state" : { "opened" : true },
            "children" : [
              {
                "text" : "Try more heat",
                "state" : { "selected" : true },
                "icon" : "jstree-file"
              },
              {
                "text" : "Less heat, more salt",
                "icon" : "jstree-file"
              },
            ]
          }, {
            "text" : "Old Experiments",
            "state" : { "opened" : false },
            "children" : [
              {
                "text" : "Try more heat",
                "icon" : "jstree-file"
              },
              {
                "text" : "Less heat, more salt",
                "icon" : "jstree-file"
              }, {
                "text" : "Other Stuff",
                "state" : { "opened" : false },
                "children" : [
                  {
                    "text" : "Try more heat",
                    "icon" : "jstree-file"
                  },
                  {
                    "text" : "Less heat, more salt",
                    "icon" : "jstree-file"
                  },
                ]
              }
            ]
          }
        ]
      },
    ],
  },
  'contextmenu': {
    'items' : function (o, cb) { // Could be an object directly
      result =  {
        "rename" : {
          "separator_before"  : false,
          "separator_after" : false,
          "_disabled"     : false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
          "label"       : "Rename",
          /*!
          "shortcut"      : 113,
          "shortcut_label"  : 'F2',
          "icon"        : "glyphicon glyphicon-leaf",
          */
          "action"      : function (data) {
            var inst = $.jstree.reference(data.reference),
              obj = inst.get_node(data.reference);
            inst.edit(obj);
          }
        },
        "remove" : {
          "separator_before"  : false,
          "icon"        : false,
          "separator_after" : false,
          "_disabled"     : false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
          "label"       : "Delete",
          "action"      : function (data) {
            var inst = $.jstree.reference(data.reference),
              obj = inst.get_node(data.reference);
            if(inst.is_selected(obj)) {
              inst.delete_node(inst.get_selected());
            }
            else {
              inst.delete_node(obj);
            }
          }
        },
        "clone" : {
          "separator_before"  : false,
          "icon"        : false,
          "separator_after" : false,
          "label"       : "Clone",
          "action"      : function (data) {
            clone();
          }
        },
        "ccp" : {
          "separator_before"  : true,
          "icon"        : false,
          "separator_after" : false,
          "label"       : "Edit",
          "action"      : false,
          "submenu" : {
            "cut" : {
              "separator_before"  : false,
              "separator_after" : false,
              "label"       : "Cut",
              "action"      : function (data) {
                var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);
                if(inst.is_selected(obj)) {
                  inst.cut(inst.get_top_selected());
                }
                else {
                  inst.cut(obj);
                }
              }
            },
            "copy" : {
              "separator_before"  : false,
              "icon"        : false,
              "separator_after" : false,
              "label"       : "Copy",
              "action"      : function (data) {
                copy();
              }
            },
            "paste" : {
              "separator_before"  : false,
              "icon"        : false,
              "_disabled"     : function (data) {
                return !$.jstree.reference(data.reference).can_paste();
              },
              "separator_after" : false,
              "label"       : "Paste",
              "action"      : function (data) {
                paste();
              }
            }
          }
        }
      };


      return result;
    }
  }
});

// Copy/Past of context menu
function copy() {
  $('#experiment-browser').jstree().copy();
}

function paste() {
  pasteTarget = $('#experiment-browser').jstree().get_selected();
  if ($('#experiment-browser').jstree().get_icon(pasteTarget) == 'jstree-file') {
    pasteTarget = $('#experiment-browser').jstree().get_parent(pasteTarget);
  }

  $('#experiment-browser').jstree().paste(pasteTarget);
}

function clone() {
  copy();
  paste();
  $('#experiment-browser').jstree().edit($('#experiment-browser').jstree().get_selected());
}

function delete_node() {
  $('#experiment-browser').jstree().delete_node($('#experiment-browser').jstree().get_selected());
}

//Parm Panel
$(function(){  
  var empty = $('#empty-param');
  empty.removeAttr('id');

  //Init
  ['Kat-Konz.', 'na1', 'na2', 'na4', 'Temp1', 'Temp2'].forEach(function(name) {
    var clone = empty.clone();
    clone.find('.name-field').val(name);
    clone.appendTo('#params');
    clone.show();
  });

  $('#add-param').click(function() {
    var clone = empty.clone();
    clone.appendTo('#params');
    clone.show();
  });

  $(document).on('click', '.remove-param', function(event) {
    $(event.target).parents(".param").remove()
  });
});

require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('container'), {
        value: [
            '[OptionenVersuchsplanung]',
            'maxit=300',
            'opttol=1e-06',
            'stemlimitLS=2',
            '',
            '[OptionenParameterschaetzung]',
            'method=3',
            'eps=0.001',
            'itmax=50',
            'cond=10000',
            '[OptionenVersuchsplanung]',
            'maxit=300',
            'opttol=1e-06',
            'stemlimitLS=2',
            '',
            '[OptionenParameterschaetzung]',
            'method=3',
            'eps=0.001',
            'itmax=50',
            'cond=10000'
        ].join('\n'),
        language: 'ini'
    });
});
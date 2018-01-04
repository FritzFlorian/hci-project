// Split Panerls
// See: https://nathancahill.github.io/Split.js/
Split(['#content-left', '#content-center', '#content-right'], {
  sizes: [25, 50, 25],
  minSize: 400
});

// Call this to trigger a 'fake simulation' loading overlay
function showLoadingOverlay() {
  $('#content-right').LoadingOverlay("show");

  setTimeout(function(){
      $('#content-right').LoadingOverlay("hide");
  }, 200);
}

$(function() {
  $('*').change(showLoadingOverlay);
});

// Helper that will add menu items to a panel
function addMenuItems(panelDiv) {
  addMenuItems(panelDiv, 'pinned');
}

function addMenuItems(panelDiv, startState) {
  panelDiv.lobiPanel({
    sortable: true,
    reload: false,
    unpin: false,
    expand: false,
    editTitle: false,
    state: startState,
  });

  // Add pencil to 'edit' the source code.
  panelDiv.find(".dropdown-menu-right").prepend(`
    <li>
      <a data-toggle="tooltip" data-placement="bottom" title="Quellcode Bearbeiten"><i class="fa fa-code"></i><span class="control-title">Edit Sourcecode</span></a>
    </li>
  `);
  var tooltip = panelDiv.find('*[title="Quellcode Bearbeiten"]');
  tooltip.tooltip();
  tooltip.click(function() {
    $('#editSourcecodeModal').modal();
  });
}

// Drag & Drop panels
// See: https://lobianijs.com/site/lobipanel
$(function(){
  $('#panel-parent').children().each(function(index) {
    if (index == 0) {
      addMenuItems($(this), 'pinned');
    } else {
      addMenuItems($(this), 'collapsed');
    }
  });

  // Insert new nodes
  var hidden = $('#hidden-panel');
  hidden.removeAttr('id');

  $('#add-button').click(function() {
    var clone = hidden.clone();
    clone.appendTo('#panel-parent');
    clone.show();
    $('[data-toggle="tooltip"]').tooltip()

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

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#add-tool').tooltip();
})

// Experiment Browser
// See: https://www.jstree.com/api/
$('#experiment-browser').jstree({
  'plugins' : ['contextmenu', 'dnd', 'wholerow'],
  'core' : {
    'check_callback' : true,
    'multiple' : true,
    'data' : [
      {
        "text" : "Alle Experimente",
        "state" : { "opened" : true },
        "children" : [
          {
            "text" : "Interessante Ergebnisse",
            "state" : { "opened" : true },
            "children" : [
              {
                "text" : "Versuch mit mehr Hitze",
                "state" : { "selected" : true },
                "icon" : "jstree-file"
              },
              {
                "text" : "Weniger Hitze, mehr Salz",
                "icon" : "jstree-file"
              },
            ]
          }, {
            "text" : "Alte Versuche",
            "state" : { "opened" : false },
            "children" : [
              {
                "text" : "Versuch mit Mehr Hitze",
                "icon" : "jstree-file"
              },
              {
                "text" : "Weniger Hitze",
                "icon" : "jstree-file"
              }, {
                "text" : "Andere",
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
          "label"       : "Umbenennen",
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
          "label"       : "Löschen",
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
          "label"       : "Duplizieren",
          "action"      : function (data) {
            clone();
          }
        },
        "ccp" : {
          "separator_before"  : true,
          "icon"        : false,
          "separator_after" : false,
          "label"       : "Bearbeiten",
          "action"      : false,
          "submenu" : {
            "cut" : {
              "separator_before"  : false,
              "separator_after" : false,
              "label"       : "Außschneiden",
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
              "label"       : "Kopieren",
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
              "label"       : "Einfügen",
              "action"      : function (data) {
                paste();
              }
            }
          }
        },
        "explorer" : {
          "separator_before"  : true,
          "icon"        : false,
          "separator_after" : false,
          "label"       : "Im Explorer Öffnen",
          "action"      : function (data) {
            open();
          }
        },
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
function open() {
  var element = document.createElement('div');
  element.innerHTML = '<input type="file">';
  var fileInput = element.firstChild;

  fileInput.click();
}

function clone() {
  copy();
  paste();
  $('#experiment-browser').jstree().edit($('#experiment-browser').jstree().get_selected());
}

function edit() {
  $('#experiment-browser').jstree().edit($('#experiment-browser').jstree().get_selected());
}

function delete_node() {
  $('#experiment-browser').jstree().delete_node($('#experiment-browser').jstree().get_selected());
}

$(function(){ 
  $('#copy').click(copy);
  $('#paste').click(paste);
  $('#clone').click(clone);
  $('#delete').click(delete_node);
  $('#rename').click(edit);
});

//Parm Panel
$(function(){  
  var empty = $('#empty-param');
  empty.removeAttr('id');

  function addClone(name) {
    var clone = empty.clone();
    clone.find('.name-field').val(name);
    
    var slider = clone.find('[name="points"]');
    var field = clone.find('[name="points-value"]');
    field.change(function() {
      showLoadingOverlay();
      slider.val($(this).val());
    });
    slider.change(function() {
      showLoadingOverlay();
      field.val($(this).val());
    });
    var init = getRandomInt(0, 7);
    slider.val(init);
    field.val(init);

    clone.appendTo('#params');
    clone.show();
  }

  //Init
  ['Kat-Konz.', 'na1', 'na2', 'na4', 'Temp1', 'Temp2'].forEach(function(name) {
    addClone(name);
  });

  $('#add-param').click(function() {
    addClone('');
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
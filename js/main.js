// Split Panerls
// See: https://nathancahill.github.io/Split.js/
Split(['#left', '#center', '#right'], {
  sizes: [15, 50, 35]
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
  }
});

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
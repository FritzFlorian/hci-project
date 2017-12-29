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
    editTitle: false,
  });

  // Add pencil to 'edit' the source code.
  panelDiv.find("ul").prepend(`
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
  $('#panel-parent').sortable();
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
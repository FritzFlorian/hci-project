// Split Panerls
// See: https://nathancahill.github.io/Split.js/
Split(['#left', '#center', '#right'], {
  sizes: [25, 50, 25]
});

// Drag & Drop panels
// See: https://lobianijs.com/site/lobipanel
$(function(){
  $('#panel-parent').sortable();
  $('#panel-parent').children().lobiPanel({
    sortable: true,
    reload: false,
    unpin: false,
    expand: false,
    editTitle: false
  });


  // Insert new nodes
  var hidden = $('#hidden-panel');
  hidden.removeAttr('id');

  $('#add-button').click(function() {
    var clone = hidden.clone();
    clone.appendTo('#panel-parent');
    clone.show();

    $('#panel-parent').sortable("refresh");
    $('#panel-parent').sortable("refreshPositions");

    clone.lobiPanel({
      sortable: true,
      reload: false,
      unpin: false,
      expand: false,
      editTitle: false
    });
  });
});

// Drag & Drop Program Operations
// See: https://lobianijs.com/site/lobipanel
$(function(){
  var list_parent = $('#list-parent');
  list_parent.sortable();
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
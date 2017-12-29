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
    editTitle: false,
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
      editTitle: false,
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
  ["Kat-Konz.", "na1", "na2", "na4", "Temp1", "Temp2"].forEach(function(name) {
    var clone = empty.clone();
    clone.find(".name-field").val(name);
    clone.appendTo('#params');
    clone.show();
  });

  $('#add-param').click(function() {
    var clone = empty.clone();
    clone.appendTo('#params');
    clone.show();
  });

  $('.remove-param').click(function(event) {
    $(event.target).parents(".param").remove()
  });
});
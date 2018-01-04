// Split Panerls
// See: https://nathancahill.github.io/Split.js/
Split(['#content-left', '#content-center', '#content-right'], {
  sizes: [25, 50, 25],
  minSize: 400
});

// Call this to trigger a 'fake simulation' loading overlay
function forceShowLoadingOverlay() {
  showLoadingOverlay(true);
}

function showLoadingOverlay() {
  var shouldShow = $('.autorun-enabled').is(':checked');
  showLoadingOverlay(shouldShow);
}

function showLoadingOverlay(shouldShow) {
  if (shouldShow) {
    $('#content-right').LoadingOverlay("show");

    setTimeout(function(){
        $('#content-right').LoadingOverlay("hide");
    }, 200);
  }
}

$(function() {
  $('[type=input]').not('.no-change').change(showLoadingOverlay);
});

// Loading overlay for measurement graph.
// Muss neu aufgerufen werden nachdem das panel gecloned wurde.
function showMeasurementGraphLoadingOverlay() {
    $('#measurement-graph').LoadingOverlay("show");

    setTimeout(function(){
        $('#measurement-graph').LoadingOverlay("hide");
    }, 200);
}

function setupMeasurementPoints() {
    $(".measurement-points").children().change(showMeasurementGraphLoadingOverlay);
}
$(function() {
  setupMeasurementPoints();
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
    state: startState
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
    setupMeasurementPoints();
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
    editTitle: false,
    close: false,
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
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
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
              "label"       : "Ausschneiden",
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

//Param Panel
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

// Fill Program Operations Panel
$(function(){
  var list_parent = $('#operation-list-parent');
  // Find template for operation
  var empty = $('#empty-operation');
  empty.removeAttr('id');

  function addOperation(title) {
    // Set title
    var clone = empty.clone();
    clone.find('.panel-title').text(title);

    // Place and display clone
    clone.appendTo(list_parent);
    clone.show();

    // Define lobiPanel functions
    clone.lobiPanel({
      sortable: true,
      reload: false,
      unpin: false,
      expand: false,
      editTitle: false,
      minimize: false
    });
  }

  // Initialize Program Operations
  ['Integration', 'Simulation', 'Parameterabschätzung', 'Objective Test', 'Simulation', 'Derivative Test'].forEach(function(name) {
    addOperation(name);
  });

  $('#add-operation-button').click(function() {
    addOperation('New Operation');
  });
});

//Run Panel
$(function() {
  var autorunCheckboxes = $('.autorun-enabled');
  var runButton = $('#run-button');
  autorunCheckboxes.click(function (event) {
    if ($(this).is(':checked')) {
      forceShowLoadingOverlay();
      runButton.toggleClass('disabled', true);
    } else {
      runButton.toggleClass('disabled', false);
    }
  });

  // Sync all boxes
  autorunCheckboxes.change(function() {
    var enabled = $(this).is(':checked');
    autorunCheckboxes.each(function() {
      $(this).prop('checked', enabled);
    });
  });

  runButton.click(function() {
    forceShowLoadingOverlay();
  });
});

// Ini Options Panel
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

// Source Code Editor
require(['vs/editor/editor.main'], function() {
    var sc_editor = monaco.editor.create(document.getElementById('code'), {
        value: [
            'from pyjamas.ui.Composite import Composite',
            'from pyjamas.ui.CheckBox import CheckBox',
            'from pyjamas.ui.HorizontalPanel import HorizontalPanel',
            'from pyjamas.ui.VerticalPanel import VerticalPanel',
            'from pyjamas.ui.Button import Button',
            'from pyjamas.ui import HasAlignment',
            '',
            'class DayCheckBox(CheckBox):',
            '',
            '  def __init__(self, owner, caption, day):',
            '    CheckBox.__init__(self, caption)',
            '',
            '    self.day = day',
            '    self.addClickListener(owner.dayCheckBoxListener)',
            '    self.setChecked(owner.calendar.getDayIncluded(day))',
            '',
            '',
            'class DayCheckBoxListener:',
            '',
            '  def __init__(self, calendar):',
            '    self.calendar = calendar',
            '',
            '  def onClick(self, sender):',
            '    self.calendar.setDayIncluded(sender.day, sender.isChecked())',
            '',
            '',
            'class DayFilterWidget(Composite):',
            '',
            '  def __init__(self, calendar):',
            '    Composite.__init__(self)',
            '    self.calendar = calendar',
            '    self.dayCheckBoxListener = DayCheckBoxListener(calendar)',
            '    self.outer = VerticalPanel()',
            '    self.initWidget(self.outer)',
            '    self.setStyleName("DynaTable-DayFilterWidget")',
            '    self.outer.add(DayCheckBox(self, "Sunday", 0))',
            '    self.outer.add(DayCheckBox(self, "Monday", 1))',
            '    self.outer.add(DayCheckBox(self, "Tuesday", 2))',
            '    self.outer.add(DayCheckBox(self, "Wednesday", 3))',
            '    self.outer.add(DayCheckBox(self, "Thursday", 4))',
            '    self.outer.add(DayCheckBox(self, "Friday", 5))',
            '    self.outer.add(DayCheckBox(self, "Saturday", 6))',
            '',
            '    self.buttonAll = Button("All", self)',
            '    self.buttonNone = Button("None", self)',
            '',
            '    hp = HorizontalPanel()',
            '    hp.setHorizontalAlignment(HasAlignment.ALIGN_CENTER)',
            '    hp.add(self.buttonAll)',
            '    hp.add(self.buttonNone)',
            '',
            '    self.outer.add(hp)',
            '    self.outer.setCellVerticalAlignment(hp, HasAlignment.ALIGN_BOTTOM)',
            '    self.outer.setCellHorizontalAlignment(hp, HasAlignment.ALIGN_CENTER)',
            '',
            '  def setAllCheckBoxes(self, checked):',
            '    for widget in self.outer:',
            '      if hasattr(widget, "setChecked"):',
            '        widget.setChecked(checked)',
            '        self.dayCheckBoxListener.onClick(widget)',
            '',
            '  def onClick(self, sender):',
            '    if self.buttonAll == sender:',
            '      self.setAllCheckBoxes(True)',
            '    elif self.buttonNone == sender:',
            '      self.setAllCheckBoxes(False)'
        ].join('\n'),
        language: 'python'
    });

    sc_editor.layout({ width: 868, height: 400});
});

// Fullscreen Button
$(function(){
  $('#fullscreen-button').click(function() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
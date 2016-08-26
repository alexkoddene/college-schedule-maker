angular.module('scheduleMaker', [])
  .controller('scheduleMakerController', function() {

    var ctrl = this;

    var selected = [];
    var deselectedColor = '#FFFFFF';
    var selectedColor = '#D9FBCD';
    var conflictColor = '#FFD6E7';

    ctrl.onSelect = function (selection, $event) {

      // If no class has yet been selected, no need to do any checks
      if (selected.length < 1) {

        selectClass(selection)

      } else {

        // Loop through the selected classes
        for (var i = 0; i < selected.length; i++) {

          // Check if the new selection was already selected
          if (selection[1] === selected[i][1]) {

            // Deselect it
            deselectClass(selection);

            return;
          }

        }

        selectClass(selection);
      }
    };

    var deselectClass = function (selection) {

      // Remove class from array
      selected.splice(selected.indexOf(selection), 1);

      $('.' + selection[1]).css('background-color', deselectedColor);
      $('.' + selection[1]).removeClass('selected');

      // At the end of each action, check for conflicts
      checkForConflicts();
    };

    var selectClassConflict = function (selection) {

      selected.push(selection);

      $('.' + selection[1]).css('background-color', conflictColor);
      $('.' + selection[1]).addClass('selected');

      // At the end of each action, check for conflicts
      checkForConflicts();
    };

    var selectClass = function (selection) {

      selected.push(selection);

      $('.' + selection[1]).css('background-color', selectedColor);
      $('.' + selection[1]).addClass('selected');

      // At the end of each action, check for conflicts
      checkForConflicts();
    };

    var checkForConflicts = function () {

      var rows = $('tr');

      for (var i = 0; i < rows.length; i++) {

        var selectedChildren = [];

        $(rows[i]).children('td').each(function () {

          // Here "this" refers to the current element on the loop
          element = $(this);

          if (element.hasClass('selected')) {

            selectedChildren.push(element);
          }

          if (element.hasClass('last-of-the-hour')) {

             // If more than one children is selected in this hour
            if (selectedChildren.length > 1) {

              // Highlight the conflicting classes
              for (var j = 0; j < selectedChildren.length; j++) {
                selectedChildren[j].css('background-color', conflictColor);
              }

            } else {

              // Make sure if there is one left in this hour, it is not highlighted as conflicting
              for (var j = 0; j < selectedChildren.length; j++) {
                selectedChildren[j].css('background-color', selectedColor);
              }
            }

            selectedChildren = [];
          }

        });
      }
    };

    // Selected classes in the format ['Programação Imperativa [CPI - A4] T1', 'Programação Imperativa T1']
    var selected = [];

    // The schedule in the format schedule[day][hour][class][display name/id]
    ctrl.schedule = [
      [ // monday
        [
          ['Estatística Aplicada [CPI - A4] T1', 'EA-T1a']
        ],
        [
          ['Estatística Aplicada [CPI - C1/316] TP4', 'EA-TP4'],
          ['Introdução aos Sistemas Dinâmicos [CPI - C1/201] TP3', 'SD-TP3'],
          ['Engenharia Económica [CPI - C1/314] TP3', 'EE-TP3'],
          ['Algoritmos e Complexidade [CPI - C1/216] TP2', 'AC-TP2'],
          ['Arquitetura de Computadores [EEUM_G - DI-0.12] PL1', 'AC-PL1']
        ],
        [
          ['Introdução aos Sistemas Dinâmicos [CPI - C1/201] TP1', 'SD-TP1'],
          ['Arquitetura de Computadores [EEUM_G - DI-0.12] PL4', 'AC-PL4'],
          ['Algoritmos e Complexidade [CPI - C1/314] TP3', 'AC-TP3']
        ]
      ],
      [ //tuesday
        [
          ['Introdução aos Sistemas Dinâmicos [CPI - C1/303] TP1', 'SD-TP1'],
          ['Estatística Aplicada [CPI - C1/220] TP3', 'EA-TP3']
        ],
        [
          ['Arquitetura de Computadores [EEUM_G - DI-0.12] PL5', 'AC-PL5']
        ],
        [
          ['Engenharia Económica [CPI A4] T1', 'EE-T1b']
        ],
        [
          ['Algoritmos e Complexidade [CPI - A4] T1', 'AC-T1c']
        ],
        [
          ['Comunicação de Dados [CPI - A4] T1', 'CD-T1d']
        ],
        [
          ['Comunicação de Dados [CPI - C1/314] TP4', 'CD-TP4'],
          ['Comunicação de Dados [CPI - C1/303] TP3', 'CD-TP3']
        ]
      ],
      [ //wednesday
        [
          ['Engenharia Económica [CPI - C1/311] TP2','EE-TP2'],
          ['Comunicação de Dados [CPI - C1/315] TP1', 'CD-TP1']
        ],
        [
          ['Engenharia Económica [CPI - C1/216] TP4','EE-TP4'],
          ['Engenharia Económica [CPI - C1/311] TP1','EE-TP1']
        ]
      ],
      [ //thursday
        [
          ['Introdução aos Sistemas Dinâmicos [CPI - C1/201] TP2', 'SD-TP2'],
          ['Arquitetura de Computadores [EEUM_G - DI-1.04] PL2', 'AC-PL2']
        ],
        [
          ['Arquitetura de Computadores [CPI - A4] T1', 'AC-T1e']
        ],
        [
          ['Estatística Aplicada [CPI - C1/213] TP1', 'EA-TP1'],
          ['Introdução aos Sistemas Dinâmicos [CPI - C1/201] TP3', 'SD-TP3'],
          ['Comunicação de Dados [CPI - C1/315] TP2', 'CD-TP2'],
          ['Algoritmos e Complexidade [CPI - C1/218] TP4', 'AC-TP4'],
          ['Arquitetura de Computadores [EEUM_G - DI-0.12] PL3', 'AC-PL3']
        ],
        [
          ['Estatística Aplicada [CPI - C1/213] TP2', 'EA-TP2'],
          ['Introdução aos Sistemas Dinâmicos [CPI - C1/215] TP2', 'SD-TP2'],
          ['Arquitetura de Computadores [EEUM_G - DI-0.12] PL6', 'AC-PL6'],
          ['Algoritmos e Complexidade [CPI - C1/318] TP1', 'AC-TP1'],
          ['Algoritmos e Complexidade [CPI - C1/315] TP5', 'AC-TP5']
        ]
      ],
      [ //friday
        [
          ['Arquitetura de Computadores [CPI -A4] T1', 'AC-T1f']
        ],
        [
          ['Algoritmos e Complexidade [CPI - A4] T1', 'AC-T1g']
        ],
        [
          ['Comunicação de Dados [CPI - A4] T1', 'CD-T1h']
        ]
      ]
    ];

  });

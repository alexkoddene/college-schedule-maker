angular.module('scheduleMaker', [])
  .controller('scheduleMakerController', function() {

    var ctrl = this;

    var selected = [];
    var deselectedColor = 'rgb(255, 255, 255)'; // Has to be rgba because it's checked in code
    var selectedColor = 'rgb(200, 255, 200)'; // Has to be rgba because it's checked in code
    var conflictColor = 'rgb(255, 200, 200)'; // Has to be rgba because it's checked in code

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
      [
        [
          ['Programação Imperativa [CPI - A4] T1', 'PI-T1']
        ],
        [
          ['Lógica EI [C2/309] TP3', 'L-TP3'],
          ['Programação Imperativa [C3/403] TP7', 'PI-TP7'],
          ['Lógica EI [C3/304] TP2', 'L-TP2'],
          ['Análise [C3/202] TP3', 'A-TP3'],
          ['Laboratórios de Informática II [DI-1.09] PL2', 'LIII-PL2']
        ],
        [
          ['Sistemas de Computação [C2/210] PL1', 'SC-PL1'],
          ['Sistemas de Computação [C2/211] PL10', 'SC-PL10'],
          ['Tópicos de Física Moderna [C2/304] TP1', 'TFM-TP1'],
          ['Análise [C1/318] TP5', 'A-TP5'],
          ['Programação Imperativa [C2/207] TP1', 'PI-TP1'],
          ['Programação Imperativa [C1/208] TP3', 'PI-TP3']
        ]
      ],
      [
        [
          ['Sistemas de Computação [CPI - A4] T1', 'SC-T1']
        ],
        [
          ['Sistemas de Computação [C3/303] PL1', 'SC-PL1'],
          ['Sistemas de Computação [C1/307] PL9', 'SC-PL9'],
          ['Lógica EI [C2/201] TP3', 'L-TP3'],
          ['Análise [C3/202] TP2', 'A-TP2'],
          ['Laboratórios de Informática II [DI-0.10] PL5', 'LIII-PL5']
        ],
        [
          ['Sistemas de Computação [C1/103] PL3', 'SC-PL3'],
          ['Sistemas de Computação [C1/309] PL6', 'SC-PL6'],
          ['Tópicos de Física Moderna [C2/307] TP4', 'TFM-TP4'],
          ['Lógica EI [C2/105] TP1', 'L-TP1'],
          ['Programação Imperativa [C3/404] TP4', 'PI-TP4'],
          ['Programação Imperativa [C2/106] TP5', 'PI-TP5']
        ]
      ],
      [
        [
          ['Laboratórios de Informática II [DI-0.02] PL6', 'LIII-PL6'],
          ['Sistemas de Computação [C2/212] PL2', 'SC-PL2'],
          ['Sistemas de Computação [C2/303] PL5', 'SC-PL5'],
          ['Análise [C3/202] TP2', 'A-TP2'],
          ['Análise [C2/111] TP4', 'A-TP4'],
          ['Laboratórios de Informática II  [DI-1.05] PL1', 'LIII-PL1']
        ],
        [
          ['Tópicos de Física Moderna [C2/303] TP2', 'TFM-TP2'],
          ['Tópicos de Física Moderna [C3/301] TP5', 'TFM-TP5'],
          ['Lógica EI [C3/302] TP4', 'L-TP4'],
          ['Análise [C3/202] TP1', 'A-TP1'],
          ['Análise [C2/111] TP3', 'A-TP3']
        ]
      ],
      [
        [
          ['Laboratórios de Informática II [DI-0.05] PL7', 'LIII-PL7'],
          ['Lógica EI [C3/302] TP1', 'L-TP1'],
          ['Análise [C3/202] TP5', 'A-TP5'],
          ['Laboratórios de Informática II [DI-0.12] PL4', 'LIII-PL4']
        ],
        [
          ['Programação Imperativa [C2/211] TP6', 'PI-TP6'],
          ['Sistemas de Computação [C3/301] PL4', 'SC-PL4'],
          ['Sistemas de Computação [C1/104] PL8', 'SC-PL8'],
          ['Laboratórios de Informática II [DI-1.09] PL3', 'LIII-PL3'],
          ['Lógica EI [C3/202] TP4', 'L-TP4'],
          ['Programação Imperativa [C1/303] TP2', 'PI-TP2']
        ]
      ],
      [
        [
          ['Lógica EI [C2/204] TP2', 'L-TP2'],
          ['Tópicos de Física Moderna [C2/302] TP3', 'TFM-TP3'],
          ['Análise [C2/203] TP1', 'A-TP1'],
          ['Análise [C3/202] TP4', 'A-TP4']
        ],
        [
          ['Tópicos de Física Moderna [CPI - A4] T1', 'TFM-T1']
        ]
      ]
    ];

  });

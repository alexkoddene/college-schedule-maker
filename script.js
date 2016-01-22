angular.module('scheduleMaker', [])
  .controller('scheduleMakerController', function() {

    var ctrl = this;

    var selected = [];
    var deselectedColor = 'white';
    var selectedColor = 'green';
    var conflictColor = 'red';

    ctrl.onSelect = function (selection, $event) {

      // If no class has yet been selected, no need to do any checks
      if (selected.length < 1) {

        selectClass(selection)

      } else {

        // Loop through the selected classes
        for (var i = 0; i < selected.length; i++) {

          console.log('Checking for already selected');

          // Check if the new selection was already selected
          if (selection[1] === selected[i][1]) {

            // Deselect it
            deselectClass(selection);

            return;
          }

        }

        // Check for conflicts

        console.log('Checking for conflicts');

        var conflicts = checkForConflicts(selection);

        if (conflicts.length > 0) {

          selectClassConflict(selection);

          for (var i = 0; i < conflicts.length; i++) {
            selectClassConflict(conflicts[i]);
          }

        } else {
          selectClass(selection);
        }
      }
    };

    var deselectClass = function (selection) {

      console.log('Deselecting class:');
      console.log(selection);
      console.log(selected.indexOf(selection));

      // Remove class from array
      selected.splice(selected.indexOf(selection), 1);

      // Refresh selections, since the one we're deselecting could have been conflicting with others
      for (var i = 0; i < selected.length; i++) {
        ctrl.onSelect(selected[i]);
      }
      for (var i = 0; i < selected.length; i++) {
        ctrl.onSelect(selected[i]);
      }

      $('.' + selection[1]).css('background-color', deselectedColor);
    };

    var selectClassConflict = function (selection) {

      console.log('Marking as conflicting:');
      console.log(selection);

      selected.push(selection);

      $('.' + selection[1]).css('background-color', conflictColor);
    };

    var selectClass = function (selection) {

      console.log('Selecting class:');
      console.log(selection);

      selected.push(selection);

      $('.' + selection[1]).css('background-color', selectedColor);
    };

    var checkForConflicts = function (selection) {

      var classPresent = false;
      var selectedClassPresent = false;
      var selectedClassThatIsPresent;
      var conflicts = [];

      // Loop through the days
      for (var i = 0; i < ctrl.schedule.length; i++) {

        // Loop through the hours
        for (var j = 0; j < ctrl.schedule[i].length; j++) {

          // Loop through the classes
          for (var k = 0; k < ctrl.schedule[i][j].length; k++) {

            // If the class we selected now is present, make the flag true
            if (ctrl.schedule[i][j][k][1] === selection[1]) {
              classPresent = true;
            } else {

              // Loop through the selected classes
              for (var l = 0; l < selected.length; l++) {

                // If a class is selected and present, make the flag true
                if (selected[l][1] === ctrl.schedule[i][j][k][1]) {

                  selectedClassPresent = true;
                  selectedClassThatIsPresent = selected[l];
                }
              }
            }
          }

          // If on the hour we just looped there is a selected class and the class
          // we just selected, mark them both as in conflict
          if (classPresent && selectedClassPresent) {
            conflicts.push(selectedClassThatIsPresent);
          } else {

            // Moving to another hour, reset flags
            classPresent = false;
            selectedClassPresent = false;
          }

        }
      }

      return conflicts;
    }

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

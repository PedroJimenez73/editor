import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-v3-evaluation',
  templateUrl: './v3-evaluation.component.html',
  styleUrls: ['./v3-evaluation.component.scss']
})
export class V3EvaluationComponent implements OnInit {


  editorForm: FormGroup;
  htmlCode: any;
  dataSet = [];

  config = environment.editorConfig;
  questions = [];

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        page: '',
        elements: '',
        corrects: '',
        pageRef: ''
    });
  }

  addData() {
      let dataSet = this.editorForm.get('elements').value;
      while (dataSet.includes('<p>') ||
          dataSet.includes('</p>')) {
          dataSet = dataSet.replace('<p>', '');
          dataSet = dataSet.replace('</p>', '');
      }
      this.dataSet = dataSet.split('\n\n');
      this.dataSet[this.dataSet.length - 1] = this.dataSet[this.dataSet.length - 1].slice(0, -1)
      let questionItems = [];
      for (let i = 0; i < this.dataSet.length; i += 5) {
          const chunk = this.dataSet.slice(i, i + 5);
          questionItems.push(chunk);
      }
      let correctsArray = [];
      const puntuations = this.editorForm.get('corrects').value
      let puntuationsArray = [];
      puntuationsArray[0] = Number(puntuations.charAt(0));
      puntuationsArray[1] = Number(puntuations.charAt(1));
      puntuationsArray[2] = Number(puntuations.charAt(2));
      puntuationsArray[3] = Number(puntuations.charAt(3));
      let maxScore = 0;
      puntuationsArray.forEach(el => {
          el === 1 ? correctsArray.push(true) : correctsArray.push(false);
          el === 1 ? maxScore += 1 : maxScore += 0;
      })
      if (maxScore === 1) {
          maxScore = 0;
      }
      questionItems.forEach((elem, i) => {
          this.questions.push(`
                    {
                        "enunciate": "${elem[0]}",
                        "key": "${Guid.newGuid()}",
                        "relatedTo": {"index": ${this.editorForm.get('pageRef').value}, "title": ""},
                        "maxScore": ${maxScore},
                        "questions": [
                            {
                                "response": "${elem[1]}",
                                "key": "${Guid.newGuid()}",
                                "isTrue": ${correctsArray[0]},
                                "puntuation": ${puntuationsArray[0]}
                            },
                            {
                                "response": "${elem[2]}",
                                "key": "${Guid.newGuid()}",
                                "isTrue": ${correctsArray[1]},
                                "puntuation": ${puntuationsArray[1]}
                            },
                            {
                                "response": "${elem[3]}",
                                "key": "${Guid.newGuid()}",
                                "isTrue": ${correctsArray[2]},
                                "puntuation": ${puntuationsArray[2]}
                            },
                            {
                                "response": "${elem[4]}",
                                "key": "${Guid.newGuid()}",
                                "isTrue": ${correctsArray[3]},
                                "puntuation": ${puntuationsArray[3]}
                            }
                        ]
                    }
          `)
      })
      this.editorForm.get('elements').reset();
      this.editorForm.get('corrects').reset();
      this.editorForm.get('pageRef').reset();
  }

  setCode() {
     
      this.htmlCode = `
    {
        "title": "Evaluación",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "Evaluation",
                "props": {
                    "position": "1/1/1/13",
                    "intro": "A continuación debes realizar la evaluación de esta unidad de la siguiente forma:",
                    "details": [
                        "La evaluación consta de 5 preguntas con 4 respuestas posibles de las cuales podrán ser correctas una o varias.",
                        "En el enunciado de las preguntas se advierte si tienen varias respuestas posibles.",
                        "Se dispone de dos intentos como máximo para realizar la evaluación, aunque estos intentos se pueden realizar en sesiones de acceso diferentes.",
                        "Para enviar los resultados será necesario contestar a todas las preguntas, en caso contrario el botón enviar no estará habilitado.",
                        "Para superar la evaluación será necesario acertar más del 50% de la prueba."
                    ],
                    "maxScore": 100,
                    "attempts": 2,
                    "children": [
                        ${this.questions}
                    ]
                }
            }
        ]
    },
`;

  }

}

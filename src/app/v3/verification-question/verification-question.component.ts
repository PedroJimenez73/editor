import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-verification-question',
  templateUrl: './verification-question.component.html',
  styleUrls: ['./verification-question.component.scss']
})
export class VerificationQuestionComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  dataSet = [];

  config = environment.editorConfig;
  responses = [];

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        page: '',
        title: '',
        counter: '',
        ennunciate: '',
        elements: '',
        corrects: ''
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
      const corrects = this.editorForm.get('corrects').value;
      let correctsArray = [];
      let valuesArray = [];
      for (let i=0; i<corrects.length; i++) {
          if(corrects.charAt(i) == 1) {
            correctsArray.push(true);
            valuesArray.push(1);
          } else {
            correctsArray.push(false);
            valuesArray.push(0);
          }
      }
      this.dataSet.forEach((elem, i) => {
          if(i % 2 != 0) {
            this.responses.push(`
                        {
                            "response": "${this.dataSet[i - 1]}",
                            "isTrue": ${correctsArray[Math.ceil(i /2) - 1]},
                            "value": ${Math.ceil(i /2)},
                            "name": "question${this.editorForm.get('counter').value}",
                            "feedback": "${this.dataSet[i]}"
                        }
            `)
          }
      })
    this.editorForm.get('elements').reset();
    this.setCode();
  }

  setCode() {
     
      this.htmlCode = `
    {
        "title": "${this.editorForm.get('title').value}",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "RadioQuizz",
                "props": {
                    "position": "1/1/1/13",
                    "enunciate": "${this.editorForm.get('title').value}",
                    "responses": [
                        ${this.responses}
                    ],
                    "name": "question${this.editorForm.get('counter').value}"
                }
            }
        ],
    },
`;

  }

}

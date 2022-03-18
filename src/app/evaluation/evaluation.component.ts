import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {


  editorForm: FormGroup;
  htmlCode: any;
  answers = [];
  counter: number = 1;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        enunciate: '',
        questionNumber: '',
        answer: '',
        correct: '',
    });
  }

  addContent() {
      let puntuation = this.editorForm.get('correct').value ? 1 : 0;
      let isTrue = this.editorForm.get('correct').value ? true : false;
        this.answers.push( `response${this.counter}: {
            response: "${this.editorForm.get('answer').value}",
            isTrue: ${isTrue},
            name: "evaluation${this.editorForm.get('questionNumber').value}",
            value: ${this.counter},
            namepuntuation: "puntuation${this.editorForm.get('questionNumber').value}",
            puntuation: ${puntuation},
            nameArr: "puntuationArr${this.editorForm.get('questionNumber').value}"
        },`);
        this.counter++;
        this.editorForm.get('answer').reset();
        this.editorForm.get('correct').reset();
  }

  setCode() {
      this.htmlCode = `{
        enunciate: "${this.editorForm.get('enunciate').value}",
        responses: {
                    ${this.answers.join('')}
        }
      }
`;
      this.answers = [];
  }

}

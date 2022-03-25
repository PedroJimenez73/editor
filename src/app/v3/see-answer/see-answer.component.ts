import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-see-answer',
  templateUrl: './see-answer.component.html',
  styleUrls: ['./see-answer.component.scss']
})
export class SeeAnswerComponent implements OnInit {


  editorForm: FormGroup;
  htmlCode: any;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        pic: '',
        label: '',
        element: '',
        order1: '',
        order2: '',
    });
  }

  setCode() {
      let paragraph = this.editorForm.get('element').value;
      let paragraphWithoutBreak = paragraph.replace(/[\r\n\t]/gm, '');
      let order1 = this.editorForm.get('order1').value;
      let order2 = this.editorForm.get('order2').value;
      this.htmlCode = `
            {
                "key": "${Guid.newGuid()}",
                "component": "Question",
                "props": {
                    "position": "${order1}/1/${order1}/13",
                    "text": "${this.editorForm.get('label').value}"
                }
            },
            {
                "key": "${Guid.newGuid()}",
                "component": "SeeAnswer",
                "props": {
                    "position": "${order2}/1/${order2}/13",
                    "text": "${paragraphWithoutBreak}",
                    "image": "public/img/${this.editorForm.get('label').value}.jpg"
                }
            }
`;
      this.editorForm.get('element').reset();
      this.editorForm.get('label').reset();
  }

}

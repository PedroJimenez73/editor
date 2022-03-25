import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-rotary-cards',
  templateUrl: './rotary-cards.component.html',
  styleUrls: ['./rotary-cards.component.scss']
})
export class RotaryCardsComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  prevParagraph: any = '';
  sections = [];
  ahora: Date = new Date();

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        title: '',
        subtitle: '',
        page: '',
        prevParagraph: '',
        label: '',
        pic: '',
        element: '',
    });
  }

  addPrevParagraph() {
        let paragraph = this.editorForm.get('prevParagraph').value;
    let paragraphWithoutBreak = paragraph.replace(/[\r\n\t]/gm, '')
      this.prevParagraph = `
            {
                "key": "${Guid.newGuid()}",
                "component": "Paragraph",
                "props": {
                    "position": "2/1/2/13",
                    "text": "${paragraphWithoutBreak}"
                }
            },
      `
      this.editorForm.get('prevParagraph').reset();
  }


  addSection() {
    let paragraph = this.editorForm.get('element').value;
    let paragraphWithoutBreak = paragraph.replace(/[\r\n\t]/gm, '');
      this.sections.push(`
                        {
                            "title": "${this.editorForm.get('label').value}",
                            "img": "public/img/${this.editorForm.get('pic').value}",
                            "text": "${paragraphWithoutBreak}"
                        },
      `)
      this.editorForm.get('element').reset();
      this.editorForm.get('label').reset();
      this.editorForm.get('pic').reset();
  }

  setCode() {
      let divPosition;
      if(this.editorForm.get('subtitle').value !== '' && this.editorForm.get('pic').value !== '') {
          divPosition = '2/1/2/7';
      } else if (this.editorForm.get('subtitle').value === '' && this.editorForm.get('pic').value !== '') {
          divPosition = '1/1/1/7';
      } else if (this.editorForm.get('subtitle').value === '' && this.editorForm.get('pic').value === '') {
          divPosition = '1/2/1/12';
      } else if (this.editorForm.get('subtitle').value !== '' && this.editorForm.get('pic').value === '') {
          divPosition = '2/2/2/12';
      }
      this.htmlCode = `
 {
        "title": "${this.editorForm.get('title').value}",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "features": {
            "allowAnnotation": true,
            "allowHighlight": true
        },
        "children": [
            ${ this.editorForm.get('subtitle').value !== '' ? `
                {
                    "key": "${Guid.newGuid()}",
                    "component": "Subtitle",
                    "props": {
                        "position":"1/1/1/13",
                        "text": "${this.editorForm.get('subtitle').value}"
                    }
                },
            `: ''}
 
            ${this.prevParagraph}
                {
                    "key": "${Guid.newGuid()}",
                    "component": "RotaryCardContainer",
                    "props": {
                        "position": "${divPosition}",
                        "cards": [
                            ${this.sections}
                        ]
                    }
                }
           
        ]
    },
`;

  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

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
        pic: '',
        prevParagraph: '',
        label: '',
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
                            "text": [
                                "${paragraphWithoutBreak}"
                            ]
                        }
      `)
      this.editorForm.get('element').reset();
      this.editorForm.get('label').reset();
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
                    "component": "Table",
                    "props": {
                        "position": "${divPosition}",
                        "children": [
                            ${this.sections}
                        ]
                    }
                }
            ${ this.editorForm.get('pic').value !== '' ? `
               ,
               {
                    "key": "${Guid.newGuid()}",
                    "component": "FontImage",
                    "props": {
                        "position": "2/7/2/13",
                        "linkimage": "",
                        "definition": "",
                        "linkpage": "",
                        "image": "public/img/${this.editorForm.get('pic').value}.jpg",
                        "text": ""
                    }
                }` : ''
            }
        ]
    },
`;

  }

}

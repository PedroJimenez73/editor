import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-accordion-pic',
  templateUrl: './accordion-pic.component.html',
  styleUrls: ['./accordion-pic.component.scss']
})
export class AccordionPicComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  prevParagraph: any = '';
  section = [];
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
  addParagraph() {
    let paragraph = this.editorForm.get('element').value;
    let paragraphWithoutBreak = paragraph.replace(/[\r\n\t]/gm, '')
    this.section.push(`
                        {
                            "type": "paragraph",
                            "text": "${paragraphWithoutBreak}"
                        }
    `)
    this.editorForm.get('element').reset();
  }
  addList() {
    let list = this.editorForm.get('element').value;
    while(list.includes('<ul>') || 
          list.includes('</ul>') ||
          list.includes('<li>') ||
          list.includes('</li>') ) {
            list = list.replace('<ul>','');
            list = list.replace('</ul>','');
            list = list.replace('<li>','"');
            list = list.replace('</li>','",')
        } 
    this.section.push(`
                        {
                            "type": "list",
                            "list": [${list}]
                        }
    `)
    this.editorForm.get('element').reset();
  }

  addSection() {
      this.sections.push(`
                        {
                            "isOpen": false,
                            "label": "${this.editorForm.get('label').value}",
                            "id": "${Guid.newGuid()}",
                            "children": [
                                ${this.section}
                            ]
                        }
      `)
      this.editorForm.get('label').reset();
      this.section = [];
  }

  setCode() {
      let divPosition;
      if(this.editorForm.get('subtitle').value !== '' && this.editorForm.get('pic').value !== '') {
          divPosition = '2/1/2/7';
      } else if (this.editorForm.get('subtitle').value === '' && this.editorForm.get('pic').value !== '') {
          divPosition = '1/1/1/7';
      } else if (this.editorForm.get('subtitle').value === '' && this.editorForm.get('pic').value === '') {
          divPosition = '1/4/1/10';
      } else if (this.editorForm.get('subtitle').value !== '' && this.editorForm.get('pic').value === '') {
          divPosition = '2/4/2/10';
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
                    "component": "Accordion",
                    "props": {
                        "allowMultipleOpen": false,
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

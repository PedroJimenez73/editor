import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-text-pic',
  templateUrl: './text-pic.component.html',
  styleUrls: ['./text-pic.component.scss']
})
export class TextPicComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  elements = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        title: '',
        subtitle: '',
        page: '',
        pic: '',
        element: '',
    });
  }

  addParagraph() {
    let paragraph = this.editorForm.get('element').value;
    let paragraphWithoutBreak = paragraph.replace(/[\r\n\t]/gm, '')
    this.elements.push(`
                        {
                            "type": "paragraph",
                            "text": "${paragraphWithoutBreak}"
                        },
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
    this.elements.push(`
                        {
                            "type": "list",
                            "list": [${list}]
                        },
    `)
    this.editorForm.get('element').reset();
  }

  setCode() {
      let divPosition;
      let imgPosition;
      if(this.editorForm.get('subtitle').value !== '' && this.editorForm.get('pic').value !== '') {
          divPosition = '2/1/2/7';
          imgPosition = '2/7/2/13';
      } else if (this.editorForm.get('subtitle').value === '' && this.editorForm.get('pic').value !== '') {
          divPosition = '1/1/1/7';
          imgPosition = '1/7/1/13';
      } else if (this.editorForm.get('subtitle').value === '' && this.editorForm.get('pic').value === '') {
          divPosition = '1/1/1/13';
      } else if (this.editorForm.get('subtitle').value !== '' && this.editorForm.get('pic').value === '') {
          divPosition = '2/1/2/13';
      }
      const texts = this.elements.join('');
      const lastIndexOfComa = texts.lastIndexOf(',');
      const textsFinal = texts.slice(0, lastIndexOfComa) +
                    texts.slice(lastIndexOfComa + 1);
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
                {
                    "key": "${Guid.newGuid()}",
                    "component": "MultiDiv",
                    "props": {
                        "position": "${divPosition}",
                        "children": [
                            ${textsFinal}
                        ]
                    }
                }
            ${ this.editorForm.get('pic').value !== '' ? `
               ,
               {
                    "key": "${Guid.newGuid()}",
                    "component": "FontImage",
                    "props": {
                        "position": "${imgPosition}",
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

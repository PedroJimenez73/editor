import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  terms = [];
  texts = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        page: '',
        elements: '',
    });
  }

  addTerms() {
    let terms = this.editorForm.get('elements').value;
    while(terms.includes('<p>') || 
        terms.includes('</p>') ) {
            terms = terms.replace('<p>','');
            terms = terms.replace('</p>','');
    }
    this.terms = terms.split('\n\n');
    this.terms[this.terms.length - 1] = this.terms[this.terms.length - 1].slice(0, -1)
    this.editorForm.get('elements').reset();
  }
  addTexts() {
    let texts = this.editorForm.get('elements').value;
    while(texts.includes('<p>') || 
        texts.includes('</p>') ) {
            texts = texts.replace('<p>','');
            texts = texts.replace('</p>','');
    }
    this.texts = texts.split('\n\n');
    this.texts[this.texts.length - 1] = this.texts[this.texts.length - 1].slice(0, -1)
    this.editorForm.get('elements').reset();
  }

  setCode() {
      let glossaryItems = [];
      this.terms.forEach((elem,i) => {
          glossaryItems.push(`
                    { 
                        "title": "${elem}", 
                        "id": ${i + 1},
                        "text": "${this.texts[i]}"
                    }
          `)
      })
      this.htmlCode = `
    {
        "title": "Glosario",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "Glossary",
                "props": {
                    "position": "1/1/1/13",
                    "children": [
                        ${glossaryItems}
                    ]
                }
            }
        ]
    },
`;

  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-meta-slide',
  templateUrl: './meta-slide.component.html',
  styleUrls: ['./meta-slide.component.scss']
})
export class MetaSlideComponent implements OnInit {


  editorForm: FormGroup;
  htmlCode: any;
  slides = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        texts: '',
    });
  }

  addContent() {
    let elements = this.editorForm.get('texts').value;
    while(elements.includes('<p>') || 
        elements.includes('</p>') || 
        elements.includes('<ul>') || 
        elements.includes('</ul>') || 
        elements.includes('<li>') || 
        elements.includes('</li>') ) {
            elements = elements.replace('<p>','{"type": "paragraph", "text": "');
            elements = elements.replace('</p>','"},');
            elements = elements.replace('<ul>','{"type": "list", "list": [');
            elements = elements.replace('</ul>',']},');
            elements = elements.replace('<li>','"');
            elements = elements.replace('</li>','",');
    }
    this.slides.push(`
        {
           "elements": [
                ${elements}
           ] 
        },
    `);
    this.editorForm.get('texts').reset();
  }

  setCode() {

      this.htmlCode = `
    {
        "title": "Presentación",
        "id": 2,
        "features": {
            "allowAnnotation": true
        },
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "MetaSlide",
                "props": {
                    "position":"1/1/1/13",
                    "slides": [
                        ${this.slides}
                    ]
                }
            }
        ]
    },
`;

  }

}

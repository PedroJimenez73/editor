import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  elements = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        page: '',
        title: '',
        link1: '',
        link2: '',
        order: '',
        element: '',
    });
  }

  addParagraph() {
    let paragraph = this.editorForm.get('element').value;
    while(paragraph.includes('<p>') || 
        paragraph.includes('</p>') ) {
            paragraph = paragraph.replace('<p>','');
            paragraph = paragraph.replace('</p>','');
    }
    this.elements.push(`
                        {
                            "type": "paragraph",
                            "text": "${paragraph}"
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
            {
                "key": "${Guid.newGuid()}",
                "component": "MultiDiv",
                "props": {
                    "position": "1/1/1/13",
                    "children": [
                        ${this.elements.join(',')}
                    ]
                }
            },
            {
                "key": "${Guid.newGuid()}",
                "component": "VideoDownload",
                "props": {
                    "position": "2/1/2/13",
                    "title": "${this.editorForm.get('title').value}",
                    "name": "${'apuntes_video_' + (this.editorForm.get('order').value)}",
                    "pdfFileName": "${'apuntes_video_' + this.editorForm.get('order').value}",
                    "videoUrl": "https://player.vimeo.com/video/${this.editorForm.get('link1').value}?h=${this.editorForm.get('link2').value}"
                }
            }
        ]
    },
`;

  }

}

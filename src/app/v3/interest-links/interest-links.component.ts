import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-interest-links',
  templateUrl: './interest-links.component.html',
  styleUrls: ['./interest-links.component.scss']
})
export class InterestLinksComponent implements OnInit {


  editorForm: FormGroup;
  htmlCode: any;
  dataSet = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        page: '',
        elements: '',
    });
  }

  addData() {
    let dataSet = this.editorForm.get('elements').value;
    while(dataSet.includes('<p>') || 
        dataSet.includes('</p>') ) {
            dataSet = dataSet.replace('<p>','');
            dataSet = dataSet.replace('</p>','');
    }
    this.dataSet = dataSet.split('\n\n');
    this.dataSet[this.dataSet.length - 1] = this.dataSet[this.dataSet.length - 1].slice(0, -1)
    this.editorForm.get('elements').reset();
  }

  setCode() {
      let linkItems = [];
      for (let i = 0; i < this.dataSet.length; i += 3) {
        const chunk = this.dataSet.slice(i, i + 3);
        linkItems.push(chunk);
     }
     let linkObjectsItems = []
     linkItems.forEach((elem,i) => {
          linkObjectsItems.push(`
                    {
                        "title": "${elem[0]}",
                        "text": "${elem[1]}",
                        "link": "${elem[2]}"
                    }
          `)
      })
      this.htmlCode = `
    {
        "title": "Enlaces de interés",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "InterestingLinks",
                "props": {
                    "position": "1/1/1/13",
                    "children": [
                        ${linkObjectsItems}
                    ]
                }
            }
        ]
    },
`;

  }

}

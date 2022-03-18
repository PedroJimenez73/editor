import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-bibliography',
  templateUrl: './bibliography.component.html',
  styleUrls: ['./bibliography.component.scss']
})
export class BibliographyComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  dataSet: any;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        page: '',
        elements: '',
    });
  }

  addData() {

    let list = this.editorForm.get('elements').value;
    while(list.includes('<p>') || 
          list.includes('</p>')  ) {
            list = list.replace('<p>','"');
            list = list.replace('</p>','",')
        } 
      const lastIndexOfComa = list.lastIndexOf(',');
      const listFinal = list.slice(0, lastIndexOfComa) +
          list.slice(lastIndexOfComa + 1);
      this.dataSet = listFinal;
    // this.dataSet.push(`
    //                     {
    //                         "type": "list",
    //                         "list": [${list}]
    //                     },
    // `)
    this.editorForm.get('elements').reset();
  }

  setCode() {
      this.htmlCode = `
    {
        "title": "Bibliografía",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "Bibliography",
                "props": {
                    "position": "1/1/1/13",
                    "children": [
                        ${this.dataSet}
                    ]
                }
            }
        ]
    },
`;

  }

}

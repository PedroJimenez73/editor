import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.scss']
})
export class TablaDinamicaComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  tabs = [];
  contents = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        title: '',
        paragraph: '',
    });
  }

  addContent() {
        this.tabs.push(this.editorForm.get('title').value);
        this.contents.push(this.editorForm.get('paragraph').value);
        this.editorForm.reset();
  }

  setCode() {
      this.tabs.forEach((elem, i) => {
          if(i === 0) {
              this.tabs[i] = `<div class="check" onclick="toggleTab(${i + 1})">${elem}</div>`
          } else {
              this.tabs[i] = `<div onclick="toggleTab(${i + 1})">${elem}</div>`
          }
      })
      let tabWrapped = `<div class="tabs">${this.tabs.join('')}</div>`;
      this.contents.forEach((elem, i) => {
          if(i === 0) {
              this.contents[i] = `<div class="show visible" style="z-index: 10;">${elem}</div>`
          } else {
              this.contents[i] = `<div class="show">${elem}</div>`
          }
      })
      let contentsWrapped = `
<div class="content-tabs">
    ${this.contents.join('')}
</div>`;
      this.htmlCode = `
<section class="tab">
    ${tabWrapped}
    ${contentsWrapped}
</section>`;
      this.tabs = [];
      this.contents = [];
  }

}

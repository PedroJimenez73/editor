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
        h1: '',
        h2: '',
        title: '',
        paragraph: '',
        page: '',
    });
  }

  addContent() {
        this.tabs.push(this.editorForm.get('title').value);
        this.contents.push(this.editorForm.get('paragraph').value);
        this.editorForm.get('title').reset();
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      this.tabs.forEach((elem, i) => {
          if(i === 0) {
              this.tabs[i] = `<div class="check" onclick="toggleTab(${i + 1})"><p>${elem}</p></div>`
          } else {
              this.tabs[i] = `<div onclick="toggleTab(${i + 1})"><p>${elem}</p></div>`
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
<div id="page-container">
    <div class="container" id="sandbox">
        <h1 id="slide-title"></h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        <section class="tab">
            ${tabWrapped}
            ${contentsWrapped}
        </section>
    </div>
</div>
<script>
    document.getElementById('slide-title').innerHTML = getTitle('${this.editorForm.get('page').value}');
    setTabs();
</script>
{title: "${this.editorForm.get('h1').value}", path: "${this.editorForm.get('page').value}"},
`;

      this.tabs = [];
      this.contents = [];
  }

}

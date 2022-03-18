import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multijumbo',
  templateUrl: './multijumbo.component.html',
  styleUrls: ['./multijumbo.component.scss']
})
export class MultijumboComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  titles = [];
  contents = [];
  count = 0;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        h1: '',
        h2: '',
        title: '',
        paragraph: '',
        page: ''
    });
  }

  addContent() {
        this.count++;
        this.titles.push(
`<div class="button-container">
    <button id="button" onclick="toggleJumbo(${this.count})">${this.editorForm.get('title').value}</button>
</div>`);
        this.contents.push(
`<div class="modal jumbo" id="jumbo-modal-${this.count}">
    <div class="modal-body">
        ${this.editorForm.get('paragraph').value}
    </div>
</div>
<div class="modal-header-fixed" id="modal-header-fixed-${this.count}">
    <img src="img/icons/x.svg" alt="" onclick="toggleJumbo(${this.count})">
</div>`);
        this.editorForm.get('title').reset();
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      this.htmlCode = `
<div id="page-container">
    <div class="container" id="sandbox">
        <h1 id="slide-title"></h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        ${this.titles.join('')}
    </div>
</div>
${this.contents.join('')}
<script>
    document.getElementById('slide-title').innerHTML = getTitle('${this.editorForm.get('page').value}');
</script>
{title: "${this.editorForm.get('h1').value}", path: "${this.editorForm.get('page').value}"},
`;
      this.titles = [];
      this.contents = [];
  }

}

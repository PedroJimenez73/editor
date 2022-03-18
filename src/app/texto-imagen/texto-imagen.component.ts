import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-texto-imagen',
  templateUrl: './texto-imagen.component.html',
  styleUrls: ['./texto-imagen.component.scss']
})
export class TextoImagenComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        h1: '',
        h2: '',
        image: '',
        numImage: '',
        footImage: '',
        paragraph: '',
        // page: ''
    });
  }

  setCode() {
      const subtitle = this.editorForm.get('h2').value !== '' ? '<h2>' + this.editorForm.get('h2').value + '</h2>' : null;
      this.htmlCode = `
<div id="page-container">
    <div class="container" id="sandbox">
        <h1>${this.editorForm.get('h1').value}</h1>
        ${subtitle}
        <div class="row">
            <div class="w50">
                ${this.editorForm.get('paragraph').value}
            </div>
            <div class="w50" style="padding: 1rem 2rem;">
                <img src="img/${this.editorForm.get('image').value}.jpg">
                <p class="foot-pic"><i>${this.editorForm.get('numImage').value}&nbsp;&nbsp;</i>${this.editorForm.get('footImage').value}</p>
            </div>
        </div>
    </div>
</div>
`;
  }

}

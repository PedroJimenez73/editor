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
        paragraph: '',
    });
  }

  setCode() {
      this.htmlCode = `
<div id="page-container">
    <div class="container">
        <h1>${this.editorForm.get('h1').value}</h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        <div class="row">
            <div class="w50">
                ${this.editorForm.get('paragraph').value}
            </div>
            <div class="w50" style="padding: 1rem 2rem;">
                <img src="img/${this.editorForm.get('image').value}.jpg">
            </div>
        </div>
    </div>
</div>
      `;
  }

}

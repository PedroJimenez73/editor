import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.scss']
})

export class AcordeonComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  titles = [];
  contents = [];
  page: any;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        h1: '',
        h2: '',
        image: '',
        numImage: '',
        footImage: '',
        title: '',
        paragraph: '',
    });
  }

  addContent() {
        this.titles.push( `<div class="accordion-title">
                                <span>${this.editorForm.get('title').value}</span>
                                <img class="plus" src="img/icons/plus.svg" alt="">
                                <img class="minus" src="img/icons/minus.svg" alt="">
                            </div>`);
        this.contents.push( `<div class="accordion-content">
                                ${this.editorForm.get('paragraph').value}
                            </div>`);
        this.editorForm.get('title').reset();
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      let articles = [];
      this.titles.forEach((element, i) => {
          articles.push(`<article onclick="toggleAccordion(${i+1})">${this.titles[i]}${this.contents[i]}</article>`);
      });
      const subtitle = this.editorForm.get('h2').value !== '' ? '<h2>' + this.editorForm.get('h2').value + '</h2>' : null;
      this.htmlCode = `
<div id="page-container">
    <div class="container">
        <h1>${this.editorForm.get('h1').value}</h1>
        ${subtitle}
        <div class="row">
            <div class="w50">
                <section class="accordion">
                    ${articles.join('')}
                </section>
            </div>
            <div class="w50" style="padding: 1rem 2rem;">
                <img src="img/${this.editorForm.get('image').value}.jpg">
                <p class="foot-pic"><i>${this.editorForm.get('numImage').value}&nbsp;&nbsp;</i>${this.editorForm.get('footImage').value}</p>
            </div>
        </div>
    </div>
</div>
`;
      this.titles = [];
      this.contents = [];
  }

}

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

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
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
        this.editorForm.reset();
  }

  setCode() {
      let articles = [];
      this.titles.forEach((element, i) => {
          articles.push(`<article onclick="toggleAccordion(${i+1})">${this.titles[i]}${this.contents[i]}</article>`);
      });
      this.htmlCode = `<section class="accordion">${articles.join('')}</section>`;
      this.titles = [];
      this.contents = [];
  }

}

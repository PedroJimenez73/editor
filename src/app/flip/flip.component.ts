import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss']
})
export class FlipComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  titles = [];
  images = [];
  contents = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        title: '',
        image: '',
        paragraph: '',
    });
  }

  addContent() {
        this.titles.push(`<p class="orange-text">${this.editorForm.get('title').value}</p>`);
        this.images.push(`<img src="img/${this.editorForm.get('image').value}.jpg">`);
        this.contents.push(`<div class="back-card">${this.editorForm.get('paragraph').value}</div>`);
        this.editorForm.reset();
  }

  setCode() {
      let flipCards = [];
      this.images.forEach((elem, i)=>{
          flipCards.push(`<div class="flip-card" onclick="flip(${i + 1})">
                               <div class="front-card">${this.images[i]}${this.titles[i]}</div>
                               ${this.contents[i]}
                        </div>`)
      })
      this.htmlCode = `<p class="instructions">Pulse sobre las imágenes para ampliar la información.</p><div id="flexy-not-ie" class="flexy">${flipCards.join('')}</div><div id="flexy-ie" class="flexy"></div>`;
      this.images = [];
      this.titles = [];
      this.contents = [];
  }

}

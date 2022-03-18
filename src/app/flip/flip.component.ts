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
        h1: '',
        h2: '',
        title: '',
        image: '',
        paragraph: '',
        page: ''
    });
  }

  addContent() {
        this.titles.push(`<p class="orange-text">${this.editorForm.get('title').value}</p>`);
        this.images.push(`<img src="img/${this.editorForm.get('image').value}.jpg">`);
        this.contents.push(`<div class="back-card">${this.editorForm.get('paragraph').value}</div>`);
        this.editorForm.get('title').reset();
        this.editorForm.get('image').reset();
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      let flipCards = [];
      this.images.forEach((elem, i)=>{
          flipCards.push(`<div class="flip-card" onclick="flip(${i + 1})">
                               <div class="front-card">${this.images[i]}${this.titles[i]}</div>
                               ${this.contents[i]}
                        </div>`)
      })
      this.htmlCode = `
<div id="page-container">
    <div class="container" id="sandbox">
        <h1 id="slide-title"></h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        <p class="instructions">Pulse sobre las imágenes para ampliar la información.</p>
        <div id="flexy-not-ie" class="flexy">
            ${flipCards.join('')}
        </div>
        <div id="flexy-ie" class="flexy"></div>
    </div>
</div>
<script>
    document.getElementById('slide-title').innerHTML = getTitle('${this.editorForm.get('page').value}');
    setFlipCards();
</script>
{title: "${this.editorForm.get('h1').value}", path: "${this.editorForm.get('page').value}"},
`;
      this.images = [];
      this.titles = [];
      this.contents = [];
  }

}

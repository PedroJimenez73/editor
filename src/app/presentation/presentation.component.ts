import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})

export class PresentationComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  contents = [];

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        paragraph: '',
    });
  }

  addContent() {
        this.contents.push(this.editorForm.get('paragraph').value);
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      let slides = '';
      this.contents.forEach((elem, i)=> {
          if (i == 0) {
              slides += `
                <div class="slide" style="left: 0">
                    ${elem}
                </div>
              `
          } else {
              slides += `
                <div class="slide">
                    ${elem}
                </div>
              `
          }
      })
      this.htmlCode = `
<div id="page-container">
    <div class="container">
        <h1>
            Presentación
        </h1>
        <div id="back-slide">
            <button id="btn-slide-back" onclick="navBackSlide()">&lt;</button>
            ${slides}
            <button id="btn-slide-next" onclick="navNextSlide()">&gt;</button>
        </div>
    </div>
</div>
<script>
    setPresentationSlides();
</script>
`;
      this.contents = [];
  }

}

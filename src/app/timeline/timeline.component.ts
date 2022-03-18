import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  titles = [];
  contents = [];

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
        this.titles.push(this.editorForm.get('title').value);
        this.contents.push(this.editorForm.get('paragraph').value);
        this.editorForm.get('title').reset();
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      let articles = []
      this.titles.forEach((elem, i) => {
              if(i === 0) {
                articles.push(
                    `<article>
                        <div class="item">
                            <div class="pic"
                                style="background-color: #84A0B4;"
                                onclick="showTimelineContent(${i + 1})">
                                <span style="color: white; font-size: 2rem">${this.titles[i]}</span>
                            </div>
                        </div>
                        <div class="content active">
                            ${this.contents[i]}
                        </div>
                    </article>`
                )
              } else {
                articles.push(
                    `<article>
                        <div class="item">
                            <div class="pic"
                                style="background-color: #84A0B4;"
                                onclick="showTimelineContent(${i + 1})">
                                <span style="color: white; font-size: 2rem">${this.titles[i]}</span>
                            </div>
                        </div>
                        <div class="content">
                            ${this.contents[i]}
                        </div>
                    </article>`
                )
              }
      })
      this.htmlCode = `
<div id="page-container">
    <div class="container" id="sandbox">
        <h1 id="slide-title"></h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        <p class="instructions">Pulse sobre cada rectángulo para visualizar la información.</p>
        <section class="timeline">
        ${articles.join('')}
        </section>
    </div>
</div>
<script>
    document.getElementById('slide-title').innerHTML = getTitle('${this.editorForm.get('page').value}');
    setTimeLine();
    {title: "${this.editorForm.get('h1').value}", path: "${this.editorForm.get('page').value}"},
</script>
`;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline-jumbo',
  templateUrl: './timeline-jumbo.component.html',
  styleUrls: ['./timeline-jumbo.component.scss']
})
export class TimelineJumboComponent implements OnInit {

    editorForm: FormGroup;
    htmlCode: any;
    titles = [];
    articles = [];
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
        this.articles.push(
            `<article>
                <div class="item">
                    <div class="pic"
                        style="background-color: #84A0B4;"
                        onclick="toggleJumbo(${this.count})">
                        <span style="color: white; font-size: 2rem">${this.editorForm.get('title').value}</span>
                    </div>
                </div>
            </article>`
        );
        this.contents.push(
            `<div class="modal jumbo" id="jumbo-modal-${this.count}">
                <div class="modal-body">
                    ${this.editorForm.get('paragraph').value}
                </div>
            </div>
            <div class="modal-header-fixed" id="modal-header-fixed-${this.count}">
                <img src="img/icons/x.svg" alt="" onclick="toggleJumbo(${this.count})">
            </div>`
        );
        this.editorForm.get('title').reset();
        this.editorForm.get('paragraph').reset();
    }

  setCode() {
      this.htmlCode = `
<div id="page-container">
    <div class="container" id="sandbox">
        <h1 id="slide-title"></h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        <p class="instructions">Pulse sobre cada rectángulo para visualizar la información.</p>
        <section class="timeline">
            ${this.articles.join('')}
        </section>
    </div>
</div>
${this.contents.join('')}
<script>
    document.getElementById('slide-title').innerHTML = getTitle('${this.editorForm.get('page').value}');
    setTimeLine();
</script>
{title: "${this.editorForm.get('h1').value}", path: "${this.editorForm.get('page').value}"},
`;
      this.articles = [];
      this.contents = [];
  }

}

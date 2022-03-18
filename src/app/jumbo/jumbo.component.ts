import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.scss']
})

export class JumboComponent implements OnInit {

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
    <button id="button" onclick="toggleJumbo(${this.count})">Ver ${this.editorForm.get('title').value}</button>
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
        <h1>
            ${this.editorForm.get('h1').value}
            <div>
                <button title="Marcar texto" id="highlight-btn"><img src="img/icons/hightlight.svg" alt=""></button>
                <button title="Borrar marcado" id="deserialize"><img src="img/icons/erase.svg" alt=""></button>
                <button onclick="togglePostIt()" title="Añadir comentario" id="comments"><img src="img/icons/message-square.svg" alt=""></button>
            </div>
        </h1>
        <h2>${this.editorForm.get('h2').value}</h2>
        ${this.titles.join('')}
    </div>
</div>
${this.contents.join('')}
<script>
    function toggleJumbo(e) {
        $('#jumbo-modal-' + e).toggleClass('show');
        $('#overlay').toggleClass('show');
        $('#modal-header-fixed-' + e).toggleClass('show');
        setTimeout(function(){
            $('#jumbo-modal-' + e).toggleClass('visible');
            $('#overlay').toggleClass('visible');
            $('#modal-header-fixed-' + e).toggleClass('visible');
            $('html, body').animate({
            scrollTop: 0
            }, 200);
        }, 20);
    }
</script>
<div id="post-it">
    <img onclick="togglePostIt()" class="x" src="img/icons/x-grey.svg" alt="">
    <textarea maxlength="400" id="post-it-text"></textarea>
    <button id="save" onclick="savePostIts('${this.editorForm.get('page').value}')">
        <img style="height: 24px" src="img/icons/save.svg" alt="">
        Guardar
    </button>
</div>
<script>
    var commentsBtn = document.getElementById('comments');
    var highlightBtn  = document.getElementById('highlight-btn');
    var deserializeBtn  = document.getElementById('deserialize');
    var sandbox = document.getElementById('sandbox');
    var isActivatedHighlighter = false;
    var pagePosition = pages.findIndex(page => {
        return page.path === '${this.editorForm.get('page').value}';
    }) + 1;
    if(state[pagePosition].postItText !== '') {
        commentsBtn.classList.add('activated');
        document.getElementById('post-it-text').value = state[pagePosition].postItText;
    } else {
        commentsBtn.classList.remove('activated');
    }
    var hltr = new TextHighlighter(sandbox, {
        onAfterHighlight: function (range, hlts) {
            state[pagePosition].highlightedText = '';
            state[pagePosition].highlightedText = hltr.serializeHighlights();
            saveHighlighter();
        }
    });
    hltr.deserializeHighlights(state[pagePosition].highlightedText);
    hltr.setColor('yellow');
    highlightBtn.addEventListener('click', function () {
        highlightBtn.classList.toggle('activated');
        if(isActivatedHighlighter) {
            $('p, li, a').toggleClass('highlighted');
        } else {
            $('p, li, a').toggleClass('highlighted');
        }
    });
    deserializeBtn.addEventListener('click', function () {
        hltr.removeHighlights();
        state[pagePosition].highlightedText = '';
        saveHighlighter();
    });
    function togglePostIt() {
        $('#post-it').toggleClass('open');
        if(document.getElementById('post-it-text').value !== '') {
            commentsBtn.classList.add('activated');
        } else {
            commentsBtn.classList.remove('activated');
        }
    }
    function is_touch_device() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }
    var isTouch = is_touch_device();
    if (isTouch) {
        highlightBtn.style.display = 'none';
        deserializeBtn.style.display = 'none';
    }
</script>
`;
      this.titles = [];
      this.contents = [];
  }

}

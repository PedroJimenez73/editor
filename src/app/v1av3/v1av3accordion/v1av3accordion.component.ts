import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-v1av3accordion',
  templateUrl: './v1av3accordion.component.html',
  styleUrls: ['./v1av3accordion.component.scss']
})
export class V1av3accordionComponent implements OnInit {

  editorForm: FormGroup;
    htmlCode: any;
    title: any;
    subtitle: any = '';
    prepParagraphsContents: any;
    prepParagraphs: any = [];
    paragraphs: any = [];
    listItems: any = [];
    pic: any = '';
    accordionItems = {
        titles: [],
        articles: []
    }

    accordionSections = [];

    config = environment.editorConfig;

    constructor(private fr: FormBuilder) { }

    ngOnInit() {
        this.editorForm = this.fr.group({
            page: '',
            paragraph: '',
        });
    }

    addParagraph() {
        let texto = this.editorForm.get('paragraph').value;
        const h1startIndex = texto.indexOf('<h1>');
        const h1endIndex = texto.indexOf('</h1>');
        const h2startIndex = texto.indexOf('<h2>');
        const h2endIndex = texto.indexOf('</h2>');
        this.title = texto.substring(h1startIndex + 4, h1endIndex).trim();
        this.subtitle = texto.substring(h2startIndex + 4, h2endIndex).trim();
        const prevParagraphsEndIndex = texto.indexOf('<section class="accordion">');
        if(this.subtitle !== '') {
            this.prepParagraphsContents = texto.substring(h2endIndex + 4, prevParagraphsEndIndex).trim();
        } else {
            this.prepParagraphsContents = texto.substring(h1endIndex + 4, prevParagraphsEndIndex).trim();
        }
        let spanstartPos = texto.indexOf("<span>");
        let spanstartsPositions = [];
        while(spanstartPos > -1) {
            spanstartsPositions.push(spanstartPos);
            spanstartPos = texto.indexOf("<span>", spanstartPos + 1);
        }
        let spanendPos = texto.indexOf("</span>");
        let spansendsPositions = [];
        while(spanendPos > -1) {
            spansendsPositions.push(spanendPos);
            spanendPos = texto.indexOf("</span>", spanendPos + 1);
        }
        spanstartsPositions.forEach((elem, i) => {
            this.accordionItems.titles.push(texto.substring(elem + 6, spansendsPositions[i]).trim())
        })
        let articlestartPos = texto.indexOf("<article");
        let articlestartsPositions = [];
        while(articlestartPos > -1) {
            articlestartsPositions.push(articlestartPos);
            articlestartPos = texto.indexOf("<article", articlestartPos + 1);
        }
        let articleendPos = texto.indexOf("</article>");
        let articlesendsPositions = [];
        while(articleendPos > -1) {
            articlesendsPositions.push(articleendPos);
            articleendPos = texto.indexOf("</article>", articleendPos + 1);
        }
        articlestartsPositions.forEach((elem, i) => {
            this.accordionItems.articles.push(texto.substring(elem, articlesendsPositions[i]).trim())
        })


        const picstartIndex = texto.indexOf('<img src="img/');
        const picendIndex = texto.indexOf('jpg');
        if(picstartIndex !== -1 && picendIndex !== -1) {
            this.pic = texto.substring(picstartIndex + 14, picendIndex + 3).trim();
        }
        this.editorForm.get('paragraph').reset();
        this.setAccordionSections();
        this.setPrevParagraphs();
    }

    setPrevParagraphs() {

        let texto = this.prepParagraphsContents;
        let prepParagraphs = [];
        let listItems = [];
        let pstartPos = texto.indexOf("<p>");
        let psstartsPositions = [];
        while(pstartPos > -1) {
            psstartsPositions.push(pstartPos);
            pstartPos = texto.indexOf("<p>", pstartPos + 1);
        }
        let pendPos = texto.indexOf("</p>");
        let psendsPositions = [];
        while(pendPos > -1) {
            psendsPositions.push(pendPos);
            pendPos = texto.indexOf("</p>", pendPos + 1);
        }
        psstartsPositions.forEach((elem, i) => {
            prepParagraphs.push(texto.substring(elem, psendsPositions[i] + 4).trim())
        })
        let listartPos = texto.indexOf("<li>");
        let lisstartsPositions = [];
        while(listartPos > -1) {
            lisstartsPositions.push(listartPos);
            listartPos = texto.indexOf("<li>", listartPos + 1);
        }
        let liendPos = texto.indexOf("</li>");
        let lisendsPositions = [];
        while(liendPos > -1) {
            lisendsPositions.push(liendPos);
            liendPos = texto.indexOf("</li>", liendPos + 1);
        }
        lisstartsPositions.forEach((elem, i) => {
            listItems.push(texto.substring(elem + 4, lisendsPositions[i]).trim())
        })

        let textos = prepParagraphs.map((elem, i) => {
            if(i === prepParagraphs.length - 1) {
                return '{"type\": "paragraph","text": "' + elem + '"}'
            } else {
                return '{"type\": "paragraph","text": "' + elem + '"}'
            }
        })

        let textosString = textos.join();

        let listas;
        let items = listItems.map(elem => {
            return '"' + elem + '"'
        })
        listas = '{"type\": "list","list": [' + items.join() + ']}';
        this.prepParagraphs = listItems.length !== 0 ? `
                    {
                        "key": "${Guid.newGuid()}",
                        "component": "MultiDiv",
                        "props": {
                            "position": "${this.subtitle ? '2/1/2/7': '1/1/1/7'}",
                            "children": [${textos},${listas}]
                        }
                    }
                `: `
                    {
                        "key": "${Guid.newGuid()}",
                        "component": "MultiDiv",
                        "props": {
                            "position": "${this.subtitle ? '2/1/2/7': '1/1/1/7'}",
                            "children": [${textos}]
                        }
                    }
                `
    }

    setAccordionSections() {
        this.accordionItems.articles.forEach((elem, i) => {
            let texto = elem;
            let paragraphs = [];
            let listItems = [];
            let pstartPos = texto.indexOf("<p>");
            let psstartsPositions = [];
            while(pstartPos > -1) {
                psstartsPositions.push(pstartPos);
                pstartPos = texto.indexOf("<p>", pstartPos + 1);
            }
            let pendPos = texto.indexOf("</p>");
            let psendsPositions = [];
            while(pendPos > -1) {
                psendsPositions.push(pendPos);
                pendPos = texto.indexOf("</p>", pendPos + 1);
            }
            psstartsPositions.forEach((elem, i) => {
                paragraphs.push(texto.substring(elem, psendsPositions[i] + 4).trim())
            })
            let listartPos = texto.indexOf("<li>");
            let lisstartsPositions = [];
            while(listartPos > -1) {
                lisstartsPositions.push(listartPos);
                listartPos = texto.indexOf("<li>", listartPos + 1);
            }
            let liendPos = texto.indexOf("</li>");
            let lisendsPositions = [];
            while(liendPos > -1) {
                lisendsPositions.push(liendPos);
                liendPos = texto.indexOf("</li>", liendPos + 1);
            }
            lisstartsPositions.forEach((elem, i) => {
                listItems.push(texto.substring(elem + 4, lisendsPositions[i]).trim())
            })
            let textos = paragraphs.map((elem, i) => {
                return '{"type\": "paragraph","text": "' + elem + '"}'
            })
            let textosString = textos.join();

            if(listItems.length > 0) {
                let items = listItems.map(elem => {
                    return '"' + elem + '"'
                })
                let listas = '{"type\": "list","list": [' + items.join() + ']}';
                this.accordionSections.push(
                    `
                    {
                        "isOpen": false,
                        "label": "${this.accordionItems.titles[i]}",
                        "id": "${Guid.newGuid()}",
                        "children": [${textosString},${listas}]

                    }
                    `
                )
            } else {
                
            this.accordionSections.push(
                `
                {
                    "isOpen": false,
                    "label": "${this.accordionItems.titles[i]}",
                    "id": "${Guid.newGuid()}",
                    "children": [${textosString}]
                }
                `
            )
            }
            
        })
    }



    setCode() {


        this.htmlCode = `
    {
        "title": "${this.title}",
        "id": ${this.editorForm.get('page').value},
        "className": "p-1",
        "features": {
            "allowAnnotation": true,
            "allowHighlight": true
        },
        "children": [
            ${ this.subtitle !== '' ? `
                {
                    "key": "${Guid.newGuid()}",
                    "component": "Subtitle",
                    "props": {
                        "position":"1/1/1/13",
                        "text": "${this.subtitle}"
                    }
                },
            `: ''}
            ${ this.prepParagraphs}
            ${
                `
                {
                    "key": "${Guid.newGuid()}",
                    "component": "Accordion",
                    "props": {
                        "allowMultipleOpen": false,
                        "position": "${this.pic ? '3/1/3/7': '3/4/3/10'}",
                        "children": [
                            ${this.accordionSections}
                        ]
                    }
                }
                `
            }
            ${ this.pic !== '' ?
                `
                ,{
                    "key": "${Guid.newGuid()}",
                    "component": "FontImage",
                    "props": {
                        "position": "${this.subtitle ? '3/7/3/13': '2/7/2/13'}",
                        "linkimage": "",
                        "definition": "",
                        "linkpage": "",
                        "image": "public/img/${this.pic}",
                        "text": ""
                    }
                }
                `
            : ''}

        ]
    },
`;

    }

}

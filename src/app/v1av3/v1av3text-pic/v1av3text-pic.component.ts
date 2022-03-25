import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-v1av3text-pic',
  templateUrl: './v1av3text-pic.component.html',
  styleUrls: ['./v1av3text-pic.component.scss']
})

export class V1av3textPicComponent implements OnInit {

  editorForm: FormGroup;
    htmlCode: any;
    title: any;
    subtitle: any;
    paragraphs: any = [];
    listItems: any = [];
    pic: any;

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
            this.paragraphs.push(texto.substring(elem, psendsPositions[i] + 4).trim())
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
            this.listItems.push(texto.substring(elem + 4, lisendsPositions[i]).trim())
        })
        const picstartIndex = texto.indexOf('<img src="img/');
        const picendIndex = texto.indexOf('jpg');
        this.pic = texto.substring(picstartIndex + 14, picendIndex + 3).trim();
        this.editorForm.get('paragraph').reset();
    }


    setCode() {
        let textos = this.paragraphs.map((elem, i) => {
            if(i === this.paragraphs.length - 1) {
                return '{"type\": "paragraph","text": "' + elem + '"}'
            } else {
                return '{"type\": "paragraph","text": "' + elem + '"}'
            }
        })

        textos = textos.join();

        let listas;
        let items = this.listItems.map(elem => {
            return '"' + elem + '"'
        })
        listas = '{"type\": "list","list": [' + items.join() + ']}';

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
            ${
                this.listItems.length !== 0 ? `
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
            ${
                `
                ,{
                    "key": "${Guid.newGuid()}",
                    "component": "FontImage",
                    "props": {
                        "position": "${this.subtitle ? '2/7/2/13': '1/7/1/13'}",
                        "linkimage": "",
                        "definition": "",
                        "linkpage": "",
                        "image": "public/img/${this.pic}",
                        "text": ""
                    }
                }
                `
            }

        ]
    },
`;

    }


}

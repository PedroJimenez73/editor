import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    editorForm: FormGroup;
    htmlCode: any;
    id: any;
    name: any;
    name2: any;
    ennunciate: any;
    responses: Array<string> = [];
    corrects: Array<boolean> = [];

    config = environment.editorConfig;

    constructor(private fr: FormBuilder) { }

    ngOnInit() {
        this.editorForm = this.fr.group({
            paragraph: '',
        });
    }

    addParagraph() {
        let texto = this.editorForm.get('paragraph').value;
        const questionIndex = texto.indexOf('question');
        const nameIndex = texto.indexOf('name');
        let dotsPos = texto.indexOf("::");
        let dotsPositions = [];
        while(dotsPos > -1) {
            dotsPositions.push(dotsPos);
            dotsPos = texto.indexOf("::", dotsPos+1);
        }
        const endEnunciate = texto.indexOf('{');
        let virgulillasPos = texto.indexOf("~");
        let virgulillasPositions = [];
        while(virgulillasPos > -1) {
            virgulillasPositions.push(virgulillasPos);
            virgulillasPos = texto.indexOf("~", virgulillasPos + 1);
        }
        const equalIndex = texto.indexOf('=');
        const endResponses = texto.indexOf('}');

        this.id = texto.substring(questionIndex + 9, nameIndex).trim();
        this.name = texto.substring(nameIndex + 5, dotsPositions[0]).trim();
        this.name2 = texto.substring(dotsPositions[0] + 2, dotsPositions[1]).trim();
        this.ennunciate = texto.substring(dotsPositions[1] + 2, endEnunciate).trim();
        if(equalIndex < virgulillasPositions[2]
                && equalIndex > virgulillasPositions[1]
                && equalIndex > virgulillasPositions[0]){
            this.responses.push(texto.substring(virgulillasPositions[0] + 1, virgulillasPositions[1]).trim());
            this.responses.push(texto.substring(virgulillasPositions[1] + 1, equalIndex).trim());
            this.responses.push(texto.substring(equalIndex + 1, virgulillasPositions[2]).trim());
            this.responses.push(texto.substring(virgulillasPositions[2] + 1, endResponses).trim());
            this.corrects = [false, false, true, false]
        }
        if(equalIndex > virgulillasPositions[2]
                && equalIndex > virgulillasPositions[1]
                && equalIndex > virgulillasPositions[0]){
            this.responses.push(texto.substring(virgulillasPositions[0] + 1, virgulillasPositions[1]).trim());
            this.responses.push(texto.substring(virgulillasPositions[1] + 1, virgulillasPositions[2]).trim());
            this.responses.push(texto.substring(virgulillasPositions[2] + 1, equalIndex).trim());
            this.responses.push(texto.substring(equalIndex + 1, endResponses).trim());
            this.corrects = [false, false, false, true]
        }
        this.editorForm.get('paragraph').reset();
    }


    setCode() {

        this.htmlCode = `
{
     id: "${this.id}",
     name: "${this.name}",
     name2: "${this.name2}",
     ennunciate: "${this.ennunciate}",
     responses: [
         "${this.responses[0]}",
         "${this.responses[1]}",
         "${this.responses[2]}",
         "${this.responses[3]}"
    ],
    corrects: [${this.corrects}]
},
`;

    }

}

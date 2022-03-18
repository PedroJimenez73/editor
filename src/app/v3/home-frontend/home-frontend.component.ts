import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-home-frontend',
  templateUrl: './home-frontend.component.html',
  styleUrls: ['./home-frontend.component.scss']
})
export class HomeFrontendComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;

scormDegreeValues = [
    'Seleccionar grado',
    'Grado en Comunicación Audiovisual y Nuevos Medios',
    'Grado en Cine y Ficción Audiovisual',
    'Grado en Criminología y Seguridad',
    'Grado en Derecho',
    'Grado en Protocolo y Organización de Eventos',
    'Grado en Publicidad Creativa',
    'Grado en Maestro en Educación Infantil',
    'Grado en Maestro en Educación Primaria',
    'Grado en Pedagogía',
    'Grado en Ciencias de la Actividad Física y del Deporte',
    'Grado en Enfermería',
    'Grado en Fisioterapia',
    'Grado en Psicología',
    'Grado en Artes Digitales',
    'Grado en Empresa y Tecnología',
    'Grado en Emprendimiento y Gestión de Empresas',
    'Grado en Ingeniería Informática',
    'Grado en Gestión Urbana',
    'Grado en Transporte y Logística'
]
  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        degree: '',
        subject: '',
        title: '',
        credits: '6',
        teacher: '',
        unitCode: ''
    });
  }

  addContent() {
        this.editorForm.get('degree').reset();
        this.editorForm.get('subject').reset();
        this.editorForm.get('title').reset();
        this.editorForm.get('credits').reset();
        this.editorForm.get('teacher').reset();
        this.editorForm.get('unitCode').reset();
  }

  setCode() {
      this.htmlCode = `
    {
        "title": "",
        "id": 1,
        "children": [
            {
                "key": "${Guid.newGuid()}",
                "component": "Home",
                "props": {
                    "degree": "${this.editorForm.get('degree').value}",
                    "subject": "${this.editorForm.get('subject').value}",
                    "title": "${this.editorForm.get('title').value}",
                    "credits": "${this.editorForm.get('credits').value} ECTS",
                    "teacher": "${this.editorForm.get('teacher').value}",
                    "unitCode": "${this.editorForm.get('unitCode').value}"
                }
            }
        ]
    },
`;

  }

}

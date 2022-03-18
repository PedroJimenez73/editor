import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  editorForm: FormGroup;
  htmlCode: any;
  titles = [];
  contents = [];
  page: any;

  config = environment.editorConfig;

  constructor(private fr: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fr.group({
        h3: '',
        title: '',
        paragraph: '',
        page: '',
        pic: ''
    });
  }

  addContent() {
        this.titles.push( `<div label="${this.editorForm.get('title').value}">`);
        this.contents.push( `${this.editorForm.get('paragraph').value}</div>`);
        this.editorForm.get('title').reset();
        this.editorForm.get('paragraph').reset();
  }

  setCode() {
      let articles = [];
      this.titles.forEach((element, i) => {
          articles.push(`${this.titles[i]}${this.contents[i]}`);
      });
      this.htmlCode = `
import React from 'react';
import PAGES from '../components/objects/PagesObject'
import withScorm from '../lib/withScorm';
import PostIt from '../components/PostIt';
import autoBind from 'react-autobind';
import erase from '../img/icons/erase.svg';
import hightlightIcon from '../img/icons/hightlight.svg';
import FontImage from '../components/FontImage'
import photo from '../img/${this.editorForm.get('pic').value}.jpg';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import Accordion from '../components/Accordion';
import TextGlossary from '../components/TextGlossary';
import GLOSSARY from '../components/objects/GlossaryObject';


class Slider${this.editorForm.get('page').value} extends React.Component {
    constructor() {
        super()
        rangy.init();
        this.highlighter = rangy.createHighlighter();
        autoBind(this);
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUpdate() {
        this.getData()
    }


    getData() {
        let { cmiDataState } = this.props.sco;

        if (cmiDataState[2].h${this.editorForm.get('page').value} != '') {
            this.highlighter.deserialize(cmiDataState[2].h${this.editorForm.get('page').value}[0]);
        }
    }



    render() {
        const font = {
            linkimage: '',
            definition: '',
            linkpage: '',
            image: photo,
            text: '',
        }

        let { cmiDataState, handleInputValue, deleteHighlight } = this.props.sco;
        this.highlighter.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
        }));

        this.highlighter.addClassApplier(rangy.createClassApplier("note", {
            ignoreWhiteSpace: true,
            elementTagName: "a",
            elementProperties: {
                href: "#",
                onclick: function () {
                    var highlight = this.highlighter.getHighlightForElement(this);
                    if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                        this.highlighter.removeHighlights([highlight]);
                    }
                    return false;
                }
            }
        }));

        const positionHighligh = 'highlight${this.editorForm.get('page').value}';

        const Selection = () => {
            deleteHighlight(positionHighligh);
            this.highlighter.highlightSelection("highlight");
            const serializedHighlights = this.highlighter.serialize();
            handleInputValue(positionHighligh, serializedHighlights)
        }

        const handleErase = () => {
            this.highlighter.removeAllHighlights();
            deleteHighlight(positionHighligh);
        }
        return (
            <div className="slide">
                <div className="flex flex--title">
                    <div>
                        {PAGES[${this.editorForm.get('page').value - 1}].title !== "" ?
                            <h2 className="title">{PAGES[${this.editorForm.get('page').value - 1}].title}</h2> : ""}
                        <h3 className="subtitle">${this.editorForm.get('h3').value}</h3>
                    </div>
                    <div className="title-buttons__container">
                        <button type="button" onClick={Selection} title="Subraya lo seleccionado" className="postit__button" ><img alt="Subraya lo seleccionado" src={hightlightIcon} /></button>
                        <button type="button" onClick={handleErase} title="Borrar subrayado" className="postit__button" ><img alt="Borrar subrayado" src={erase} /></button>
                        <PostIt class={cmiDataState[1].n${this.editorForm.get('page').value} != '' ? 'postit__button  postit__button--blue' : 'postit__button'} name="note${this.editorForm.get('page').value}" answer={cmiDataState[1].n${this.editorForm.get('page').value} != '' ? cmiDataState[1].n${this.editorForm.get('page').value} : ''} />
                    </div>
                </div>
                <div className='flex slider${this.editorForm.get('page').value}__container'>
                    <div className='slider${this.editorForm.get('page').value}__text-container'>
                        <div className="flex">
                            <div className="text">
                            <Accordion>${articles.join('')}</Accordion>
                            </div>
                            <FontImage definition={font.definition} image={font.image} text={font.text} linkpage={font.linkpage} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withScorm()(Slider${this.editorForm.get('page').value});
`;
      this.titles = [];
      this.contents = [];
  }

}

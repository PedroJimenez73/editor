import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextoComponent } from './texto/texto.component';
import { HomeComponent } from './home/home.component';
import { AcordeonComponent } from './acordeon/acordeon.component';
import { TablaDinamicaComponent } from './tabla-dinamica/tabla-dinamica.component';
import { FlipComponent } from './flip/flip.component';
import { TextoImagenComponent } from './texto-imagen/texto-imagen.component';
import { TimelineComponent } from './timeline/timeline.component';
import { JumboComponent } from './jumbo/jumbo.component';
import { PresentationComponent } from './presentation/presentation.component';
import { MultijumboComponent } from './multijumbo/multijumbo.component';
import { TimelineJumboComponent } from './timeline-jumbo/timeline-jumbo.component';
import { AccordionComponent } from './accordion/accordion.component';
import { PicTextComponent } from './pic-text/pic-text.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { HomeFrontendComponent } from './v3/home-frontend/home-frontend.component';
import { MetaSlideComponent } from './v3/meta-slide/meta-slide.component';
import { TextPicComponent } from './v3/text-pic/text-pic.component';
import { GlossaryComponent } from './v3/glossary/glossary.component';
import { InterestLinksComponent } from './v3/interest-links/interest-links.component';
import { BibliographyComponent } from './v3/bibliography/bibliography.component';
import { VideoComponent } from './v3/video/video.component';
import { AccordionPicComponent } from './v3/accordion-pic/accordion-pic.component';
import { V3EvaluationComponent } from './v3/v3-evaluation/v3-evaluation.component';
import { TestComponent } from './parser/test/test.component';
import { V1av3textPicComponent } from './v1av3/v1av3text-pic/v1av3text-pic.component';
import { V1av3accordionComponent } from './v1av3/v1av3accordion/v1av3accordion.component';
import { VerificationQuestionComponent } from './v3/verification-question/verification-question.component';
import { TabsComponent } from './v3/tabs/tabs.component';
import { SeeAnswerComponent } from './v3/see-answer/see-answer.component';
import { RotaryCardsComponent } from './v3/rotary-cards/rotary-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    TextoComponent,
    HomeComponent,
    AcordeonComponent,
    TablaDinamicaComponent,
    FlipComponent,
    TextoImagenComponent,
    TimelineComponent,
    JumboComponent,
    PresentationComponent,
    MultijumboComponent,
    TimelineJumboComponent,
    AccordionComponent,
    PicTextComponent,
    EvaluationComponent,
    GlossaryComponent,
    HomeFrontendComponent,
    MetaSlideComponent,
    TextPicComponent,
    InterestLinksComponent,
    BibliographyComponent,
    VideoComponent,
    AccordionPicComponent,
    V3EvaluationComponent,
    TestComponent,
    V1av3textPicComponent,
    V1av3accordionComponent,
    VerificationQuestionComponent,
    TabsComponent,
    SeeAnswerComponent,
    RotaryCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

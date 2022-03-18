import { EvaluationComponent } from './evaluation/evaluation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'texto', component: TextoComponent},
    {path:'texto-imagen', component: TextoImagenComponent},
    {path:'acordeon', component: AcordeonComponent},
    {path:'tabla-dinamica', component: TablaDinamicaComponent},
    {path:'flip', component: FlipComponent},
    {path:'timeline', component: TimelineComponent},
    // {path:'jumbo', component: JumboComponent},
    {path:'multi-jumbo', component: MultijumboComponent},
    {path:'timeline-jumbo', component: TimelineJumboComponent},
    {path:'presentation', component: PresentationComponent},
    {path:'accordion', component: AccordionComponent},
    {path:'pic-text', component: PicTextComponent},
    {path:'evaluation', component: EvaluationComponent},
    // v3
    {path:'json-home', component: HomeFrontendComponent},
    {path:'meta-slide', component: MetaSlideComponent},
    {path:'text-pic', component: TextPicComponent},
    {path:'accordion-pic', component: AccordionPicComponent},
    {path:'video', component: VideoComponent},
    {path:'glossary-json', component: GlossaryComponent},
    {path:'interest-links', component: InterestLinksComponent},
    {path:'bibliography', component: BibliographyComponent},
    {path:'evaluation-json', component: V3EvaluationComponent},
    // v1 a v3
    {path:'v1-v3-text-pic', component: V1av3textPicComponent},
    {path:'v1-v3-accordion', component: V1av3accordionComponent},

    // parser
    {path:'parser', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

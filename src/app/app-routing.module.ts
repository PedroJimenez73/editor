import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextoComponent } from './texto/texto.component';
import { HomeComponent } from './home/home.component';
import { AcordeonComponent } from './acordeon/acordeon.component';
import { TablaDinamicaComponent } from './tabla-dinamica/tabla-dinamica.component';
import { FlipComponent } from './flip/flip.component';
import { TextoImagenComponent } from './texto-imagen/texto-imagen.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'texto', component: TextoComponent},
    {path:'texto-imagen', component: TextoImagenComponent},
    {path:'acordeon', component: AcordeonComponent},
    {path:'tabla-dinamica', component: TablaDinamicaComponent},
    {path:'flip', component: FlipComponent},
    {path:'timeline', component: TimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

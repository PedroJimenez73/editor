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

@NgModule({
  declarations: [
    AppComponent,
    TextoComponent,
    HomeComponent,
    AcordeonComponent,
    TablaDinamicaComponent,
    FlipComponent,
    TextoImagenComponent,
    TimelineComponent
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

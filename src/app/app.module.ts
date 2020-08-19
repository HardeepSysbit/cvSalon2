import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
/* import { ModalModule} from '../app/lib/_modal' */
import { DialogModule} from '../app/lib/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { HeaderInjector } from './lib/headerInjector';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

import { AboutComponent } from './about/about.component';
import { CvSalon } from './cv-salon/cv-salon';
import { CvSalonComposerComponent } from './cv-salon/cv-salon-composer/cv-salon-composer.component';
import { CvSalonViewerComponent } from './cv-salon/cv-salon-viewer/cv-salon-viewer.component';
import { OptimusMindsAdminComponent } from './optimus-minds/optimus-minds-admin.component'; 
import { OptimusMinds } from './optimus-minds/optimus-minds';
import { ProgramfilterPipe } from './lib/programfilter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    CvSalon,
    CvSalonComposerComponent,
    CvSalonViewerComponent,
    OptimusMindsAdminComponent ,
    OptimusMinds,
    ProgramfilterPipe
   
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
   /*  ModalModule, */
    DialogModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:  HeaderInjector, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

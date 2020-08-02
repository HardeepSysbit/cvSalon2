import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

import { OptimusMinds } from './optimus-minds/optimus-minds';
import { OptimusMindsAdminComponent } from './optimus-minds/optimus-minds-admin.component';

/* import { MainComponent } from './main/main.component'; */
import { AboutComponent } from './about/about.component';
/* import { OptimusMindsComponent } from './optimus-mindsOld/optimus-minds.component';
import { OptimusMindsAdminComponent } from './optimus-minds-admin/optimus-minds-admin.component';
 */
import { CvSalon } from './cv-salon/cv-salon';



/* import { CvSalonComposerComponent } from './cv-salon/cv-salon-composer/cv-salon-composer.component';
import { CvSalonViewerComponent } from './cv-salon/cv-salon-viewer/cv-salon-viewer.component';
import { OptimusMindsSiteComponent } from './optimus-minds/optimus-minds-site/optimus-minds-site.component';
import { OptimusMindsComposerComponent } from './optimus-minds/optimus-minds-composer/optimus-minds-composer.component';
import { OptimusMindsViewerComponent } from './optimus-minds/optimus-minds-viewer/optimus-minds-viewer.component';

 */


const routes: Routes = [
  { path:  '', component:  CvSalon , pathMatch:  'full' },
  { path:  'optimusminds', component:  CvSalon , pathMatch:  'full' },
  { path:  'optimusminds/:email', component:  CvSalon , pathMatch:  'full' },
  { path:  'admin/optimusminds', component:  OptimusMinds  , pathMatch:  'full' }
  
 /*  { path: 'cvsalon', component: CvSalonSiteComponent },
  { path: 'cvsalon/:email', component: CvSalonSiteComponent },
  { path: 'optimusminds', component:  OptimusMindsComponent , pathMatch:  'full' },
  { path: 'optimusminds/admin', component:  OptimusMindsAdminComponent , pathMatch:  'full' },
  { path: 'optimusminds/:email', component:  OptimusMindsComponent , pathMatch:  'full' },
  { path: 'optimusminds/admin/:email', component:  OptimusMindsAdminComponent , pathMatch:  'full' },
  { path: ':_id', component:  MainComponent, pathMatch:  'full' } ,
   { path:'about', component: AboutComponent } */  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

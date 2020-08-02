import { Component, OnInit } from '@angular/core';
import { Global } from '../lib/global' ;

@Component({
    selector: 'app-optimus-minds',
    template:  `<div class="flex-container">
  <div fxLayout="row wrap">
    <div  fxFlex="100%" fxFlex.gt-sm="50%" >
           <app-optimus-minds-admin></app-optimus-minds-admin> 
    </div>
    <div  fxFlex="100%" fxFlex.gt-sm="50%">
          <app-cv-salon-viewer></app-cv-salon-viewer> 
    </div> 
    </div> 
   
  </div>`
})
export class OptimusMinds implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
import { Component, OnInit } from '@angular/core';
import { Global } from '../lib/global' ;

@Component({
  selector: 'app-cv-salon-site',
  template:  `<div class="flex-container">
  <div fxLayout="row wrap">
    <div  fxFlex="100%" fxFlex.gt-sm="50%" >
           <app-cv-salon-composer></app-cv-salon-composer> 
    </div>
    <div  fxFlex="100%" fxFlex.gt-sm="50%">
          <app-cv-salon-viewer></app-cv-salon-viewer> 
    </div> 
    </div> 
   
  </div>`
})
export class CvSalon implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}

/* 
get clientName() {
  return Global.clientName;
}

get programs() {
  return Global.locData["programs"];
 
}

get name() {
  return Global.locData["name"];
}


get aboutMe() {
  return Global.locData["aboutMe"];
  
}

  
  get dob() {
    return Global.locData["dob"];
  }


  get mobileNbr() {

    return Global.locData["mobileNbr"];
    
     

   

  }

  get address() {

    return  Global.locData["address"];
 } 


  
 
  get email() {
    
    return Global.locData["email"];




}

get edus() {
  return   Global.locData["edus"] ;
}

get exps() {
  return   Global.locData["exps"] ;
}

get certs() {
  return   Global.locData["certs"] ;
}

get skills() {
  return   Global.locData["skills"] ;
}

get acheives() {
  return   Global.locData["acheives"] ;
}


get photo() {

   return Global.photo ;
}

programHasCert(paraProgram) {
  
 return (Global.locData["certs"].findIndex(item => item.program == paraProgram) >= 0) ? true : false ;
   
}

}
 */

/* <div class="flex-container">
<div fxLayout="row">
  <div  fxFlex="100%" fxFlex.gt-sm="50%" >
         <app-cv-salon-composer></app-cv-salon-composer> 
  </div>
  <div  fxFlex="50%" fxHide fxShow.gt-sm >
  <app-cv-salon-viewer></app-cv-salon-viewer> 
  </div> 
  </div> 
  
</div>
` */

import { Component, OnInit } from '@angular/core';
import { Global } from '../../lib/global' ;
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { RestSvc } from  '../../lib/restSvc';


@Component({
  selector: 'app-cv-salon-viewer',
 templateUrl: './cv-salon-viewer.component.html',
  //templateUrl: './temp.html',
  styleUrls: ['./cv-salon-viewer.component.scss']
//  styleUrls: ['./temp.scss'],
})
export class CvSalonViewerComponent implements OnInit {

  
  public files: any[];
  public resp = "" ;

  isImageLoading = false ;
  //photo: any ; 
  client = 'cvSalon' ;



  constructor(private restSvc: RestSvc) {
    this.files = [];
  }

  ngOnInit(): void {
   // this.photo = Global.photo ;
  }   

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



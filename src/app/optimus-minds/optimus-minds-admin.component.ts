import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from '../lib/global' ;
import { DialogService } from '../lib/dialog';
import { RestSvc } from  '../lib/restSvc';
import {CtrlSvc} from '../lib/ctrlSvc' ;

import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-optimus-minds-admin',
  templateUrl: './optimus-minds-admin.component.html',
  styleUrls: ['./optimus-minds-admin.component.scss']
})
export class OptimusMindsAdminComponent implements OnInit {

  trainerPickId = "";
  trainExpPickIndex = 0 ;
  docFile = "";
  //docs = [] ;
 
  //-----------
 /*  expScreenMode = false;

  program = "" ;
  trainName = "";
  institute = ""
  year =   "";
  
  trainExpPickId = "";
  trainExpPickIndex = 0 ;
  lastTrainExpId = "";
  mode = "" ; */
 //-----------------
  constructor(private restSvc: RestSvc,private ctrlSvc: CtrlSvc, private dlgSvc: DialogService, private httpClient: HttpClient) { }

  ngOnInit(): void {

    Global.init('optimusMinds'); 
  
    let email = "hardeepsysbit@gmail.com" ;

    this.restSvc.emailToken(email).then(
      (msg) => {
        let adminLevel = msg['adminLevel'];
        Global.email = email;
        Global.token = msg['token'];
        Global.pin = msg['pin'];
        Global._id = msg['_id'];
        Global.adminLevel = 1;
        Global.adminLevelReq = 1 ;
        Global.dlgAuthMode = 2;
       
       

        this.openModal('dlgAuth');


  })
  }

  get programs() {
    return Global.locData["programs"]
  }
    
  get docs() {
    return Global.docs ;
  }
  
  get trainersExist() {
   return  Global.trainersExist ;
  }

  get trainers() {
      return Global.trainers ;
  }
  
  set trainers(value) {
    Global.trainers = value ;
  }



   // for Optimus Minds

   get aiChk() {
     return Global.aiChk ;
   }
   set aiChk(value) {
    Global.aiChk = value ;
    Global.makeProgramList() ;
  }

  get  atRiskChk() {
    return Global.atRiskChk ;
  }
  set  atRiskChk(value) {
   Global.atRiskChk = value ;
   Global.makeProgramList() ;
 }

 get careerChk() {
  return Global.careerChk ;
}
set careerChk(value) {
 Global.careerChk = value ;
 Global.makeProgramList() ;
}

get dramaChk() {
  return Global.dramaChk ;
}

set dramaChk(value) {
 Global.dramaChk = value ;
 Global.makeProgramList() ;
}

get  danceChk() {
  return Global. danceChk ;
  Global.makeProgramList() ;
}
set  danceChk(value) {
 Global.danceChk = value ;
 Global.makeProgramList() ;
}

get itChk () {
  return Global.itChk ;
}

set itChk (value) {
 Global.itChk  = value ;
 Global.makeProgramList() ;

}

get skillsChk() {
  return Global.skillsChk ;
}
set skillsChk(value) {
 Global.skillsChk = value ;
 Global.makeProgramList() ;
}

get tongueChk() {
  return Global.tongueChk ;
}
set tongueChk(value) {
 Global.tongueChk = value ;
 Global.makeProgramList() ;
}



get  musicChk() {
  return Global. musicChk ;
}
set  musicChk(value) {
 Global. musicChk = value ;
 Global.makeProgramList() ;
}
  
 
get  outdoorChk () {
  return Global. outdoorChk  ;
}
set  outdoorChk (value) {
 Global. outdoorChk  = value ;
 Global.makeProgramList() ;
}
  

get sportsChk () {
  return Global.sportsChk  ;
}
set sportsChk (value) {
 Global.sportsChk  = value ;
 Global.makeProgramList() ;
}
  

get visualChk () {
  return Global.visualChk  ;
}
set visualChk (value) {
 Global.visualChk  = value ;
 Global.makeProgramList() ;
}
  

 

 
   onDocPick(docFolder: string, docFile: string) {
      
    this.docFile = docFile ;

    docFolder = "cert" ;
    docFile = "Global.zip" ;
  
    this.restSvc.getFile(Global._id,docFolder, docFile).then(

      (data) => {


        



   });
  }

   onTrainerPick(trainerId: string) {
      
    this.trainerPickId =  trainerId ;

    Global.docs = [] ;

    this.restSvc.getById(trainerId).then(

      (data) => {


        let aryKeys = Object.keys(data);
        let value = "";
        for (let i = 0; i < aryKeys.length; i++) {
          value = data[aryKeys[i]];
          Global.svrData[aryKeys[i]] = value;
          Global.locData[aryKeys[i]] = value;

          

        }

       if (Global.svrData['moeFile'] != "") {
       Global.docs.push({"folder": "moe", "program" :"moe" , "title": "MOE : Expiry - " + Global.svrData['moeExpiry'] ,"file":  Global.svrData['moeFile']})    ;
   
       }
         
          for (let j = 0; j < Global.svrData['certs'].length; j++) {
           if (Global.svrData['certs'][j].file != '') {
           //     this.docs.push({"title": Global.svrData['certs'][j].title,"program": Global.svrData['certs'][j].program,"file": Global.svrData['certs'][j].file})    ;
                Global.docs.push({"folder": "cert","program" : Global.svrData['certs'][j].program , "title": Global.svrData['certs'][j].program + " : " + Global.svrData['certs'][j].title,"file": Global.svrData['certs'][j].file})    ;
   
              }
          }

       

       
          for (let j = 0; j < Global.svrData['acheives'].length; j++) {
           if (Global.svrData['acheives'][j].file != '') {
                Global.docs.push({"folder": "acheive","program" : Global.svrData['certs'][j].program ,"title": "Acheivement : " + Global.svrData['acheives'][j].title,"file": Global.svrData['acheives'][j].file})    ;
            }
          }

       
        


      })


    this.restSvc.getPhoto(trainerId);


   }

   public onQry() {
     this.ctrlSvc.onQry() ;
   }
  
   openModal(id: string) {
      this.dlgSvc.open(id);
  }

}

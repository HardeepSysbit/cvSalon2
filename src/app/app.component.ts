import { Component, OnInit } from '@angular/core';
import { Global } from './lib/global';

/* import { ModalService } from './lib/_modal';  */
import { DialogService } from './lib/dialog';
import { RestSvc } from './lib/restSvc';
import { FormBuilder, FormGroup, CheckboxRequiredValidator } from '@angular/forms';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { stringify } from 'querystring';

import { CtrlSvc } from './lib/ctrlSvc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cvSalon';
  tableName = "applicants";


 



  constructor(private dlgSvc: DialogService, private restSvc: RestSvc, private ctrlSvc: CtrlSvc) { }

  ngOnInit(): void {
    Global.email = ""

  }


  get clientName() {
    return Global.clientName;
  }

  get docs() {

    return Global.docs;
  }

  get errList() {
    return Global.errList;
  }

  get declareChk() {
    return Global.locData["declareChk"];
  }


  get shareChk() {
    return Global.locData["shareChk"];
  }

  set declareChk(value) {
    Global.locData["declareChk"] = value;
  }


  set shareChk(value) {
    Global.locData["shareChk"] = value;
  }


  get dlgAuthMode() {
    return Global.dlgAuthMode;
  }

  get email() {
    return Global.email;
  }

  set email(value) {
    Global.email = value;
  }

  cancelSubmit() {
    this.dlgSvc.close('dlgSubmit');
  }

  okSubmit() {
    this.onSave();

    this.dlgSvc.close('dlgSubmit');
  }

  onErrClose() {
    this.dlgSvc.close('dlgErr');
  }

 get  pin() {
    return Global.pin ;
  }

  set  pin(value) {
     Global.pin = value ;
  }

  onAuthPin() {


    //this.pin = Global.pin ;

    /* if (this.pin != Global.pin) {
      alert('Wrong Pin Supplied') ;
      return ;
    } */

    this.dlgSvc.close('dlgAuth');
 


    if (Global.adminLevelReq === 0) {



      if (Global._id != "") {



        this.restSvc.getById(Global._id).then(

          (data) => {


            let aryKeys = Object.keys(data);
            let value = "";
            for (let i = 0; i < aryKeys.length; i++) {
              value = data[aryKeys[i]];
              Global.svrData[aryKeys[i]] = value;
              Global.locData[aryKeys[i]] = value;
            }

         
          })


        this.restSvc.getPhoto(Global._id);




      }
    }
    else {
      
    }

  }


  disableSubmit() {

    if (Global.clientName == "optimusMinds") {
      return this.declareChk && this.shareChk ? false : true;
    }
    else {
      return false;
    }

  }

  disableAuthEmail() {
    return this.email == "" ? true : false;
  }

  disableAuthPin() {
    return this.pin == Global.pin ? false : true;
  }

  onAuthEmail() {

   

    this.restSvc.emailToken(Global.email).then(
      (msg) => {

      
        let adminLevel = msg['adminLevel'];

        if (adminLevel < Global.adminLevelReq) {
          alert(`User with email: ${this.email} does not have the required Administrator Access Level`)
          return;
        }

        //    alert(JSON.stringify(msg)) ;
        //   Global.email = email ;
        Global.token = msg['token'];
        Global.pin = msg['pin'];
        Global._id = msg['_id'];

        Global.dlgAuthMode = 2;

        // Temporary 
        //this.pin = Global.pin;





        //Global.dlgAuthMode = 2 ;

        // this.openModal('dlgAuth');

      },
      (err) => {



        alert(JSON.stringify(err));

      })




  }

  onQry() {

    this.restSvc.onBtnAction('qry');

    // Global.makeProgramList() ;

    // alert(JSON.stringify(Global.locData["programs"] )) ;
    /* 
      this.restSvc.qryTrainer(Global.locData["programs"]).then(
        (rcvd) =>  {
    
         
    
            let obj = {} ;
          
            obj["list"] = rcvd ;
            
            Global.trainers = obj["list"]  ;
    
            
    
        } ,   
        (err) =>  {
         
        }
        ) */
  }

  /* 
  onSave113() {
  
   let toSaveApplicant = {} ;
  
  
   let aryKeys = Object.keys(Global.locData);
   let key = "" ;
  
    
  
   for(let i = 0; i < aryKeys.length;i++) {
      key = aryKeys[i] ;
      
       if (Global.locData[key] != Global.dbData[key] )   {
          toSaveApplicant[key] = Global.locData[key] ;
       }
  }
  
  
  
  if (Global._id === "")
    {
  
      this.restSvc.createApplicant(toSaveApplicant).then(
        (rcvd) =>  {
  
            
           
             Global._id = rcvd['_id'] ;
  
             
            for(let i = 0; i < Global.docs.length;i++) {
                   // this.upLoadDocs(Global._id, Global.docs[i]['docType'], Global.docs[i]['table'], Global.docs[i]['file']) ;
                   this.upLoadDocs(Global._id, Global.docs[i]['docType'], Global.docs[i]['docTable'], Global.docs[i]['docId'], Global.docs[i]['file']) ;
       
               }
  
        } ,   
        (err) =>  {
         
        }
        )
  
    }
    else
    {
  
      this.restSvc.updateApplicant(toSaveApplicant, Global._id ).then(
        (msg) =>  {
      
          
      
         for(let i = 0; i < Global.docs.length;i++) {
          this.upLoadDocs(Global._id, Global.docs[i]['docType'], Global.docs[i]['docTable'], Global.docs[i]['docId'], Global.docs[i]['file']) ;
          }
        
        } ,
        (err) =>  {
      
          alert(JSON.stringify(err)) ;
      
        }
        )
    }
  
    
   
  }
   */

  onSave() {

    let objData = {};


    let aryKeys = Object.keys(Global.locData);
    let key = "";

    if (this.tableName == "trainer") {
      Global.makeProgramList();
    }

    for (let i = 0; i < aryKeys.length; i++) {
      key = aryKeys[i];

      if (Global.locData[key] != Global.svrData[key]) {
        objData[key] = Global.locData[key];
      }
    }

   
    alert(JSON.stringify(objData)) ;

    if (Global._id === "") {


      this.restSvc.create(objData).then(
        (rcvd) => {



          Global._id = rcvd['_id'];


          for (let i = 0; i < Global.docs.length; i++) {
            this.upLoadDocs(Global._id, Global.docs[i]['docType'], Global.docs[i]['docTable'], Global.docs[i]['docId'], Global.docs[i]['file']);

          }

        },
        (err) => {

        }
      )

    }
    else {



      this.restSvc.update(objData, Global._id).then(
        (msg) => {



          for (let i = 0; i < Global.docs.length; i++) {
            this.upLoadDocs(Global._id, Global.docs[i]['docType'], Global.docs[i]['docTable'], Global.docs[i]['docId'], Global.docs[i]['file']);
          }

        },
        (err) => {

          alert(JSON.stringify(err));

        }
      )
    }



  }

  
 
  
  upLoadDocs(_id: string, docType, docTable, docId, file) {

    const formData = new FormData();

    formData.append('_id', _id);
    formData.append('docTable', docTable);
    formData.append('docId', docId);
    formData.append('file', file);






    file.inProgress = true;




    this.restSvc.upLoadDoc(formData, docType).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);


            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;

        alert(error.message);
        return of(`${file.data.name} upload failed.`);

      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {



        }
      });

  }

  public onPdf() {
    this.restSvc.onBtnAction('pdf');

    /* 
    var data = document.getElementById('wysiwyg');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
     
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    }); */
  }
  /* upLoadPhoto(_id) 
  {
  
  
      
  
        const formData = new FormData();  
        formData.append('file', Global.photoFile);  
        formData.append('trainerFolder',_id);  
  
  
     
         Global.photoFile.inProgress = true;  
  
  
  
        this.restSvc.upLoadPhoto(formData).pipe(  
          map(event => {  
            switch (event.type) {  
              case HttpEventType.UploadProgress:  
              Global.photoFile.progress = Math.round(event.loaded * 100 / event.total);  
              
            
              break;  
              case HttpEventType.Response:  
                return event;  
            }  
          }),  
          catchError((error: HttpErrorResponse) => {  
            Global.photoFile.inProgress = false;  
         
            alert(error.message) ;
            return of(`${  Global.photoFile.data.name} upload failed.`); 
    
          })).subscribe((event: any) => {  
            if (typeof (event) === 'object') { 
           
  
  
            }  
          });   
  
  
  
  
  
  }
   */





  get logo() {
    return Global.logo;
  }

  get domainName() {
    return Global.domainName;
  }




}




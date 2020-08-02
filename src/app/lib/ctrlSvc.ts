import { Injectable } from '@angular/core';
import { Global } from './global';
import { DialogService } from './dialog';
import { RestSvc } from './restSvc';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { stringify } from 'querystring';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import * as JSZip from 'jszip';  

@Injectable({
  providedIn: 'root'
})

export class CtrlSvc {

  errList = [];
  docs = [];

  constructor(private restSvc: RestSvc, private dlgSvc: DialogService,private httpClient: HttpClient) { }


  onSubmit() {



    this.errList = [];
    let aryKeys = Object.keys(Global.locData);



    for (let idx = 0; idx < aryKeys.length; idx++) {


      switch (aryKeys[idx]) {
        /* case 'moeExpiry':
          if (Global.locData[aryKeys[idx]] === '') {
            this.errList.push('MOE Expiry date cannot be empty');
          }
          break; */
        case 'name':
          if (Global.locData[aryKeys[idx]] === '') {
            this.errList.push('Name cannot be empty');
          }
          break;
        case 'email':
          if (Global.locData[aryKeys[idx]] === '') {
            this.errList.push('Email cannot be empty');
          }
          break
        case 'dob':
          if (Global.locData[aryKeys[idx]] === '') {
            this.errList.push('Date of birth cannot be empty');
          }
          break
        /* case 'idNbr':
          if (Global.locData[aryKeys[idx]] === '') {
            this.errList.push('Identity number cannot be empty');
          }
          break */
        case 'mobileNbr':
          if (Global.locData[aryKeys[idx]] === '') {
            this.errList.push('Mobile number cannot be empty');
          }
          break

      }
    }

    if (this.errList.length > 0) {

      Global.errList = this.errList ;
       
      this.dlgSvc.open('dlgErr'); {
        return;

      }

    }




    this.docs = []

    for (let i = 0; i < Global.docs.length; i++) {
      var doc = { docTable: Global.docs[i]['docTable'], docName: Global.docs[i]['file'].name };
      this.docs.push(doc);
    }


    this.dlgSvc.open('dlgSubmit');



  }

  onQry() {


    Global.makeProgramList();

    

    this.restSvc.qryTrainer(Global.locData["programs"]).then(
      (rcvd) => {

        let obj = {};
        Global.trainersExist = false ;

        obj["list"] = rcvd;

        Global.trainers = obj["list"];

        Global.trainersExist = true ;


      },
      (err) => {

        Global.trainersExist = false ;
      }
    )

  }

  onPdf() {


var name = Global.name ;
var data = document.getElementById('cvSalon');
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

pdf.save(name); // Generated PDF



// pdf.save("myfile.pdf", {returnPromise:true}).then(alert('PDF render all done!'));

// var blob = pdf.output('blob'


}); 

  }


  async onPdfBlob(zip) {


    var name = Global.name ;
    var data = document.getElementById('cvSalon');
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
    
     
    // var blobData = pdf.output('blob') ;

     //pdf.output("myfile.pdf", {returnPromise:true}).then(alert('PDF render all done!'));
    
    // pdfBlob = new Blob([pdf.output('blob')], {type: 'application/pdf'}) ;

     zip.file('cv.pdf',  new Blob([pdf.output('blob')], {type: 'application/pdf'}) ) ;
    
    }); 
    
      }




onZipPack() {
    

 // alert(Global._id) ;
 // alert(Global.locData["name"]) ;

  this.createZip(Global.locData["name"]) ;


}

  async getFile(doc) {  
    const httpOptions = {  
      responseType: 'blob' as 'json'  
    };  

  
    let apiEp = `${this.restSvc.SERVER_URL}${Global.tableName}/downLoadFile/${Global._id}/folder/${doc["folder"]}/file/${doc["file"]}` ;


    const res = await this.httpClient.get( apiEp , httpOptions).toPromise().catch((err: HttpErrorResponse) => {  
      const error = err.error;  
      return error;  
    });  
    return res;  
  }  

  async createZip(zipName: string) {  
    const zip = new JSZip();  
    const name = zipName + '.zip';  
   // const pdfBlob: any
   //
    const pdfBlob: any = this.onPdfBlob(zip) ;
    
    
    // tslint:disable-next-line:prefer-for-of  
    for (let counter = 0; counter < Global.docs.length; counter++) {  
      const doc  =  Global.docs[counter];  
     
    

      
    const fileData: any = await this.getFile(doc);  
      const b: any = new Blob([fileData], { type: '' + fileData.type + '' });  
      zip.file(doc['file'], b);  
    }  
    
    zip.generateAsync({ type: 'blob' }).then((content) => {  
       if (content) {  
         FileSaver.saveAs(content, name);  
       }  
     });  

  }







//onZipPack() {


//   var data = document.getElementById('cvSalon');
//   html2canvas(data).then(canvas => {
//   // Few necessary setting options
//   var imgWidth = 208;
//   var pageHeight = 295;
//   var imgHeight = canvas.height * imgWidth / canvas.width;
//   var heightLeft = imgHeight;
   
//   const contentDataURL = canvas.toDataURL('image/png')
//   let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
//   var position = 0;
  
//   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  
//  pdf.save(name); // Generated PDF
 


// var folder = 'cert' ; 
// var docs = []

//  docs.push({fileName: 'mobileIndo.docx', folder: folder}) ;
//  docs.push({fileName: 'hardeepSkill Matrix.docx', folder: folder}) ;
//  docs.push({fileName: 'trainerPhoto.png', folder: folder}) ;

// var fileName = `{Global._id}.zip` ; 



//   const formData = new FormData();

//   formData.append('_id', Global._id);
//   formData.append('name', Global.name + ".zip");
//   formData.append('docs', JSON.stringify(docs));

 // formData.append('docs', '[{"fileName":"mobileIndo.docx","folder":"cert"},{"fileName":"hardeepSkill Matrix.docx","folder":"cert"},{"fileName":"trainerPhoto.png","folder":"cert"}]')
   
 //this.createFormData(formData,'docs', docs)

// formData.append('docs', docs)
  //formData["docs"] = docs ;



//   this.restSvc.zipPack(formData, fileName).then(

//     (data) => {

//       alert("WAIT") ;


//       this.restSvc.getZipFile(Global._id,"cv", data["docFile"]).then(

//         (data) => {
  
  
            
  
  
//      });


           
      
          
//      // FileSaver.saveAs(data, fileName);



//  });

 }




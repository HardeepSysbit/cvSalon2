import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs';
import { Global } from './global';
import { BehaviorSubject} from 'rxjs';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RestSvc {

  SERVER_URL: string = "http://localhost:3000/"

  private btnAction = new BehaviorSubject('');
  watchBtnAction = this.btnAction.asObservable();

  // Emiiter to triggger functions in wysiswyg.ts
/*   invokeChgPhoto = new EventEmitter();
  subsVar: Subscription; */

  action = "";
  

  constructor(private httpClient: HttpClient) {
  }


  onBtnAction(action) {
    this.btnAction.next(action)

  }

  // Trigger emiiter 
/*   onChgPhoto() {
    this.invokeChgPhoto.emit();
  }
 */
  // Called by main.ts on load of page to refresh photo
  public getFile(_id: string, folder: string, file: string) {
 
    let apiEp = `${this.SERVER_URL}${Global.tableName}/downLoadFile/${_id}/folder/${folder}/file/${file}` ;

 
    alert(apiEp) ;
    
    const promise = new Promise((resolve, reject) => {
      //const apiURL = apiEp + "/" + _id;

      this.httpClient.get(apiEp, { responseType: 'blob' }).toPromise()
        .then((res: any) => {
          // Success
                   
          
          let blob = new Blob(res.data);
         
          FileSaver.saveAs(blob, file);


          resolve();

        },
          err => {

            reject(err);
          }
        );
    });

    return promise;


  }

  // public getDoc(httpOptions, _id: string, folder: string, file: string) {
 
  //   let apiEp = `${this.SERVER_URL}${Global.tableName}/downLoadFile/${_id}/folder/${folder}/file/${file}` ;


  //   const res = await this.httpClient.get(apiEp , httpOptions).toPromise().catch((err: HttpErrorResponse) => {  
  //     const error = err.error;  
  //     return error;  
  //   });  
    
  //   return res;  

    
 
    // alert(apiEp) ;
    
    // const promise = new Promise((resolve, reject) => {
    //   //const apiURL = apiEp + "/" + _id;

    //   this.httpClient.get(apiEp,{responseType: 'arraybuffer'}).toPromise()
    //     .then((res: any) => {
    //       // Success
                   
          
    //       let blob = new Blob(res.data);
         
    //       FileSaver.saveAs(blob, file);


    //       resolve();

    //     },
    //       err => {

    //         reject(err);
    //       }
    //     );
    // });

    // return promise;


 // }


  public getPhoto(_id: string) {

   
    let apiEp = this.SERVER_URL +  Global.tableName + "/downLoadPhoto/" + _id;



    const promise = new Promise((resolve, reject) => {
      //const apiURL = apiEp + "/" + _id;

      this.httpClient.get(apiEp, { responseType: 'blob' }).toPromise()
        .then((res: any) => {
          // Success
          this.makeImgFromBlob(res);
          resolve();

        },
          err => {

            reject(err);
          }
        );
    });

    return promise;


  }

  // Convert Blob to Image
  makeImgFromBlob(image) {
    let reader = new FileReader();
    reader.addEventListener("load", (data) => {

      Global.photo = reader.result;

      // Trigger function in wysiwyg
      //this.onChgPhoto();

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  // Upload Photo
  /*   public upLoadPhoto(formData) {
      let uri =  this.SERVER_URL + 'upLoadPhoto'
  
    
      return this.httpClient.post<any>(uri, formData, {  
          reportProgress: true,  
          observe: 'events'  
        });  
    }
   */
  public upLoadDoc(formData, docType) {

    let uri =  this.SERVER_URL + Global.tableName;

   

    if (docType === 'photo') {
      uri += '/upLoadPhoto' ;
    }
    else {
      uri += '/upLoadDoc' ;
    }




    return this.httpClient.post<any>(uri, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  public zipPack(formData, fileName: string) {


    let apiEp = `${this.SERVER_URL}${Global.tableName}/zipper` ;

    
   
     
     const promise = new Promise((resolve, reject) => {
       //const apiURL = apiEp + "/" + _id;
 
       this.httpClient.post(apiEp, formData).toPromise()
         .then((res: any) => {
           // Success
                    
           
          
 
 
           resolve(res);
 
         },
           err => {
 
             reject(err);
           }
         );
     });
 
     return promise;

    // let uri =  this.SERVER_URL + Global.tableName;

    // uri += '/zipper' ;

    // return this.httpClient.post<any>(uri, formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // });
  }

  public create( objData: any) {

    let apiEp = this.SERVER_URL + Global.tableName ;

    alert(apiEp) ;

    alert(JSON.stringify(objData)) ;

    const promise = new Promise((resolve, reject) => {
      
      
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      
      this.httpClient.post(apiEp, objData, { headers: headers }).toPromise()
        .then((res: any) => {




          resolve(res);


        },
          err => {




            reject(err);
          }
        );
    });

    return promise;
  }


   public qryTrainer(filter) {

    //     var saveTrainerApi = "http://localhost:3000/trainers/update/" +  _id;
    var qryTrainerApi = this.SERVER_URL + "trainers/query";


    const promise = new Promise((resolve, reject) => {
      const apiURL = qryTrainerApi;

  

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.httpClient.post(apiURL, filter, { headers: headers }).toPromise()
        .then((res: any) => {

        
          

          resolve(res);


        },
          err => {




            reject(err);
          }
        );
    });

    return promise;
  }
 
  
 public update( objData: any, _id: string) {

    //     var saveTrainerApi = "http://localhost:3000/trainers/update/" +  _id;

    let apiEp = this.SERVER_URL + Global.tableName + "/" + _id;


    const promise = new Promise((resolve, reject) => {
    


      const headers = new HttpHeaders().set('Content-Type', 'application/json');


      this.httpClient.put(apiEp, objData, { headers: headers }).toPromise()
        .then((res: any) => {




          resolve(res);


        },
          err => {




            reject(err);
          }
        );
    });

    return promise;
  }

  public getByEmail(email: string) {


    let apiEp = this.SERVER_URL + Global.tableName+ "/getRec/" + email;



    const promise = new Promise((resolve, reject) => {
      // const apiURL = getTrainerApi + "/" + _id;


      this.httpClient.get(apiEp).toPromise()
        .then((res: any) => {
         


          resolve(res);

        },
          err => {

            alert('err') ; 

            reject(err);
          }
        );
    });

    return promise;
  }

  public getById(_id: string) {


    let apiEp = this.SERVER_URL + Global.tableName + "/" +_id;

  


    const promise = new Promise((resolve, reject) => {
    


      this.httpClient.get(apiEp).toPromise()
        .then((res: any) => {
         


          resolve(res);

        },
          err => {

            alert('err') ; 

            reject(err);
          }
        );
    });

    return promise;
  }


 /*  public sendToken(_id: string) {

    const getTrainerApi = "http://localhost:3000/trainers"

    const promise = new Promise((resolve, reject) => {
      const apiURL = getTrainerApi + "/" + _id;


      this.httpClient.get(apiURL).toPromise()
        .then((res: any) => {
          // Success



          resolve(res);

        },
          err => {


            reject(err);
          }
        );
    });

    return promise;
  }
 */
 
 public emailToken(email: string) {

 

    let apiEp = this.SERVER_URL + Global.tableName+ '/getToken/' + email ;

  
  

    const promise = new Promise((resolve, reject) => {
  
      this.httpClient.get(apiEp).toPromise()
        .then((res: any) => {
          // Success

           

          resolve(res);

        },
          err => {

          
            reject(err);
          }
        );
    });

    return promise;
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../lib/global' ;
@Injectable()
export class HeaderInjector implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        

      /*   request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${Global.authKey}`
            }
          }) */; 

          
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + `${Global.token}`) });
          
       //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

      //    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
          
      //    alert(JSON.stringify(request.headers)) ;

         /*  request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + `${Global.authKey}`) });

          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
          
          request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
 */
        /* request = request.clone({
            setHeaders: {
                Authorization: 'Global.authKey',
                Name: 'hardeep' 
            } 
         */
        
     //   });

        

        return next.handle(request);
    }
}
import { Component, OnInit } from '@angular/core';
import { Global } from '../lib/global';
/* 
import { ModalService } from '../lib/_modal'; 
import { RestSvc } from  '../lib/restSvc';
import { FormBuilder, FormGroup, CheckboxRequiredValidator } from '@angular/forms';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { stringify } from 'querystring';
 */
import {CtrlSvc} from '../lib/ctrlSvc' ;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  
  constructor(private ctrlSvc: CtrlSvc) { }

  ngOnInit(): void {
  }

 public onSubmit()
{
  this.ctrlSvc.onSubmit() ;
}

 public onQry()
{
  this.ctrlSvc.onQry() ;
}

public onPdf()
{
  this.ctrlSvc.onPdf() ;
}

get domainName() {
  return Global.domainName ;
}

get logo() {
   return Global.logo ;
}

}
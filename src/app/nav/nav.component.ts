import { Component, OnInit } from '@angular/core';
import { Global } from '../lib/global' ;
import {CtrlSvc} from '../lib/ctrlSvc' ;


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private ctrlSvc: CtrlSvc) { }

 // docs: [{docType: string, docName: string}] ;
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

public onZipPack()
{
  this.ctrlSvc.onZipPack() ;
}


get domainName() {
  return Global.domainName ;
}

get logo() {
   return Global.logo ;
}
 

get clientName() {
  return Global.clientName;
}


get adminLevel() {

   return Global.adminLevel ;

}


}
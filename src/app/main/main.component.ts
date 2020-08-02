import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RestSvc } from  '../lib/restSvc';
import { Global } from '../lib/global';
//import { Trainer} from '../lib/trainer' ;

/* export interface Trainer {
  _id: string;
  trainerCode: string;
  trainerName: string,
  email: string
  

} */

/* export interface Trainer {
trainerName: string,
trainerCode: string,
idNbr: string,
email: string,
dob: string,
mobileNbr: string ,
aboutMe: string ,
declareChk: false,
shareChk: false,
highestEdu: string ,
highestEduNote: string ,
edu1: string ,
edu2: string ,
edu3: string ,
edu4: string ,
edu5: string ,
edu1Note: string ,
edu2Note: string ,
edu3Note: string ,
edu4Note: string ,
edu5Note: string ,
programs: [],
trainCerts: [],
trainExps: [],
achievements: []
} */



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private _Activatedroute: ActivatedRoute, private restSvc: RestSvc) {





   }

  ngOnInit(): void {
      Global.domainName = 'CV Salon' ;
      Global.logo =    "../../assets/imgs/myPhoto.png" ;

  }

}



import { Component, OnInit } from '@angular/core';
import { Global } from '../../lib/global';
import { RestSvc } from '../../lib/restSvc';
import { DialogService } from '../../lib/dialog';
import { ActivatedRoute } from '@angular/router';
/* import { Router } from '@angular/router';
import { threadId } from 'worker_threads'; */

@Component({
  selector: 'app-cv-salon-composer',
  templateUrl: './cv-salon-composer.component.html',
  styleUrls: ['./cv-salon-composer.component.scss']
})
export class CvSalonComposerComponent implements OnInit {




  name = "";
  aboutMe = "";
  mobileNbr = "";
  dob = "";
  address = "";


  // Education
  edus = [];
  cboEdus = []
  edu = "";
  eduNote = "";
  eduTitle = "";
  eduSelected = "Add Education";
  showEduTitle = true;


  // Skills
  skills = [];
  cboSkills = []
  cboSkillRates = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
  skillRate = "";
  skill = "";
  skillNote = "";
  skillTitle = "";
  skillSelected = "Add Skill";
  showSkillTitle = true;


  // Certs
  certs = [];
  cboCerts = []
  cert = "";
  certNote = "";
  certTitle = "";
  certSelected = "Add Skill";
  showCertTitle = true;



  // Acheivment
  acheives = [];
  cboAcheives = []
  acheive = "";
  acheiveNote = "";
  acheiveTitle = "";
  acheiveSelected = "Add Acheivement";
  attachAcheive = "" ;
  showAcheiveTitle = true;


  // Expereinces
  exps = [];
  cboExps = [];
  exp = "";
  expNote = "";
  expTitle = "";
  expSelected = "Add Education";

  // for Optimus Minds
  moeExpiry = "";
  moeFile = "" ;
  program = "" ;
  aiChk = false;
  atRiskChk = false;
  careerChk = false;
  dramaChk = false;
  danceChk = false;
  itChk = false;
  skillsChk = false;
  tongueChk = false;
  musicChk = false;
  outdoorChk = false;
  sportsChk = false;
  visualChk = false;

 // certFile = "" ;
  attachCert = "" ;

  newCert = false ;
  newEdu = false ;
  newSkill = false ;
  newExp = false ;
  newAcheive = false ;







  // End of Getters & Setters






  showExpTitle = true;


  constructor(private dlgSvc: DialogService, private restSvc: RestSvc, private _Activatedroute: ActivatedRoute) { }




  ngOnInit(): void {




    switch (this._Activatedroute.snapshot.url.toString().toLowerCase()) {
      case "optimusminds":
       Global.init('optimusMinds');
        break;
      default:
        Global.init('cvSalon');
        break;
    }


    let email = this._Activatedroute.snapshot.paramMap.get("email");


    if (email === null) {

      Global.dlgAuthMode = 1;

    
      this.openModal('dlgAuth');

    }
    else {

      this.restSvc.emailToken(email).then(
        (msg) => {

          let adminLevel = msg['adminLevel'];



          Global.email = email;
          Global.token = msg['token'];
          Global.pin = msg['pin'];
          Global._id = msg['_id'];
          Global.adminLevel = adminLevel;
          Global.dlgAuthMode = 2;

          this.openModal('dlgAuth');

        },
        (err) => {

          alert('Error: ' + JSON.stringify(err));

        })

    }



  }


  get clientName() {
    return Global.clientName;
  }

  get programs() {
    return Global.locData["programs"];
  }

  openModal(id: string) {
  
    this.dlgSvc.open(id);
  }


  // Moe
  onMoe() {

    this.moeExpiry = Global.locData['moeExpiry'];
    this.moeFile = Global.locData['moeFile'];

    this.aiChk = false;

    this.atRiskChk = false;

    this.careerChk = false;

    this.danceChk = false;

    this.dramaChk = false;


    this.musicChk = false;

    this.tongueChk = false;

    this.skillsChk = false;

    this.outdoorChk = false;

    this.outdoorChk = false;

    this.visualChk = false;

    this.sportsChk = false;



    for (let idx = 0; idx < Global.locData["programs"].length; idx++) {

      switch (Global.locData["programs"][idx]) {
        case "AI":
          this.aiChk = true;
          break;
        case "At Risk":
          this.atRiskChk = true;
          break;
        case "Career Perparation":
          this.careerChk = true;
          break;
        case "Dance":
          this.danceChk = true;
          break;
        case "Drama":
          this.dramaChk = true;
          break;
        case "IT\\Multimedia":
          this.itChk = true;
          break;
        case "Music":
          this.musicChk = true;
          break;
        case "Mother Tongue":
          this.tongueChk = true;
          break;
        case "Life Skills\Soft Skills":
          this.skillsChk = true;
          break;
        case "Outdoor Education":
          this.outdoorChk = true;
          break;
        case "Outdoor Education":
          this.outdoorChk = true;
          break;
        case "Visual Arts":
          this.visualChk = true;
          break;
        case "Sports":
          this.sportsChk = true;
          break;



      }
    }


    this.dlgSvc.open('dlgMoe');
  }
  /* 
  onAddMoeFile(evt) {
  
    alert('moe') ;
    let doc = {}
   
    doc['docType'] = 'MOE License' ;
    doc['docId'] = '0000' ;
    doc['docTable'] = 'moe' ;
  
    doc['file'] = evt.target.files[0] ;
    
    Global.docs.push(doc) ;
  
  
  }
   */
  onSaveMoe() {



    if (this.moeExpiry == "") {
      alert("Uanble to save, need MOE Expiry Date");
      return;
    }

    if (this.moeFile == "") {
      alert("Uanble to save, need MOE License file");
      return;
    }

    let mPrograms = [];

    if (this.aiChk) mPrograms.push('AI');
    if (this.atRiskChk) mPrograms.push('At Risk');
    if (this.careerChk) mPrograms.push('Career Perparation');
    if (this.danceChk) mPrograms.push('Dance');
    if (this.dramaChk) mPrograms.push('Drama');
    if (this.itChk) mPrograms.push('IT\\Multimedia');
    if (this.musicChk) mPrograms.push('Music');
    if (this.tongueChk) mPrograms.push('Mother Tongue');
    if (this.skillsChk) mPrograms.push('Life Skills\Soft Skills');
    if (this.outdoorChk) mPrograms.push('Outdoor Education');
    if (this.visualChk) mPrograms.push('Visual Arts');
    if (this.sportsChk) mPrograms.push('Sports');


    if (mPrograms.length == 0) {
      alert("Uanble to save, please select at least 1 training program");
      return;
    }


    Global.locData['moeExpiry'] = this.moeExpiry;
    Global.locData['moeFile'] = this.moeFile;
    Global.locData["programs"] = mPrograms;
    this.dlgSvc.close('dlgMoe');
  }


  onCancelMoe() {
    this.dlgSvc.close('dlgMoe');
  }


  // Profile
  onProfile() {
    this.name = Global.locData['name'];
    // Global.email =  Global.locData["email"] ;
    this.dob = Global.locData["dob"];
    this.mobileNbr = Global.locData["mobileNbr"];
    this.address = Global.locData["address"];

    this.dlgSvc.open('dlgProfile');
  }

  onCancelProfile() {
    this.dlgSvc.close('dlgProfile');
  }

  onSaveProfile() {

    Global.locData["name"] = this.name;
    Global.locData["email"] = this.email;
    Global.locData["dob"] = this.dob;
    Global.locData["mobileNbr"] = this.mobileNbr;
    Global.locData["address"] = this.address.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

    this.dlgSvc.close('dlgProfile');

  }


  // About Me
  onAboutMe() {
    this.aboutMe = Global.locData['aboutMe'];
    this.dlgSvc.open('dlgAboutMe');
  }

  onCancelAboutMe() {
    this.dlgSvc.close('dlgAboutMe');
  }

  onSaveAboutMe() {

    Global.locData["aboutMe"] = this.aboutMe.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

    this.dlgSvc.close('dlgAboutMe');

  }

 
  onSelProgram(program) {
    this.program = program ;
  }


// ------------------------------------------------------------------


onAcheive() {
  //acheive


  this.acheives = Global.locData["acheives"];
  this.cboAcheives = [];



  for (let idx = 0; idx < this.acheives.length; idx++) {
    this.cboAcheives.push(this.acheives[idx]['title']);
  }

 
  
  if (this.cboAcheives.length == 0) {
    this.newAcheive = true;
    this.acheive = "" ;
    this.acheiveSelected = "";
    this.acheiveTitle = "";
    this.acheiveNote = "";
  }
  else {
    this.newAcheive = false;
    this.acheive = this.cboAcheives[0];
    this.acheiveSelected = this.acheive; 
    this.acheiveNote = this.acheives[0]['note'];
   
  } 

  if (Global.clientName == 'optimusMinds') {

    if ( this.newAcheive ) {
             this.attachAcheive= "";
    }
    else {
             this.attachAcheive = this.acheives[0]['file'];
    }


   

  }

  this.dlgSvc.open('dlgAcheive');

 

}

onNewAcheive(clientName) {

  this.acheiveTitle = "" ;
  this.acheiveNote = "" ;
  this.newAcheive = true ;

  if (Global.clientName == 'optimusMinds') {
             this.attachAcheive= "";
    }

  

}


onSelAcheive(clientName, acheive) {

  this.acheiveSelected = acheive;
  let fidx = this.acheives.findIndex(x => x.title === acheive);

  this.acheiveTitle = this.acheives[fidx]['title'];
  this.acheiveNote = this.acheives[fidx]['note'];
 
  if (Global.clientName == 'optimusMinds') {
    this.attachAcheive = this.acheives[fidx]['file'];
  
  }

}

onExitAcheive(clientName) {
  this.dlgSvc.close('dlgAcheive');
  this.newAcheive = false ;


}

onSaveAcheive(clientName) {


  
  let strNote = this.acheiveNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

 

  if (this.newAcheive) {

    if (Global.clientName == 'optimusMinds') {
      this.acheives.push({ title: this.acheiveTitle, note: strNote, file:  this.attachAcheive });
    }
    else {
      this.acheives.push({ title: this.acheiveTitle, note: strNote });
    }
 
  }
  else {

    let fidx = this.acheives.findIndex(x => x.title === this.acheiveSelected);

    this.acheives[fidx]['note'] = strNote;

    if (Global.clientName == 'optimusMinds') {
      this.acheives[fidx]['file'] = this.attachAcheive ;
    }
  }


 
  Global.locData["acheives"] = this.acheives;
  Global.svrData["acheives"] = [];

  this.dlgSvc.close('dlgAcheive');


}

onDelAcheive(clientName) {

let fidx = this.acheives.findIndex(x => x.title === this.acheiveSelected);
this.acheives.splice(fidx, 1);

  
Global.locData["acheives"] = this.acheives;
Global.svrData["acheives"] = [];

this.newAcheive = false ;

this.dlgSvc.close('dlgAcheive');

}

// ------------------- ACHIEVE ------------------------------------- 
// ------------------- SKILL START ----------------------------------

onSkill() {


  this.skills = Global.locData["skills"];
  this.cboSkills = [];



  for (let idx = 0; idx < this.skills.length; idx++) {
    this.cboSkills.push(this.skills[idx]['title']);
  }

 
  
  if (this.cboSkills.length == 0) {
    this.newSkill = true;
    this.skill = "" ;
    this.skillSelected = "";
    this.skillRate = "1 Star" ;
  
  }
  else {
    this.newSkill = false;
    this.skill = this.cboSkills[0];
    this.skillSelected = this.skill; 
    
    this.skillRate = this.skills[0]['rate'];
   
  } 

  this.dlgSvc.open('dlgSkill');

}

onNewSkill(clientName) {

  this.skillTitle = "" ;
  this.skillRate = "1 Star" ;
  this.newSkill = true ;

}


onSelSkill(clientName, skill) {

  this.skillSelected = skill;
  let fidx = this.skills.findIndex(x => x.title === skill);

  this.skillTitle = this.skills[fidx]['title'];
  this.skillRate = this.skills[fidx]['rate'];
 
  
  
  }


onExitSkill(clientName) {
  this.dlgSvc.close('dlgSkill');
  this.newSkill = false ;


}

onSaveSkill(clientName) {


  
  
   

  if (this.newSkill) {

    this.skills.push({ title: this.skillTitle, rate:   this.skillRate });
  }
  else {

    let fidx = this.skills.findIndex(x => x.title === this.skillSelected);

    this.skills[fidx]['rate'] =   this.skillRate ;

  }

 
  Global.locData["skills"] = this.skills;
  Global.svrData["skills"] = [];

  this.dlgSvc.close('dlgSkill');


}

onDelSkill(clientName) {

let fidx = this.skills.findIndex(x => x.title === this.skillSelected);
this.skills.splice(fidx, 1);

  
Global.locData["skills"] = this.skills;
Global.svrData["skills"] = [];

this.newSkill = false ;

this.dlgSvc.close('dlgSkill');

}


// ------------------- SKILL END 

// ------------------- EXP START ----------------------------------

onExp() {


  this.exps = Global.locData["exps"];
  this.cboExps = [];



  for (let idx = 0; idx < this.exps.length; idx++) {
    this.cboExps.push(this.exps[idx]['title']);
  }

 
  
  if (this.cboExps.length == 0) {
    this.newExp = true;
    this.exp = "" ;
    this.expSelected = "";
    this.expNote = "" ; 
    this.expTitle = "";
  
  }
  else {
    this.newExp = false;
    this.exp = this.cboExps[0];
    this.expSelected = this.exp; 
    this.expNote = this.exps[0]['note'];
   
  } 

  this.dlgSvc.open('dlgExp');

}

onNewExp(clientName) {

  this.expTitle = "" ;
  this.expNote = "" ;
  this.newExp = true ;

}


onSelExp(clientName, exp) {

  this.expSelected = exp;
  let fidx = this.exps.findIndex(x => x.title === exp);

  this.expTitle = this.exps[fidx]['title'];
  this.expNote = this.exps[fidx]['note'];
 
  
  
  }


onExitExp(clientName) {
  this.dlgSvc.close('dlgExp');
  this.newExp = false ;


}

onSaveExp(clientName) {


  
  let strNote = this.expNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

   

  if (this.newExp) {

    this.exps.push({ title: this.expTitle, note: strNote });
  }
  else {

    let fidx = this.exps.findIndex(x => x.title === this.expSelected);

    this.exps[fidx]['note'] = strNote;

  }

 
  Global.locData["exps"] = this.exps;
  Global.svrData["exps"] = [];

  this.dlgSvc.close('dlgExp');


}

onDelExp(clientName) {

let fidx = this.exps.findIndex(x => x.title === this.expSelected);
this.exps.splice(fidx, 1);

  
Global.locData["exps"] = this.exps;
Global.svrData["exps"] = [];

this.newExp = false ;

this.dlgSvc.close('dlgExp');

}


// ------------------- EXP END ------------------------------------
// ------------------- EDU START ----------------------------------

onEdu() {


  this.edus = Global.locData["edus"];
  this.cboEdus = [];



  for (let idx = 0; idx < this.edus.length; idx++) {
    this.cboEdus.push(this.edus[idx]['title']);
  }

 
  
  if (this.cboEdus.length == 0) {
    this.newEdu = true;
    this.edu = "" ;
    this.eduSelected = "";
    this.eduNote = "" ; 
    this.eduTitle = "" ;
  
  }
  else {
    this.newEdu = false;
    this.edu = this.cboEdus[0];
    this.eduSelected = this.edu; 
    this.eduNote = this.edus[0]['note'];
   
  } 

  this.dlgSvc.open('dlgEdu');

}

onNewEdu(clientName) {

  this.eduTitle = "" ;
  this.eduNote = "" ;
  this.newEdu = true ;

}


onSelEdu(clientName, edu) {

  this.eduSelected = edu;
  let fidx = this.edus.findIndex(x => x.title === edu);

  this.eduTitle = this.edus[fidx]['title'];
  this.eduNote = this.edus[fidx]['note'];
 
  
  
  }


onExitEdu(clientName) {
  this.dlgSvc.close('dlgEdu');
  this.newEdu = false ;


}

onSaveEdu(clientName) {


  
  let strNote = this.eduNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

   

  if (this.newEdu) {

    this.edus.push({ title: this.eduTitle, note: strNote });
  }
  else {

    let fidx = this.edus.findIndex(x => x.title === this.eduSelected);

    this.edus[fidx]['note'] = strNote;

  }

 
  Global.locData["edus"] = this.edus;
  Global.svrData["edus"] = [];

  this.dlgSvc.close('dlgEdu');


}

onDelEdu(clientName) {

let fidx = this.edus.findIndex(x => x.title === this.eduSelected);
this.edus.splice(fidx, 1);

  
Global.locData["edus"] = this.edus;
Global.svrData["edus"] = [];

this.newEdu = false ;

this.dlgSvc.close('dlgEdu');

}

// -------------------- EDU END ------------------------------------
// -------------------- CERT START --------------------------------

onCert() {


  this.certs = Global.locData["certs"];
  this.cboCerts = [];



  for (let idx = 0; idx < this.certs.length; idx++) {
    this.cboCerts.push(this.certs[idx]['title']);
  }

  
  if (this.cboCerts.length == 0) {
    this.newCert = true;
    this.cert = "" ;
    this.certSelected = "";
    this.program = "" ;
    this.certTitle = ""; 
  
  }
  else {
    this.newCert = false;
    this.cert = this.cboCerts[0];
    this.certSelected = this.cert; 
    this.program = this.certs[0]['program'];
  } 
  

  if (Global.clientName == 'optimusMinds') {


    if (this.newCert ) {
             this.attachCert = "";
    }
    else {
      this.attachCert = this.certs[0]['file'];
     
    }

    this.dlgSvc.open('dlgCertOptimusMinds');
  }
  else {
  
  
    if (this.newCert ) {
      this.certNote = "";
      
    }
    else {
     // this.newCert = false;
      this.certNote = this.certs[0]['note'];
     
    }

    this.dlgSvc.open('dlgCert');

  }



}



  onNewCert(clientName) {

    this.certTitle = "" ;
    this.attachCert = "";
    this.certNote = "" ;
    this.program = this.certs[0]['program'] ;
    this.newCert = true ;
  
  }
 

  onSelCert(clientName, cert) {

    this.certSelected = cert;
    let fidx = this.certs.findIndex(x => x.title === cert);
 
    this.certTitle = this.certs[fidx]['title'];

    switch(clientName) {

      case "cvSalon":
        this.certNote = this.certs[fidx]['note'];
        break ;
      case "optimusMinds":
        this.attachCert =  this.certs[fidx]['file'];
        break ;
          
  
    }
 
    
    }
  
/* 
 onSelCertOptimusMinds(cert) {

       this.certSelected = cert;

      let fidx = this.certs.findIndex(x => x.title === cert);
      this.certTitle = this.certs[fidx]['title'];
      this.attachCert =  this.certs[fidx]['file'];
      this.program = this.certs[fidx]['program'];
      this.showCertTitle = false;

    } */


onExitCert(clientName) {

  this.newCert = false ;

  switch(clientName) {

    case "cvSalon":
      this.dlgSvc.close('dlgCert');
      break ;
    case "optimusMinds":
      this.dlgSvc.close('dlgCertOptimusMinds');
      break ;
        

  }


}

onSaveCert(clientName) {

  switch(clientName) {

    case "cvSalon":
     this.saveCertCvSalon() ;
      break ;
    case "optimusMinds":
      this.saveCertOptimusMinds() ;
      break ;
        

  }

}

onDelCert(clientName) {

  let fidx = this.certs.findIndex(x => x.title === this.certSelected);
  this.certs.splice(fidx, 1);

    
  Global.locData["certs"] = this.certs;
  Global.svrData["certs"] = [];

  this.newCert = false ;

  switch(clientName) {

    case "cvSalon":
      this.dlgSvc.close('dlgCert');
      break ;
    case "optimusMinds":
      this.dlgSvc.close('dlgCertOptimusMinds');
      break ;
        

  }

}


saveCertCvSalon() {



    let strNote = this.certNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

      

    if (this.newCert) {

      this.certs.push({ title: this.certTitle, note: strNote });
    }
    else {

      let fidx = this.certs.findIndex(x => x.title === this.certSelected);

      this.certs[fidx]['note'] = strNote;

    }

   
    Global.locData["certs"] = this.certs;
    Global.svrData["certs"] = [];

    this.dlgSvc.close('dlgCert');


}

saveCertOptimusMinds() {

   // let strNote = this.certNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

    if (this.newCert) {

      this.certs.push({ title: this.certTitle, program: this.program, file: this.attachCert });
    }
    else {

      let fidx = this.certs.findIndex(x => x.title === this.certSelected);
      this.certs[fidx]['program'] = this.program ;
      this.certs[fidx]['file'] = this.attachCert ;
    }




    Global.locData["certs"] = this.certs;
    Global.svrData["certs"] = [];

    this.newCert = false ;

    this.dlgSvc.close('dlgCertOptimusMinds');


}
  
 

//---------------------   CERT END ------------------------------------------------

onSelSkillRate(rate) {

    this.skillRate = rate ;
}


  /* onAcheive() {

    this.acheives = Global.locData["acheives"];
    this.cboAcheives = [];

    for (let idx = 0; idx < this.acheives.length; idx++) {
      this.cboAcheives.push(this.acheives[idx]['title']);
    }

    this.cboAcheives.push('Add Acheivement');
    this.acheive = this.cboAcheives[0];
    this.acheiveSelected = this.acheive;

    if (this.acheive == 'Add Acheivement') {
      this.showAcheiveTitle = true;

    }
    else {
      this.showAcheiveTitle = false;
      this.acheiveNote = this.acheives[0]['note'];
    }


    this.dlgSvc.open('dlgAcheive');


  }

  onSelAcheive(acheive) {

    this.acheiveSelected = acheive;

    if (acheive == 'Add Acheivement') {
      this.acheiveNote = '';
      this.acheiveTitle = '';
      this.showAcheiveTitle = true;
    }
    else {

      let fidx = this.acheives.findIndex(x => x.title === acheive);
      this.acheiveNote = this.acheives[fidx]['note'];
      this.acheiveTitle = this.acheive[fidx]['title'];
      this.showAcheiveTitle = false;

    }


  }

  onCancelAcheive() {
    this.dlgSvc.close('dlgAcheive');
  }

  onSaveAcheive() {

    let strNote = this.acheiveNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

    if (this.acheiveSelected == 'Add Acheivement') {

      this.acheives.push({ title: this.acheiveTitle, note: strNote });
    }
    else {
      let fidx = this.acheives.findIndex(x => x.title === this.acheiveSelected);

      this.acheives[fidx]['note'] = strNote;

    }




    Global.locData["acheives"] = this.acheives;
    Global.svrData["acheives"] = [];


    this.dlgSvc.close('dlgAcheive');


  }

  onDelAcheive() {

    let fidx = this.acheives.findIndex(x => x.title === this.acheiveSelected);
    this.acheives.splice(fidx, 1);

    this.dlgSvc.close('dlgAcheive');
    Global.locData["acheives"] = this.acheives;
    Global.svrData["acheives"] = [];

  }
 */

/* 
  onSkill() {


    this.skills = Global.locData["skills"];
    this.cboSkills = [];



    for (let idx = 0; idx < this.skills.length; idx++) {
      this.cboSkills.push(this.skills[idx]['title']);
    }



    this.cboSkills.push('Add Skill');
    this.skill = this.cboSkills[0];

    this.skillSelected = this.skill;


    if (this.skill == 'Add Skill') {
      this.showSkillTitle = true;
      this.skillRate = "1 Star";
    }
    else {
      this.showSkillTitle = false;
      this.skillRate = this.skills[0]['rate'];
    }




    this.dlgSvc.open('dlgSkill');


  }

  onSelSkill(skill) {

    this.skillSelected = skill;

    if (skill == 'Add Skill') {
      this.skillNote = '';
      this.skillTitle = '';
      this.showSkillTitle = true;
    }
    else {

      let fidx = this.skills.findIndex(x => x.title === skill);
      this.skillNote = this.skills[fidx]['note'];
      this.skillTitle = this.skills[fidx]['title'];
      this.showSkillTitle = false;

    }


  }


  onSelSkillRate(rate) {


  }

  onCancelSkill() {
    this.dlgSvc.close('dlgSkill');
  }

  onSaveSkill() {


    if (this.skillSelected == 'Add Skill') {



      this.skills.push({ title: this.skillTitle, rate: this.skillRate });
    }
    else {


      let fidx = this.skills.findIndex(x => x.title === this.skillSelected);

      this.skills[fidx]['rate'] = this.skillRate;

    }




    Global.locData["skills"] = this.skills;
    Global.svrData["skills"] = [];


    this.dlgSvc.close('dlgSkill');


  }

  onDelSkill() {

    let fidx = this.skills.findIndex(x => x.title === this.skillSelected);
    this.skills.splice(fidx, 1);

    this.dlgSvc.close('dlgSkill');
    Global.locData["skills"] = this.skills;
    Global.svrData["skills"] = [];

  }


 */

  // Education 
 
/* 
  onSelEdu(edu) {

    this.eduSelected = edu;

    if (edu == 'Add Education') {

      this.eduNote = '';
      this.eduTitle = '';
      this.showEduTitle = true;
    }
    else {


      let fidx = this.edus.findIndex(x => x.title === edu);
      this.eduNote = this.edus[fidx]['note'];
      this.eduTitle = this.edus[fidx]['title'];
      this.showEduTitle = false;

    }


  }


  onCancelEdu() {
    this.dlgSvc.close('dlgEdu');
  }

  onSaveEdu() {

    let strNote = this.eduNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

    if (this.eduSelected == 'Add Education') {

      this.edus.push({ title: this.eduTitle, note: strNote });
    }
    else {
      let fidx = this.edus.findIndex(x => x.title === this.eduSelected);

      this.edus[fidx]['note'] = strNote;

    }




    Global.locData["edus"] = this.edus;
    Global.svrData["edus"] = [];


    this.dlgSvc.close('dlgEdu');


  }

  onDelEdu() {

    let fidx = this.edus.findIndex(x => x.title === this.eduSelected);
    this.edus.splice(fidx, 1);

    this.dlgSvc.close('dlgEdu');
    Global.locData["edus"] = this.edus;
    Global.svrData["edus"] = [];

  }
 */

  // Experience
 /*  onExp() {

    this.exps = Global.locData["exps"];
    this.cboExps = [];

    for (let idx = 0; idx < this.exps.length; idx++) {
      this.cboExps.push(this.exps[idx]['title']);
    }

    this.cboExps.push('Add Experience');
    this.exp = this.cboExps[0];
    this.expSelected = this.exp;

    if (this.exp == 'Add Experience') {
      this.showExpTitle = true;

    }
    else {
      this.showExpTitle = false;
      this.expNote = this.exps[0]['note'];
    }


    this.dlgSvc.open('dlgExp');

  }


  onSelExp(exp) {

    this.expSelected = exp;

    if (exp == 'Add Experience') {
      ;
      this.expNote = '';
      this.expTitle = '';
      this.showExpTitle = true;
    }
    else {


      let fidx = this.exps.findIndex(x => x.title === exp);
      this.expNote = this.exps[fidx]['note'];
      this.expTitle = this.exps[fidx]['title'];
      this.showExpTitle = false;

    }


  }

  onCancelExp() {
    this.dlgSvc.close('dlgExp');
  }

  onSaveExp() {

    let strNote = this.expNote.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');

    if (this.expSelected == 'Add Experience') {
      this.exps.push({ title: this.expTitle, note: strNote });
    }
    else {
      let fidx = this.exps.findIndex(x => x.title === this.expSelected);

      this.exps[fidx]['note'] = strNote;

    }

    this.dlgSvc.close('dlgExp');
    Global.locData["exps"] = this.exps;
    Global.svrData["exps"] = []

  }

  onDelExp() {

    let fidx = this.exps.findIndex(x => x.title === this.expSelected);
    this.exps.splice(fidx, 1);
    Global.locData["exps"] = this.exps;
    this.dlgSvc.close('dlgExp');

  } */


  // Photo
  onAttach(evt, docType: string) {


    var imagePath;
    var imgURL: any;
    let doc = {}

    doc['docType'] = docType;
    doc['docId'] = Global.docs.length + 1;
    doc['docTable'] = docType;
    doc['file'] = evt.target.files[0];
    doc['docName'] = evt.target.files[0].name;

   

   

    switch (docType) {
      case "photo":
        var mimeType = evt.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          alert("Only images are supported.");
          return;
        }


        this.restSvc.makeImgFromBlob(evt.target.files[0])

        break;
      case "moe":
        this.moeFile = evt.target.files[0].name;
        break;
      case "cert":   
        this.attachCert = evt.target.files[0].name;
        break ;
        case "acheive":   
        this.attachAcheive = evt.target.files[0].name;
        break ;
        default:
        break;

      

    }





    Global.docs.push(doc)

    /*  doc['docType'] = 'Photo' ;
     doc['id'] = '0000' ;
     doc['table'] = 'photo' ; */

    /*  doc['docType'] = 'Photo' ;
     doc['docId'] = '0000' ;
     doc['docTable'] = 'photo' ;
 
     doc['file'] = evt.target.files[0] ;
     
     Global.docs.push(doc) ;
     //Global.photoFile  = evt.target.files[0]; 
     
     this.restSvc.makeImgFromBlob(evt.target.files[0]) ; */

  }

  get email() {
    return Global.email;
  }

  set email(value) {
    Global.email = value;
  }


}
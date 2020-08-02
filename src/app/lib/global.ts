import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { Trainer} from '../lib/trainer' ;

export  class Global {
 
  public static clientName = "" ;
  public static errList = [];
  public static token = "" ;
  public static pin = "";
   
  public static _id = "" ;
  public static locData = {} ;
  public static svrData = {} ;
  public static dlgAuthMode = 0;
  public static email = "" ;
  public static adminLevel = 0;
  public static adminLevelReq = 0;
  public static domainName = '' ;
  public static tableName = '' ;
  public static  logo: any ;

  public static trainersExist = false ;
  
  public static init(clientName) {

    this.clientName = clientName ;
    this.photo =  "../../assets/imgs/myPhoto.png" ;
    this.locData = {} ;
    this.svrData = {} ;
    this.errList = [] ;  

    // this.locData["_id"] = "" ;
    this.locData["name"] = "" ;

    this.locData["email"] = "" ;
    this.locData["dob"] = "" ;
    this.locData["mobileNbr"] = "" ;
    this.locData["address"] = "" ;
    this.locData["aboutMe"] = "" ;
    this.locData["edus"] = [];
    this.locData["exps"] = [];
    this.locData["certs"] = [];
    this.locData["skills"] = [];
    this.locData["acheives"] = [];
    this.locData["programs"] = [];

  if (this.clientName == 'optimusMinds') {
    this.clientName = clientName ;
    this.logo =    "../../assets/imgs/optimusMindsLogo.png" ;
  
    this.domainName = 'Optimus Minds Pte Ltd'
    this.tableName = "trainers" ;


    this.locData["moeExpiry"] = "" ;
    this.locData["moeFile"] = "" ;
    this.locData["idNbr"] = "" ;
    this.locData["declareChk"] = false ;
    this.locData["shareChk"] = false ;
    this.locData["programs"] = [];


    
  }
  else {
   
    this.logo =    "../../assets/imgs/cvSalonLogo.png" 
    this.domainName = 'CV Salon'
    this.tableName = "applicants" ;
  }


      // this.locData["_id"] = "" ;
      this.svrData["name"] = "" ;

      this.svrData["email"] = "" ;
      this.svrData["dob"] = "" ;
      this.svrData["mobileNbr"] = "" ;
      this.svrData["address"] = "" ;
      this.svrData["aboutMe"] = "" ;
      this.svrData["edus"] = [];
      this.svrData["exps"] = [];
      this.svrData["skills"] = [];
      this.svrData["acheives"] = [];
  
    if (this.clientName == 'optimusMinds') {
      this.svrData["moeExpiry"] = "" ;
      this.svrData["idNbr"] = "" ;
      this.svrData["declareChk"] = false ;
      this.svrData["shareChk"] = false ;
  
      this.svrData["programs"] = [];
    }
  
    // this.locData["achievementsAny"]  = 0;

   
    
    }

    public static photo: any ;
    public static photoFile: any;


    // Optimus Minds
    public static trainers = {} ;
    public static docs = [] ;
    public static achievementsAny = false ;
    public static trainExpAiExpCnt = 0 ;
    public static trainExpAtRiskCnt  = 0 ;
    public static trainExpCarrerCnt  = 0 ;
    public static trainExpDanceExpCnt =   0 ;
    public static trainExpDramaExpCnt = 0 ;
    public static trainExpItExpCnt = 0 ;
    public static trainExpMusicExpCnt = 0 ;
    public static trainExpTongueExpCnt = 0 ;
    public static trainExpsSkillsExpCnt =0 ;
    public static trainExpsOutdoorExpCnt = 0 ;
    public static trainExpsVisualExpCnt = 0 ;
    public static trainExpsSportsExpCnt = 0 ;
    public static trainExpsOthersExpCnt = 0 ;
 
    
  public static aiChk: Boolean = false ;
  public static atRiskChk: Boolean = false ;
  public static careerChk: Boolean = false ;
  public static dramaChk: Boolean = false ;
  public static danceChk: Boolean = false ;
  public static itChk : Boolean = false ;
  public static skillsChk: Boolean = false ;
  public static tongueChk: Boolean = false ;
  public static musicChk: Boolean = false ;
  public static outdoorChk: Boolean = false ;
  public static sportsChk: Boolean = false ;
  public static visualChk: Boolean = false ;
  public static othersChk: Boolean = false ;

  public static aiExpAny: Boolean = false ;
  public static atRiskExpAny: Boolean = false ;
  public static careerExpAny: Boolean = false ;
  public static dramaExpAny: Boolean = false ;
  public static danceExpAny: Boolean = false ;
  public static itExpAny : Boolean = false ;
  public static skillsExpAny: Boolean = false ;
  public static tongueExpAny: Boolean = false ;
  public static musicExpAny: Boolean = false ;
  public static outdoorExpAny: Boolean = false ;
  public static sportsExpAny: Boolean = false ;
  public static visualExpAny: Boolean = false ;
  public static othersExpAny: Boolean = false ;
  
  public static program: string  = "+";
  public static cert: string  = "+";
  public static from: string  = "+";
  public static year: string  = "+";
  public static file: string  = "+";
 
    public static  trainCertPickId: number = 0 ;
    public static trainCertId: number = 0 ;
  
    public static  dataMode: Boolean = false ;
  
    

    
  public static pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  public static getMaxId(array) {
    return Math.max.apply(Math, array.map(function(o) { return o.id; }))
  
  }

  public static getMaxDocId(array) {
    if (array.length === 0) return '00001' ;
    let nbr = Math.max.apply(Math, array.map(function(o) { return o.docId; }))
  
    return this.pad(nbr + 1,5) ;
   
    
    }

  public static makeProgramList() {
       
    this.locData["programs"] = [] ;
   
    if (this.aiChk)  this.locData["programs"].push('AI') ;
    if (this.atRiskChk )  this.locData["programs"].push('At Risk') ;
    if (this.careerChk )  this.locData["programs"].push('Career Perparation') ;
    if (this.danceChk )  this.locData["programs"].push('Dance') ;
    if (this.dramaChk )  this.locData["programs"].push('Drama') ;
    if (this.itChk )      this.locData["programs"].push('IT\\Multimedia') ;
    if (this.musicChk )  this.locData["programs"].push('Music') ;
    if (this.tongueChk )  this.locData["programs"].push('Mother Tongue') ;
    if (this.skillsChk )  this.locData["programs"].push('Life Skills\Soft Skills') ;
    if (this.outdoorChk)    this.locData["programs"].push('Outdoor Education') ;
    if (this.visualChk)    this.locData["programs"].push('Visual Arts') ;
    if (this.sportsChk)    this.locData["programs"].push('Sports') ;
    if (this.othersChk)    this.locData["programs"].push('Others') ;
    
    
  


  }
  
  
  
  public static trainer = () => { return {
                                          trainerName: '',
                                          trainerCode: '',
                                       
                                          idNbr: "",
                                          email: "",
                                          dob: "",
                                          mobileNbr: "" ,
                                          aboutMe: "" ,
                                          declareChk: false,
                                          shareChk: false,
                                          edus: [],
                                          exps: [],
                                          programs: [],
                                          trainCerts: [],
                                          achievements: []
                                          }
                             } ;
                
                             

 public static calcAchievements() {
      this.achievementsAny = this.locData["achievements"].length === 0 ? false : true ;

 }

 public static trainExpAny = (program) => {
            return Global.locData["trainExps"].filter(function(element){
              return element.program == program ;
            }).length > 0 ? true : false ;
            
  
          }                     
                      
     public static trainExpsExpAny = () => {   
        Global.aiExpAny = Global.trainExpAny('AI') ;
        Global.atRiskExpAny = Global.trainExpAny('At Risk') ;
        Global.careerExpAny= Global.trainExpAny('Career Perparation') ;
        Global.danceExpAny = Global.trainExpAny('Dance') ;
        Global.dramaExpAny = Global.trainExpAny('Drama') ;
        Global.itExpAny = Global.trainExpAny('IT\\Multimedia') ;
        Global.musicExpAny = Global.trainExpAny('Music') ;
        Global.tongueExpAny = Global.trainExpAny('Mother Tongue') ;
        Global.skillsExpAny = Global.trainExpAny('Life Skills\Soft Skills') ;
        Global.outdoorExpAny = Global.trainExpAny('Outdoor Education') ;
        Global.visualExpAny = Global.trainExpAny('Visual Arts') ;
        Global.sportsExpAny = Global.trainExpAny('Sports') ;
        Global.othersExpAny = Global.trainExpAny('Others') ;
    
    

   }


 
             
}
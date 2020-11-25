import { Component, OnInit } from '@angular/core';
import { GlobalDataFranceService } from '../services/global-data-france.service';
import { GlobalDataFrance, keyable } from '../models/models';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gdfs: GlobalDataFranceService) { }
  DateDuJours = new Date().toLocaleDateString();


  DonneeGlobalDuJours: GlobalDataFrance = {
    casConfirmes: 0,
    casConfirmesEhpad: 0,
    code: ' ',
    date: 0,
    deces: 0,
    decesEhpad: 0,
    gueris: 0,
    hospitalises: 0,
    nom: ' ',
    nouvellesHospitalisations: 0,
    nouvellesReanimations: 0,
    reanimation: 0,
    source: {
      nom: ' '
    }
  };
  donneeGlobalDuJoursSourceCovid19;

  tmp: keyable;
  ngOnInit(): void {
     this.getDonnee();
  }

  // tslint:disable-next-line: typedef
  getDonnee(){
    this.gdfs.getInfoGlobalFrance()
      .subscribe(donnee => {
        this.tmp = donnee; // necessaire pour avoir un objet sous format json ou stocker les données recuperer depuis la web APi
        this.DonneeGlobalDuJours = this.tmp.FranceGlobalLiveData[0];
        this.donneeGlobalDuJoursSourceCovid19 = this.tmp.FranceGlobalLiveData[1]; // A creer le model pour utiliser cette source
        console.log(this.DonneeGlobalDuJours);
      });
  }
}

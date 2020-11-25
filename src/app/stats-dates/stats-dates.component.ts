import { Component, OnInit } from '@angular/core';
import { GlobalDataFrance, keyable } from '../models/models';
import { GlobalDataFranceService } from '../services/global-data-france.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';





@Component({
  selector: 'app-stats-dates',
  templateUrl: './stats-dates.component.html',
  styleUrls: ['./stats-dates.component.css']
})
export class StatsDatesComponent implements OnInit {

  constructor(private gdfs: GlobalDataFranceService, private calendar: NgbCalendar) {
    const today = calendar.getToday();
    this.model = today;
  }
  DepartementSelected;

  DateDuJours = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  model: NgbDateStruct;
  date: { year: number, month: number, day: number };

  datechoisie ;
  DonneeGlobalDuJoursChoisie: GlobalDataFrance = {
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
  DonneeGlobalDuJoursVide = this.DonneeGlobalDuJoursChoisie;

  tmp: keyable;
  ngOnInit(): void {
    console.log(this.DateDuJours);
    this.getDonneeByDate(this.DateDuJours);
    }

  // tslint:disable-next-line: typedef
  getDonneeByDate(dateChoisie: string) {
    console.log('dateChoisie', dateChoisie);
    this.gdfs.getInfoGlobalByDate(dateChoisie)
      .subscribe(donnee => {
        this.tmp = donnee;
        console.log(this.tmp);
        if (Object.keys(this.tmp.allFranceDataByDate).length > 0){
          Object.keys(this.tmp.allFranceDataByDate).forEach(element => {
            if (this.tmp.allFranceDataByDate[element].source.nom === 'Ministère des Solidarités et de la Santé'
              || (this.tmp.allFranceDataByDate[element].source.nom) === 'Ministère des Solidarités et de la Santé') {
              this.DonneeGlobalDuJoursChoisie = this.tmp.allFranceDataByDate[element];
              console.log(this.DonneeGlobalDuJoursChoisie);
            }
          });
        }
        else {
          this.DonneeGlobalDuJoursChoisie = this.DonneeGlobalDuJoursVide;
          console.log('vide' , this.DonneeGlobalDuJoursChoisie);
        }
      });
  }
  // tslint:disable-next-line: typedef
  datechoisieFrom() {
    console.log(this.model);
    let jours;
    let mois;
    if (Number(this.model.day) < 10){
      jours = '0' + this.model.day;
    }
    else {
      jours = this.model.day;
    }

    if (Number(this.model.month) < 10) {
      mois = '0' + this.model.month;
    }
    else {
      mois = this.model.month;
    }

    const dateclicke = this.model.year + '-' + mois + '-' + jours;
    this.datechoisie = dateclicke;
    this.DateDuJours = this.datechoisie;
    console.log(dateclicke);
    this.getDonneeByDate(dateclicke);
  }

}

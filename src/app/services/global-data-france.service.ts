import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalDataFrance } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataFranceService {

  constructor( private httpclient: HttpClient) { }

  urlGlobal = 'https://coronavirusapi-france.now.sh/FranceLiveGlobalData';
  urlGlobalByDate = 'https://coronavirusapi-france.now.sh/AllDataByDate?date=';
  urlGlobalByDepartement = 'https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=';

  // tslint:disable-next-line: typedef
  getInfoGlobalFrance(){
    return this.httpclient.get(this.urlGlobal);
  }
  // tslint:disable-next-line: typedef
  getInfoGlobalByDate(datechoisie: string){
    const urlDate = this.urlGlobalByDate.concat(datechoisie);
    return this.httpclient.get(urlDate);

  }
  // tslint:disable-next-line: typedef
  getInfoGlobalByDepartment(departementchoisie: string){
    const urldepartement = this.urlGlobalByDepartement.concat(departementchoisie);
    return this.httpclient.get(urldepartement);
  }

}

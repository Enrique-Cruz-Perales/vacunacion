import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //LOCAL
  //readonly APIUrl = "http://localhost:58708/api/";

  //DESARROLLO
  // readonly APIUrl = "http://189.195.136.238/vacunacionApiProxy/api/";

  //PRODUCCION
  readonly APIUrl = "http://189.203.240.97/vapi/api/";

  constructor(private http: HttpClient) { }

  //REGISTRO DE PERSONAS
  getPersonaList():Observable<any[]>{    
    return this.http.get<any>(this.APIUrl + 'Registro');
  }

  getPersonaByCurp(val:any){
    return this.http.get(this.APIUrl + 'Registro/GetByCurp/' + val);
  }

  addPersona(val:any){
    return this.http.post(this.APIUrl + 'Registro', val);
  }

  updatePersona(val:any){
    return this.http.put(this.APIUrl + 'Registro', val);
  }

  deletePersona(val:any){
    return this.http.delete(this.APIUrl + 'Registro/', val);
  }


  //REGISTRO DE LA INFORMACION DE LA VACUNA
  getVacunaInfoList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + 'VacunaInfo');
  }

  addVacunaInfo(val:any){
    return this.http.post(this.APIUrl + 'VacunaInfo', val);
  }

  updateVacunaInfo(val:any){
    return this.http.put(this.APIUrl + 'VacunaInfo', val);
  }

  deleteVacunaInfo(val:any){
    return this.http.delete(this.APIUrl + 'VacunaInfo', val);
  }

  //REGISTRO DEL STAFF
  getStaffList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + 'Staff');
  }

  addStaff(val:any){
    return this.http.post(this.APIUrl + 'Staff', val);
  }

  updateStaff(val:any){
    return this.http.put(this.APIUrl + 'Staff', val);
  }

  deleteStaff(val:any){
    return this.http.delete(this.APIUrl + 'Staff', val);
  }

  //CARNET DE VACUNACION
  getCarnetDeVacunacionList():Observable<any[]>{  
    return this.http.get<any>(this.APIUrl + 'CarnetDEVacunacion');;
  }

  getCarnetDeVacunacionByCurp(val: any){
    return this.http.get(this.APIUrl + 'CarnetVacunacion/GetByCurp/' + val);
  }

  
  getCarnetDeVacunacionByPersonaId(val: any){
    return this.http.get(this.APIUrl + 'CarnetVacunacion/GetByPersonaId/' + val)
  }

  addCarnetDeVacunacion(val:any){
    return this.http.post(this.APIUrl + 'CarnetVacunacion', val);
  }

  updateCarnetDeVacunacion(val:any){
    return this.http.put(this.APIUrl + 'CarnetDeVacunacion', val);
  }

  deleteCarnetDeVacunacion(val:any){
    return this.http.delete(this.APIUrl + 'CarnetDeVacunacion', val);
  }

  //RENAPO DUMMY
  getRenapoDummy(val: any){
    console.log("Consultando datos de : " + this.APIUrl + 'RenapoDummy/GetByCurp/' + val);
    return this.http.get(this.APIUrl + 'RenapoDummy/GetByCurp/' + val);

  }

  getLocalidadByCodigoPostal(val: any) {
    return this.http.get(this.APIUrl + 'CodigoPostal/GetLocalidadByCodigoPostal/' + val);
  }

  getEdoMunByCodigoPostal(val:any){
    return this.http.get(this.APIUrl + 'CodigoPOstal/GetEdoMunByCodigoPostal/' + val);
  }
 

}

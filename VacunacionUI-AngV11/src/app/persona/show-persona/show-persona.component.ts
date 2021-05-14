import { Component, OnInit } from '@angular/core';
//1 Importamos el servicio de consumo de api
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-persona',
  templateUrl: './show-persona.component.html',
  styleUrls: ['./show-persona.component.css'],
  providers: [SharedService]
})
export class ShowPersonaComponent implements OnInit {

  
  //2 en el constructos instanciamos el servicio de consumo de api
  constructor(private service:SharedService) { }

  //3 Creamos el la variable para almacenar a la Persona
  PersonaList : any = [];

  ngOnInit(): void {
    //5 Cada que carge esta vista llamamos a refreshPersona para que cargue los datos de persona
    this.refreshPersonaList();
  }

  //4 Creamos el método para refrescar la lista de Personas
  refreshPersonaList()
  {
    this.service.getPersonaList().subscribe(data=>{
      this.PersonaList=data;
    });
  }

//6 Agregar una tabla en elñ archivo html

}

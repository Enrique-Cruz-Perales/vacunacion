using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI.Models
{
    public class Persona
    {
        public string PersonaID { get; set; }
        public string Folio { get; set; }
        public string Curp { get; set; }
        public string NoPasaporte { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public int Edad { get; set; }
        public string Sexo { get; set; }
        public string Nacionalidad { get; set; }
        public int CodigoPostal { get; set; }
        public string Estado { get; set; }
        public string Municipio { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public int Numero { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public string HuellaId { get; set; }
        public string RostroId { get; set; }
                                   
    }
}

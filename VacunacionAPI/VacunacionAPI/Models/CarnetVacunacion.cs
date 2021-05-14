using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI.Models
{
    public class CarnetVacunacion
    {

        public string CarnetVacunacionId { get; set; }
        public string PersonaId { get; set; }
        public int VacunaInfoId { get; set; }
        public string UnidadDeVacunacion { get; set; }
        public int DosisAplicada { get; set; }
        public int CodigoPostal { get; set; }

        public string Estado { get; set; }
        public string Municipio { get; set; }
        public string Colonia { get; set; }
   
        public Decimal Latitud { get; set; }
        public Decimal Longitud { get; set; }

    }
}

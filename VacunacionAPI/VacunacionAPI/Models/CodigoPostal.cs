using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI.Models
{
    public class CodigoPostal
    {
        public int Codigo_Postal { get; set; }
        public string Colonia { get; set; }
        public string TipoAsentamiento { get; set; }
        public string Municipio { get; set; }
        public string Estado { get; set; }
        public int EstadoId { get; set; }
        public int MunicipioId { get; set; }
        public string Zona { get; set; }
        public int LocalidadId { get; set; }
        
    }
}

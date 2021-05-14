using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI.Models
{
    public class Configuracion
    {
        public int ConfiguracionId { get; set; }
        public string Estado { get; set; }
        public string Municipio { get; set; }
        public string Colonia { get; set; }
        public int CodigoPostal { get; set; }
    }
}

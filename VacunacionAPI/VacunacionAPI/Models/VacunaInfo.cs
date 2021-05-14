using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI.Models
{
    public class VacunaInfo
    {
        public int VacunaId { get; set; }
        public string Marca { get; set; }
        public string Lote { get; set; }
        public int Dosis { get; set; }

    }
}

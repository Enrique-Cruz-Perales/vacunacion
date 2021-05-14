using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodigoPostalController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public CodigoPostalController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("GetLocalidadByCodigoPostal/{CodigoPostal}")]
        public JsonResult GetLocalidadByCodigoPostal(string CodigoPostal)
        {
            string sp = "CODIGOPOSTAL_GET_LOCALIDAD_BY_CP";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CodigoPostal", CodigoPostal);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();

                }
            }
            return new JsonResult(dt);
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("GetEdoMunByCodigoPostal/{CodigoPostal}")]
        public JsonResult GetEdoMunByCodigoPostal(string CodigoPostal)
        {
            string sp = "CODIGOPOSTAL_GET_EDO_MUN_BY_CP";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CodigoPostal", Convert.ToInt32(CodigoPostal));

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();

                }
            }
            return new JsonResult(dt);
        }
    }
}

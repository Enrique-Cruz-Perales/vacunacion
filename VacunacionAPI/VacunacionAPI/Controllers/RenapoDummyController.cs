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
using VacunacionAPI.Models;

namespace VacunacionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RenapoDummyController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public RenapoDummyController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("GetByCurp/{Curp}")]
        public JsonResult GetByCurp(string Curp)
        {
            string sp = "RENAPODUMMY_GET_BY_CURP";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Curp", Curp);

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

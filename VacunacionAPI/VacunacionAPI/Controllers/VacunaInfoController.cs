using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using VacunacionAPI.Models;

namespace VacunacionAPI.Controllers
{   
    
    [Route("api/[controller]")]
    [ApiController]
    public class VacunaInfoController : ControllerBase
    {
        private IConfiguration _configuration;

        public VacunaInfoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string sp = "VACUNAINFO_GET";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");
            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetById/{id}")]
        public JsonResult GetById(int id)
        {
            string sp = "VACUNAINFO_GET_BY_ID";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("VacunaId", id);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();

                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByMarca/{marca}")]
        public JsonResult GetByMarca(string marca)
        {
            string sp = "VACUNAINFO_GET_BY_MARCA";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Marca", marca);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult Post(VacunaInfo v)
        {
            string result = "Fallo el registro";
            string sp = "VACUNAINFO_CREATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("Marca", v.Marca);
                    cmd.Parameters.AddWithValue("Lote", v.Lote);
                    cmd.Parameters.AddWithValue("Dosis", v.Dosis);                  

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Registro existoso";
                }
            }
            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult Put(VacunaInfo v)
        {
            string result = "Falló la actualización";
            string sp = "VACUNAINFO_UPDATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("VacunaId", v.VacunaId);
                    cmd.Parameters.AddWithValue("Marca", v.Marca);
                    cmd.Parameters.AddWithValue("Lote", v.Lote);
                    cmd.Parameters.AddWithValue("Dosis", v.Dosis);                  

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Actualización existosa";
                }
            }
            return new JsonResult(result);
        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            string result = "La vauna no se eliminó.";
            string sp = "VACUNAINFO_DELETE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("VacunaId", id);

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Usuario eliminado exitosamente.";
                }
            }

            return new JsonResult(result);
        }
    }
}

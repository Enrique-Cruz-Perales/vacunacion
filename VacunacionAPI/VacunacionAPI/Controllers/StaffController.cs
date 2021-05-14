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
    public class StaffController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StaffController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string sp = "STAFF_GET";
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
            string sp = "STAFF_GET_BY_ID";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("StaffId", id);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();

                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByNombre/{nombre}")]
        public JsonResult GetByNombre(string nombre)
        {
            string sp = "STAFF_GET_BY_NAME";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("StaffName", nombre);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult Post(Staff s)
        {
            string result = "Fallo el registro";
            string sp = "STAFF_CREATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;
                  
                    cmd.Parameters.AddWithValue("NombreStaff", s.NombreStaff);
                    cmd.Parameters.AddWithValue("ApellidoPaterno", s.ApellidoPaterno);
                    cmd.Parameters.AddWithValue("ApellidoMaterno", s.ApellidoMaterno);
                    cmd.Parameters.AddWithValue("CorreoElectronico", s.CorreoElectronico);                    
                    cmd.Parameters.AddWithValue("Calle", s.Calle);
                    cmd.Parameters.AddWithValue("Colonia", s.Colonia);
                    cmd.Parameters.AddWithValue("Municipio", s.Municipio);
                    cmd.Parameters.AddWithValue("Estado", s.Estado);
                    

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Registro existoso";
                }
            }
            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult Put(Staff s)
        {
            string result = "Falló la actualización";
            string sp = "STAFF_UPDATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("StaffId", s.StaffId);                    
                    cmd.Parameters.AddWithValue("NombreStaff", s.NombreStaff);
                    cmd.Parameters.AddWithValue("ApellidoPaterno", s.ApellidoPaterno);
                    cmd.Parameters.AddWithValue("ApellidoMaterno", s.ApellidoMaterno);
                    cmd.Parameters.AddWithValue("CorreoElectronico", s.CorreoElectronico);                    
                    cmd.Parameters.AddWithValue("Calle", s.Calle);
                    cmd.Parameters.AddWithValue("Colonia", s.Colonia);
                    cmd.Parameters.AddWithValue("Municipio", s.Municipio);
                    cmd.Parameters.AddWithValue("Estado", s.Estado);                    

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
            string result = "El usuario no se eliminó.";
            string sp = "STAFF_DELETE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("StaffId", id);

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Usuario eliminado exitosamente.";
                }
            }

            return new JsonResult(result);
        }

    }
}

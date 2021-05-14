using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using VacunacionAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace VacunacionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistroController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]
        public JsonResult Get()
        {
            string sp = "PERSONA_GET";
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

        [EnableCors("AllowOrigin")]
        [HttpGet("GetConsecutivo")]
        public JsonResult GetConsecutivo(int id)
        {
            string sp = "PERSONA_GET_CONSECUTIVO";
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

        [EnableCors("AllowOrigin")]
        [HttpGet("GetById/{id}")]
        public JsonResult GetById(int id)
        {
            string sp = "PERSONA_GET_BY_ID";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs)) 
            {
                using (SqlCommand cmd = new SqlCommand(sp,cn)) 
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("PersonaId",id);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();

                }
            }
            return new JsonResult(dt);
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("GetByNombre/{nombre}")]
        public JsonResult GetByNombre(string nombre)
        {
            string sp = "PERSONA_GET_BY_NAME";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("NombrePersona", nombre);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [EnableCors("AllowOrigin")]
        [HttpGet("GetByCurp/{curp}")]
        public JsonResult GetByCurp(string curp)
        {
            string sp = "PERSONA_GET_BY_CURP";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Curp", curp);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [EnableCors("AllowOrigin")]
        [HttpPost]
        public JsonResult Post(Persona p)
        {
            string result="Fallo el registro";
            string sp = "PERSONA_CREATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {                
                using (SqlCommand cmd = new SqlCommand(sp,cn)) 
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("PersonaID", p.PersonaID);
                    cmd.Parameters.AddWithValue("Folio", p.Folio);
                    cmd.Parameters.AddWithValue("Curp", p.Curp);
                    cmd.Parameters.AddWithValue("NoPasaporte", p.NoPasaporte);
                    cmd.Parameters.AddWithValue("Nombre", p.Nombre);
                    cmd.Parameters.AddWithValue("ApellidoPaterno", p.ApellidoPaterno);
                    cmd.Parameters.AddWithValue("ApellidoMaterno", p.ApellidoMaterno);
                    cmd.Parameters.AddWithValue("FechaDeNacimiento", p.FechaDeNacimiento);
                    cmd.Parameters.AddWithValue("Edad", p.Edad);
                    cmd.Parameters.AddWithValue("Sexo", p.Sexo);
                    cmd.Parameters.AddWithValue("Nacionalidad", p.Nacionalidad);
                    cmd.Parameters.AddWithValue("CodigoPostal", p.CodigoPostal);
                    cmd.Parameters.AddWithValue("Estado", p.Estado);
                    cmd.Parameters.AddWithValue("Municipio", p.Municipio);
                    cmd.Parameters.AddWithValue("Colonia", p.Colonia);
                    cmd.Parameters.AddWithValue("Calle", p.Calle);
                    cmd.Parameters.AddWithValue("Numero", p.Numero);
                    cmd.Parameters.AddWithValue("Correo", p.Correo);
                    cmd.Parameters.AddWithValue("Telefono", p.Telefono);
                    cmd.Parameters.AddWithValue("HuellaId", p.HuellaId);
                    cmd.Parameters.AddWithValue("RostroId", p.RostroId);
                 
                    cmd.ExecuteNonQuery();

                    cn.Close();

                    result = "Registro existoso";
                }
            }
            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult Put(Persona p)
        {
            string result = "Falló la actualización";
            string sp = "PERSONA_UPDATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.Parameters.AddWithValue("PersonaID", p.PersonaID);
                    cmd.Parameters.AddWithValue("Folio", p.Folio);
                    cmd.Parameters.AddWithValue("Curp", p.Curp);
                    cmd.Parameters.AddWithValue("NoPasaporte", p.NoPasaporte);
                    cmd.Parameters.AddWithValue("Nombre", p.Nombre);
                    cmd.Parameters.AddWithValue("ApellidoPaterno", p.ApellidoPaterno);
                    cmd.Parameters.AddWithValue("ApellidoMaterno", p.ApellidoMaterno);
                    cmd.Parameters.AddWithValue("FechaDeNacimiento", p.FechaDeNacimiento);
                    cmd.Parameters.AddWithValue("Edad", p.Edad);
                    cmd.Parameters.AddWithValue("Sexo", p.Sexo);
                    cmd.Parameters.AddWithValue("Nacionalidad", p.Nacionalidad);
                    cmd.Parameters.AddWithValue("CodigoPostal", p.CodigoPostal);
                    cmd.Parameters.AddWithValue("Estado", p.Estado);
                    cmd.Parameters.AddWithValue("Municipio", p.Municipio);
                    cmd.Parameters.AddWithValue("Colonia", p.Colonia);
                    cmd.Parameters.AddWithValue("Calle", p.Calle);
                    cmd.Parameters.AddWithValue("Numero", p.Numero);
                    cmd.Parameters.AddWithValue("Correo", p.Correo);
                    cmd.Parameters.AddWithValue("Telefono", p.Telefono);
                    cmd.Parameters.AddWithValue("HuellaId", p.HuellaId);
                    cmd.Parameters.AddWithValue("RostroId", p.RostroId);

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Actualización existosa";
                }
            }
            return new JsonResult(result);
        }

        [EnableCors("AllowOrigin")]
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            string result = "El usuario no se eliminó.";
            string sp = "PERSONA_DELETE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            using (SqlConnection cn = new SqlConnection(cs)) 
            {
                using (SqlCommand cmd = new SqlCommand(sp,cn)) 
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("PersonaID",id);

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Usuario eliminado exitosamente.";
                }
            }

            return new JsonResult(result);
        }

        


    }
}

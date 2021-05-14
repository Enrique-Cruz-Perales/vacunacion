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
    public class CarnetVacunacionController : ControllerBase
    {
        private IConfiguration _configuration;

        public CarnetVacunacionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string sp = "CARNETVACUNACION_GET";
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
            string sp = "CARNETVACUNACION_GET_BY_ID";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CarnetVacunacionId", id);

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
            string sp = "CARNETVACUNACION_GET_BY_NAME";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("PersonaNombre", nombre);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByCurp/{curp}")]
        public JsonResult GetByCurp(string curp)
        {
            string sp = "CARNETVACUNACION_GET_BY_CURP";
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

        [HttpGet("GetByPersonaId/{personaid}")]
        public JsonResult GetByPersonId(string personaid)
        {
            string sp = "CARNETVACUNACION_GET_BY_PERSONAID";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("PersonaId", personaid);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByEdad/{edad}")]
        public JsonResult GetByEdad(int edad)
        {
            string sp = "CARNETVACUNACION_GET_BY_EDAD";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Edad", edad);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByEstado/{estado}")]
        public JsonResult GetByEstado(string estado)
        {
            string sp = "CARNETVACUNACION_GET_BY_ESTADO";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Estado", estado);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByMunicipio/{municipio}")]
        public JsonResult GetByMunicipio(string municipio)
        {
            string sp = "CARNETVACUNACION_GET_BY_MUNICIPIO";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("Municipio", municipio);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpGet("GetByUnidadDeVacunacion/{unidadvacunacion}")]
        public JsonResult GetByUnidaddeVacunacion(string uv)
        {
            string sp = "CARNETVACUNACION_GET_BY_UNIDADDEVACUNACION";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");

            DataTable dt = new DataTable();
            SqlDataReader rd;

            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("UnidadDeVacunacion", uv);

                    rd = cmd.ExecuteReader();
                    dt.Load(rd);

                    rd.Close();
                    cn.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult Post(CarnetVacunacion c)
        {
            string result = "Fallo el registro";
            string sp = "CARNETVACUNACION_CREATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("CarnetVacunacionId", c.CarnetVacunacionId);
                        cmd.Parameters.AddWithValue("PersonaId", c.PersonaId);
                        cmd.Parameters.AddWithValue("VacunaInfoId", c.VacunaInfoId);
                        cmd.Parameters.AddWithValue("UnidadDeVacunacion", c.UnidadDeVacunacion);
                        cmd.Parameters.AddWithValue("DosisAplicada", c.DosisAplicada);
                        cmd.Parameters.AddWithValue("CodigoPostal", c.CodigoPostal);
                        cmd.Parameters.AddWithValue("Estado", c.Estado);
                        cmd.Parameters.AddWithValue("Municipio", c.Municipio);
                        cmd.Parameters.AddWithValue("Colonia", c.Colonia);                                               
                        cmd.Parameters.AddWithValue("Latitud", c.Latitud);
                        cmd.Parameters.AddWithValue("Longitud", c.Longitud);
                                            

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Registro existoso";
                }
            }
            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult Put(CarnetVacunacion c)
        {
            string result = "Falló la actualización";
            string sp = "CARNETVACUNACION_UPDATE";
            string cs = _configuration.GetConnectionString("VacunacionDB_CS");


            using (SqlConnection cn = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, cn))
                {
                    cn.Open();

                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("CarnetVacunacionId", c.CarnetVacunacionId);                    
                    cmd.Parameters.AddWithValue("PersonaId", c.PersonaId);
                    cmd.Parameters.AddWithValue("VacunaInfoId", c.VacunaInfoId);
                    cmd.Parameters.AddWithValue("Estado", c.Estado);
                    cmd.Parameters.AddWithValue("Municipio", c.Municipio);
                    cmd.Parameters.AddWithValue("Colonia", c.Colonia);
                    cmd.Parameters.AddWithValue("UnidadDeVacunacion", c.UnidadDeVacunacion);
                    cmd.Parameters.AddWithValue("CodigoPostal", c.CodigoPostal);
                    cmd.Parameters.AddWithValue("Latitud", c.Latitud);
                    cmd.Parameters.AddWithValue("Longitud", c.Longitud);
                    cmd.Parameters.AddWithValue("DosisAplicada", c.DosisAplicada);

                    cmd.ExecuteNonQuery();
                    cn.Close();

                    result = "Actualización existosa";
                }
            }
            return new JsonResult(result);
        }


    }
}

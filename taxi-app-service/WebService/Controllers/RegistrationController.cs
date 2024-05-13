using Common.Encryption;
using Common.ImagePathConverter;
using Common.Interfaces;
using Common.Models;
using Common.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace WebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : Controller
    {
        private readonly ILogger<RegistrationController> _logger;
        private readonly SHA256Encryption encryption = new SHA256Encryption();
        private readonly PathConverter imagePathConverter = new PathConverter();
        private readonly TypesOfUsers types = new TypesOfUsers();
        private readonly JwtConfiguration jwtConfig = new JwtConfiguration();
        private readonly IApiGateway _proxy = ServiceProxy.Create<IApiGateway>(new Uri("fabric:/TaxiApp/ApiGatewayStateless"));

        public RegistrationController(ILogger<RegistrationController> logger)
        {
            _logger = logger;
        }

        // POST, za obradu zahteva za registraciju
        [HttpPost]
        public async Task<IActionResult> RegistrationAsync([FromBody] RegistrationRequest request)
        {
            try
            {
                string encryptedPassword = encryption.GetSHA256Hash(request.Password);
                string imagePath = imagePathConverter.ReplacePath(request.Image);
                string userType = "";
                if (request.UserType.Equals("user"))
                {
                    userType = types.UserTypes[0];
                }
                else if (request.UserType.Equals("driver"))
                {
                    userType = types.UserTypes[1];
                }
                else if (request.UserType.Equals("admin"))
                {
                    userType = types.UserTypes[2];
                }

                Debug.WriteLine($"Korisničko ime: {request.UserName}, Email: {request.Email}, Lozinka: {encryptedPassword}, Ime: {request.FirstName}, Prezime: {request.LastName}, Datum rođenja: {request.DateOfBirth}, Adresa: {request.Address}, Tip korisnika: {userType}, Stanje naloga: {request.State}, Slika: {imagePath}");
                _logger.LogInformation($"Primljeni podaci:\nKorisničko ime: {request.UserName}, Email: {request.Email}, Lozinka: {encryptedPassword}, Ime: {request.FirstName}, Prezime: {request.LastName}, Datum rođenja: {request.DateOfBirth}, Adresa: {request.Address}, Tip korisnika: {userType}, Stanje naloga: {request.State}, Slika: {imagePath}");

                User newUser = new User(request.UserName, request.Email, encryptedPassword, request.FirstName, request.LastName, request.DateOfBirth, request.Address, userType, request.State, imagePath);
                string result = await _proxy.RegistrationAsync(newUser);
                Debug.WriteLine(result);
                _logger.LogInformation(result);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške toko registracije!");
                _logger.LogError($"Došlo je do greške toko registracije: {ex.Message}");
                return StatusCode(500, "Došlo je do greške toko registracije!");
            }
        }

        // POST, za obradu zahteva za prijavu putem Google naloga
        [HttpPost("googleAccountLogin")]
        public async Task<IActionResult> GoogleAccountLogin([FromBody] GoogleAccModelRequest request)
        {
            try
            {
                Debug.WriteLine($"Korisničko ime: {request.UserName}, Email: {request.Email}, Ime: {request.FirstName}, Prezime: {request.LastName}, Tip korisnika: {request.UserType}, Stanje naloga: {request.State}");
                _logger.LogInformation($"Primljeni podaci:\nKorisničko ime: {request.UserName}, Email: {request.Email}, Ime: {request.FirstName}, Prezime: {request.LastName}, Tip korisnika: {request.UserType}, Stanje naloga: {request.State}");

                string password = "";
                string imagePath = "";
                string userType = "";
                if (request.UserType.Equals("user"))
                {
                    userType = types.UserTypes[0];
                }
                string dateOfBirth = "";
                string adress = "";

                User newUser = new User(request.UserName, request.Email, password, request.FirstName, request.LastName, dateOfBirth, adress, userType, request.State, imagePath);
                var resultTuple = await _proxy.GoogleAccountLoginAsync(newUser);
                string result = resultTuple.Item1;
                User loggedIn = resultTuple.Item2;

                Debug.WriteLine(result);
                _logger.LogInformation(result);

                if (loggedIn != null)
                {
                    var token = jwtConfig.GenerateToken(loggedIn);
                    if (loggedIn.UserType.Equals(types.UserTypes[0]))
                    {
                        loggedIn.UserType = "user";
                    }
                    else if (loggedIn.UserType.Equals(types.UserTypes[1]))
                    {
                        loggedIn.UserType = "driver";
                    }
                    else if (loggedIn.UserType.Equals(types.UserTypes[2]))
                    {
                        loggedIn.UserType = "admin";
                    }
                    MySession.data.Add(token, loggedIn);
                    Debug.WriteLine("Uspešna prijava sa Google nalogom!");
                    _logger.LogInformation("Uspešna prijava sa Google nalogom!");
                    return Ok(new { message = result, token = token });
                }
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogInformation("Došlo je do greške tokom obrade podataka!");
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške pri prijavi sa Google nalogom!");
                _logger.LogError($"Došlo je do greške pri prijavi sa Google nalogom: {ex.Message}");
                return StatusCode(500, "Greška pri prijavi sa Google nalogom!");
            }
        }
    }
}
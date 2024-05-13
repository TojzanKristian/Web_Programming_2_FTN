using Common.Encryption;
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
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly SHA256Encryption encryption = new SHA256Encryption();
        private readonly TypesOfUsers types = new TypesOfUsers();
        private readonly JwtConfiguration jwtConfig = new JwtConfiguration();
        private readonly IApiGateway _proxy = ServiceProxy.Create<IApiGateway>(new Uri("fabric:/TaxiApp/ApiGatewayStateless"));

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            try
            {
                string email = request.Email;
                string encryptedPassword = encryption.GetSHA256Hash(request.Password);

                Debug.WriteLine($"Primljeni podaci:\nEmail: {request.Email}, Lozinka: {encryptedPassword}");
                _logger.LogInformation($"Primljeni podaci:\nEmail: {request.Email}, Lozinka: {encryptedPassword}");

                var resultTuple = await _proxy.LoginAsync(email, encryptedPassword);
                string result = resultTuple.Item1;
                User loggedIn = resultTuple.Item2;

                Debug.WriteLine(result);
                _logger.LogInformation(result);

                if (loggedIn != null)
                {
                    var token = jwtConfig.GenerateToken(loggedIn);
                    loggedIn.Password = request.Password;
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
                        loggedIn.UserType = "Admin";
                    }
                    MySession.data.Add(token, loggedIn);
                    Debug.WriteLine("Uspešna prijava!");
                    _logger.LogInformation("Uspešna prijava!");
                    return Ok(new { message = result, token = token });
                }
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogInformation("Došlo je do greške tokom obrade podataka!");
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Greška tokom prijave korisnika!");
                _logger.LogError($"Greška tokom prijave korisnika: {ex.Message}");
                return StatusCode(500, "Greška tokom prijave korisnika!");
            }
        }
    }
}
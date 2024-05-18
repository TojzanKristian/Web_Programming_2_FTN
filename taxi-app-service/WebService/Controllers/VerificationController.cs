using AutoMapper;
using Common.Interfaces;
using Common.Models;
using Common.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using WebService.Dto;

namespace WebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VerificationController : Controller
    {
        private readonly ILogger<VerificationController> _logger;
        private readonly IMapper _mapper;
        private readonly IApiGateway _proxy = ServiceProxy.Create<IApiGateway>(new Uri("fabric:/TaxiApp/ApiGatewayStateless"));

        public VerificationController(ILogger<VerificationController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        // GET, za dobavljanje podataka o korisnicima koji trebaju da se verifikuju od strane admina
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<User> usersToVerify = await _proxy.GetUsersToVerifyAsync();
                if (usersToVerify.Count != 0 && usersToVerify != null)
                {
                    var data = _mapper.Map<List<UserDto>>(usersToVerify);
                    Debug.WriteLine($"Poslati su podaci:\n");
                    foreach (var user in data)
                    {
                        Debug.WriteLine($"Korisničko ime: {user.UserName}, Email: {user.Email}, Lozinka: {user.Password}, Ime: {user.FirstName}, Prezime: {user.LastName}, Datum rođenja: {user.DateOfBirth}, Adresa: {user.Address}, Tip korisnika: {user.UserType}, Status: {user.State}, Slika: {user.Image}");
                    }
                    _logger.LogInformation($"Poslati su podaci:\n");
                    foreach (var user in data)
                    {
                        _logger.LogInformation($"Korisničko ime: {user.UserName}, Email: {user.Email}, Lozinka: {user.Password}, Ime: {user.FirstName}, Prezime: {user.LastName}, Datum rođenja: {user.DateOfBirth}, Adresa: {user.Address}, Tip korisnika: {user.UserType}, Status: {user.State}, Slika: {user.Image}");
                    }
                    return Ok(data);
                }
                Debug.WriteLine("Nema korisnika u bazi podatak!");
                _logger.LogInformation("Nema korisnika u bazi podatak!");
                return Ok(new { message = "Nema korisnika u bazi podatak" });
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške!");
                _logger.LogInformation("Došlo je do greške!");
                return BadRequest("Došlo je do greške: " + ex.Message);
            }
        }

        // PUT, za obradu zahteva za odobren profil na stranici za verifikaciju
        [HttpPut("acceptProfile")]
        public async Task<IActionResult> AcceptProfile([FromBody] VerificationRequest request)
        {
            Debug.WriteLine($"Primljeni su podaci:\nKorisničko ime {request.UserName}, Stanje profila {request.State}");
            _logger.LogInformation($"Primljeni su podaci:\nKorisničko ime {request.UserName}, Stanje profila {request.State}");

            if (request.UserName != string.Empty && request.State != string.Empty)
            {
                var result = await _proxy.AcceptProfileAsync(request.UserName, request.State);
                Debug.WriteLine(result);
                _logger.LogInformation(result.ToString());
                return Ok(new { message = result });
            }
            Debug.WriteLine("Došlo je do greške!");
            _logger.LogInformation("Došlo je do greške!");
            return BadRequest("Došlo je do greške");
        }

        // PUT, za obradu zahteva za odbijen profil na stranici za verifikaciju
        [HttpPut("rejectProfile")]
        public async Task<IActionResult> RejectProfile([FromBody] VerificationRequest request)
        {
            Debug.WriteLine($"Primljeni su podaci:\nKorisničko ime {request.UserName}, Stanje profila {request.State}");
            _logger.LogInformation($"Primljeni su podaci:\nKorisničko ime {request.UserName}, Stanje profila {request.State}");

            if (request.UserName != string.Empty && request.State != string.Empty)
            {
                var result = await _proxy.RejectProfileAsync(request.UserName, request.State);
                Debug.WriteLine(result);
                _logger.LogInformation(result.ToString());
                return Ok(new { message = result });
            }
            Debug.WriteLine("Došlo je do greške!");
            _logger.LogInformation("Došlo je do greške!");
            return BadRequest("Došlo je do greške");
        }
    }
}
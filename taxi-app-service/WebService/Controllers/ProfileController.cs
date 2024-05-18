using AutoMapper;
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
using System.Linq;
using System.Threading.Tasks;
using WebService.Dto;

namespace WebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : Controller
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly IMapper _mapper;
        private readonly SHA256Encryption encryption = new SHA256Encryption();
        private readonly PathConverter imagePathConverter = new PathConverter();
        private readonly TypesOfUsers types = new TypesOfUsers();
        private readonly JwtConfiguration jwtConfig = new JwtConfiguration();
        private readonly IApiGateway _proxy = ServiceProxy.Create<IApiGateway>(new Uri("fabric:/TaxiApp/ApiGatewayStateless"));

        public ProfileController(ILogger<ProfileController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        // GET, za dobavljanje podataka o korisniku
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        UserDto data = _mapper.Map<UserDto>(loggedIn);
                        Debug.WriteLine($"Poslati su podaci:\nUsername: {data.UserName}, Email: {data.Email}, Password: {data.Password}, FirstName: {data.FirstName}, LastName: {data.LastName}, DateOfBirth: {data.DateOfBirth}, Address: {data.Address}, UserType: {data.UserType}, Stanje: {data.State}, Image: {data.Image}");
                        _logger.LogInformation($"Poslati su podaci:\nUsername: {data.UserName}, Email: {data.Email}, Password: {data.Password}, FirstName: {data.FirstName}, LastName: {data.LastName}, DateOfBirth: {data.DateOfBirth}, Address: {data.Address}, UserType: {data.UserType}, Stanje: {data.State}, Image: {data.Image}");
                        return Ok(data);
                    }
                    Debug.WriteLine("Došlo je do greške! Ne postoji korisnik sa tim tokenom!");
                    _logger.LogInformation("Došlo je do greške! Ne postoji korisnik sa tim tokenom!");
                    return BadRequest("Došlo je do greške! Ne postoji korisnik sa tim tokenom!");
                }
                else
                {
                    Debug.WriteLine("Neuspešna autorizacija! Pogrešan token!");
                    _logger.LogInformation("Neuspešna autorizacija! Pogrešan token!");
                    return Unauthorized("Neuspešna autorizacija! Pogrešan token!");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogInformation("Došlo je do greške tokom obrade podataka!");
                return BadRequest("Došlo je do greške: " + ex.Message);
            }
        }

        // PUT, za obradu zahteva za ažuriranje profila
        [HttpPut]
        public async Task<IActionResult> EditProfile([FromBody] RegistrationRequest request)
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    string encryptedPassword = encryption.GetSHA256Hash(request.Password);
                    string imagePath = imagePathConverter.ReplacePath(request.Image);

                    Debug.WriteLine($"Primljeni podaci:\nUsername: {request.UserName}, Email: {request.Email}, Password: {encryptedPassword}, FirstName: {request.FirstName}, LastName: {request.LastName}, DateOfBirth: {request.DateOfBirth}, Address: {request.Address}, UserType: {request.UserType}, Image: {imagePath}");
                    _logger.LogInformation($"Primljeni podaci:\nUsername: {request.UserName}, Email: {request.Email}, Password: {encryptedPassword}, FirstName: {request.FirstName}, LastName: {request.LastName}, DateOfBirth: {request.DateOfBirth}, Address: {request.Address}, UserType: {request.UserType}, Stanje: {request.State}, Image: {imagePath}");

                    User editedUser = new User(request.UserName, request.Email, encryptedPassword, request.FirstName, request.LastName, request.DateOfBirth, request.Address, request.UserType, request.State, imagePath);
                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        string result = await _proxy.EditProfileAsync(loggedIn, editedUser);
                        editedUser.Password = request.Password;
                        if (editedUser.UserType.Equals(types.UserTypes[0]))
                        {
                            editedUser.UserType = "user";
                        }
                        else if (editedUser.UserType.Equals(types.UserTypes[1]))
                        {
                            editedUser.UserType = "driver";
                        }
                        else if (editedUser.UserType.Equals(types.UserTypes[2]))
                        {
                            editedUser.UserType = "Admin";
                        }
                        MySession.data[token] = editedUser;

                        Debug.WriteLine(result);
                        _logger.LogInformation(result);

                        return Ok(new { message = result });
                    }
                    Debug.WriteLine("Došlo je do greške! Ne postoji korisnik sa tim tokenom!");
                    _logger.LogInformation("Došlo je do greške! Ne postoji korisnik sa tim tokenom!");
                    return BadRequest("Došlo je do greške! Ne postoji korisnik sa tim tokenom!");
                }
                else
                {
                    Debug.WriteLine("Neuspešna autorizacija! Pogrešan token!");
                    _logger.LogInformation("Neuspešna autorizacija! Pogrešan token!");
                    return Unauthorized("Neuspešna autorizacija! Pogrešan token!");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogError($"Došlo je do greške tokom obrade podataka: {ex.Message}");
                return StatusCode(500, "Greška tokom obrade podataka!");
            }
        }
    }
}
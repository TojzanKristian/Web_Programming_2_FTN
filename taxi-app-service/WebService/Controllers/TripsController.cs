using AutoMapper;
using Common.Encryption;
using Common.Interfaces;
using Common.Models;
using Common.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebService.Dto;
using WebService.Hubs;

namespace WebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripsController : Controller
    {
        private readonly ILogger<TripsController> _logger;
        private readonly IMapper _mapper;
        private readonly IHubContext<TripHub> _tripHubContext;
        private readonly JwtConfiguration jwtConfig = new JwtConfiguration();
        private readonly IApiGateway _proxy = ServiceProxy.Create<IApiGateway>(new Uri("fabric:/TaxiApp/ApiGatewayStateless"));

        public TripsController(ILogger<TripsController> logger, IMapper mapper, IHubContext<TripHub> tripHubContext)
        {
            _logger = logger;
            _mapper = mapper;
            _tripHubContext = tripHubContext;
        }

        // GET, za dobavljanje aktivnih vožnji
        [HttpGet("getActiveTrips")]
        public async Task<IActionResult> GetActiveTripsAsync()
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        var result = await _proxy.GetActiveTripsAsync();
                        if (result.Count != 0 && result != null)
                        {
                            var data = result;
                            Debug.WriteLine($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                Debug.WriteLine($"Id: {trip.Id}, vozač: {trip.Driver}, Putnik: {trip.Passenger}, početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}, stanje vožnje: {trip.State}");
                            }
                            _logger.LogInformation($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                _logger.LogInformation($"Id: Id: {trip.Id}, vozač: {trip.Driver}, Putnik: {trip.Passenger}, početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}, stanje vožnje: {trip.State}");
                            }
                            return Ok(data);
                        }
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

        // GET, za dobavljanje prethodnih vožnji vozaču
        [HttpGet("getMyTrips")]
        public async Task<IActionResult> GetMyTripsAsync()
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        var result = await _proxy.GetDriversPreviousTripsAsync(loggedIn.UserName);
                        if (result.Count != 0 && result != null)
                        {
                            var data = _mapper.Map<List<MyTripsDto>>(result);
                            Debug.WriteLine($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                Debug.WriteLine($"Putnik: {trip.Passenger}, početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}");
                            }
                            _logger.LogInformation($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                _logger.LogInformation($"Putnik: {trip.Passenger}, početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}");
                            }
                            return Ok(data);
                        }
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

        // GET, za dobavljanje svih vožnji u sistemu adminu
        [HttpGet("getAllTrips")]
        public async Task<IActionResult> GetAllTripsAsync()
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        var result = await _proxy.GetAllTripsAsync();
                        if (result.Count != 0 && result != null)
                        {
                            var data = _mapper.Map<List<AllTripsDto>>(result);
                            Debug.WriteLine($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                Debug.WriteLine($"Vozač: {trip.Driver}, Putnik: {trip.Passenger}, početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}, stanje vožnje: {trip.State}");
                            }
                            _logger.LogInformation($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                _logger.LogInformation($"Vozač: {trip.Driver}, Putnik: {trip.Passenger}, početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}, stanje vožnje: {trip.State}");
                            }
                            return Ok(data);
                        }
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

        // GET, za dobavljanje prethodnih vožnji korisniku
        [HttpGet("getPassengersTrips")]
        public async Task<IActionResult> GetPassengersTripsAsync()
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        var result = await _proxy.GetPassengersTripsAsync(loggedIn.UserName);
                        if (result.Count != 0 && result != null)
                        {
                            var data = _mapper.Map<List<PreviousTripsDto>>(result);
                            Debug.WriteLine($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                Debug.WriteLine($"Početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}");
                            }
                            _logger.LogInformation($"Poslati su podaci:\n");
                            foreach (var trip in data)
                            {
                                _logger.LogInformation($"Početna adresa: {trip.StartingAddress}, krajnja adresa: {trip.FinalAddress}, cena vožnje: {trip.PriceOfTheTrip}, vremensko trajanje vožnje: {trip.DurationOfTheTrip}");
                            }
                            return Ok(data);
                        }
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

        // POST, za obradu zahteva za kreiranje nove vožnje
        [HttpPost("createNewTrip")]
        public async Task<IActionResult> CreateNewTripAsync([FromBody] TripRequest request)
        {
            await Task.Yield();
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    Debug.WriteLine($"Primljeni podaci:\nPočetna adresa: {request.StartingAddress}, Krajnja adresa: {request.FinalAddress}, cena: {request.PriceOfTheTrip} din, vreme do dolaska taxia: {request.TimeForTheTaxiToArrive} min, vreme potrebno za vožnju: {request.DurationOfTheTrip} min");
                    _logger.LogInformation($"Primljeni podaci:\nPočetna adresa: {request.StartingAddress}, Krajnja adresa: {request.FinalAddress}, cena: {request.PriceOfTheTrip} din, vreme do dolaska taxia: {request.TimeForTheTaxiToArrive} min, vreme potrebno za vožnju: {request.DurationOfTheTrip} min");

                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        Trip newTrip = new Trip("", loggedIn.UserName, request.StartingAddress, request.FinalAddress, request.PriceOfTheTrip + " din", request.DurationOfTheTrip + " min", "Čeka");
                        var result = await _proxy.AddNewTripAsync(newTrip);
                        var resultString = result.Item1;
                        var resultTrip = result.Item2;
                        MySession.waitForTrip.Add(resultTrip.Id, request.TimeForTheTaxiToArrive);
                        Debug.WriteLine(resultString);
                        _logger.LogInformation(resultString);
                        return Ok(new { message = resultString });
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
                Debug.WriteLine($"Došlo je do greške tokom obrade podataka! {ex.Message}");
                _logger.LogError($"Došlo je do greške tokom obrade podataka: {ex.Message}");
                return StatusCode(500, "Greška tokom obrade podataka!");
            }
        }

        // PUT, za obradu zahteva za ažuriranje vožnje
        [HttpPut("acceptTheTrip")]
        public async Task<IActionResult> AcceptTheTripAsync([FromBody] AcceptTripRequest request)
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    Debug.WriteLine($"Primljeni podaci:\nId: {request.Id}, status: {request.State}");
                    _logger.LogInformation($"Primljeni podaci:\nId: {request.Id}, status: {request.State}");

                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        var result = await _proxy.DriverAcceptedTheTripAsync(request.Id, request.State, loggedIn.UserName);
                        Debug.WriteLine(result.ToString());
                        _logger.LogInformation(result.ToString());

                        var timeForTheTaxiToArrive = MySession.waitForTrip.Where(kvp => kvp.Key == request.Id)
                               .Select(kvp => kvp.Value)
                               .FirstOrDefault();


                        if (timeForTheTaxiToArrive != null && timeForTheTaxiToArrive != string.Empty)
                        {
                            var message = new
                            {
                                timeForTheTaxiToArrive,
                                result
                            };
                            await _tripHubContext.Clients.All.SendAsync("TripAccepted", message);

                            var response = new
                            {
                                message = "1",
                                timeForTheTaxiToArrive
                            };
                            return Ok(response);
                        }
                        return BadRequest();
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


        // PUT, za obradu zahteva za završenu vožnju
        [HttpPut("tripIsFinished")]
        public async Task<IActionResult> TripIsFinishedAsync([FromBody] AcceptTripRequest request)
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (jwtConfig.ValidateToken(token))
                {
                    Debug.WriteLine($"Primljeni podaci:\nId: {request.Id}, status: {request.State}");
                    _logger.LogInformation($"Primljeni podaci:\nId: {request.Id}, status: {request.State}");

                    User loggedIn = MySession.data.FirstOrDefault(x => x.Key.Equals(token)).Value;
                    if (loggedIn != null)
                    {
                        var result = await _proxy.TheTripIsFinishedAsync(request.Id, request.State);
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
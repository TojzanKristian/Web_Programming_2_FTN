using AutoMapper;
using Common.Interfaces;
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
    public class RatingController : ControllerBase
    {
        private readonly ILogger<RatingController> _logger;
        private readonly IMapper _mapper;
        private readonly IApiGateway _proxy = ServiceProxy.Create<IApiGateway>(new Uri("fabric:/TaxiApp/ApiGatewayStateless"));

        public RatingController(ILogger<RatingController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        // GET, za dobavljanje svih ocena za sve vozače za prikaz adminu
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _proxy.GetAllRatingsAsync();
                var ratings = _mapper.Map<List<RatingDto>>(result);
                if (ratings != null)
                {
                    Debug.WriteLine($"Poslati su podaci:\n");
                    foreach (var rating in ratings)
                    {
                        Debug.WriteLine($"Vozač: {rating.Driver}, broj ocena {rating.NumberOfRatings}, prosečna ocena: {rating.AverageRating}, blokiran: {rating.IsTheDriverBlocked}");
                    }
                    _logger.LogInformation($"Poslati su podaci:\n");
                    foreach (var rating in ratings)
                    {
                        _logger.LogInformation($"Vozač: {rating.Driver}, broj ocena {rating.NumberOfRatings}, prosečna ocena: {rating.AverageRating}, blokiran: {rating.IsTheDriverBlocked}");
                    }
                    return Ok(ratings);
                }
                else
                {
                    Debug.WriteLine("Došlo je do greške! Nema podataka u bazi!");
                    _logger.LogInformation("Došlo je do greške! Nema podataka u bazi!");
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogInformation("Došlo je do greške tokom obrade podataka!");
                return BadRequest("Došlo je do greške: " + ex.Message);
            }
        }

        // POST, za obradu zahetva za dodavanje ocene od strane strane korisnika
        [HttpPost]
        public async Task<IActionResult> ReceiveRatingAsync([FromBody] RatingRequest request)
        {
            try
            {
                Debug.WriteLine($"Primljeni podaci:\nVozač: {request.Driver}, ocena: {request.Rating}");
                _logger.LogInformation($"Primljeni podaci:\nVozač: {request.Driver}, ocena: {request.Rating}");

                if (request.Driver != null && request.Driver != string.Empty && request.Rating > 0 && request.Rating <= 5)
                {
                    int rating = (int)Math.Round(request.Rating);
                    var result = await _proxy.NewRatingForDriverAsync(request.Driver, rating);
                    Debug.WriteLine(result);
                    _logger.LogInformation(result);
                    return Ok(new { message = result });
                }
                else
                {
                    Debug.WriteLine("Nisu primljeni podaci od klijenta!");
                    _logger.LogInformation("Nisu primljeni podaci od klijenta!");
                    return BadRequest("Nisu primljeni podaci od klijenta!");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Greška tokom obrade podataka!");
                _logger.LogError($"Greška tokom obrade podataka: {ex.Message}");
                return BadRequest("Greška tokom obrade podataka!");
            }
        }

        // PUT, za obradu zahteva za blokiranje vozača od strane admina
        [HttpPut("blockDriver")]
        public async Task<IActionResult> BlockDriver([FromBody] BlockDriverRequest request)
        {
            try
            {
                Debug.WriteLine($"Primljen podatak: {request.Driver}");
                _logger.LogInformation($"Primljen podatak: {request.Driver}");

                if (request.Driver != null && request.Driver != string.Empty)
                {
                    var result = await _proxy.BlockDriverAsync(request.Driver);
                    Debug.WriteLine(result);
                    _logger.LogInformation(result);
                    return Ok(new { message = result });
                }
                else
                {
                    Debug.WriteLine("Nije primljen podatak od klijenta!");
                    _logger.LogInformation("Nije primljen podatak od klijenta!");
                    return BadRequest("Nije primljen podatak od klijenta!");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogError($"Došlo je do greške tokom obrade podataka: {ex.Message}");
                return BadRequest("Greška tokom obrade podataka!");
            }
        }

        // PUT, za obradu zahteva za odblokiranje vozača od strane admina
        [HttpPut("unblockDriver")]
        public async Task<IActionResult> UnblockDriver([FromBody] BlockDriverRequest request)
        {
            try
            {
                Debug.WriteLine($"Primljen podatak: {request.Driver}");
                _logger.LogInformation($"Primljen podatak: {request.Driver}");

                if (request.Driver != null && request.Driver != string.Empty)
                {
                    var result = await _proxy.UnblockDriverAsync(request.Driver);
                    Debug.WriteLine(result);
                    _logger.LogInformation(result);
                    return Ok(new { message = result });
                }
                else
                {
                    Debug.WriteLine("Nije primljen podatak od klijenta!");
                    _logger.LogInformation("Nije primljen podatak od klijenta!");
                    return BadRequest("Nije primljen podatak od klijenta!");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Došlo je do greške tokom obrade podataka!");
                _logger.LogError($"Došlo je do greške tokom obrade podataka: {ex.Message}");
                return BadRequest("Greška tokom obrade podataka!");
            }
        }
    }
}
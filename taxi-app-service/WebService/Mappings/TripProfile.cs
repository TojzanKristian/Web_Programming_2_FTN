using AutoMapper;
using Common.Models;
using WebService.Dto;

namespace WebService.Mappings
{
    public class TripProfile : Profile
    {
        public TripProfile()
        {
            CreateMap<Trip, AllTripsDto>();
            CreateMap<Trip, PreviousTripsDto>();
            CreateMap<Trip, MyTripsDto>();
        }
    }
}
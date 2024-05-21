using AutoMapper;
using Common.Models;
using WebService.Dto;

namespace WebService.Mappings
{
    public class RatingProfile : Profile
    {
        public RatingProfile()
        {
            CreateMap<Rating, RatingDto>();
        }
    }
}
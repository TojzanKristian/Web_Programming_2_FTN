using AutoMapper;
using Common.Models;
using WebService.Dto;

namespace WebService.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}
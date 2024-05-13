using Common.Models;
using Microsoft.ServiceFabric.Services.Remoting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Interfaces
{
    public interface IUserService : IService
    {
        Task<string> RegistrationAsync(User newUser);
        Task<(string, User)> GoogleAccountLoginAsync(User newUser);
        Task<(string, User)> LoginAsync(string email, string password);
        Task<string> EditProfileAsync(User currentUser, User editedUser);
        Task<List<User>> GetUsersToVerifyAsync();
        Task<string> AcceptProfileAsync(string userName, string profileState);
        Task<string> RejectProfileAsync(string userName, string profileState);
    }
}
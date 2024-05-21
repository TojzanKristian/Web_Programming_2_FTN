using Common.Models;
using Microsoft.ServiceFabric.Services.Remoting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Interfaces
{
    public interface IUserService : IService
    {
        // User service
        Task<string> RegistrationAsync(User newUser);
        Task<(string, User)> GoogleAccountLoginAsync(User newUser);
        Task<(string, User)> LoginAsync(string email, string password);
        Task<string> EditProfileAsync(User currentUser, User editedUser);
        Task<List<User>> GetUsersToVerifyAsync();
        Task<string> AcceptProfileAsync(string userName, string profileState);
        Task<string> RejectProfileAsync(string userName, string profileState);

        // Trip service
        Task<(string, Trip)> AddNewTripAsync(Trip newTrip);
        Task<List<Trip>> GetActiveTripsAsync();
        Task<List<Trip>> GetDriversPreviousTripsAsync(string userName);
        Task<List<Trip>> GetAllTripsAsync();
        Task<List<Trip>> GetPassengersTripsAsync(string userName);
        Task<Trip> DriverAcceptedTheTripAsync(int id, string state, string driver);
        Task<string> TheTripIsFinishedAsync(int id, string state);

        // Rating service
        Task<List<Rating>> GetAllRatingsAsync();
        Task<string> NewRatingForDriverAsync(string driver, int rating);
        Task<string> BlockDriverAsync(string driver);
        Task<string> UnblockDriverAsync(string driver);
    }
}
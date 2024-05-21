using Common.Interfaces;
using Common.Models;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System;
using System.Collections.Generic;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;

namespace ApiGatewayStateless
{
    internal sealed class ApiGatewayStateless : StatelessService, IApiGateway
    {
        private IUserService _userProxy = null!;

        public ApiGatewayStateless(StatelessServiceContext context) : base(context) { }

        // User service
        public async Task<string> RegistrationAsync(User newUser)
            => await _userProxy.RegistrationAsync(newUser);

        public async Task<(string, User)> GoogleAccountLoginAsync(User newUser)
            => await _userProxy.GoogleAccountLoginAsync(newUser);

        public async Task<(string, User)> LoginAsync(string email, string password)
            => await _userProxy.LoginAsync(email, password);

        public async Task<string> EditProfileAsync(User currentUser, User editedUser)
            => await _userProxy.EditProfileAsync(currentUser, editedUser);

        public async Task<List<User>> GetUsersToVerifyAsync()
            => await _userProxy.GetUsersToVerifyAsync();

        public async Task<string> AcceptProfileAsync(string userName, string profileState)
            => await _userProxy.AcceptProfileAsync(userName, profileState);

        public async Task<string> RejectProfileAsync(string userName, string profileState)
            => await _userProxy.RejectProfileAsync(userName, profileState);

        // Trip service
        public async Task<(string, Trip)> AddNewTripAsync(Trip newTrip)
           => await _userProxy.AddNewTripAsync(newTrip);

        public async Task<List<Trip>> GetActiveTripsAsync()
            => await _userProxy.GetActiveTripsAsync();

        public async Task<List<Trip>> GetDriversPreviousTripsAsync(string userName)
            => await _userProxy.GetDriversPreviousTripsAsync(userName);

        public async Task<List<Trip>> GetAllTripsAsync()
            => await _userProxy.GetAllTripsAsync();

        public async Task<List<Trip>> GetPassengersTripsAsync(string userName)
            => await _userProxy.GetPassengersTripsAsync(userName);

        public async Task<Trip> DriverAcceptedTheTripAsync(int id, string state, string driver)
            => await _userProxy.DriverAcceptedTheTripAsync(id, state, driver);

        public async Task<string> TheTripIsFinishedAsync(int id, string state)
            => await _userProxy.TheTripIsFinishedAsync(id, state);

        // Rating service
        public async Task<string> NewRatingForDriverAsync(string driver, int rating)
            => await _userProxy.NewRatingForDriverAsync(driver, rating);

        public async Task<List<Rating>> GetAllRatingsAsync()
            => await _userProxy.GetAllRatingsAsync();

        public async Task<string> BlockDriverAsync(string driver)
            => await _userProxy.BlockDriverAsync(driver);

        public async Task<string> UnblockDriverAsync(string driver)
            => await _userProxy.UnblockDriverAsync(driver);

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
            => this.CreateServiceRemotingInstanceListeners();

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            var fabricClient = new FabricClient();
            var serviceUri = new Uri("fabric:/TaxiApp/UserService");
            var partitionList = await fabricClient.QueryManager.GetPartitionListAsync(serviceUri);

            foreach (var partition in partitionList)
            {
                var partitionKey = partition.PartitionInformation as Int64RangePartitionInformation;

                if (partitionKey != null)
                {
                    var servicePartitionKey = new ServicePartitionKey(partitionKey.LowKey);

                    _userProxy = ServiceProxy.Create<IUserService>(serviceUri, servicePartitionKey);
                    break;
                }
            }
        }
    }
}
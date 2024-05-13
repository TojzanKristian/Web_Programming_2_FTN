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
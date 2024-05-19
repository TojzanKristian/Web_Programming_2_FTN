using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebService.Hubs
{
    public class TripHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public async Task SendTripAccepted(string tripData)
        {
            await Clients.All.SendAsync("TripAccepted", tripData);
        }
    }
}
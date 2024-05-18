using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebService.Dto
{
    public class PreviousTripsDto
    {
        public string StartingAddress { get; set; }
        public string FinalAddress { get; set; }
        public string PriceOfTheTrip { get; set; }
        public string DurationOfTheTrip { get; set; }
    }
}
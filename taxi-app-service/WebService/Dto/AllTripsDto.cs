﻿namespace WebService.Dto
{
    public class AllTripsDto
    {
        public string Driver { get; set; }
        public string Passenger { get; set; }
        public string StartingAddress { get; set; }
        public string FinalAddress { get; set; }
        public string PriceOfTheTrip { get; set; }
        public string DurationOfTheTrip { get; set; }
        public string State { get; set; }
    }
}
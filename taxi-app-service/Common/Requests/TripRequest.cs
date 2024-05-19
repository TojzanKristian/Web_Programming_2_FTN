namespace Common.Requests
{
    public class TripRequest
    {
        public string StartingAddress { get; set; }
        public string FinalAddress { get; set; }
        public string PriceOfTheTrip { get; set; }
        public string TimeForTheTaxiToArrive { get; set; }
        public string DurationOfTheTrip { get; set; }
    }
}
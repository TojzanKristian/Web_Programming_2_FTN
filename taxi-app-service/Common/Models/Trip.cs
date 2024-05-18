using System.Runtime.Serialization;

namespace Common.Models
{
    [DataContract]
    public class Trip
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Driver { get; set; }
        [DataMember]
        public string Passenger { get; set; }
        [DataMember]
        public string StartingAddress { get; set; }
        [DataMember]
        public string FinalAddress { get; set; }
        [DataMember]
        public string PriceOfTheTrip { get; set; }
        [DataMember]
        public string DurationOfTheTrip { get; set; }
        [DataMember]
        public string State { get; set; }

        public Trip(string driver, string passenger, string startingAddress, string finalAddress, string priceOfTheTrip, string durationOfTheTrip, string state)
        {
            Driver = driver;
            Passenger = passenger;
            StartingAddress = startingAddress;
            FinalAddress = finalAddress;
            PriceOfTheTrip = priceOfTheTrip;
            DurationOfTheTrip = durationOfTheTrip;
            State = state;
        }
    }
}
using System.Runtime.Serialization;

namespace Common.Models
{
    [DataContract]
    public class Rating
    {
        public int Id { get; set; }
        [DataMember]
        public string Driver { get; set; }
        [DataMember]
        public int NumberOfRatings { get; set; }
        [DataMember]
        public double AverageRating { get; set; }
        [DataMember]
        public string IsTheDriverBlocked { get; set; }
    }
}
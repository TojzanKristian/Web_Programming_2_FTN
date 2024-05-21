namespace WebService.Dto
{
    public class RatingDto
    {
        public string Driver { get; set; }
        public int NumberOfRatings { get; set; }
        public double AverageRating { get; set; }
        public string IsTheDriverBlocked { get; set; }
    }
}
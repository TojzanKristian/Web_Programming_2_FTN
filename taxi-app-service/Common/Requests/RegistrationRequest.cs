namespace Common.Requests
{
    public class RegistrationRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public string UserType { get; set; }
        public string State { get; set; }
        public string Image { get; set; }
    }
}
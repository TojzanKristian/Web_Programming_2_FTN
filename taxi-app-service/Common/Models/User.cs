using System.Runtime.Serialization;

namespace Common.Models
{
    [DataContract]
    public class User
    {
        public int Id { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string DateOfBirth { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string UserType { get; set; }
        [DataMember]
        public string State { get; set; }
        [DataMember]
        public string Image { get; set; }

        public User(string userName, string email, string password, string firstName, string lastName, string dateOfBirth, string address, string userType, string state, string image)
        {
            UserName = userName;
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Address = address;
            UserType = userType;
            State = state;
            Image = image;
        }
    }
}
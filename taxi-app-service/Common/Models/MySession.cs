using System.Collections.Generic;

namespace Common.Models
{
    public class MySession
    {
        public static Dictionary<string, User> data = new Dictionary<string, User>();
        public static Dictionary<int, string> waitForTrip = new Dictionary<int, string>();
    }
}
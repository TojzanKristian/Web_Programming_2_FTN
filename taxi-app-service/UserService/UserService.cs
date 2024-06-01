using Common.Interfaces;
using Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using UserService.Database;
using UserService.Notification_via_email;

namespace UserService
{
    /// <summary>
    /// An instance of this class is created for each service replica by the Service Fabric runtime.
    /// </summary>
    internal sealed class UserService : StatefulService, IUserService
    {
        private readonly TypesOfUsers types = new TypesOfUsers();
        private readonly EmailSender emailSender = new EmailSender();

        public UserService(StatefulServiceContext context)
            : base(context)
        { }

        /// <summary>
        /// Optional override to create listeners (e.g., HTTP, Service Remoting, WCF, etc.) for this service replica to handle client or user requests.
        /// </summary>
        /// <remarks>
        /// For more information on service communication, see https://aka.ms/servicefabricservicecommunication
        /// </remarks>
        /// <returns>A collection of listeners.</returns>
        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
                   => this.CreateServiceRemotingReplicaListeners();

        /// <summary>
        /// This is the main entry point for your service replica.
        /// This method executes when this replica of your service becomes primary and has write status.
        /// </summary>
        /// <param name="cancellationToken">Canceled when Service Fabric needs to shut down this service replica.</param>
        protected override async Task RunAsync(CancellationToken cancellationToken)
        {

            await Task.Yield();

            // Creating a Users database
            var dbContextUsers = CreateMyDbContextUsers.CreateDbContext();
            try
            {
                await dbContextUsers.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
            }

            // Creating a database of Trips
            var dbContextTrips = CreateMyDbContextTrips.CreateDbContext();
            try
            {
                await dbContextTrips.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
            }

            // Creating a database of Ratings
            var dbContextRatings = CreateMyDbContextRatings.CreateDbContext();
            try
            {
                await dbContextRatings.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
            }
        }

        // User service
        #region Registration
        public async Task<string> RegistrationAsync(User newUser)
        {
            await Task.Yield();

            if (newUser != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextUsers.CreateDbContext();
                    try
                    {
                        var allUsers = dbContext.Users.ToList();
                        if (allUsers.Count != 0)
                        {
                            foreach (var u in allUsers)
                            {
                                if (u.UserName.Equals(newUser.UserName))
                                {
                                    Debug.WriteLine($"Već postoji korisnik sa korisničkim imenom {newUser.UserName} u bazi podataka!");
                                    return "-1";
                                }
                                else if (u.Email.Equals(newUser.Email))
                                {
                                    Debug.WriteLine($"Već postoji korisnik sa emailom {newUser.Email} u bazi podataka!");
                                    return "-2";
                                }
                            }
                            dbContext.Users.Add(newUser);
                            await dbContext.SaveChangesAsync();
                        }
                        else
                        {
                            dbContext.Users.Add(newUser);
                            await dbContext.SaveChangesAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                        return "0";
                    }
                    Debug.WriteLine($"Korisnik je uspešno dodat u bazu podataka!");
                    return "1";
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                    return "0";
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške, korisnik nema vrednost!");
                return "0";
            }
        }
        #endregion

        #region Login with Google acc
        public async Task<(string, User)> GoogleAccountLoginAsync(User newUser)
        {
            await Task.Yield();

            if (newUser != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextUsers.CreateDbContext();
                    try
                    {
                        var allUsers = dbContext.Users.ToList();
                        if (allUsers.Count == 0)
                        {
                            dbContext.Users.Add(newUser);
                            await dbContext.SaveChangesAsync();
                            Debug.WriteLine($"Korisnik je uspešno dodat u bazu podataka!");
                            return ("2", newUser);
                        }
                        else
                        {
                            bool emailExists = allUsers.Any(u => u.Email.Equals(newUser.Email));
                            if (!emailExists)
                            {
                                dbContext.Users.Add(newUser);
                                await dbContext.SaveChangesAsync();
                                Debug.WriteLine($"Korisnik je uspešno dodat u bazu podataka!");
                                return ("2", newUser);
                            }
                            else
                            {
                                Debug.WriteLine($"Već postoji korisnik sa emailom {newUser.Email} u bazi podataka!");
                                return ("1", newUser);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                        return ("-1", null);
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                    return ("-1", null);
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške, korisnik nema vrednost!");
                return ("-1", null);
            }
        }
        #endregion

        #region Login
        public async Task<(string, User)> LoginAsync(string email, string password)
        {
            await Task.Yield();

            if (email.Equals(string.Empty) && password.Equals(string.Empty))
            {
                Debug.WriteLine($"Greška tokom prijave korisnika! Nisu primljeni podaci!");
                return ("0", null);
            }
            else
            {
                try
                {
                    var dbContext = CreateMyDbContextUsers.CreateDbContext();
                    var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
                    if (user != null)
                    {
                        if (password == user.Password)
                        {
                            if (user.UserType.Equals(types.UserTypes[0]))
                            {
                                Debug.WriteLine($"Uspešno se prijavio korisnik!");
                                return ("1", user);
                            }
                            else if (user.UserType.Equals(types.UserTypes[1]))
                            {
                                Debug.WriteLine($"Uspešno se prijavio vozač!");
                                return ("2", user);
                            }
                            else if (user.UserType.Equals(types.UserTypes[2]))
                            {
                                Debug.WriteLine($"Uspešno se prijavio admin!");
                                return ("3", user);
                            }
                        }
                        else
                        {
                            Debug.WriteLine($"Greška tokom prijave korisnika! Korisnik je pogrešio lozinku!");
                            return ("-1", null);
                        }
                    }
                    else
                    {
                        Debug.WriteLine($"Greška tokom prijave korisnika! Korisnik nije registrovan!");
                        return ("-2", null);
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Greška tokom prijave korisnika: {ex.Message}");
                    return ("0", null);
                }
                Debug.WriteLine($"Greška tokom prijave korisnika!");
                return ("0", null);
            }
        }
        #endregion

        #region Edit profile
        public async Task<string> EditProfileAsync(User currentUser, User editedUser)
        {
            await Task.Yield();

            if (currentUser != null && editedUser != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextUsers.CreateDbContext();
                    var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == currentUser.Email);
                    if (existingUser != null)
                    {
                        existingUser.UserName = editedUser.UserName;
                        existingUser.Email = editedUser.Email;
                        existingUser.Password = editedUser.Password;
                        existingUser.FirstName = editedUser.FirstName;
                        existingUser.LastName = editedUser.LastName;
                        existingUser.DateOfBirth = editedUser.DateOfBirth;
                        existingUser.Address = editedUser.Address;
                        existingUser.UserType = editedUser.UserType;
                        existingUser.Image = editedUser.Image;
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    else
                    {
                        Debug.WriteLine($"Došlo je do greške tokom čitanja korisnika iz baze podataka!");
                        return "0";
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                    return "0";
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške, korisnik nema vrednost!");
                return "0";
            }
        }
        #endregion

        #region Get users to verify
        public async Task<List<User>> GetUsersToVerifyAsync()
        {
            await Task.Yield();

            try
            {
                var dbContext = CreateMyDbContextUsers.CreateDbContext();
                var allUsers = dbContext.Users.ToList();
                if (allUsers.Count != 0)
                {
                    Debug.WriteLine($"Uspešno su pročitani i poslati korisnici iz baze podataka!");
                    return allUsers;
                }
                Debug.WriteLine($"Nema korisnika u bazi podataka!");
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                return null;
            }
        }
        #endregion

        #region Accepting the user's profile
        public async Task<string> AcceptProfileAsync(string userName, string profileState)
        {
            await Task.Yield();

            if (userName != string.Empty && profileState != string.Empty)
            {
                try
                {
                    var dbContext = CreateMyDbContextUsers.CreateDbContext();
                    var user = await dbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);
                    if (user != null)
                    {
                        user.State = profileState;
                        await dbContext.SaveChangesAsync();
                        emailSender.SendEmail("drsprojekat2023@gmail.com", "Obaveštenje o izmeni statusa vašeg profila", "Admin je odobrio vaš profil!");
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    Debug.WriteLine($"Ne postoji korisnik u bazi podataka sa korisničkim imenom {userName}!");
                    return "0";
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Greška tokom komunikacije sa bazom: {ex.Message}");
                    return "0";
                }
            }
            Debug.WriteLine($"Greška! Korisničko ime i/ili status nemaju vrednost!");
            return "0";
        }
        #endregion

        #region Rejection of user profile
        public async Task<string> RejectProfileAsync(string userName, string profileState)
        {
            await Task.Yield();

            if (userName != string.Empty && profileState != string.Empty)
            {
                try
                {
                    var dbContext = CreateMyDbContextUsers.CreateDbContext();
                    var user = await dbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);
                    if (user != null)
                    {
                        user.State = profileState;
                        await dbContext.SaveChangesAsync();
                        emailSender.SendEmail("drsprojekat2023@gmail.com", "Obaveštenje o izmeni statusa vašeg profila", "Admin je odbio vaš profil!");
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    Debug.WriteLine($"Ne postoji korisnik u bazi podataka sa korisničkim imenom {userName}!");
                    return "0";
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Greška tokom komunikacije sa bazom: {ex.Message}");
                    return "0";
                }
            }
            Debug.WriteLine($"Greška! Korisničko ime i/ili status nemaju vrednost!");
            return "0";
        }
        #endregion

        // Trip service
        #region Add new trip
        public async Task<(string, Trip)> AddNewTripAsync(Trip newTrip)
        {
            await Task.Yield();

            if (newTrip != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextTrips.CreateDbContext();
                    try
                    {
                        var allTrips = dbContext.Trips.ToList();
                        if (allTrips.Count != 0)
                        {
                            foreach (var trip in allTrips)
                            {
                                if (trip.Id.Equals(newTrip.Id))
                                {
                                    Debug.WriteLine($"Već postoji vožnja u bazi podataka!");
                                    return ("-1", null);
                                }
                            }
                            dbContext.Trips.Add(newTrip);
                            await dbContext.SaveChangesAsync();
                        }
                        else
                        {
                            dbContext.Trips.Add(newTrip);
                            await dbContext.SaveChangesAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                        return ("0", null);
                    }
                    Debug.WriteLine($"Vožnja je uspešno dodata u bazu podataka!");
                    return ("1", newTrip);
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                    return ("0", null);
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške nova vožnja nema vrednost!");
                return ("0", null);
            }
        }
        #endregion

        #region Get all active trips
        public async Task<List<Trip>> GetActiveTripsAsync()
        {
            await Task.Yield();

            try
            {
                var dbContext = CreateMyDbContextTrips.CreateDbContext();
                var allTrips = dbContext.Trips.ToList();
                List<Trip> returnList = new List<Trip>();
                if (allTrips.Count != 0)
                {
                    foreach (var trip in allTrips)
                    {
                        if (trip.State.Equals("Čeka"))
                        {
                            returnList.Add(trip);
                        }
                    }
                    Debug.WriteLine($"Uspešno su pročitane i poslate vožnje iz baze podataka!");
                    return returnList;
                }
                Debug.WriteLine($"Nema vožnji u bazi podataka!");
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                return null;
            }
        }
        #endregion

        #region Get previous trips for driver
        public async Task<List<Trip>> GetDriversPreviousTripsAsync(string userName)
        {
            await Task.Yield();

            try
            {
                var dbContext = CreateMyDbContextTrips.CreateDbContext();
                var allTrips = dbContext.Trips.ToList();
                List<Trip> returnList = new List<Trip>();
                if (allTrips.Count != 0)
                {
                    foreach (var trip in allTrips)
                    {
                        if (trip.Driver.Equals(userName) && trip.State.Equals("Završen"))
                        {
                            returnList.Add(trip);
                        }
                    }
                    Debug.WriteLine($"Uspešno su pročitane i poslate vožnje iz baze podataka!");
                    return returnList;
                }
                Debug.WriteLine($"Nema vožnji u bazi podataka!");
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                return null;
            }
        }
        #endregion

        #region Get all trips
        public async Task<List<Trip>> GetAllTripsAsync()
        {
            await Task.Yield();

            try
            {
                var dbContext = CreateMyDbContextTrips.CreateDbContext();
                var allTrips = dbContext.Trips.ToList();
                if (allTrips.Count != 0)
                {
                    Debug.WriteLine($"Uspešno su pročitane i poslate vožnje iz baze podataka!");
                    return allTrips;
                }
                Debug.WriteLine($"Nema vožnji u bazi podataka!");
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                return null;
            }
        }
        #endregion

        #region Get passangers trips
        public async Task<List<Trip>> GetPassengersTripsAsync(string userName)
        {
            await Task.Yield();

            try
            {
                var dbContext = CreateMyDbContextTrips.CreateDbContext();
                var allTrips = dbContext.Trips.ToList();
                List<Trip> returnList = new List<Trip>();
                if (allTrips.Count != 0)
                {
                    foreach (var trip in allTrips)
                    {
                        if (trip.Passenger.Equals(userName))
                        {
                            returnList.Add(trip);
                        }
                    }
                    Debug.WriteLine($"Uspešno su pročitane i poslate vožnje iz baze podataka!");
                    return returnList;
                }
                Debug.WriteLine($"Nema vožnji u bazi podataka!");
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                return null;
            }
        }
        #endregion

        #region Accepted trip
        public async Task<Trip> DriverAcceptedTheTripAsync(int id, string state, string driver)
        {
            await Task.Yield();

            if (id > 0 && state != null && driver != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextTrips.CreateDbContext();
                    var existingTrip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == id);
                    if (existingTrip != null)
                    {
                        existingTrip.Driver = driver;
                        existingTrip.State = state;
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return existingTrip;
                    }
                    else
                    {
                        Debug.WriteLine($"Došlo je do greške tokom čitanja korisnika iz baze!");
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                    return null;
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške, id, status ili vozač nemaju vrednost!");
                return null;
            }
        }
        #endregion

        #region The trip is finished
        public async Task<string> TheTripIsFinishedAsync(int id, string state)
        {
            await Task.Yield();

            if (id > 0 && state != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextTrips.CreateDbContext();
                    var existingTrip = await dbContext.Trips.FirstOrDefaultAsync(t => t.Id == id);
                    if (existingTrip != null)
                    {
                        existingTrip.State = state;
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    else
                    {
                        Debug.WriteLine($"Došlo je do greške tokom čitanja korisnika iz baze!");
                        return "0";
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                    return "0";
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške id ili status nemaju vrednost!");
                return "0";
            }
        }
        #endregion

        // Rating service
        #region Get all ratings
        public async Task<List<Rating>> GetAllRatingsAsync()
        {
            await Task.Yield();

            try
            {
                var dbContext = CreateMyDbContextRatings.CreateDbContext();
                var allRatings = dbContext.RatingsOfDrivers.ToList();
                if (allRatings.Count != 0)
                {
                    Debug.WriteLine($"Uspešno su pročitane i poslate ocene iz baze podataka!");
                    return allRatings;
                }
                Debug.WriteLine($"Nema ocena u bazi podataka!");
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom registracije: {ex.Message}");
                return null;
            }
        }
        #endregion

        #region Add new rating for driver
        public async Task<string> NewRatingForDriverAsync(string driver, int rating)
        {
            await Task.Yield();

            if (rating > 0 && driver != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextRatings.CreateDbContext();
                    var existingRating = await dbContext.RatingsOfDrivers.FirstOrDefaultAsync(t => t.Driver == driver);
                    if (existingRating == null)
                    {
                        Rating newRating = new Rating
                        {
                            Driver = driver,
                            NumberOfRatings = 1,
                            AverageRating = rating,
                            IsTheDriverBlocked = "Ne"
                        };
                        dbContext.RatingsOfDrivers.Add(newRating);
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    else
                    {
                        int ratingCounter = existingRating.NumberOfRatings;
                        ratingCounter += 1;
                        existingRating.NumberOfRatings = ratingCounter;
                        existingRating.AverageRating = (existingRating.AverageRating * (ratingCounter - 1) + rating) / ratingCounter;
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                    return "0";
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške vozač ili ocena nemaju vrednost!");
                return "0";
            }
        }
        #endregion

        #region Admin has blocked the driver
        public async Task<string> BlockDriverAsync(string driver)
        {
            await Task.Yield();

            if (driver != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextRatings.CreateDbContext();
                    var existingRating = await dbContext.RatingsOfDrivers.FirstOrDefaultAsync(t => t.Driver == driver);
                    if (existingRating != null)
                    {
                        existingRating.IsTheDriverBlocked = "Da";
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    else
                    {
                        Debug.WriteLine($"Vozač ne postoji u bazi podataka!");
                        return "0";
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                    return "0";
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške vozač nema vrednost!");
                return "0";
            }
        }
        #endregion

        #region Admin has unblocked the driver
        public async Task<string> UnblockDriverAsync(string driver)
        {
            await Task.Yield();

            if (driver != null)
            {
                try
                {
                    var dbContext = CreateMyDbContextRatings.CreateDbContext();
                    var existingRating = await dbContext.RatingsOfDrivers.FirstOrDefaultAsync(t => t.Driver == driver);
                    if (existingRating != null)
                    {
                        existingRating.IsTheDriverBlocked = "Ne";
                        await dbContext.SaveChangesAsync();
                        Debug.WriteLine($"Podaci su uspešno ažurirani u bazi podataka!");
                        return "1";
                    }
                    else
                    {
                        Debug.WriteLine($"Vozač ne postoji u bazi podataka!");
                        return "0";
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Došlo je do greške tokom migracije: {ex.Message}");
                    return "0";
                }
            }
            else
            {
                Debug.WriteLine($"Došlo je do greške vozač nema vrednost!");
                return "0";
            }
        }
        #endregion
    }
}
# Web_Programming_2_FTN

## The brief explanation of the taxi app's functionality
This is an application that simulates a taxi service.<br/>
The app has three types of users: admin, user, and driver.<br/>
During registration, users can choose their role in the system (user or driver).<br/>
After registration and login, users see three options: profile, new trip and previous trips.<br/>
After registration and login, drivers also see three options: profile, new trips and my trips.<br/>
Admin is predefined and cannot be chosen during registration, but they also see three options:<br/>
profile, verification and all trips in the system.<br/>
A user can create a new trip by entering the start and end points, and based on this information,<br/>
they receive the price and time required for the journey. If they agree, a new trip is created.<br/>
This new trip is visible to drivers on the new trips page, and a driver can accept one of the existing trips.<br/>
After the driver accepts the trip, a real-time countdown starts for both the driver and the user.<br/>
The user can rate the driver at the end of the countdown.<br/>
Users have access to their previous trips, as well as drivers.<br/>
Admin verifies drivers who can only accept trips after verification.<br/>
The admin has access to reviews and can block drivers.<br/>
Admin also have access to all trips in the system and their status.

## Pages short description
**Login page** - the page where the user can sign in with their email and password.<br/>
**Registration page** - the page where the user can register into the application.<br/>
**Dashboard page** - displays available options to the user depending on their user type.<br/>
**User profile page** - displays the user's data and provides an option to modify it.<br/>
**New trip page** - users can create a new trip on this page.<br/>
**New trips page** - drivers can accept a trip from the available ones.<br/>
**Previous trips page** - available for users, it serves to review all of their previous trips.<br/>
**My trips page** - available for drivers where they can view their previous trips.<br/>
**All trips page** - available for administrators, it serves to review all trips in the application.<br/>
**Verification page** - available for administrators to authenticate driver profiles.<br/>
**Ratings page** - available for administrators to review ratings and block drivers.

## Illustration of the pages through images
* **Registration page**:
![Registracija](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/c98069f7-a5e4-4644-887f-9e76a4aebb9f)
* **Login page**:
![Prijava](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/482d421d-f97a-49dc-be5f-cdc5b0d790c1)
* **Dashboard page user**:
![Dashboard-User](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/04f10db0-7f04-4cfb-9440-309f267e682f)
* **Dashboard page driver**:
![Dashboard-Driver](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/6e026d5c-9bae-42a5-a044-e54f8497c035)
* **Dashboard page admin**:
![Dashborad-Admin](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/ab4cb157-0703-4b2e-ab33-6aacc041cdfc)
* **User profile page**:
![Profil](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/57690d8b-afed-4d69-a296-5d796cdc0238)
* **New trip page**:
![Nova voznja](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/50989aa9-1c18-49d8-bae8-04c82b452086)
* **New trips page**:
![Nove voznje](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/2bdf6d54-dd90-4bf8-8597-1af5b4cbaefb)
* **Previous trips page**:
![Prethodne voznje](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/72a78a7f-62c0-41a5-8616-cd60fb767212)
* **My trips page**:
![Moje voznje](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/d4e97020-4cf8-4f18-aa14-bd06a7bc0a1d)
* **All trips page**:
![Sve voznje](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/0bad47c5-5af2-4759-8363-b48e96dd5da8)
* **Verification page**:
![Verifikacija](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/cc6df54c-dbfc-42c6-963d-598b028acafb)
* **Ratings page**:
![Ocene](https://github.com/TojzanKristian/Web_Programming_2_FTN/assets/116062572/aa99378c-3f69-4454-a80c-464130968abb)

## Used technologies
1. _React with TypeScript_ - The client part of the application
2. _Azure Service Fabric_ - The server part providing microservices for the application
3. _Microsoft SQL Server 2019_ - The part of the application responsible for the database
4. _SQL Server Management Studio (SSMS)_ - Used for displaying and modifying data in database

## Installation
**The following steps are necessary for the project in the _taxi-app-front_ folder:**
* Begin by downloading and installing _Node.js_ from the following link: https://nodejs.org/en/download/
* If you need assistance,
    * watch the video - https://www.youtube.com/watch?v=eft-LJb4kW0
* To create _React with TypeScript_, you should use the following code snippet:
```
npx create-react-app my-app --template typescript
```
* If you need assistance,
    * watch the video - https://www.youtube.com/watch?v=MWpmPP4z8HE

**The following steps are necessary for the project in the _taxi-app-service_ folder:**
* Begin by downloading and installing _Azure Service Fabric_ from the following link: https://rb.gy/4pqmhl
* If you need assistance,
    * watch the video - https://rb.gy/zp8lf5
* In Visual Studio 2019/2022, it's essential to add the _Azure Development_ extension.
* You need to start the Visual Studio environment as an **administrator**.
* The version of the _dotnet-sdk_ used in the project is: **dotnet-sdk-3.0.103**
* The version of _Microsoft.ServiceFabric.Services_ used in the project is: **4.0.457**

**The following steps are necessary for the database setup:**
* Begin by downloading and installing _Microsoft SQL Server 2019_ from the following link: https://shorturl.at/uGxkH
* The next step is to download and install _(SSMS)_ from the following link: https://shorturl.at/OZUU8
* If you need assistance,
    * watch the video - https://www.youtube.com/watch?v=5aPm1jmBN4Q
* You need to modify the connection strings in the following location for the application to work:
    * taxi-app-service\UserService\PackageRoot\Config\Settings.xml
* And you need to create your own databases in _SSMS_
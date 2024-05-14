# Web_Programming_2_FTN

## The brief explanation of the taxi app's functionality

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
**Verification page** - available for administrators to authenticate driver profiles.

## Illustration of the pages through images

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
* In Visual Studio 2022, it's essential to add the _Azure Development_ extension.
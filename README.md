# Due-Billspayment-Server-Node.js
Due list using MongoDB as the database. Database is fetch using Node.js

# Introduction
Adulting is real. The more you get older, the more payments you have. 
This is true to my case where I and my husband have a lot of bills payments such as health and life insurance, condominium investment, 
house rent, telco bills, remittance to the family in the Philippines, among others.
As a result, the due date of bills payments is often forgotten.

# Planning
## Statement of the problem
We need to check our bank app again and scroll through our emails for history to check whether we already paid or not, and this is very time-consuming. This caused us a lot of headaches. We could have used the Note app but it cannot trace any relationship of the bills such as history on a monthly basis.

## Solution Strategy
As a solution, I developed this app called Due List. This is somewhat similar to bank application but fewer features. Once the payment or remittance is done, we should input it in the Due List app right away.

## Project Schedule
Since I have a full-time job, I can allot only at least 2 hours per day on developing this project. It took me almost two months to complete it.

# Requirement Analysis
## Functional Requirement
1. The system should be able to store data of the user, due list and transactions.
2. The user should be able to register and log-in.
3. The user can update the password in case he or she forgets it.
4. The user should be able to add, update and delete the due list.
5. The user should be able to add transaction under the bills name.
6. The user should be able to view past transactions and select the range of months.
7. The user should be able to add to the Google Calendar of each bills name registered.

## Non-Functional Requirement
1. Platform: The application should work in both desktop and mobile devices.
2. Database: The data should be stored in the cloud so it would be real-time update.
3. Performance: The system should be able to handle multiple concurrent users to use the system without breakdown.

## Data Flow Diagram
The following image shows the basic data flow of the application
![dfd](https://user-images.githubusercontent.com/45925710/225839683-654dd0a5-fd82-4722-ab5b-48638f8db1ef.JPG)

## Software Design
1. Data Design
   - The Relational Model is created using Draw.io a open source software.
![er](https://user-images.githubusercontent.com/45925710/225839940-8ee91c22-9fc8-4a9f-999c-0feba9f7f58f.JPG)

Description of the Model
A user can have one or more due lists.
A due list can have one or more transactions.
A transaction can only be owned by one due list.

### Description of the Tables
#### User  
_id : unique number, objectid which is auto-generated  
username : string  
password : string  
name : string  
email : string  
#### DueList
_id : unique number, objectid which is auto-generated  
user_id : string (Foreign key from user _id attribute)  
bills_name : string  
frequency: string ({0:Monthly,1:Quarterly,2:Sem-annually,3: Annually})  
benefeciary_name : string  
scheduled_day : Number (1-31)  
amount : Number  
Currency : String (SGD or PHP)  
txn : Array (child of due list table)  
txn  
_id : unique number, objectid which is auto-generated  
date_paid : Date (Default: Date.now)  
amount:Number  
Currency : String (SGD or PHP)  
paid_by : String  
mode_payment : String  

## Architectural Design  
The following diagrams are created using MS Excel software  

![architectural_1](https://user-images.githubusercontent.com/45925710/225840757-57739f83-10c1-4323-b0c6-864be19329d6.JPG)

Install via NPM    
    `npm install bcrypt`  
A detailed explanation on how to use this API is in this <https://www.npmjs.com/package/bcrypt>.
    
 ![encryptpwd](https://user-images.githubusercontent.com/45925710/225844405-98053d70-9c5f-4d81-a858-b25f226f49e3.JPG)
 
 A detailed explanation on how to use this API is in this website <https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback>.  

In the javascript file, the following code is added.  

   `require("crypto")`  

In order for the token to be sent automatically to the registered e-mail address, we required an SMTP API.
I chose Elatic Email API since it is free and easy to use. The documentation also is well-written. Please check the Elastic website for details.  

   `var client = elasticemail.createClient({`  
   `username: "aaaa",`  
   `apiKey:`  
   `process.env.SMTP_API_KEY,`  
   `});`  

![gcalendar](https://user-images.githubusercontent.com/45925710/225845331-bb18b76b-4a49-4907-b4ee-5d799b1ade4b.JPG)

In order for the application to access the Google Services, an Google Authentication is required.  

## Interface Design

![interface_login](https://user-images.githubusercontent.com/45925710/225845720-5208010c-8edd-4041-8989-50ec7563d101.JPG)
![interface_registration](https://user-images.githubusercontent.com/45925710/225845815-9e23bc2c-4c75-4e4c-b8b2-5bc17601cb25.JPG)
![interface_resetpwd](https://user-images.githubusercontent.com/45925710/225845804-3d075a51-0dd6-4599-ad7b-41c19c4f81d4.JPG)
![interface_settings](https://user-images.githubusercontent.com/45925710/225845811-d6a77102-52b6-4e8c-b4f2-009fe7f3a13f.JPG)
![interface_viewtxnhistory_1](https://user-images.githubusercontent.com/45925710/225845970-72df1514-9f4d-426b-aae1-6fe726d7c6d1.JPG)
![interface_viewtxnhistory_2](https://user-images.githubusercontent.com/45925710/225845981-f43bd139-951e-457a-9c3b-84fd90b27f85.JPG)
![interface_addbill](https://user-images.githubusercontent.com/45925710/225845986-1619bf72-9206-4aa2-b3d4-bb7423786975.JPG)
![interface_addtxn](https://user-images.githubusercontent.com/45925710/225845989-082c66bc-956b-484e-90e4-22e5a471ab07.JPG)
![interface_codeverification](https://user-images.githubusercontent.com/45925710/225845991-550e0c04-fb7a-45df-8b9c-c39f5d9451f5.JPG)
![interface_editbill](https://user-images.githubusercontent.com/45925710/225845994-8690dc8d-0fe1-4d50-994a-1fde8de4f7ae.JPG)
![interface_home](https://user-images.githubusercontent.com/45925710/225845996-5ee485de-bb71-48e3-85af-bc57695df91e.JPG)
![interface_viewbill](https://user-images.githubusercontent.com/45925710/225846001-18b55c5b-c87d-42f4-b8b2-e5415d1480fe.JPG)

## Software Implementation
1. Programming Language  
The project is using Javascript as the main programming language.  

For the server-side, NodeJS is used for the programming language.  

2. Framework  
Just a little background on why I chose VueJS over Angular or React. In May 2020, I tried to study AngularJS to build a mobile application but it seems it was too steep for me. So I googled which one best for the beginner programmer. I read some topics regarding the difference between VueJS, ReactJs, and AngularJS. Some say that for a beginner like me, VueJS is a better start to learn. Without hesitation, I tried it by getting my hands dirty, and true enough I was in love with Vue. After that, I was thinking to develop my app which could be beneficial to me (first).  

This application is using Ionic Framework on top of VueJS.

3. APIS  
The following are the API's used in the project:  

Mongoose  
Bycrypt  
crypto  
Google Api  
Elastic Email (SMTP) Api  
Database Type  
I decided to use MongoDB (NoSQL) as the database. The sandbox type is free.  

4. Code  
For the complete code, please refer to the following github link.  

Client-Side: <https://github.com/azidmiracle/Due-Billspayment-Client-Vue-Axios>  
Server-Side: <https://github.com/azidmiracle/Due-Billspayment-Server-Node.js>  

## Software Deployment
1. Mobile and Desktop Platform  
The server-side and client-side is deployed in the Heroku. The following code shows how to deploy to Heroku.  

   `heroku create bills-payment-lists`  
   `heroku git:remote --app bills-payment-lists`  
   `git commit -am "remove dist fromgit ignore"`  
   `git push heroku master`    

2. Android Platform  
In order for the ionic/vue to be able to deploy to the android platform, we should use Capacitor. It allows to run the application across desktop, mobile and android platforms.  

The following code is done in order to add android platform.

   `npm run build`
   `npx cap copy`
   `npx cap add android`
   `npx cap open android`

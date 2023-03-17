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



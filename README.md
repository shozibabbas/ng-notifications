# Notifications

This project can handle realtime notifications on any user frontend.

## Getting Started

### Prerequisites

Following are required before you can run this app:
* Node (version 10.15.1)
* npm (version 6.4.1)
* TypeScript (version 3.2.4)

## Installing the app

You have to install dependencies of both backend and frontend. To do this,
1. Open CMD at _backend_ directory. Type: _npm install_
2. Do the same in _frontend directory.

Then follow ahead to start server.

## Starting the app

_Please Ensure MongoDB service is installed properly and running with database and collections created. before starting the app. (For more information, check Database Structure)_

There are two ways in which this application can be started:

**1. Using frontend distributables (Angular) and integrating with backend (Express) to start the server**

Open CMD at _frontend_ directory. build angular project by using the following:
```
ng build
```
then run the following command to start frontend (Angular) with backend (Express)
```
node ./bin/www
```
This will start Angular with Express and you can view the application on port 3000 or _localhost:3000_

**2. Using backend (Express) server as a proxy in Angular app to start the server**

Open CMD at _backend_ directory. Start Express server by typing:
```
node app.js
```
Open another CMD at _frontend_ directory. Start Angular server by typing:
```
npm start
```

### How do both work?
* **Solution 1** starts an express HTTP server and adds static route for accessing Angular app while express's own routes are added as well. The solution starts on _localhost:3000_
* **Solution 2** adds backend _(localhost:3000)_ as a proxy server on _'/api'_ in Angular app. Hence, api is accessible through _localhost:4200/api_ while the app works on _localhost:4200_

## App Working

### Components

This app has following components:
1. Alert
2. Dashboard
3. Login
4. Notification
5. NotificationDetail
6. NotificationGenerator
7. Register

Every component consists of ```AlertComponent```. Components mentioned below will contain this component as well.

#### 1. AlertComponent
It creates the alerts that are shown for a better UI. Messages related to component functioning are shown here.

These messages include:
* Validation Errors
* authentication issues
* http errors
* and many more...

```AlertComponent``` operates using ```AlertService```

#### 2. DashboardComponent
This creates the dashboard view. All notifications are shown here. It also shows any new notifications as well.

This view includes:
* Navigation to create new notifications and log out
* options to edit and delete notifications
* view new notifications

The ```DashboardComponent``` consists of ```NotificationComponent```

It uses ```NotificationService``` to show notifications.

#### 3. LoginComponent
This allows user to sign in. It has fields for username and password. Validations are in place for input fields.

#### 4. NotificationComponent

This component handles notification display and links to edit and delete.

It uses ```NotificationService```

#### 5. NotificationDetailComponent

This component shows controls for editing a notification. It allows user to enter new details of a previous notification. Validation checks are in place to ensure proper data entry.

This component uses ```NotificationService``` to update data.

#### 6. NotificationGeneratorComponent

This component creates controls for creating new notification. It allows user to enter details and save notification. Notifications get updated in realtime.

### Services

This app has following services:
1. Alert
2. AuthGuard
3. Notification
4. User

#### 1. AlertService

This service allows alerts to be generated for the user. It has a general list of alerts and methods to add to the list and delete from the list.

#### 2. AuthGuardService

This service is a middleware which checks for authentication every time a user visits an authenticated page.

It implements ```CanActivate``` and it has a method ```CanActivate``` which checks for authentication. It is added on each route through the router.

#### 3. NotificationService

This service controls all the logic and work related to notifications. It has CRUD operations for notifications.

#### 4. UserService

This service has methods for user authentication, login and register.

### Routing

#### Frontend

Routing in frontend exists in file ```frontend/src/app/app-routing.module.ts```

Following is the routing scheme in frontend:
* ```/``` (root) redirects to dashboard
* ```/login``` attaches to ```LoginComponent```
* ```/register``` attaches to ```RegisterComponent```

Following routes use ```CanActivate``` middleware in ```AuthGuardService``` to ensure authentication:
* ```/dashboard``` attaches to ```DashboardComponent```. 
* ```/notification/new``` attaches to ```NotificationGeneratorComponent```
* ```/notification/:id``` attaches to NotificationDetailComponent. It takes in the __id_ of notification to display its content for editing.

#### Backend

Routing in backend exists in file ```backend/api.js```. All routes exist on the path ```/api```.

Following is the routing scheme:
* ```/user/:userId``` returns ```User``` object having the provided ID
* ```/login``` returns ```User``` object which has the same username and password
* ```/register``` returns confirmation of registration
* ```/notification/:userId``` returns all notifications of the user with most recent on the top
* ```/notification/:userId/:notificationId``` returns ```UserNotification``` object which match the provided UserID and NotificationId
* ```/notification (POST method)``` creates new Notification entry in the collection.
* ```/notification (PUT Method)``` updates received notification object on the basis of __id_
* ```/notification/:notificationId (DELETE method)``` deletes notification on the basis of __id_

### Models

This app has following models:
1. Alert
2. Category
3. User
4. UserNotification

#### 1. Alert
This is used by ```AlertService```

```
{
  type: string;
  message: string;
}
```

#### 2. Category
This is an ENUM used by ```NotificationService```

```
{
  INFO,
  WARNING,
  ERROR
}
```

#### 2. User
This is used by ```UserService```

```
{
  public _id: string;
  public FullName: string;
  public Username: string;
  public Password: string;
}
```

#### 4. UserNotification
This is used by ```NotificationService```

```
{
  public _id: string;
  public Header: string;
  public Body: string;
  public Category: Category;
  public IsClosed: boolean;
  public UserId: string;
  public Date: number;

}
```

### How does Login Work?

1. A user enters ```Username``` and ```password``` and submits.
2. Data is verified and matched to a record. If the record exists, a ```User``` object is returned.
3. For testing only, this object is stored in a cookie with 1 day expiry and also stored in a variable in ```UserService```.
4. The object is returned from cookie every time the route changes.

### How does Logout Work?

1. User clicks on logout button
2. Cookie is deleted from the browser.
3. ```User``` object is set to null in ```UserService```

### How does Register Work?

1. A user enters registration information and submits. MD5 is generated for the password and sent to database.
2. A new record is created and mongodb task completion json is sent to frontend.
3. The user is given a success alert and redirected to login route for logging in.

### How does Notification Work?

1. User enters notification information and submits.
2. Notification is sent to server.
3. Collection saves the notification and returns the whole object back now with the __id_ as well.
4. This obtained object is pushed to notifications list. Design is selected according to the notification type:
    - **RED** if error
    - **YELLOW** if warning
    - **BLUE** if info alert
5. If the notification is INFO type, it is closed in 90 seconds automatically.

## User Interface

### Pages

This app contains the following pages:
1. Login
2. Register
3. Notification Dashboard
4. New Notification Generator
5. Edit Notification

### 1. Login

Allows user to login to the system. The user must be registered first.

### 2. Register

Allows user to register to the system. Currently, the system only takes in ```full name```, ```username``` and ```password```

### 3. Notification Dashboard

Shows all notifications with edit and delete options.

### 4. New Notification Header

Allows user to create realtime notification. 

### 5. Edit Notification

Allows user to edit any previously saved notification.

## Database Structure

The database under use is **MongoDB**. MongoDB runs as a service on port 27017. It is attached to backend (Express).

The database connection is initialized when the backend (Express) server is started.

The name of database under use is ```NotificationsTest```. It has two collections:
1. UserProfiles
2. Notifications

### 1. UserProfiles
This collection contains information related to users. The data stored in this collection is:
```
{
    _id         :   ObjectId
    FullName    :   string
    Username    :   string
    Password    :   string
}
```

* __id_ is auto-generated by MongoDB when a record is inserted.
* _FullName_ contains full name of the user
* _Username_ contains unique username of user
* _Password_ contains password of more than 6 characters

### 2. Notifications
This collection stores all notifications of a user with respect to their user ID. Following is its data:
```
    _id         :   ObjectId
    Header      :   string
    Body        :   string
    Category    :   string
    IsClosed    :   boolean
    UserId      :   _id of UserProfiles
    Date        :   date (in Unix Timestamp)

```

* __id_ is the id auto-generated by MongoDB
* _Header_ is the title of notification
* _Body_ is the body of notification
* _Category_ is the category of notification
* _IsClosed_ is a condition which checks if the user has hidden the notification by clicking the [x] close icon
* _UserId_ is the ID of currently logged in user
* _Date_ is the current DateTime in Unix Timestamp (seconds till the beginning of time 01 Jan 1970)

## Documentation

Documentation is available under ```/frontend/documentation``` directory.

This documentation is generated by ```CompoDocs```

## Test

Tests for services are written. Open CMD and head over to _frontend_ directory. Then type this command:

```
ng test
```

The tests are conducted through _Karma_. A separate testing web server is opened which will guide your through all the available tests and inform you of the status.

Karma testing server will be opened at port 9876

## Built With

* [Express.js](https://en.wikipedia.org/wiki/Express.js) - Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js
* [Angular 7](https://en.wikipedia.org/wiki/Angular_(web_framework)) - Angular (commonly referred to as "Angular 2+" or "Angular v2 and above") is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.
* [MongoDB](https://en.wikipedia.org/wiki/MongoDB) - MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata. MongoDB is developed by MongoDB Inc.
* [Nodemon](https://www.npmjs.com/package/nodemon) - Allows automatic recompiling of files whenever changes are made
* [CompoDoc](https://compodoc.app/) - Generates HTML documentation of the app using JsDocs present within the code

### Packages

#### Frontend

* Angular (version 7.3.4)
* Angular CLI (version 7.3.4)
* ReactiveX (version 6.3.3)
* ngx Cookie Service (version 2.1.0)
* Bootstrap (version 4.3.1)
* ng Bootstrap (version 4.1.0)
* ngx Bootstrap (version 3.2.0)

#### Backend
* ExpressJS (vresion 4.16.4)
* MongoDB (version 3.2.2)
* Nodemon (version 1.18.10)

## Authors

* **Sayyed Shozib Abbas** (https://github.com/shozibabbas)

## License

This project is open license. It was written for educational purposes.

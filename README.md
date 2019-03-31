# Notifications

This project can handle realtime notifications on any user frontend.

## Getting Started

### Prerequisites

Following are required before you can run this app:
* Node (version 10.15.1)
* npm (version 6.4.1)
* TypeScript (version 3.2.4)

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

## Installing the app

You have to install dependencies of both backend and frontend. To do this,
1. Open CMD at _backend_ directory. Type: _npm install_
2. Do the same in _frontend directory.

Then follow ahead to start server.

## Starting the app

_Please Ensure MongoDB service is running before starting the app_

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

#### 1. AlertComponent
It creates the alerts that are shown for a better UI. Messages related to component functioning are shown here.

These messages include:
* Validation Errors
* authentication issues
* http errors
* and many more...

#### 2. DashboardComponent
This creates the dashboard view. All notifications are shown here. I

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


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Authors

* **Sayyed Shozib Abbas** (https://github.com/shozibabbas)

## License

This project is open license. It was written for educational purposes.

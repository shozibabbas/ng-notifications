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

## Page Details

This app contains the following pages:
1. Login
2. Register
3. Notification Dashboard
4. New Notification Generator
5. Edit Notification

### Login

![picture alt](https://i.imgur.com/K1wlXHb.png "Login Screen")


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Authors

* **Sayyed Shozib Abbas** (https://github.com/shozibabbas)

## License

This project is open license. It was written for educational purposes.

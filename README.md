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

### Installing

You have to install dependencies of both backend and frontend. To do this,
1. Open CMD at _backend_ directory. Type: _npm install_
2. Do the same in _frontend directory.

Then follow ahead to start server.

### Starting

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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
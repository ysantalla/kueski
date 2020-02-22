## App Kueski sample

### Tecnologies

* Material Desing
* Angular 9 (with Expressjs-nodejs to server side rendering)
* Nestjs (with Expressjs-nodejs)
* MariaDB + MongoDB

### Server installation

$ npm i -g @nestjs/cli
$ cd server && npm install

### Running Server

$ npm start

Once the server application is running you can visit [http://localhost:3000/api](http://localhost:3000/api) to see the Swagger interface.

### Running Server production mode

$ npm run build && npm run start:prod


### Client installation

$ npm i -g @angular/cli
$ cd client & npm install

### Running Client developer mode

$ npm run ng serve

### Running Client production mode

$ npm run build:ssr && npm run serve:ssr

### Deploy with Docker-compose

$ cd deploy && docker-compose up

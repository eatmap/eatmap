# EatMap
CS 3300 - Team 4
## Dev Setup
There are two main frameworks in our application:
- React: This is used for our frontend

  All the the code for frontend lives under `/frontend` directory.

- Spring Boot: This is used fo our backend

### Frontend
The working directory for all of the frontend code is `./frontend`.
```console
cd ./frontend
```

To install of the required dependencies:
``` console
npm install
```

To run the frontend in development mode:
```console
npm run start
```

By default, the application will be available on `https://localhost:3000`.

### Backend

To install all of the required dependencies:
```console
mvn install
```

To run the application:
```console
mvn spring-boot:run
```
By default, the application will be available on `https://localhost:8080`. This will only contain backend endpoints.

**NOTE:** Depending on the platform, if `mvn` fails, use `mvnw`


## Packaging the application
Run the following command to install all the required dependencies and package frontend components with Spring Boot
```console
mvnw clean install
```
Note, this step also install `node` and `npm` for you. It will create a build for our React application and move it to the build path for Spring Boot application. A jar file will be created which contains both frontend and backend components.

To run the packaged application, run:
```console
java -jar ./target/eatmap-0.0.1.jar
```

This will run our complete web application on `https://localhost:8080`.
# EatMap

CS 3300 - Team 4

## Dev Setup

There are two main frameworks in our application:

- Spring Boot: This is used fo our backend
- React: This is used for our frontend.

## Frontend

**Note:** The working directory for all of the frontend code is `./frontend`.
```console
$ cd ./frontend
```
### Pre-requisites

The following tools, software, and technologies are needed to run the frontend application:

<ol>

<li> <b>Install Node.js</b>

Node.js is a JavaScript runtime that allows us to run JavaScript code outside of browser. <br />
For this project, please download 14.x LTS version from [here](https://nodejs.org/en/) and perform the installation.<br />
To verify the installation, run the following command:

```console
$ node -v
  v14.16.1
```

If successful, it should display the version number (eg: `v14.16.1` shown above). If there are errors performing installation, some helpful guides are listed below:

- [Installing Node.js on Windows 10](https://stackoverflow.com/questions/27344045/installing-node-js-and-npm-on-windows-10)
- [Installing Node.js on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

</li>

 <li> <b>Install npm (Node Package manager)</b>

We are using `npm` to install and manage "packages" (dependencies). <br />
Node.js installs NPM by default. To verify if NPM is already installed, run the following command:

```console
$ npm -v
7.22.0
```

If successful, it should display the version (example above).

Make sure you are running npm version 7.x. To update npm, run the following command:

```console
$ npm install -g npm@latest
```

However, if `npm` is missing, download npm from [here](https://www.npmjs.com/get-npm) (this includes all the installation guide).

 </li>
 </ol>

### Installing Dependent Libraries
To install of the required dependencies:

```console
$ npm install
```

### Running frontend application
To run the frontend in development mode:

```console
$ npm run start
```

By default, the application will be available on `https://localhost:3000`.

## Backend

### Pre-requisites

The following tools, software, and technologies are needed to run the frontend application:

<ol>

<li> <b>Install JDK</b>

JDK (Java Development Kit) is a development environment for building application and components using Java. <br />
For this project, please download OpenJDK 11  LTS version from [here](https://adoptopenjdk.net/index.html?variant=openjdk11&jvmVariant=openj9) and perform the installation.
  - Choose OpenJDK 11 (LTS) as the version
  - Choose OpenJ9 as the JVM.
  - Click the Latest release download button to download the package.

<br />
To verify the installation, run the following command:

```console
$ java -version
  openjdk version "11.0.12" 2021-07-20
  IBM Semeru Runtime Open Edition 11.0.12.0 (build 11.0.12+7)
  Eclipse OpenJ9 VM 11.0.12.0 (build openj9-0.27.0, JRE 11 Windows 10 amd64-64-Bit Compressed References 20210730_175 (JIT enabled, AOT enabled)
  OpenJ9   - 1851b0074
  OMR      - 9db1c870d
  JCL      - 21849e2ca0 based on jdk-11.0.12+7)
```

If successful, it should display the version number (eg: `11.0.12` shown above) and other metadata.

</li>

<li> <b>Install Maven</b>

Maven is a command-line tool for building and managing any Java-based project. Please see the installation instructions [here](https://www.baeldung.com/install-maven-on-windows-linux-mac) for different platforms.

**Note** This repo contains `mvnw` which is a Maven wrapper and this allows us to run Maven project without installing Maven. 

</li>

<li> <b>Google Cloud Datastore</b>

This project uses Google Cloud Datastore to save user credentials and use it for authentication purposes.

If the application is being deployed to App Engine, simply enable the Google Cloud Datastore for the same project.

If the application is being run locally, we can run an emulator locally.
- Verify you have `gcloud` tool installed. If missing, you can download it from [here](https://cloud.google.com/sdk/docs/install)
  ```console
  $ gcloud -v

    Google Cloud SDK 354.0.0
    beta 2021.08.20
    bq 2.0.71
    cloud-datastore-emulator 2.1.0
    core 2021.08.20
    gsutil 4.67
  ```

- Install the emulator
  ``` console
  $ gcloud components install cloud-datastore-emulator
  ```

- Start the emulator
  ```console
  gcloud beta emulators datastore start
  ```
  This will display the port number the data store in running on.

- Generate the required environment variables
  ```
  $ gcloud beta emulators datastore env-init
  ```
  This will return all the variables that need to be set to access the emulator

- Set the required environment variables.
  ``` console
  $ export DATASTORE_DATASET=my-project-id
  $ export DATASTORE_EMULATOR_HOST=::1:8081
  $ export DATASTORE_EMULATOR_HOST_PATH=::1:8081/datastore
  $ export DATASTORE_HOST=http://::1:8081
  $ export DATASTORE_PROJECT_ID=my-project-id
  $ export DATASTORE_USE_PROJECT_ID_AS_APP_ID=true
  ```
  **Note**
  - the project id and port shown above is only an example. It might differ for your application
  - Use appropriate command to set the environment variable for your platform. The above is an example for Linux/macOS environments only.

For more instructions on setting up the emulator, see [here](https://cloud.google.com/datastore/docs/tools/datastore-emulator)

</li>

</ol>

### Installing Dependent Libraries
To install of the required dependencies:

```console
$ mvn install
```

### Running backend application
To run the backend:

```console
$ mvn spring-boot:run
```

By default, the application will be available on `https://localhost:8080`. This will only contain backend endpoints.

**NOTE:** Depending on the platform, if `mvn` fails, use `mvnw`

## Packaging the application

Run the following command to install all the required dependencies and package frontend components with Spring Boot.

```console
$ mvn clean install
```

Note, this step also install `node` and `npm` for you. It will create a build for our React application and move it to the build path for Spring Boot application. A jar file will be created which contains both frontend and backend components.

To run the packaged application, run:

```console
$ java -jar ./target/eatmap-0.0.1.jar
```

This will run our complete web application on `https://localhost:8080`.

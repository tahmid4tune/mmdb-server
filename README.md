### mmdb-server
This is the backend of mmdb application. The front-end part can be found under following repository:

[mmdb-client](https://github.com/tahmid4tune/mmdb-client)


### Pre-requisites to run the app
- Docker should be installed 
- NodeJS should be installed


### How to run
- After downloading code, navigate to the ```/db``` directory located inside of the root folder. 
- Execute following commands sequentially:
```
docker-compose build
docker-compose up -d
```
- Verify if a MySQL DB instance is running or not by following command:
```
docker ps
```
- Output should be something like below:
```
CONTAINER ID   IMAGE       COMMAND                  CREATED      STATUS       PORTS                                                  NAMES
9c6a1e101f14   mysql:5.7   "docker-entrypoint.s…"   9 days ago   Up 8 hours   33060/tcp, 0.0.0.0:3307->3306/tcp, :::3307->3306/tcp   db_test_1
```
- Now, navigate back to the root directory of the project. Hint: ```cd ..```
- Run following command to install dependencies mentioned in ```package.json``` file
```
yarn install
```
- Now copy ```.env.example``` file and paste all of it's content into a newly created one named: ```.env``` file
- Run the application by following command:
```
yarn dev
```
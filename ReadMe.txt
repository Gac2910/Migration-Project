Commands to set up the project.

'npm i' to install modules

Change values in config.json

'npx sequelize-cli db:migrate' to run the migrations and create the tables in the 'issues-manager' database
    - if database does not exist run 'npx sequelize db-create'

'npx sequelize-cli db:seed:all' to run the seeders
    - this adds some default data to the tables
    
'npm start' to start project on localhost:8888
psql -c 'create database api;' -U postgres
psql -c "CREATE USER justingnoh WITH PASSWORD 'justgnoh';" -U postgres -d api
psql -c "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);" -U postgres -d api
psql -c "INSERT INTO users VALUES (1, 'Alice', 'alice@gmail.com');" -U postgres -d api
psql -c "INSERT INTO users VALUES (2, 'Bob', 'bob@gmail.com');" -U postgres -d api
psql -c "INSERT INTO users VALUES (3, 'Charly', 'charly@gmail.com');" -U postgres -d api
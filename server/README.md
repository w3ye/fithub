## Database Setup

Create a database in vagrant

```
psql -U vagrant
```

```
CREATE ROLE xxx WITH login 'xxx';
CREATE DATABASE fithub OWNER xxx;
```

## Run

Use `npm start` to start to app, it currently does nothing.

Use `npm run db:reset` to reset the database. This will reset the database using the sql files in the ./db/schema and ./db/seeds

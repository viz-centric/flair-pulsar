# flair-pulsar
Service responsible for event driven insights in Flair


# Setup
## DB migrations
Run DB migrations using this command 
```bash
npm run migrations
```

# Development
## Database
### Run docker compose

```bash
docker-compose up
```

### Then run migrations
Check the #Setup section above

### Run npm
```bash
npm i
npm start
```

# Testing
Run docker compose first as shown above.
## Unit tests

```bash
npm run test
```

## End to end tests

```bash
npm run test:e2e
```

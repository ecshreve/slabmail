# slabmail

![demo](images/demo.gif)


> [!NOTE] 
> This depends on a Google Cloud project with the Gmail API enabled and the necessary credentials.

## Usage

### With `run`

This project uses [run](https://github.com/amonks/run) to manage the dev environment. The `tasks.toml` file contains tasks for running the dev environment.

```
run dev
```

### Without `run`

Run `zipkin` to enable tracing.
```bash
docker compose up -d zipkin
```

Run the server
```bash
cd server
npm install
npx ts-node src/server.ts
```

Run the client
```bash
cd client
npm install
npm start
```

Access the app at http://localhost:3001

## Project Structure

### `/server`

The backend is a simple Node.js server that uses the Gmail API to fetch emails.

#### Directory Structure

```bash
/server
├── /src
│   ├── /routes       # api routes
│   ├── /services     # api services
│   ├── auth.ts       # gmail api auth
│   ├── server.ts     # server entry point
│   ├── otel.ts       # opentelemetry setup
├── tasks.toml        # run tasks
```

### `/client`

This project is an offline-first email client built using React and TypeScript.

See [`client/README.md`](./client/README.md) for more information.

### `/docker-compose.yml`

A docker compose file for running supporting services (zipkin).

## Observability

### Backend

Uses [OpenTelemetry](https://opentelemetry.io/) for tracing. The `server/src/otel.ts` file contains the setup for the tracer. The data is sent to a [zipkin](https://zipkin.io/) instance running on `localhost:9411`.

![backend tracing](./images/zipkin.jpeg)

![full trace](./images/zipkin2.jpeg)

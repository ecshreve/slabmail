# slabmail

![demo](images/demo.gif)

## Features
- [x] Fetch emails from Gmail
- [x] Display emails in a list
- [x] Display labels in a sidebar
- [x] Display email content
- [x] Star/unstar emails
- [x] Backend tracing with zipkin
- [x] Frontend tracing with zipkin
- [ ] Search emails
- [ ] Filter emails



## Usage

> [!NOTE]
> This repository depends on a Google Cloud project with the Gmail API enabled and the necessary credentials.
>
> The instructions below also assume a running [`zipkin`](https://github.com/openzipkin/zipkin) instance listening on port `9411`.


### With `run`

This project uses [run](https://github.com/amonks/run) to manage the dev environment via tasks defined in the `tasks.toml` files. See the [notes](#installing-run) section for information on installing `run`.

Start the application in dev mode with:
```
run dev
```

### Without `run`

Run the server
```bash
cd server
npm install
npm start
```

Run the client
```bash
cd client
export PORT=3001
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
├── /config           # storage for gmail api credentials
├── /dist             # build output
├── /src
│   ├── /routes       # api routes
│   ├── /services     # api services
│   ├── auth.ts       # gmail api auth
│   ├── server.ts     # server entry point
│   ├── otel.ts       # opentelemetry setup
├── tasks.toml        # server specific run tasks
└── package.json
```

### `/client`

The frontend is a React app that displays a list of emails fetched from the server.

#### Directory Structure

```bash
/client
├── /public # static files
├── /src
│   ├── /components  # dumb presentational components
│   ├── /contexts    # contexts for state management
│   ├── /hooks       # custom hooks
│   ├── /pages       # pages/routes
│   ├── /services    # api clients
│   ├── /styles      # global styles
│   ├── /types       # typescript types
│   ├── /utils       # misc utilities
│   ├── otel.ts      # opentelemetry setup
│   └── App.tsx      # main app component
└── package.json
```

### `/docker-compose.yml`

A docker compose file for running supporting services (zipkin).

## Observability

### Backend

Uses [OpenTelemetry](https://opentelemetry.io/) for tracing. The `server/src/otel.ts` file contains the setup for the tracer. The data is sent to a [zipkin](https://zipkin.io/) instance running on `localhost:9411`.

![backend tracing](./images/zipkin.jpeg)

![full trace](./images/zipkin2.jpeg)

## Notes

### Installing `run`

To install `run` in the devcontainer after it has successfully built, follow these steps:

1. Create a temporary directory for the installation:
    ```bash
    mkdir tmpinstall
    cd tmpinstall
    ```

2. Download the appropriate release for your OS and architecture:
    ```bash
    wget https://github.com/amonks/run/releases/download/v1.0.0-beta.30/<RELEASE_FOR_YOUR_OS_AND_ARCH>.tar.gz
    ```

3. Extract the downloaded tarball:
    ```bash
    tar -xzf <RELEASE_FOR_YOUR_OS_AND_ARCH>.tar.gz
    ```

4. Move the `run` binary to a directory in your PATH:
    ```bash
    mv run ~/.local/bin/run
    ```

5. Clean up the temporary installation directory:
    ```bash
    cd ..
    rm -rf tmpinstall
    ```

6. Verify the installation:
    ```bash
    which run
    > ~/.local/bin/run
    ```

For more options and details, see the [run repository](https://github.com/amonks/run).
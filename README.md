# tatemprep

[!NOTE] This depends on a Google Cloud project with the Gmail API enabled and the necessary credentials.

## Usage

Run the server
```bash
npm install
npx ts-node server.ts
```

Run the client
```bash
cd gmail-client
npm install
npm start
```

Access the app at http://localhost:3001

## Backend

The backend is a simple Node.js server that uses the Gmail API to fetch emails.

## Frontend

The frontend is a simple React app that displays the emails fetched from the backend.

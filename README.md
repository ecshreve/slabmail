# tatemprep

![demo](config/images/demo.jpeg)

## Features
- [x] Fetch emails from Gmail
- [x] Display emails in a list
- [ ] Search emails
- [ ] Filter emails
- [ ] Archive/unarchive emails

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

## Project Structure

### `/server`

The backend is a simple Node.js server that uses the Gmail API to fetch emails.

### `/client`

The frontend is a React app that displays a list of emails fetched from the server.

### `/config`

Miscellaneous configuration files, such as the Gmail API credentials which are gitignored.
# Client

This project is an offline-first email client built using React and TypeScript. It leverages modern web technologies like IndexedDB, Service Workers, and Material UI to provide a seamless user experience, even when offline.

<hr />
<br />

![frontend](../images/frontend.png)


## Table of Contents

- [Features](#features)
- [Application Structure](#application-structure)
  - [Components](#components)
  - [State Management](#state-management)
- [Implementation Details](#implementation-details)
  - [Offline Support](#offline-support)
  - [IndexedDB Integration](#indexeddb-integration)
  - [Service Workers](#service-workers)
  - [Material UI Components](#material-ui-components)
- [Features Breakdown](#features-breakdown)
  - [Email List Pagination](#email-list-pagination)
  - [Email Detail View](#email-detail-view)
  - [Starring Emails](#starring-emails)
  - [Filtering Emails](#filtering-emails)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Offline-First Experience**: Access and interact with emails without an internet connection.
- **IndexedDB Storage**: Stores emails locally using IndexedDB for offline access.
- **Service Workers**: Utilizes service workers to cache assets and handle network requests.
- **Responsive UI**: Built with Material UI for a modern and responsive interface.
- **Email Actions**: Compose, reply, forward, delete, star, and filter emails.
- **Pagination**: Efficiently navigates through a large list of emails with pagination controls.

## Application Structure

```bash
/client
├── /public
├── /src
│   ├── /components  # presentational components
│   ├── /contexts    # contexts for state management
│   ├── /hooks       # custom hooks
│   ├── /pages       # pages/routes
│   ├── /services    # api clients
│   ├── /styles      # global styles
│   ├── /types       # typescript types
│   ├── /utils       # misc utilities
│   │   ├── db.ts    # indexeddb setup
│   │   ├── sync.ts  # sync with server
│   │   ├── otel.ts     # opentelemetry setup
│   │   └── helpers.ts  # misc helpers
│   ├── index.tsx       # entry point
│   └── App.tsx         # main app component
└── package.json
```

### Components

- **App**: The root component that sets up the main layout and routes.
- **EmailList**: Displays a list of emails with pagination and filtering options.
- **EmailListItem**: Displays a single email item in the list.
- **EmailDetail**: Shows the content of a selected email with actions like reply and forward.
- **CustomPagination**: A customized pagination component for navigating email pages.

### State Management

State is managed using React's Context API, providing a centralized store for email data and actions.

- **EmailContext**: Contains the state and functions related to emails, such as fetching, updating, deleting, and toggling starred status.
- **EmailProvider**: Wraps the application components and provides the context.

## Implementation Details

### Offline Support

The application is designed with an offline-first approach, ensuring core functionalities are available without network connectivity.

- **IndexedDB**: Used to store emails locally.
- **Service Workers**: Cache assets and handle offline requests.

### IndexedDB Integration

- **idb Library**: Utilized for simplified IndexedDB interactions.
- **Database Schema**: Emails are stored with properties like `id`, `sender`, `subject`, `body`, `timestamp`, and `starred`.


### Service Workers

- **Custom Service Worker**: Registers a service worker to cache assets and handle fetch events.
- **Registration**: Service worker is registered in `index.tsx`.

### Material UI Components

- **Consistent Design**: Utilizes Material UI for styling and responsive design.
- **Components Used**: `Box`, `Typography`, `Button`, `IconButton`, `Tooltip`, `Pagination`, etc.
- **Customization**: Themes and styles are customized as needed.

## Features Breakdown

See individual component files in `/client/src/components`.

### Email List Pagination

- **Pagination Controls**: Allows navigation through emails with a custom pagination component.
- **One-Line Pagination**: Pagination controls are limited to one line and arrows are centered around page numbers.
- **Sibling and Boundary Count**: Adjusted to control the number of page buttons displayed.

### Email Detail View

- **Display Email Content**: Shows the full content of a selected email.
- **Material UI Styling**: Uses `Paper` component with elevation to appear slightly raised.
- **Actions**: Includes buttons for reply, forward, and delete, each with tooltips.

### Starring Emails

- **Star/Unstar Functionality**: Users can star or unstar emails from the list or detail view.
- **State Updates**: Starred status is updated in IndexedDB and reflected in the UI.
- **Context Function**: `toggleStarred` function manages the starred state.

### Filtering Emails

- **Filter Control**: A switch allows users to filter the email list to show only starred emails.
- **Filtered List**: The email list updates based on the filter state.
- **Pagination Adjustment**: Pagination adapts to the number of filtered emails.

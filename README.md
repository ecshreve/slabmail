# smail

### Frontend

The frontend is a React application that uses Apollo Client to interact with the GraphQL backend. It's built with TypeScript and React.

### Overview
```mermaid
graph TD
    App[App Component]
    Home[Home Page]
    Filters[Filters Component]
    MessageList[MessageList Component]
    MessageItem[MessageItem Component]
    Apollo[Apollo Client]
    GraphQL[GraphQL Backend]
    Cache[Apollo Cache]
    Mutations[GraphQL Mutations]
    Queries[GraphQL Queries]

    App --> Home
    Home --> Filters
    Home --> MessageList
    MessageList --> MessageItem

    Home -->|Uses| Queries
    Home -->|Uses| Mutations
    Queries -->|Fetches data via| Apollo
    Mutations -->|Sends data via| Apollo
    Apollo --> GraphQL
    Apollo --> Cache
    Mutations -->|Updates data in| Cache
    Queries -->|Reads data from| Cache
```


### Planned frontend data flow
```mermaid
sequenceDiagram
    participant User
    participant Home
    participant ApolloClient
    participant GraphQLBackend
    participant ApolloCache
    participant MessageList
    participant MessageItem

    User->>Home: Apply Filters (e.g., Starred, Sender)
    Home->>ApolloClient: Execute GET_MESSAGES Query with Filters
    ApolloClient->>GraphQLBackend: Send Query Request
    GraphQLBackend-->>ApolloClient: Return Query Response
    ApolloClient->>ApolloCache: Update Cache with Messages
    ApolloClient-->>Home: Return Messages Data
    Home->>MessageList: Pass Messages to Display
    MessageList->>MessageItem: Render Each Message

    User->>MessageItem: Click Star/Unstar on a Message
    MessageItem->>Home: Trigger TOGGLE_STARRED Mutation
    Home->>ApolloClient: Execute TOGGLE_STARRED Mutation with Message ID
    ApolloClient->>GraphQLBackend: Send Mutation Request
    GraphQLBackend-->>ApolloClient: Return Mutation Response
    ApolloClient->>ApolloCache: Update Cache with New Star Status
    ApolloClient-->>Home: Return Updated Message Data
    Home->>MessageList: Update Message in Display
    MessageList->>MessageItem: Reflect Star Status Change
```

### Backend Services

The backend is a GraphQL server implemented in Go. It uses a resolver to fetch data from a Redis cache and a PostgreSQL database. Also handles interactions with the Gmail API.

### Overview

```mermaid
graph TD
subgraph TD GraphQL Server
    Resolver[Resolvers]
    Schema[GraphQL Schema]
end
subgraph Services
    GmailClient[Gmail Client]
    Cache[Redis Cache]
    Database[PostgreSQL Database]
end
subgraph External Services
    GmailAPI[Gmail REST API]
end

Resolver --> Schema
Resolver -->|Fetch/Store Data| Database
Resolver -->|Cache Operations| Cache
Resolver -->|Gmail Operations| GmailClient
GmailClient -->|API Requests| GmailAPI
```

### Backend data flow
```mermaid
sequenceDiagram
    participant Frontend as Apollo Client
    participant GraphQL as GraphQL Server
    participant Resolver as Resolvers
    participant Cache as Redis Cache
    participant Database as PostgreSQL Database
    participant GmailClient as Gmail Client
    participant GmailAPI as Gmail REST API

    Frontend->>GraphQL: Send GetMessages Query (with filters)
    GraphQL->>Resolver: Resolve GetMessages
    Resolver->>Cache: Check Cache for Messages
    alt Cache Hit
        Cache-->>Resolver: Return Cached Messages
    else Cache Miss
        Resolver->>Database: Query Messages from DB
        Database-->>Resolver: Return Messages
        Resolver->>GmailClient: Fetch Additional Data from Gmail (if needed)
        GmailClient->>GmailAPI: API Request (e.g., Fetch Labels)
        GmailAPI-->>GmailClient: API Response
        GmailClient-->>Resolver: Return Gmail Data
        Resolver->>Cache: Store Messages in Cache
    end
    Resolver-->>GraphQL: Return Messages to Frontend

    Frontend->>GraphQL: Send ToggleStarred Mutation (messageId)
    GraphQL->>Resolver: Resolve ToggleStarred
    Resolver->>Database: Update Starred Status in DB
    Database-->>Resolver: Confirm Update
    Resolver->>GmailClient: Modify Message Labels in Gmail
    GmailClient->>GmailAPI: API Request (Modify Labels)
    GmailAPI-->>GmailClient: API Response
    GmailClient-->>Resolver: Confirm Label Modification
    Resolver->>Cache: Invalidate/Update Cached Messages
    Resolver-->>GraphQL: Return Updated Message to Frontend
```

---


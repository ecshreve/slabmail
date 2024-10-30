// src/App.tsx

import React from "react";
import Home from "./pages/Home";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;

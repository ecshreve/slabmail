// src/pages/Home.tsx

import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import Filters from "../components/Filters";
import MessageList from "../components/MessageList";
import { Message, useMessagesPaginatedQuery } from "../generated/gql";

const Home: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const [filters, setFilters] = useState<{
    isStarred?: boolean;
    sender?: string;
    subjectContains?: string;
  }>({});

  const { data, loading, error, fetchMore } = useMessagesPaginatedQuery({
    variables: { pagination: { limit: 10, offset: 0 } },
    fetchPolicy: "cache-and-network",
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: { filter: filters, pagination: { limit: 10, offset: 0 } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          messages: [...prev.messages, ...fetchMoreResult.messages],
        };
      },
    });
    setOffset(offset + limit);
  };

//   const [toggleStarredMutation] = useToggleStarredMutation();

  const handleFilterChange = (newFilters: {
    isStarred?: boolean;
    sender?: string;
    subjectContains?: string;
  }) => {
    setFilters(newFilters);
  };

//   const handleToggleStar = async (messageId: string) => {
//     try {
//         console.log("toggle star", messageId);
//     //   await toggleStarredMutation({
//     //     variables: { messageId },
//     //     refetchQueries: [
//     //       { query: GetMessagesDocument, variables: { filter: filters, pagination: { limit: 20, offset: 0 } } },
//     //     ],
//     //   });
//     } catch (err) {
//       console.error("Error toggling star:", err);
//       // Optionally, display a notification to the user
//     }
//   };

  if (!data || !data.messages) return <>Loading...</>
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Filters onFilterChange={handleFilterChange} />
      <MessageList
        messages={data.messages as Message[]}
        loading={loading}
        error={error ? error.message : undefined}
        onToggleStar={() => {}}
      />
      {data.messages.length >= limit && (
        <Button variant="contained" onClick={handleLoadMore} sx={{ mt: 2 }}>
          Load More
        </Button>
      )}
    </Container>
  );
};

export default Home;

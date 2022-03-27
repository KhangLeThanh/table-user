import React, { useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { TableUser } from "./TableUser";
export const App = () => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const result = await api.getUsersDiff();
      if (result.data) {
        setUsers(result.data);
        return;
      }
    } catch (error) {
      setHasError(true);
      setLoading(true);
      setErrorMessage("We had problems fetching your data. Please try again.");
    }
  }, [users]);
  useEffect(() => {
    fetchUser();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [fetchUser,loading]);
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <TableUser
          users={users}
          hasError={hasError}
          errorMessage={errorMessage}
          loading={loading}
        />
        {/* Just a dummy fetcher to show how the api should be used, this should be removed */}
      </Box>
    </Container>
  );
};

export default App;

import React, { useState } from "react";
import "./todo.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Item from "../item/Item";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Todo() {
  const { isLoading, error, data } = useQuery(["todo"], async () => {
    const res = await makeRequest.get("/todos");
    return res.data;
  });

  const queryClient = useQueryClient();

  const [errors, setError] = useState(null);

  const [item, setItem] = useState({
    items: "",
  });

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation(
    (item) => {
      return makeRequest.post("/todos", item);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["todo"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      mutation.mutate(item);
      setItem(null);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="todo">
      <div className="top">
        <input
          type="text"
          placeholder="Add item"
          onChange={handleChange}
          name="items"
          required
        />
        <button onClick={handleClick}>Add</button>
      </div>
      {errors && errors}
      <div className="bottom">
        {error ? (
          <SignalWifiStatusbarConnectedNoInternet4Icon />
        ) : isLoading ? (
          <CircularProgress />
        ) : data.length === 0 ? (
          <Box sx={{ width: 1094, height: 10 }}>
            <Skeleton animation="wave" />
          </Box>
        ) : (
          data.map((todo) => (
            <Item item={todo.items} key={todo.id} id={todo.id} />
          ))
        )}
      </div>
    </div>
  );
}

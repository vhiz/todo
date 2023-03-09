import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./delete.scss";

export default function Delete({ id, setDeleteOpen }) {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return makeRequest.delete(`/todos/${id}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["todo"]);
      },
    }
  );

  const handleDelete = async () => {
    try {
      mutation.mutate();
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="deletei">
      <div className="left">
        <h2>Are you sure you want to delete</h2>
      </div>
      <div className="right">
        <button className="yes" onClick={handleDelete}>
          yes
        </button>
        <button className="no" onClick={() => setDeleteOpen(false)}>
          no
        </button>
      </div>
      {error && error}
    </div>
  );
}

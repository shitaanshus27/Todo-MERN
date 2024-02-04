import React, { useState, useEffect } from "react";
import { apiConnector } from "../services/apiconnector";
import { endpoints } from "../services/apis";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

const Todos = () => {
  const [data, setData] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  });

  const iconStyle = {
    fontSize: "24px",
    marginRight: "8px",
    cursor: "pointer",
    color: "#007bff",
    transition: "transform 0.3s ease",
  };

  const hoverStyle = {
    transform: "scale(1.2)",
  };

  const deleteTodo = async (todoId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this todo?"
      );

      if (!confirmDelete) {
        return; // User clicked cancel in the confirmation dialog
      }

      const res = await apiConnector(
        "DELETE",
        `${endpoints.DELETE_API}/${todoId}`
      );
      console.log(res);

      // Update UI by fetching updated data after successful delete
      const updatedData = await apiConnector("GET", endpoints.GETALL_TODO_API);
      setData(updatedData.data.data);

      // Show success toast
      toast.success("Todo deleted successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      // Show error toast
      toast.error("Failed to delete todo. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const editTodo = (todoId) => {
    setEditingTodoId(todoId);
    const todoToEdit = data.find((todo) => todo._id === todoId);
    setEditFormData({
      title: todoToEdit.title,
      description: todoToEdit.description,
    });
  };

  const updateTodo = async (todoId) => {
    const loadingToastId = toast.loading("Updating todo...");
    try {
      const res = await apiConnector(
        "PUT",
        `${endpoints.UPDATE_API}/${todoId}`,
        editFormData
      );
      console.log(res);

      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      // Reset editing state and update UI by fetching updated data
      setEditingTodoId(null);
      const updatedData = await apiConnector("GET", endpoints.GETALL_TODO_API);
      setData(updatedData.data.data);

      // Show success toast
      toast.success("Todo updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);

      // Dismiss the loading toast on error
      toast.dismiss(loadingToastId);

      // Show error toast
      toast.error("Failed to update todo. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    console.log("Fetching todos...");
    const fetchData = async () => {
      try {
        const res = await apiConnector("GET", endpoints.GETALL_TODO_API);
        setData(res.data.data);
        console.log("Todos data:", res.data.data);
        // Show success toast
        toast.success("Todo get successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message);
        // Show error toast
        toast.error("Failed to update todo. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    };

    fetchData(); // Call the function directly

    // Do not include fetchData in the dependency array
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="max-w-[1080px] mx-auto">
      <div className="w-full">
        {data &&
          data.map((res) => (
            <div key={res._id} className="flex shadow-md border">
              <div className="w-3/4 text-center border-2 bg-stone-400">
                {editingTodoId === res._id ? (
                  <div className="flex flex-col p-4">
                    <label htmlFor="editTitle">Edit Title:</label>
                    <input
                      type="text"
                      id="editTitle"
                      value={editFormData.title}
                      className="p-2 border-2 rounded-lg"
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          title: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="editDescription">Edit Description:</label>
                    <input
                      type="text"
                      id="editDescription"
                      value={editFormData.description}
                      className="p-2 border-2 rounded-lg"
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-red-500">Title:</p>
                    <p className="text-white">{res?.title}</p>
                    <p className="text-red-500">Description:</p>
                    <p className="text-white">{res?.description}</p>
                  </>
                )}
              </div>
              <div className="w-1/4">
                <div className="p-2 flex gap-2 mt-8">
                  {editingTodoId === res._id ? (
                    <>
                      <button
                        onClick={() => updateTodo(res._id)}
                        className="border-1 mt-2 w-1/2 mx-auto bg-slate-500 text-white p-2 rounded-lg hover:bg-slate-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditingTodoId(null)}
                        className="border-1 mt-2 w-1/2 mx-auto bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <MdModeEdit
                        onClick={() => editTodo(res._id)}
                        style={{ ...iconStyle, ...hoverStyle }}
                      />
                      <MdDelete
                        onClick={() => deleteTodo(res._id)}
                        style={{
                          ...iconStyle,
                          ...hoverStyle,
                          color: "#dc3545",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todos;

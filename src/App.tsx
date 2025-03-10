import { useState, useRef, useEffect } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("innerApp");
  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        }
        setError(error.message);
        setIsLoading(false);
      });

    return cancel;
  }, []);

  const deleteUser = (deletedUser: User) => {
    const cachedUsers = [...users];
    setUsers(users.filter((user) => user.id !== deletedUser.id));
    userService.deleteUser(deletedUser.id).catch((error) => {
      setError(error.message);
      setUsers(cachedUsers);
    });
  };

  const updateUser = (updatedUser: User) => {
    const cachedUsers = [...users];
    const newName = updatedUser.name + "!";
    const newUser = { ...updatedUser, name: newName };

    setUsers(
      users.map((user) => {
        return user.id === updatedUser.id ? newUser : user;
      })
    );
    userService.updateUser(newUser).catch((error) => {
      setError(error.message);
      setUsers(cachedUsers);
    });
  };

  const addUser = () => {
    const cachedUsers = [...users];
    const newUser: User = {
      id: 0,
      name: "Gregory",
      username: "greg09",
    };
    // in my opinion it would be better to update the ui first and in the post response
    // only check if the user was added
    userService
      .createUser(newUser)
      .then((response) => {
        setUsers([...users, response.data]);
      })
      .catch((error) => {
        setError(error.message);
        setUsers(cachedUsers);
      });
  };

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-outline-primary mb-3" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

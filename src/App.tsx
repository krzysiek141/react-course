import { Fragment } from "react";
import { ExpenseTrackerForm } from "./expense-tracker/components/ExpenseTrackerForm";
import { ExpenseList, Expense } from "./expense-tracker/components/ExpenseList";
import { ExpenseFilter } from "./expense-tracker/components/ExpenseFilter";
import { FieldValues } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import { ProductList } from "./ProductList";
import axios, { AxiosError, CanceledError } from "axios";

// function App() {
//   const expensesDefault: Expense[] = [
//     { id: 1, description: "aaaa", amount: 3, category: "Groceries" },
//     { id: 2, description: "aaaa", amount: 34, category: "Utilities" },
//     { id: 3, description: "aaaa", amount: 14, category: "Utilities" },
//     { id: 4, description: "aaaa", amount: 8, category: "Entertainment" },
//   ];

//   const [expenses, setExpenses] = useState(expensesDefault);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const onExpenseDelete = (id: number) => {
//     setExpenses(expenses.filter((expense) => expense.id !== id));
//   };

//   const onFilterExpenses = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const formSubmitHandler = (data: FieldValues) => {
//     setExpenses([...expenses, {...data, id: expenses.length + 1} as Expense])
//   }

//   const filteredExpenses =
//     selectedCategory !== ""
//       ? expenses.filter((expense) => expense.category === selectedCategory)
//       : expenses;

//   const availableCategories = [
//     ...new Set(expensesDefault.map((expense) => expense.category)),
//   ];

//   return (
//     <>
//       <div>
//         <ExpenseTrackerForm availableCategories={availableCategories} onSubmit={formSubmitHandler} />
//         <ExpenseFilter availableCategories={availableCategories} onSelect={onFilterExpenses} />
//         <ExpenseList expenses={filteredExpenses} onDelete={onExpenseDelete} />
//       </div>
//     </>
//   );
// }

// function App() {

//   const [category, setCategory] = useState('')

//   return (
//     <div>
//       <select className="form-select" onChange={(event) => setCategory(event.target.value)}>
//         <option value=""></option>
//         <option value="Clothing">Clothing</option>
//         <option value="Household">Household</option>
//       </select>
//       <ProductList category={category}/>
//     </div>
//   )
// }

// export default App;

interface User {
  id: number;
  name: string;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("innerApp");
  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
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

    return () => controller.abort();
  }, []);

  const deleteUser = (deletedUser: User) => {
    const cachedUsers = [...users];
    setUsers(users.filter((user) => user.id !== deletedUser.id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${deletedUser.id}`)
      .catch((error) => {
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
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newUser)
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
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

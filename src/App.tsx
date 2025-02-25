import { Fragment } from "react";
import { ExpenseTrackerForm } from "./expense-tracker/components/ExpenseTrackerForm";
import { ExpenseList, Expense } from "./expense-tracker/components/ExpenseList";
import { ExpenseFilter } from "./expense-tracker/components/ExpenseFilter";
import { FieldValues } from "react-hook-form"
import { useState, useRef, useEffect } from "react";
import "./App.css";
import { ProductList } from "./ProductList";

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


function App() {

  const [category, setCategory] = useState('')

  return (
    <div>
      <select className="form-select" onChange={(event) => setCategory(event.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category}/>
    </div>
  )
}

export default App;

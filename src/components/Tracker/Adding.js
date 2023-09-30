import Card from "./UI/Card";
import classes from "./Adding.module.css";
import Button from "./UI/Button";
import { useRef, useState, useEffect } from "react";
import Wrapper from "./Wrapper/Wrapper";
import Modal from "./UI/Modal";

const Adding = (props) => {
  const descRef = useRef();
  const moneyRef = useRef();
  const categoryRef = useRef();
  const [error, setError] = useState();

  const fetchUserData = async () => {
    const id = localStorage.getItem("id").replace(/[^a-zA-Z0-9]/g, "");
    try {
      const response = await fetch(
        `https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${id}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the database.");
      }

      const data = await response.json();

      for (const key in data) {
        props.onAdd(key, data[key].name, data[key].age, data[key].category);
      }
    } catch (error) {
      setError({
        title: "Error",
        message: "An error occurred while fetching data from the database.",
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    const enteredName = descRef.current.value;
    const enteredUserAge = moneyRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const id = localStorage.getItem("id").replace(/[^a-zA-Z0-9]/g, "");

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid price and description.",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid price.",
      });
      return;
    }

    try {
      let response;
      if (props.editItem) {
        // If there's an edit item, update it using PUT request
        response = await fetch(
          `https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${id}/${props.editItem.id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: enteredName,
              age: enteredUserAge,
              category: enteredCategory,
            }),
          }
        );
      } else {
        // If there's no edit item, create a new item using POST request
        response = await fetch(
          `https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${id}.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: enteredName,
              age: enteredUserAge,
              category: enteredCategory,
            }),
          }
        );
      }

      if (response.ok) {
        const responseData = await response.json();
        if (props.editItem) {
          props.onUpdate(
            props.editItem.id,
            enteredName,
            enteredUserAge,
            enteredCategory
          );
        } else {
          props.onAdd(
            responseData.name,
            enteredName,
            enteredUserAge,
            enteredCategory
          );
        }
        descRef.current.value = "";
        moneyRef.current.value = "";
        categoryRef.current.value = "";
      } else {
        setError({
          title: "Error",
          message: "Failed to add/update data in the database.",
        });
      }
    } catch (error) {
      setError({
        title: "Error",
        message: "An error occurred while adding/updating data in the database.",
      });
    }
  };

  const errorhandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && <Modal title={error.title} message={error.message} onConfirm={errorhandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUser}>
          <label htmlFor="money">Money Spent</label>
          <input type="number" id="money" ref={moneyRef} />
          <label htmlFor="desc">Description</label>
          <input type="text" id="desc" ref={descRef} />
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryRef}>
            <option>Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
          <Button type="submit">{props.editItem ? "Update Item" : "Add User"}</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default Adding;

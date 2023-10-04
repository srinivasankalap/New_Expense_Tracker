import React, { useRef, useState, useEffect, useCallback } from "react";
import stylesheet from "./AddExpense.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expensesSlice";


const AddExpense = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categroyInputRef = useRef();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.authentication.userId);
  const emailId = userEmail || "";
  const email = emailId.replace(/[^a-zA-Z0-9]/g, "");

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);



  const amountInputChangeHandler = () => {
    setAmount(amountInputRef.current.value);
  };
  const descriptionInputChangeHandler = () => {
    setDescription(descriptionInputRef.current.value);
  };
  const categroyInputChangeHandler = () => {
    setCategory(categroyInputRef.current.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
   
    if(!amount || isNaN(amount)){
      toast.error("Please Enter Amount", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return

    }
    if(!description){
      toast.error("Please Description", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return

    }
    if(!category){
      toast.error("Please Select a category.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return

    }



    const expenseData = {
      amount: amount,
      description: description,
      category: category,
    };
    addExpenseHandler(expenseData);
    setAmount("");
    setDescription("");
    setCategory("");
  };

  useEffect(() => {
    fetch(
      `https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense${email}.json`,
      {
        method: "POST",
        body: JSON.stringify([]),
      }
    );
  }, [email]);

  const addExpenseHandler = (expenseData) => {
    fetch(
      `https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense${email}.json`,
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        toast.success("Expense added sucessfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        
        return res.json();
      } else {
        return res.json().then((data) => {
          toast.error("Something went wrong..!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
       
        });
      }
    })
    fetchExpenseHandler()
  };
  const fetchExpenseHandler = useCallback(() => {
    fetch(
      `https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense${email}.json`
    ).then(res=>{
      if (res.ok) {
    
        return res.json();
      }else {
        return res.json().then((data) => {
          toast.error("Something went Wrong", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        
         
        });
      }

    }).then(data=>{
      let fetchedExpenses = [];
        let loadedAmount = 0;
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
          loadedAmount = loadedAmount + parseInt(data[key].amount);
        
      }
      dispatch(expenseActions.setExpenses(fetchedExpenses));
      dispatch(expenseActions.setTotalAmount(loadedAmount));
    })
   
  },[dispatch, email]);
  useEffect(()=>{
    fetchExpenseHandler()
  },[fetchExpenseHandler])

  return (
    <>
    
      <Container
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
        className={isDarkTheme?stylesheet["add-expense-dark"]:stylesheet["add-expense"]}
      >
        <h5 className={stylesheet.title}>Add New Expense</h5>
        <Form onSubmit={submitHandler}>
          <Form.Group
            className={stylesheet["form-group"]}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Form.Label htmlFor="amount" className={stylesheet["form-label"]}>
              Amount:
            </Form.Label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              
              <Form.Control
              required
              id="amount"
                style={{ width: "100%", marginLeft: "0.3rem" }}
                type="number"
                placeholder="Enter the Amount "
                ref={amountInputRef}
                value={amount}
                
                onChange={amountInputChangeHandler}
                className={stylesheet["form-controls"]}
              />
            </div>
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Label htmlFor="description" className={stylesheet["form-label"]}>
            Please Description:{" "}
            </Form.Label>
            <Form.Control
            required
            id="description"
              type="text"
              placeholder="Enter Description "
              ref={descriptionInputRef}
              value={description}
              onChange={descriptionInputChangeHandler}
              className={stylesheet["form-controls"]}
            />
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Label htmlFor="category" className={stylesheet["form-label"]}>
            Please Select a category:
            </Form.Label>
            <Form.Select
            id="category"
            required
              aria-label="expenseCategroy"
              ref={categroyInputRef}
              value={category}
              data-testid="category-select"
              onChange={categroyInputChangeHandler}
              className={stylesheet["form-controls"]}
            >
              <option value="">Select Where You Spend </option>
              <option value="car servicing">Car servicing </option>
              <option value="petrol">Petrol </option>
              <option value="food">Food</option>
              <option value="grocery">Grocery</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ textAlign: "center" }}>
            <Button className={stylesheet.btn} type="submit" disabled={!amount || !description ||!category}>
              Add
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddExpense;


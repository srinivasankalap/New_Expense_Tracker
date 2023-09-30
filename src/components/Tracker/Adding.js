import Card from './UI/Card';
import classes from './Adding.module.css';
import Button from "./UI/Button";
import { useRef, useState } from "react";
import Wrapper from './Wrapper/Wrapper';
import Modal from "./UI/Modal";
const Adding=(props)=>{
    const descRef=useRef();
    const moneyRef=useRef();
    const categoryRef=useRef();
    const [error, setError]=useState();
    
    const addUser=(e)=>{
        e.preventDefault();
        const enteredName=descRef.current.value;
        const enteredUserAge=moneyRef.current.value;
        const enteredCollege=categoryRef.current.value;
        if (enteredName.trim().length===0 || enteredUserAge.trim().length===0){
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid price and description.'
            });
            return; 
        }
        if (+enteredUserAge < 1){
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid price.'
            });
            return;
        }
        props.onAdd(enteredName,enteredUserAge,enteredCollege);
        
        descRef.current.value='';
        moneyRef.current.value='';
        categoryRef.current.value='';
    }

    const errorhandler=()=>{
        setError(null);
    }

    return (
        <Wrapper>
            {error &&<Modal title={error.title} message={error.message} onConfirm={errorhandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUser} >
                    <label htmlFor="money">Money Spent</label>
                    <input type="number" id="money" ref={moneyRef}/>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" ref={descRef}/>
                    <label htmlFor="category">Category </label>
                    <select id="category" ref={categoryRef}>
                        <option>Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </select>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default Adding;  
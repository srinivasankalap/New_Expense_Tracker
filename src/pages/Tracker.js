import { useState } from "react";
import Adding from "../components/Tracker/Adding"
import List from "../components/Tracker/List"

const Tracker=()=>{
    const [userList, setUserList]=useState([]);

  const addUser=(userdesc,userprice,usercategory)=>{
    setUserList((prev)=>{
      return [...prev, {description: userdesc, price: userprice, id: Math.random().toString(), category: usercategory}]
    });
  }
    return (
        <>
            <Adding onAdd={addUser} />
            <List users={userList}/>
        </>
    )
}

export default Tracker;
import { useState } from "react";
import Adding from "../components/Tracker/Adding";
import List from "../components/Tracker/List";

const Tracker = () => {
  const [userList, setUserList] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const addUser = (key, userdesc, userprice, usercategory) => {
    setUserList((prev) => {
      return [...prev, { description: userdesc, price: userprice, id: key, category: usercategory }];
    });
  };

  const editItemHandler = (item) => {
    setEditItem(item);
  };

  const updateItem = (key, userdesc, userprice, usercategory) => {
    const updatedList = userList.map((item) =>
      item.id === key ? { description: userdesc, price: userprice, id: key, category: usercategory } : item
    );
    setUserList(updatedList);
    setEditItem(null);
  };

  const deleteItem = (id) => {
    const updatedList = userList.filter((user) => user.id !== id);
    setUserList(updatedList);
  };

  return (
    <>
      <Adding onAdd={addUser} editItem={editItem} onUpdate={updateItem} />
      <List users={userList} onDelete={deleteItem} onEdit={editItemHandler} />
    </>
  );
};

export default Tracker;

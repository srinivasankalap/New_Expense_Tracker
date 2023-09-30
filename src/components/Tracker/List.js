import Card from "./UI/Card";
import classes from './List.module.css';

const List=(props)=>{
    const deleteItem = async (id) => {
        const mail=localStorage.getItem('id').replace(/[^a-zA-Z0-9]/g, "");
        try {
          const response = await fetch(`https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${mail}/${id}.json`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            props.onDelete(id);
          } else {
            console.error('Failed to delete item from the database.');
          }
        } catch (error) {
          console.error('An error occurred while deleting the item.', error);
        }
      };

      const editItem = async (user) => {
        await(props.onEdit(user));
        const mail=localStorage.getItem('id').replace(/[^a-zA-Z0-9]/g, "");
        try {
          const response = await fetch(`https://expensetracker-52ef7-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${mail}/${user.id}.json`, {
            method: 'PUT',
          });
    
          if (response.ok) {
            console.log('OK');
          } else {
            console.error('Failed to edit item in the database.');
          }
        } catch (error) {
          console.error('An error occurred while editing the item.', error);
        }
      };

    return(
        <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            (₹{user.price}) spent on {user.description} category: {user.category}
            <button onClick={() => editItem(user)}>Edit</button>
            <button onClick={() => deleteItem(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Card>
    )
}

export default List;
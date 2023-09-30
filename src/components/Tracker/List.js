import Card from "./UI/Card";
import classes from './List.module.css';

const List=(props)=>{
    return(
        <Card className={classes.users}>
            <ul>
                {props.users.map((user)=>{
                    return (<li key={user.id}>(₹{user.price}) spent on {user.description} category: {user.category}</li>)
                })}
            </ul>
        </Card>
    )
}

export default List;
import Card from "./Card";
import Button from "./Button";
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.onConfirm}/>
}

const Overlay=(props)=>{
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>Okay!</Button>
            </footer>
        </Card>
    )
}

const Modal=(props)=>{
    return(
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm}/>, document.getElementById('backdrop_root'))}
            {ReactDOM.createPortal(<Overlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('modal_root'))}
            
        </>
    )
}

export default Modal;
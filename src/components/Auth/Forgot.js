import { Link } from 'react-router-dom';
import classes from './Forgot.module.css';
import { useRef } from 'react';

const Forgot=()=>{
    const emailInputRef=useRef();
    const submitHandler=async(e)=>{
        e.preventDefault();
        const emailValue= emailInputRef.current.value;
        console.log(typeof(emailValue));
    
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBycSmTAkk_MbjTNxVPNXryNlABlqht8Co',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: emailValue,
            })
        })
        if (response.ok){
            alert('Reset link sent to your email');
        }else{
            alert('Rest link not sent');
        }
    
    }
    return (
    <form onSubmit={submitHandler} className={classes.new}>
        <h3>Reset Password</h3>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div><button type='submit' className={classes.sending}>Send Link</button></div>
          <Link className={classes.toggle} to='./auth'>Login?</Link>
      </form>
    )
}
export default Forgot;
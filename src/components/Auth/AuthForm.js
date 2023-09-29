import { useState, useRef, useContext } from 'react';
import{useNavigate} from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const confirmPasswordRef=useRef();
  const history=useNavigate();

  const authCtx=useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading]=useState(false);
  const [passwordError, setpasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;


    if (passwordInputRef.length < 8 || passwordInputRef.length > 22) {
      setpasswordError(
        "Password must be between 8 and 22 characters"
      );
      return false;
    } 
    console.log(passwordInputRef,confirmPasswordRef);
    if (passwordInputRef.current.value !== confirmPasswordRef.current.value) {
      formIsValid = false;
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  
    return formIsValid;
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;

    setIsLoading(true);
    if (handleValidation()){
    if(isLogin){
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBycSmTAkk_MbjTNxVPNXryNlABlqht8Co',
      {
        method:'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password:enteredPassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      ).then( res=>{
        setIsLoading(false);
        if (res.ok){
          return res.json();
        }else{
          return res.json().then(data=>{
            let errorMessage='Authentication Failed!..';
            if (data && data.error && data.error.message){
              errorMessage=data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      }).then(data=>{
        authCtx.login(data.idToken);
        history('/',{replace:true});
      }).catch(err=>{
        alert(err.message);
      })

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBycSmTAkk_MbjTNxVPNXryNlABlqht8Co',
      {
        method:'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password:enteredPassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      ).then( res=>{
        setIsLoading(false);
        if (res.ok){
          return res.json();
        }else{
          return res.json().then(data=>{
            let errorMessage='Authentication Failed!..';
            if (data && data.error && data.error.message){
              errorMessage=data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      }).then(data=>{
        authCtx.login(data.idToken);
        history('/',{replace:true});
      }).catch(err=>{
        alert(err.message);
      })
    }
  }else{
    setIsLoading(false);
  }}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {isLogin ? <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading&&<button>{isLogin? 'Login': 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form> :
      <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' required ref={emailInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Your Password</label>
        <input
          type='password'
          id='password'
          ref={passwordInputRef}
          required
        />
        <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Confirm Password</label>
        <input
          type='password'
          id='confirmpassword'
          ref={confirmPasswordRef}
          required
        />
        <small id="confirmPasswordError" className="text-danger form-text">
                  {confirmPasswordError}
                </small>
      </div>
      <div className={classes.actions}>
        {!isLoading&&<button>{isLogin? 'Login': 'Create Account'}</button>}
        {isLoading && <p>Sending Request...</p>}
        <button
          type='button'
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </form>}
    </section>
  );
};

export default AuthForm;

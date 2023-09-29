import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
import{useNavigate} from 'react-router-dom';

const MainNavigation = () => {
  const authCtx=useContext(AuthContext);
  const history=useNavigate();

  const isLoggedIn=authCtx.isLoggedIn;
  const logoutHandler=()=>{
    authCtx.logout();
    history('/auth',{replace:true})
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
          {isLoggedIn && (
          <li>
            <Link to='/home'>Home</Link>
          </li>
          )}
          
          {isLoggedIn &&(
            <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

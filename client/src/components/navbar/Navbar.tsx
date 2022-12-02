import React, {FC, useState} from "react";
import "./navbar.scss";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link, useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import GitHubButton from "react-github-btn";
import {Box, Divider, Drawer} from "@mui/material";
import {logoutUser} from "../../store/reducers/auth/actionCreators";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const [activeMenu, setActiveMenu] = useState(false)

  const handleLogout = () => {
    if(activeMenu){
      setActiveMenu(false)
    }
    dispatch(logoutUser())
    navigate('/')
  };

  return (
    <div className={"navbar"}>
      <Drawer anchor={'right'} open={activeMenu} onClose={() => setActiveMenu(false)}>
        <Box sx={{width: 300, padding: '20px', textAlign: 'center'}}>
          <div className={'mobileMenu'}>
            <h2 style={{paddingBottom: '20px'}}>MyBlog - Navigation</h2>
            <Divider/>
            <div style={{display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px'}}>
              <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/'}>
                <h1>Home</h1>
              </Link>
              <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/tags'}>
                <h1>Tags</h1>
              </Link>
              {isAuth ?
                  <>
                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/profile'}>
                      <h1>Profile</h1>
                    </Link>
                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/create'}>
                      <h1>Make Post</h1>
                    </Link>
                    <h1 onClick={handleLogout}>Logout</h1>
                  </>
                   :
                  <>
                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/login'}>
                      <h1>Sign In</h1>
                    </Link>
                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/register'}>
                      <h1>Sign Up</h1>
                    </Link>
                  </>
              }
            </div>
          </div>
        </Box>
      </Drawer>
      <div className="navbarInner">
        <div className={"left"}>
          <NewspaperIcon className={"icon"} />
          <Link to={"/"} className={"link"}>
            <h1 className={"title"}>MyBlog</h1>
          </Link>
        </div>
        <div className={"right"}>
          <div onClick={() => setActiveMenu(prev => !prev)} className={'burgerMenu'}>
            <div className={'burgerMenuItem'}/>
            <div className={'burgerMenuItem'}/>
            <div className={'burgerMenuItem'}/>
          </div>
          <div className={"gitHubIcon"}>
            <GitHubButton
              href={"https://github.com/vadimturok/my-blog"}
              data-icon={"octicon-star"}
              data-show-count={true}
              data-size={"large"}
              data-text={"Star"}
            />
            <GitHubButton
              href={"https://github.com/vadimturok"}
              data-size={"large"}
              data-text={"Follow @vadimturok"}
            />
          </div>

          {isAuth ? (
            <button onClick={handleLogout} className={"signupButton"}>
              Log out
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button className={"loginButton"}>Log in</button>
              </Link>
              <Link to={"/register"}>
                <button className={"signupButton"}>Create account</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

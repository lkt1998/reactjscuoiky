import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SignIn from 'features/Auth/component/SignIn';
import SignUp from 'features/Auth/component/SignUp';
import { logout } from 'features/Auth/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.scss';


export default function Header() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleClickOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleSignInToSignUp = () => {
    setOpenSignIn(false);
    setOpenSignUp(true);
  }

  const handleSignUpToSignIn = () => {
    setOpenSignIn(true);
    setOpenSignUp(false);
  }

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="link" to="/">
              EZ SHOP
            </Link>
          </Typography>
          {!isLoggedIn && (
            <>
              <Button color="inherit" onClick={handleClickOpenSignIn}>Sign In</Button>
              <Button color="inherit" onClick={handleClickOpenSignUp}>Sign Up</Button>
            </>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick} >
              <AccountCircle />
            </IconButton>
          )}

        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={openSignUp} onClose={handleCloseSignUp}>
        <IconButton
          sx={{ position: 'absolute', top: '5px', right: '10px', padding: '8px', zIndex: 2 }}
          onClick={handleCloseSignUp}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <SignUp closeDialog={handleCloseSignUp} openSignIn={handleClickOpenSignIn} />
          <Box textAlign='center'>
            <Button color='primary' onClick={handleSignUpToSignIn}>Already have an account. Login here</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog disableEscapeKeyDown open={openSignIn} onClose={handleCloseSignIn}>
        <IconButton
          sx={{ position: 'absolute', top: '5px', right: '10px', padding: '8px', zIndex: 2 }}
          onClick={handleCloseSignIn}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <SignIn closeDialog={handleCloseSignIn} />
          <Box textAlign='center'>
            <Button color='primary' onClick={handleSignInToSignUp}>Don't have an account. Register here</Button>
          </Box>
        </DialogContent>
      </Dialog>

    </Box>
  );
}

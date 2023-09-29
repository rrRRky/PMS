import React, { Fragment, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
import Cookies from 'js-cookie';
import { ReactComponent as DecoLogo } from '../../assets/logo.svg';
import './navigation.styles.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import AppIconSlider from "./navigation.appslider.component";

// Import for search 
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// Import for Theme changer
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function Navigation() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [auth, setAuth] = useState(localStorage.getItem('token') ? true : false);
  const [message, setMessage] = useState('');
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const userImage = localStorage.getItem('UserDP');
  const storedUserPath = localStorage.getItem('lastVisitedPage');
  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    let storedUser = null;
    let storedUserDP = null;
    let storedToken = null;
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      storedUser = userData.Name;
      storedUserDP = userData.UserImage;
      storedToken = userData.token;
      if (storedUser === userData.Name && storedToken === userData.token) {
        // alert();
        setUsername(storedUser);
        setToken(storedToken);
        navigate(storedUserPath);
        // navigate(storedUserPath || '/dashboard');
    } else {
      // User data doesn't match, navigate to login page
      navigate('/');
    }
  } else {
    // User data not found, navigate to login page
    navigate('/');
  }
    // Check if theme preference exists in session storage
    const sessionTheme = sessionStorage.getItem('theme');
    if (sessionTheme) {
      setDarkMode(sessionTheme === 'dark');
    } else {
      // Check if theme preference exists in local storage
      const localTheme = localStorage.getItem('theme');
      setDarkMode(localTheme === 'dark');
    }
    
  },[storedUserPath]);
  const [darkMode, setDarkMode] = useState(false);
  // const lastVisitedPage = localStorage.getItem('lastVisitedPage');
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const currentTheme = document.body.className;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    // Store theme preference in session storage
    sessionStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    // Store theme preference in local storage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }
  function handleLogout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    sessionStorage.removeItem('userSession');
    localStorage.removeItem('userSession');
    localStorage.removeItem('theme');
    localStorage.removeItem('lastVisitedPage');
    sessionStorage.removeItem('lastVisitedPage');
    localStorage.removeItem('RoleIDMY');
    sessionStorage.removeItem('RoleIDMY');
    localStorage.removeItem('UserDP');
    sessionStorage.removeItem('UserDP');
    sessionStorage.removeItem('theme');
    Cookies.remove('token');
    setAuth(false);
    setUsername('');
    setMessage('');
    navigate('/');
    
    localStorage.removeItem(`selectedCategoryModuleId`, module.id);
    localStorage.removeItem(`selectedModuleName`, module.text);

    refreshPage();
  }
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElNotification, setAnchorElNotification] = React.useState(null);

  const handleOpenUserNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseUserNotification = () => {
    setAnchorElNotification(null);
  };


  // search bar 
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Fragment>
      <AppBar className="myNavBar" position="static">
        <Container maxWidth="xxl">
          <Toolbar disableGutters className="w-100 d-flex">
            <Box className="d-flex justify-content-between align-items-center w-100">
              <Box>
                <Link className="nav-link" to='/dashboard'>
                  <DecoLogo className='sitlogo' />
                </Link>
              </Box>
              <Box className="d-flex w-50 align-items-center">
                {/* <Box className="d-flex w-100 justify-content-center align-items-center">
                  <AppIconSlider icons={iconData} tooltipTitle={tooltipTitle} />
                </Box> */}
                <Box className="d-flex w-50 justify-content-between align-items-center">
                  {/* search bar  */}
                  <Search className="border searchBoxNavBar">
                    <SearchIconWrapper>
                      <SearchIcon className="searchIconNavbar" />
                    </SearchIconWrapper>
                    <StyledInputBase
                      className="searchInputNavbar"
                      placeholder="Search…"
                      type="search"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Box>
              </Box>
              <Box className="d-flex justify-content-end align-items-center me-2" sx={{ flexGrow: 0 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} />}
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    color="default"
                  />
                </FormGroup>
                {auth ? (
                  <Box className="d-flex justify-content-end align-items-center me-2" sx={{ flexGrow: 0 }}>
                    <Tooltip title="Show Notification">
                      <IconButton onClick={handleOpenUserNotification} sx={{ p: 0 }} className="d-flex flex-column justify-content-center align-items-center me-4">
                        <NotificationsIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px', p: '0px' }}
                      id="menu-appbar"
                      anchorEl={anchorElNotification}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElNotification)}
                      onClose={handleCloseUserNotification}
                    >
                      <MenuItem onClick={handleCloseUserNotification}>
                        <Typography textAlign="center">
                          <PersonIcon className="me-2" />First Notification show here
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserNotification}>
                        <Typography textAlign="center">
                          <PersonIcon className="me-2" />Second Notification show here
                        </Typography>
                      </MenuItem>
                    </Menu>

                    <Tooltip title="Open Profile">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} className="d-flex flex-column justify-content-center align-items-center">
                        <Avatar alt={Name} className="text-uppercase" src={userImage} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px', p: '0px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <PersonIcon className="me-2" />{Name}
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <span className="d-flex justify-content-start align-items-center">
                            <LogoutIcon className="me-2" />
                            <Link className="nav-link" to='/' onClick={handleLogout}> Sign out </Link>
                          </span>
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Sign in">
                      <span className="d-flex justify-content-start align-items-center">
                        <Link className="nav-link" to='/auth'> <LoginIcon className="ms-2 me-2" /> </Link>
                      </span>
                    </Tooltip>
                    <span>{message}</span>
                  </Box>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;

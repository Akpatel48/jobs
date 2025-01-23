// // NavbarMui.js

// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Box } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { makeStyles } from '@mui/styles';
// import { Link, NavLink } from 'react-router-dom'; // If you're using React Router
// import FacebookIcon from '@mui/icons-material/Facebook';
// import CloseIcon from '@mui/icons-material/Close';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import edjobster09 from "../assets/images/edjobster-09.png"

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     title: {
//         flexGrow: 1,
//     },
//     link: {
//         textDecoration: 'none',
//         color: 'white',
//     },
// }));

// const Navbar = () => {
//     const classes = useStyles();

//     return (
//         // <div className={classes.root}>
//         <AppBar position="static" sx={{ background: '#f4f6f8', boxShadow: 'none' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//             <Typography variant="h6">
//                 <img
//                     style={{ width: "13%", margin: "0" }}
//                     src={edjobster09}
//                     alt="logo"
//                 />
//             </Typography>

//             <Box
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '32px',
//                     flexWrap: 'nowrap',
//                     '& a': {
//                         textDecoration: 'none',
//                         color: 'black',
//                         '&.active': {
//                             fontWeight: 'bold',
//                             color: '#89ba16',
//                         },
//                     },
//                 }}
//             >
//                 <NavLink to="/home" activeClassName="active">Home</NavLink>
//                 <NavLink to="/jobs" activeClassName="active">Jobs</NavLink>
//                 {/* <NavLink to="/post-job" activeClassName="active">Post Job</NavLink> */}
//                 {/* <NavLink to="/upload-resume" activeClassName="active">Upload Resume</NavLink> */}
//                 {/* <NavLink to="/for-employer" activeClassName="active">For Employer</NavLink> */}
//             </Box>

//             <Box sx={{ display: 'flex', gap: '16px', ml: '16px' }}>
//                 <IconButton color="inherit">
//                     <FacebookIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                     <CloseIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                     <LinkedInIcon />
//                 </IconButton>
//             </Box>
//         </Toolbar>
//     </AppBar>
//         // </div>
//     );
// };

// export default Navbar;


// Import necessary modules and components
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
  Button,
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon
} from "@mui/icons-material";
import edjobster09 from "../assets/images/edjobster-09.png"
import { Link, NavLink, useLocation } from "react-router-dom";
import Searchtest from "./Searchtest";



// Define styled components
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  backgroundColor: "#ffffff"
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  marginRight: "16px",
  marginLeft: "0",
  width: "100%",
  maxWidth: "400px"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "0 16px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000000"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000000",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "8px 8px 8px 48px",
    width: "100%"
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#000000",
  margin: "0 8px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
}));

// Define the Header component
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:960px)");
  const location = useLocation();
  const isJobsPage = location.pathname === "/jobs";
  const [showTopJobSearch, setShowTopJobSearch] = useState(false);
  const [isSearchButtonVisible, setIsSearchButtonVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      try {
        // Simulate search API call
        throw new Error("Search service temporarily unavailable");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSearchButtonClick = () => {
    setShowTopJobSearch(true);
    setIsSearchButtonVisible(false);
  };

  const handleSearchComplete = () => {
    setShowTopJobSearch(false);
    setIsSearchButtonVisible(true);
  };

  const handleSearchChange = (newValue) => {
    setSearchTerm(newValue);
  };

  const menuItems = [
    { text: "Home", id: "home", to: "/" },
    { text: "Jobs", id: "jobs", to: "/jobs" },
    { text: "Registration", id: "registrationform", to: "/registrationform" },
    { text: "About Us", id: "about" }
  ];

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          "& .MuiMenuItem-root": {
            px: 2,
            py: 1
          }
        }
      }}
    >
      <MenuItem>
        <AccountCircleIcon style={{ marginRight: "8px" }} />
        Profile
      </MenuItem>
      <MenuItem>
        <SettingsIcon style={{ marginRight: "8px" }} />
        Settings
      </MenuItem>
      <MenuItem>
        <ExitToAppIcon style={{ marginRight: "8px" }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const navigationContent = (
    <>
      {menuItems.map((item) => (
        <NavButton
          key={item.id}
          aria-label={item.text}
          role="menuitem"
          component={NavLink} // Use NavLink for routing
          to={item.to || "#"} // Use 'to' property if available
        >
          {item.text}
        </NavButton>
      ))}
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#ffffff" }}>
        <Container maxWidth="xl">
          <StyledToolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "#000000"
                }}
              >
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <img
                    src={edjobster09}
                    alt="Edjobster"
                    style={{ height: "40px", marginRight: "10px" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E";
                    }}
                  />
                </Link>
                {/* Edjobster */}
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {navigationContent}
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isJobsPage && isSearchButtonVisible && (
                <Button onClick={handleSearchButtonClick}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search jobs..."
                      readOnly
                    />
                  </Search>
                  {/* <img src={require("../assets/images/Screenshot 2024-12-25 131909.png")} alt="Search" /> */}
                </Button>
              )}

              <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  aria-label="show 3 new notifications"
                  sx={{ color: "#000000" }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* <Tooltip title="Account settings">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, backgroundColor: "#1abc9c" }}>
                    U
                  </Avatar>
                </IconButton>
              </Tooltip> */}

              {isMobile && (
                <IconButton
                  sx={{ color: "#000000", ml: 1 }}
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleMobileMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
      {showTopJobSearch && (
        <Searchtest 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchComplete={handleSearchComplete} 
        />
      )}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleMobileMenuToggle}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.id}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {renderMenu}

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>

  );
};

export default Navbar;

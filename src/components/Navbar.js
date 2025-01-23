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
import { Link, NavLink } from "react-router-dom";


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

  const handleRedirect = () => {
    window.location.href = "https://staging-cv-app.edjobster.com/"; // Redirect function
};

  const menuItems = [
    { text: "Home", id: "home", to: "/" },
    { text: "Jobs", id: "jobs", to: "/jobs" },
    { text: "Registration", id: "registrationform", to: " ", onClick: handleRedirect  },
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
      <NavButton
          key="home"
          aria-label="Home"
          role="menuitem"
          component={NavLink}
          to="/"
      >
            Home
      </NavButton>
      <NavButton
          key="jobs"
          aria-label="Jobs"
          role="menuitem"
          component={NavLink}
          to="/jobs"
      >
          Jobs
      </NavButton>
      <NavButton
          key="registrationform"
          aria-label="Registration"
          role="menuitem"
          onClick={() => window.location.href = "https://staging-cv-app.edjobster.com/"} // Redirect on click
          component="div" // Use 'div' to prevent NavLink behavior
      >
          Registration
      </NavButton>
      <NavButton
          key="about"
          aria-label="About Us"
          role="menuitem"
          component={NavLink}
          to="#"
      >
          About Us
      </NavButton>
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
              {/* <Search>
                <SearchIconWrapper>
                  <FaSearch />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search jobs..."
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={handleSearch}
                />
              </Search> */}

              {/* <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  aria-label="show 3 new notifications"
                  sx={{ color: "#000000" }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip> */}

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
            <ListItem button key="home" component={NavLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="jobs" component={NavLink} to="/jobs">
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem
              button
              key="registrationform"
              onClick={() => window.location.href = "https://staging-cv-app.edjobster.com/"} // Redirect on click
            >
              <ListItemText primary="Registration" sx={{ color: '#000000' }} />
            </ListItem>
            <ListItem button key="about" component={NavLink} to="#">
              <ListItemText primary="About Us" />
            </ListItem>
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

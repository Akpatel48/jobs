import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationOnIcon, Facebook, Twitter, Instagram, LinkedIn, ArrowUpward } from "@mui/icons-material";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: "48px 0 24px",
  boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  position: "relative",
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  color: "#333333",
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#0066cc",
  },
  marginBottom: "8px",
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "#333333",
  transition: "all 0.3s ease",
  marginRight: "16px",
  "&:hover": {
    color: "#0066cc",
    transform: "translateY(-2px)",
  },
}));

const BackToTop = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "-20px",
  right: "32px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const DynamicFooter = ({companyInfo}) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigationLinks = [
    "Home ",
    "Jobs ",
    "Registration ",
    "About Us ",
  ];

  return (
    <StyledFooter>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Navigation
            </Typography>
            {navigationLinks.map((link) => (
              <Box key={link} sx={{ display: 'block', mb: 1 }}>
                <FooterLink
                  variant="body2"
                  component="a"
                  role="link"
                  aria-label={`Navigate to ${link}`}
                >
                  {link}
                </FooterLink>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOnIcon style={{ marginRight: "8px" }} />
              <Typography variant="body2">{companyInfo.address } {companyInfo.city_name}, {companyInfo.state_name}, {companyInfo.country_name}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon style={{ marginRight: "8px" }} />
              <Typography variant="body2">{companyInfo.phone}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon style={{ marginRight: "8px" }} />
              <Typography variant="body2">{companyInfo.email}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <SocialIcon
                aria-label="Facebook"
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <Facebook />
              </SocialIcon>
              <SocialIcon
                aria-label="Twitter"
                onClick={() => window.open("https://twitter.com", "_blank")}
              >
                <Twitter />
              </SocialIcon>
              <SocialIcon
                aria-label="Instagram"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram />
              </SocialIcon>
              <SocialIcon
                aria-label="LinkedIn"
                onClick={() => window.open("https://linkedin.com", "_blank")}
              >
                <LinkedIn />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" gutterBottom>
              Subscribe to our newsletter for updates and exclusive offers.
            </Typography>
          </Grid>
        </Grid>

        <Box
          mt={4}
          pt={3}
          borderTop="1px solid #e0e0e0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={isMobile ? "column" : "row"}
        >
          <Typography variant="body2" color="textSecondary" align="center">
            Powered by Edjobster
          </Typography>
        </Box>

        <BackToTop onClick={scrollToTop} aria-label="Back to top">
          <ArrowUpward />
        </BackToTop>
      </Container>
    </StyledFooter>
  );
};

export default DynamicFooter;
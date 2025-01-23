import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, Container, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PublicIcon from '@mui/icons-material/Public';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

const ScrollContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    overflowX: "auto",
    position: "relative",
    padding: "20px",
    scrollBehavior: "smooth",
    flexWrap: "wrap",
    maxWidth: "100%", // Ensure it doesn't exceed the container width
    margin: "0 auto", // Center the container
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
    },
}));

const CompanyCard = styled(Card)(({ theme }) => ({
    minWidth: 280,
    maxWidth: 300, // Set a max width for better control
    margin: "0 16px",
    transition: "transform 0.3s ease-in-out",
    background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)"
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 200,
      margin: "0 8px",
    },
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)"
    },
    // Ensure buttons are visible on all screen sizes
    [theme.breakpoints.down('sm')]: {
      display: "block",
    }
}));

const ViewJobsButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    padding: "8px 24px",
    borderRadius: "25px",
    textTransform: "none",
    fontWeight: 600,
    width: "150px",
    "&:hover": {
        background: "linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)"
    },
    [theme.breakpoints.down('sm')]: {
        width: "120px",
        padding: "6px 16px",
    },
}));

const CardCarousel = ({companies}) => {
    const navigate = useNavigate();
    const scrollContainerRef = React.useRef(null);

    const handleClick = (id, name, isViewJobsClicked) => {
        navigate(`/jobs/${id}/${name}`, { state: { isViewJobsClicked } });
    };

    const handleScroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
        const scrollAmount = 300;
        container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
        }
    };

    const handleImageError = (e) => {
        e.target.src = "images.unsplash.com/photo-1560179707-f14e90ef3623";
    };

return (
    <>
        <Typography
            variant="h5"
            component="h2"
            sx={{
            mb: 3,
            fontWeight: 700,
            textAlign: "center",
            // color: "#1a237e"
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
        >
            Top Companies Hiring Now
        </Typography>

        <ScrollButton
            onClick={() => handleScroll("left")}
            sx={{ left: 0 }}
            aria-label="Scroll left"
        >
            <ArrowBackIos />
        </ScrollButton>

        <ScrollContainer ref={scrollContainerRef}>
            {companies.map((item) => (
            <CompanyCard key={item.id}>
                <CardMedia
                component="img"
                height="80" // Changed height from 140 to 80 for smaller icon
                image={`${item.logo}`}
                alt={`${item.name} logo`}
                onError={handleImageError}
                sx={{ 
                    objectFit: "contain", 
                    p: 2,
                    width: "80px", // Added fixed width for smaller icon
                    margin: "0 auto", // Center the icon
                    height: { xs: "60px", md: "80px" },
                }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                >
                    {item.name}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <PublicIcon style={{ marginRight: 8, fontSize: "14px" }} /> {/* Reduced icon size */}
                    <Typography
                    variant="body2"
                    component="a"
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#1976d2", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                    Visit Website
                    </Typography>
                </Box>

                <ViewJobsButton
                    variant="contained"
                    fullWidth
                    aria-label={`View jobs at ${item.name}`}
                    onClick={() => handleClick(item.id, item.name, true)}
                >
                    View Jobs
                </ViewJobsButton>
                </CardContent>
            </CompanyCard>
            ))}
        </ScrollContainer>

        <ScrollButton
            onClick={() => handleScroll("right")}
            sx={{ right: 0 }} 
            aria-label="Scroll right"
        >
            <ArrowForwardIos />
        </ScrollButton>

        <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
                variant="outlined"
                sx={{
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    borderRadius: "25px", // Add border radius
                    "&:hover": {
                        borderColor: "#1976d2",
                        backgroundColor: "rgba(25, 118, 210, 0.1)" // Add hover background color
                    }
                }}
                // onClick={() => navigate('/all-companies')}
            >
                View all companies
            </Button>
        </Box>
    </>
        );
    };

export default CardCarousel;
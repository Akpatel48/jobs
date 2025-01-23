import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  Alert,
  FormControl,
  InputLabel,
  Paper,
  Chip,
  styled
} from "@mui/material";
import { Search as SearchIcon, LocationOn as LocationOnIcon, Work as WorkIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)"
  }
}));

const TopJobSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");

  const popularJobTitles = [
    "English Teacher",
    "Product Designer",
    "Backend Developer",
    "UX Designer",
    "Frontend Developer",
  ];

  const experienceLevels = ["Fresher", ...Array.from({ length: 30 }, (_, i) => `${i + 1} year${i > 0 ? 's' : ''}`)];

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    const trimmedLocation = location.trim();
    const trimmedExperience = experience.trim();

    if (!trimmedSearchTerm && !trimmedLocation && !trimmedExperience) {
      setError("Please enter at least one keyword to search relevant jobs");
      return;
    }

    setError("");
    navigate('/jobs', { state: { searchTerm: trimmedSearchTerm, location: trimmedLocation, experience: trimmedExperience } });
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 , mt: 15}}>
      <StyledPaper elevation={0}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 4
          }}
        >
          Find Your Dream Job
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mb: 3
          }}
        >
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            label="Job Title"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <WorkIcon style={{ marginRight: 8, color: "#666" }} />
              )
            }}
          />
 
          <TextField
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <LocationOnIcon style={{ marginRight: 8, color: "#666" }} />
              )
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="experience-label">Experience Level</InputLabel>
            <Select
              labelId="experience-label"
              value={experience}
              label="Experience Level"
              onChange={(e) => setExperience(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 45 * 4 + 8, // 48px is the default item height, 6 items + 8px padding
                  },
                },
              }}
            >
              {experienceLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 15,
              fontSize: "1.1rem",
              textTransform: "none",
              backgroundColor: "primary.main",
              
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "translateY(-2px)",
                transition: "all 0.3s ease"
              }
            }}
            startIcon={<SearchIcon />}
          >
            Search Jobs
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: "text.secondary" }}>
            Popular Searches:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {popularJobTitles.slice(0, 5).map((title) => (
              <Chip
                key={title}
                label={title}
                onClick={() => setSearchTerm(title)}
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "white"
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default TopJobSearch;
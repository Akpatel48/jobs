import React, { useState, useEffect, useRef } from "react";
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
import { Search as SearchIcon, LocationOn as LocationOnIcon, Work as WorkIcon, Search } from "@mui/icons-material";
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

const Searchtest = ({ searchTerm, onSearchChange, onSearchComplete }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");
  const searchRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      onSearchComplete();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

    setError("");
    navigate('/jobs', { state: { searchTerm: trimmedSearchTerm, location: trimmedLocation, experience: trimmedExperience } });

    if (!error) {
      onSearchComplete();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4, mt: 11, width: "80%" }} >
      <StyledPaper elevation={0} sx={{ borderRadius: 50 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: 50,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Enter keyword / designation / companies |"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: { paddingLeft: 20, color: "#666" }
            }}
          />
          <TextField
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location                                          |"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: { paddingLeft: 19, color: "#666" }
            }}
          />
          
          <FormControl variant="standard" sx={{ minWidth: 150 }}>
            <Select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              displayEmpty
              disableUnderline
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ color: "#666" }}
            >
              <MenuItem value="" disabled>
                Select experience
              </MenuItem>
              {experienceLevels.slice(0, 5).map((level) => (
                <MenuItem key={level} value={level.split(" ")[0]}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          

          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            sx={{
              borderRadius: 50,
              backgroundColor: "#1a73e8",
              color: "white",
              padding: "10px 40px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1669c1",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Searchtest;
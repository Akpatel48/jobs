import { Box, Checkbox, FormControlLabel, Slider, Typography, Button } from "@mui/material";
import { useState } from "react";

function FilterSidebar({ onFilterChange }) {
    const [experience, setExperience] = useState([0, 30]); // Updated range: 0-30 years
    const [salary, setSalary] = useState([]);
    const [location, setLocation] = useState([]);
    const [department, setDepartment] = useState([]);
    const [showMoreSalary, setShowMoreSalary] = useState(false);
    const [showMoreLocation, setShowMoreLocation] = useState(false);
    const [showMoreDepartment, setShowMoreDepartment] = useState(false);

    const handleSliderChange = (event, newValue) => {
        setExperience(newValue);
        onFilterChange({ experience: newValue });
    };

    const handleCheckboxChange = (field, value) => {
        return (event) => {
            const updatedValues = event.target.checked
                ? [...field, value]
                : field.filter((item) => item !== value);
            onFilterChange({ [field]: updatedValues });
        };
    };
    return (
        <Box sx={{ width: "250px", padding: 2, background: "#f9f9f9" }}>
            <Typography variant="h6">All Filters</Typography>
    
            {/* Experience Slider */}
            <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1">Experience</Typography>
                <Slider
                    value={experience}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={30}
                    sx={{ mt: 2 }}
                />
            </Box>
    
            {/* Salary Checkboxes */}
            <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1">Salary</Typography>
                {["0-3 Lakhs", "3-6 Lakhs", "6-10 Lakhs", "10-15 Lakhs", "15-20 Lakhs"].slice(0, showMoreSalary ? undefined : 4).map((range, idx) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={salary.includes(range)}
                                onChange={handleCheckboxChange(salary, range)}
                            />
                        }
                        label={range}
                        key={idx}
                    />
                ))}
                <Button onClick={() => setShowMoreSalary(!showMoreSalary)}>
                    {showMoreSalary ? "View Less" : "View More"}
                </Button>
            </Box>
    
            {/* Location Checkboxes */}
            <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1">Location</Typography>
                {["Bengaluru", "Hyderabad", "Pune", "Delhi", "Mumbai"].slice(0, showMoreLocation ? undefined : 4).map((loc, idx) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={location.includes(loc)}
                                onChange={handleCheckboxChange(location, loc)}
                            />
                        }
                        label={loc}
                        key={idx}
                    />
                ))}
                <Button onClick={() => setShowMoreLocation(!showMoreLocation)}>
                    {showMoreLocation ? "View Less" : "View More"}
                </Button>
            </Box>
    
            {/* Department Checkboxes */}
            <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1">Department</Typography>
                {["Engineering - Software", "IT & Services", "UX, Design", "Consulting"].slice(0, showMoreDepartment ? undefined : 3).map((dept, idx) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={department.includes(dept)}
                                onChange={handleCheckboxChange(department, dept)}
                            />
                        }
                        label={dept}
                        key={idx}
                    />
                ))}
                <Button onClick={() => setShowMoreDepartment(!showMoreDepartment)}>
                    {showMoreDepartment ? "View Less" : "View More"}
                </Button>
            </Box>
        </Box>
    );
}

export default FilterSidebar;
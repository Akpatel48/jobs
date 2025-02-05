import React from "react";
import { Box, Button, Container } from "@mui/material";
import Navbar from "../components/Navbar";

const CandidateRegistrationForm = () => {

const handleRedirect = () => {
    window.location.href = "https://cvtuner.edjobster.com/"; // Redirect function
};

return (
        <Container maxWidth="md">
            <Navbar/>
            <Box sx={{ display: "flex", justifyContent: "center", backgroundColor: "#ffffff", mt: 0, p: 0 }}>
                <Button variant="contained" color="primary" onClick={handleRedirect} sx={{ mt: 15, borderRadius: 6 }}>
                    Registration & Create Resumes
                </Button>
            </Box>
        </Container>
    );
};

export default CandidateRegistrationForm;
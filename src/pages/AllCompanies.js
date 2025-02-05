import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    Button
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
import { apiGET } from '../utils/apis';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllCompanies = () => {
    const [companies, setcompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCompanies, setVisibleCompanies] = useState(9);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGET('account/get-all-companycarrer/');
                // console.log("companies data", response.data.companies)
                setcompanies(response.data.companies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleClick = (id, name, isViewJobsClicked) => {
        navigate(`/jobs/${id}/${name}`, { state: { isViewJobsClicked } });
    };

    const handleImageError = (e) => {
        e.target.src = "images.unsplash.com/photo-1560179707-f14e90ef3623";
    };

    const handleLoadMore = () => {
        setVisibleCompanies(prev => prev + 9);
    };

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const companiesToShow = filteredCompanies.slice(0, visibleCompanies);

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ py: 4, marginTop: "80px", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        textAlign: 'center',
                        fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                >
                    All Companies
                </Typography>

                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '10px 20px',
                            width: '100%',
                            maxWidth: '500px',
                            borderRadius: '25px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                    />
                </Box>

                <Grid container spacing={3} style={{ justifyContent: "center" }}>
                    {companiesToShow.map((company) => (
                        <Grid item xs={12} sm={6} md={4} key={company.id} >
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out',
                                    borderRadius: "20px",
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)'
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="80"
                                    image={company.logo}
                                    alt={`${company.name} logo`}
                                    onError={handleImageError}
                                    sx={{
                                        objectFit: 'contain',
                                        p: 2,
                                        width: '80px',
                                        margin: '0 auto',
                                        height: { xs: '60px', md: '80px' }
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {company.name}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2
                                    }}>
                                        <PublicIcon sx={{ mr: 1, fontSize: '14px' }} />
                                        <Typography
                                            variant="body2"
                                            component="a"
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: '#1976d2',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            Visit Website
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: '25px',
                                            textTransform: 'none',
                                            fontWeight: 600
                                        }}
                                        onClick={() => handleClick(company.id, company.name, true)}
                                    >
                                        View Jobs
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {filteredCompanies.length > visibleCompanies && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            sx={{ mt: 4, borderRadius: '20px' }}
                            onClick={handleLoadMore}
                        >
                            MORE COMPANIES
                        </Button>
                    </Box>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default AllCompanies; 
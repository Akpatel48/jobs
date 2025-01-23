
import React, { useState, useEffect } from 'react';
import { apiGET } from '../utils/apis';
import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardCarousel from '../components/CardCarousel';
import StatsSection from '../components/StatsSection';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../utils/api';
import ProductHeroLayout from './Views/ProductHeroLayout';
import SearchIcon from '@mui/icons-material/Search';
import TopJobSearch from '../components/TopJobSearch';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGET('account/get-all-companycarrer/');
                // console.log("companies data", response.data.companies)
                setProducts(response.data.companies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGET('jobs/latest-jobs/');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiGET('jobs/count-list/');
                const statsData = [
                    { label: 'Candidates', value: response.data.total_candidates },
                    { label: 'Jobs', value: response.data.total_jobs },
                    { label: 'Companies', value: response.data.total_companies },
                ];
                setStats(statsData);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const backgroundImage = 'https://themewagon.github.io/jobboard/images/hero_1.jpg';

    return (
        <div>
            <Navbar />

            {/* <ProductHeroLayout
                sxBackground={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundColor: '#7fc7d9', // Average color of the background image.
                    backgroundPosition: 'center',
                }}
                >
                <img
                    style={{ display: 'none' }}
                    src={backgroundImage}
                    alt="increase priority"
                />
                <Typography color="inherit" align="center" variant="h3" marked="center">
                    The Easiest Way To Get Your Dream Job
                </Typography>
                <Typography
                    color="inherit"
                    align="center"
                    variant="h5"
                    sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
                >
                </Typography>
            </ProductHeroLayout> */}
    
            <TopJobSearch/>

            <Container 
                maxWidth="lg" // Adjust maxWidth to control the container size
                sx={{ 
                    position: "relative", 
                    py: { xs: 2, sm: 3, md: 0 },
                    mx: "auto", // Center the container
                }}
            >
                <CardCarousel companies={products} />
            </Container>
               
            <Box sx={{ width: '100%', mt: 5, overflowY: 'auto', maxHeight: '400px' }}>
                <StatsSection stats={stats} />
            </Box>
            
            <Box sx={{ width: '100%', mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f6f8' }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
                    Job Listed
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 1200 }}>
                    {jobs.slice(0, 8).map((job) => (
                        <Card 
                        key={job.id} 
                        sx={{ 
                            mb: 2, 
                            mx: 'auto', 
                            width: '100%', 
                            maxWidth: 1200, 
                            height: 120,
                            position: 'relative',
                            transition: 'transform 0.3s, box-shadow 0.3s', 
                            cursor: 'pointer',

                            '&:hover': {
                                // transform: 'scale(1.05)',
                                boxShadow: 3,
                                '&::before': {
                                    height: '100%',
                                }
                            },

                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '6px',
                                height: 0,
                                backgroundColor: '#89ba16',
                                transition: 'height 0.3s',
                            }
                            }}
                        onClick={() => navigate(`/jobs/Careers/${job?.id}/${encodeURIComponent(job?.title)}`, { state: { logo: job.company_logo, company: job.company_name , companyId: job.company_id } })}
                        >
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img 
                                            src={`${baseUrl}${job.company_logo}`} 
                                            alt={job.company_name} 
                                            style={{ width: '100%', maxWidth: '80px' }} 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">{job.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">{job.company_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="textSecondary">{job.location}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Chip 
                                            label={job.type} 
                                            size="small"
                                            sx={{ 
                                                backgroundColor: job.type === 'Full Time' ? '#89ba16' : '#dc3545', 
                                                color: 'white', 
                                                borderRadius: '4px'
                                            }} 
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            <ToastContainer />
            <Footer />
        </div>
    );
}

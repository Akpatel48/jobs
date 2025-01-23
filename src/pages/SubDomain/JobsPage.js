import { Box, Button, Card, CardContent, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../../components/Navbar';
import { useGetFilterJobsQuery } from '../../redux/services/jobs/JobListService';
import Footer from '../../components/Footer';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../../utils/api';
import FilterSidebar from './FilterSidebar';
import TopJobSearch from '../../components/TopJobSearch';
import BackgroundImageURL from "../../assets/images/BackgroundImageURL.jpeg"

function JobsPage() {
    // const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const applyNowRef = useRef(null);
    const { searchTerm, location: searchLocation, experience } = location.state || {};
    const [jobType, setJobType] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [isViewJobsClicked, setIsViewJobsClicked] = useState(true);

    const { data: jobs = [], refetch , error, isLoading } = useGetFilterJobsQuery({
        title: searchTerm,
        location: searchLocation,
        experience,
        jobType,
        salaryRange
    });

    const handleFilterChange = () => {
        refetch({
            title: searchTerm,
            location: searchLocation,
            experience,
            jobType,
            salaryRange
        });
    };

    useEffect(() => {
        refetch();
    },[])

    const handleViewOpeningsClick = () => {
        if (applyNowRef.current) {
            const offset = 80;
            const topPosition = applyNowRef.current.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: "#ffffff", minHeight: "50vh", mt: 11, p: 0 }}>
                <Box
                    sx={{
                        display: 'flex', // Add flexbox
                        flexDirection: 'column', // Align items vertically
                        justifyContent: 'center', // Center items vertically
                        alignItems: 'center', // Center items horizontally
                        backgroundImage: `url(${BackgroundImageURL})`,
                        backgroundSize: '110%', // Zoom effect
                        backgroundPosition: 'center',
                        color: '#fff',
                        textAlign: 'center',
                        py: 5,
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Optional overlay for better text contrast
                            zIndex: 1,
                        },
                        '& > *': {
                            position: 'relative',
                            zIndex: 2,
                            maxWidth: '700px',
                            mx: 'auto',
                        }
                    }}
                >
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        sx={{ 
                            position: 'absolute', 
                            top: 16, // Adjusted for better visibility
                            left: 16, // Adjusted for better visibility
                            zIndex: 3, // Ensure it appears above other elements
                            color: '#fff' // Ensure the icon is visible against the background
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Find the career of your dreams
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        We're more than just a workplace. We're a family.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        We know that finding a meaningful and rewarding job can be a long journey. Our goal is to make that process as easy as possible for you, and to create a work environment that's satisfying - one where you'll look forward to coming to every day. Start your journey with us by browsing available jobs.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleViewOpeningsClick}>
                        View Openings
                    </Button>
                </Box>
            </Box>
            {/* <TopJobSearch />          */}
            <Grid container spacing={0} sx={{ mt: 3 }}>
                {/* <Grid item xs={12} md={3}>
                    <FilterSidebar onFilterChange={handleFilterChange} />
                </Grid> */}
                <Grid item xs={12} md={12}>
                    <Box ref={applyNowRef} sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Apply Now
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4 }}>
                            Current Openings
                        </Typography>
                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ px: 2 }}>
                            {jobs.length > 0 ? (
                                jobs.map((job, index) => (
                                    <Grid item xs={12} sm={12} md={10} key={job.id}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                maxWidth: '100%', 
                                                minWidth: '600px', 
                                                borderRadius: '8px',
                                                position: 'relative', 
                                                width: '100%', 
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                                },
                                            }}
                                            onClick={() => navigate(`/jobs/Careers/${job?.id}/${encodeURIComponent(job?.title)}`, { state: { logo: job.company_logo, company: job.company_name , companyId: job.company_id, isViewJobsClicked } })}
                                        >
                                            <Box
                                                component="img"
                                                src={`${baseUrl}${job.company_logo.slice(1)}`}
                                                alt={`${job.company_name} logo`}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: '10%',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                }}
                                            />
                                            <CardContent sx={{ textAlign: 'left' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                                                    {job.title}
                                                </Typography>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {job.company_name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {job.Experience} - {job.Experience_max} Yrs | {job.salary_min} - {job.salary_max} | {job.location}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                                    {/* {job.description} */}
                                                </Typography>
                                                {/* <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                                                    {job.tags.join(' • ')}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                    Posted by {job.posted_by}
                                                </Typography> */}
                                                <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                                                    {new Date(job.posted_date).toISOString().split('T')[0]}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                                    <Card variant="outlined" sx={{ maxWidth: '300px', mx: 'auto', p: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" color="textSecondary">
                                                No results found
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Try adjusting your search criteria.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                        <Button variant="outlined" sx={{ mt: 4, borderRadius: '20px' }}>
                            10 MORE
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default JobsPage
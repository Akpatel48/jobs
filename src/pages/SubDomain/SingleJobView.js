import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Button, Card, CircularProgress, Box,
    Typography,
    Divider,
    IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Link } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAddresseDetailsQuery } from '../../redux/services/settings/AddressesService';
import { useGetJobDetailsCareerQuery } from '../../redux/services/jobs/JobServices';
import { useGetCareerSiteCompanyDataQuery } from '../../redux/services/settings/CareerSiteService';
import Footer from '../../components/Footer';
import DynamicFooter from '../../components/DynamicFooter';
import BackgroundImageURL from "../../assets/images/BackgroundImageURL.jpeg"
import { Helmet } from 'react-helmet';
import DocumentTitle from 'react-document-title';

function SingleJobView() {
    const { id } = useParams()
    const location = useLocation();
    const logo = location.state?.logo;
    const company = location.state?.company;
    const companyId = location.state?.companyId;
    const isViewJobsClicked = location.state?.isViewJobsClicked || false;
    const companyInfo = location.state?.companyInfo || false;
    
    localStorage.setItem("jobId", id)
    const { data, isLoading, refetch } = useGetJobDetailsCareerQuery(id);    
    const { data: addressData, isLoading: addressIsLoading, refetch: addressRefetch } = useGetAddresseDetailsQuery(data?.data.location);
    const { data: fetchedCareerSiteCompanyData, refetch: CompanyDatarefetch } = useGetCareerSiteCompanyDataQuery(companyId);
    const careerSiteCompanyData = companyId ? fetchedCareerSiteCompanyData : location.state?.careerSiteCompanyData;
    const [jobType, setJobType] = useState()
    const navigate = useNavigate()    
    
    const mappingEducation = {
        1: "High School",
        2: "Junior College",
        3: "Bachelors",
        4: "Masters"
    }

    useEffect(() => {
        refetch()
    }, [id])

    useEffect(() => {
        if (companyId) {
            CompanyDatarefetch();
        }
    }, [companyId])

    useEffect(() => {
        if (data?.data.type === "F") {
            setJobType("Full Time")
        } else {
            setJobType("Part Time")
        }
        // console.log(data?.assesment)
        localStorage.setItem("assesment", data?.data.assesment)
    }, [data])
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
            toast.success("Link copied");
        }, 50); 
    };

    useEffect(() => {
        if (data && data.data) {
            // Set dynamic meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            // if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = "description";
                document.head.appendChild(metaDescription);
            // }
            metaDescription.content = data.data.description || '';

            // Set dynamic meta keywords
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            // if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = "keywords";
                document.head.appendChild(metaKeywords);
            // }
            metaKeywords.content = `Job, ${data.data.title}, ${data.data.company_name}` || '';

            // Cleanup function to remove meta tags if needed
            return () => {
                // if (metaDescription) {
                    document.head.removeChild(metaDescription);
                // }
                // if (metaKeywords) {
                    document.head.removeChild(metaKeywords);
                // }
            };
        }
    }, [data]); // Run effect when data changes

    return (
        <DocumentTitle title={`${data?.data.title} - ${data?.data.company_name}`}>
            <>
                <Helmet>
                    <title>{data?.data.title} - {data?.data.company_name}</title>
                    <meta name="description" content={data?.data.description} />
                    <meta name="keywords" content={`Job, ${data?.data.title}, ${data?.data.company_name}`} />
                </Helmet>
                <ToastContainer />
                <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", mt: 0, p: 0 }}>
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
                    <Box
                        sx={{
                            backgroundImage: `url(${careerSiteCompanyData?.companies_details.background_image || BackgroundImageURL})`, // Use dynamic image
                            backgroundSize: '110%', // Zoom effect
                            backgroundPosition: 'center',
                            color: '#fff',
                            textAlign: 'center',
                            py: 5,
                            // filter: 'blur(1px)', // Blur effect
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
                            }
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            { data?.data.company_name } | {data?.data.type}
                        </Typography>
                        <Typography variant="h3">
                            {data?.data.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {addressData?.data.city_name}, {addressData?.data.country_name}
                        </Typography>
                        <Typography variant="caption">
                            Posted on {data?.data.posted_date}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ mr: 1 }}
                                onClick={() => navigate(`/JobApplication/${data.data.webform}`, { state: { job_name: data?.data.title } })}
                            >
                                I'm interested
                            </Button>
                            <Button 
                                variant="outlined" 
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional hover effect
                                    }
                                }}>
                                Share job via email
                            </Button>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <IconButton
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                            >
                                <Facebook sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
                            >
                                <Twitter sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`, '_blank')}
                            >
                                <LinkedIn sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => window.open(`https://api.whatsapp.com/send?text=${window.location.href}`, '_blank')}
                            >
                                <WhatsApp sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => window.open(`https://t.me/share/url?url=${window.location.href}`, '_blank')}
                            >
                                <Telegram sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick= {handleCopyLink}
                            >
                                <Link sx={{ color: 'white' }}/>
                            </IconButton>
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2, justifyContent: "center" }}>
                        <Typography
                            variant="body1"
                            onClick={() => navigate(`/jobs/${data?.data.company}/${encodeURIComponent(data?.data.company_name)}`, { state: { isViewJobsClicked } })} // Redirect to Job Listing
                            sx={{ 
                                color: 'primary.main', 
                                textDecoration: 'none', 
                                '&:hover': {
                                    textDecoration: 'underline', // Underline on hover
                                    cursor: 'pointer' // Change cursor to pointer
                                }
                            }}
                        >
                            Job listing
                        </Typography>
                        <IconButton sx={{ mx: 1, p: 0.5 }}>
                            <ArrowForwardIosIcon sx={{ color: '#333', fontSize: '16px' }} />
                        </IconButton>
                        <Typography variant="body1" sx={{  }}>
                            Job details
                        </Typography>
                    </Box>
                    <Card sx={{ mt: 2, backgroundColor: "#f9fafb", p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid container spacing={2} sx={{ maxWidth: '1200px', width: '100%' }}>
                                <Grid item xs={12} md={7}>
                                    <Typography variant="h5" gutterBottom sx={{ color: '#333' }}>
                                        Job Description
                                    </Typography>
                                    <Box
                                        sx={{ marginBottom: '1em', color: '#333' }}
                                        dangerouslySetInnerHTML={{ __html: data?.data.description }}
                                    />
                                </Grid>
                                <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 'auto' }} />
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h5" gutterBottom sx={{ color: '#333' }}>
                                        Job Information
                                    </Typography>
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Date Opened:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{data?.data.created.split('T')[0]}</Typography>
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Job Type:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{data?.data.type}</Typography>
                                    
                                    {/* <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Industry:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{data?.data.industry}</Typography> */}
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Work Experience:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{data?.data.exp_min}-{data?.data.exp_max} Years</Typography>
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>City:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{addressData?.data.city_name}</Typography>
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>State/Province:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{addressData?.data.state_name}</Typography>
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Country:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{addressData?.data.country_name}</Typography>
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Zip/Postal Code:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{addressData?.data.pincode}</Typography>
                                    
                                    <Typography sx={{ mb: 0.5, color: '#333', fontWeight: 'bold' }}>Number of Positions:</Typography>
                                    <Typography sx={{ mb: 1, color: '#333' }}>{data?.data.vacancies}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                                sx={{
                                    mb: 2,
                                    // borderRadius: "20px",
                                    width: "150px"
                                }}
                                variant="contained"
                                onClick={() => navigate(`/JobApplication/${data.data.webform}`,  { state: { job_name: data?.data.title } })}
                            >
                                I'm Interested
                            </Button>
                        </Box>
                    </Card>
                </Box>
                {isViewJobsClicked ? <Footer /> : <DynamicFooter companyInfo={companyInfo} />}
            </>
        </DocumentTitle>
    )
}

export default SingleJobView
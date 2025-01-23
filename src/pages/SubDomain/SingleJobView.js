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
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useGetAddresseDetailsQuery } from '../../redux/services/settings/AddressesService';
import { useGetJobDetailsCareerQuery } from '../../redux/services/jobs/JobServices';
import { useGetCareerSiteCompanyDataQuery } from '../../redux/services/settings/CareerSiteService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import edjobster06 from "../../assets/images/J.png"
import BackgroundImageURL from "../../assets/images/BackgroundImageURL.jpeg"



function SingleJobView() {
    const { id } = useParams()
    const location = useLocation();
    const logo = location.state?.logo;
    const company = location.state?.company;
    const companyId = location.state?.companyId;
    // console.log("companyId......", companyId);

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

    // useEffect(() => {
    //     if (data?.data?.title) {
    //         document.title = data.data.title; // Set the document title
    //         const metaTitle = document.querySelector('meta[property="title"]');
    //         const metaImage = document.querySelector('meta[property="image"]');
    //         const metaDescription = document.querySelector('meta[name="description"]');

    //         if (metaTitle) {
    //             metaTitle.setAttribute('content', data.data.title); // Update the meta tag content
    //             metaImage.setAttribute('content', edjobster06);
    //             metaDescription.setAttribute('content', data.data.description || "");
    //         } else {
    //             const newMetaTitle = document.createElement('meta');
    //             newMetaTitle.setAttribute('property', 'title');
    //             newMetaTitle.setAttribute('content', data.data.title);
    //             document.head.appendChild(newMetaTitle);

    //             const newMetaDescription = document.createElement('meta');
    //             newMetaDescription.setAttribute('name', 'description');
    //             newMetaDescription.setAttribute('content', data.data.description || "");
    //             document.head.appendChild(newMetaDescription);
    //         }
    //     }
    // }, [data]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
            toast.success("Link copied");
        }, 50);
    };
    console.log(data);

    return (
        <>
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
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            zIndex: 1,
                        },
                        '& > *': {
                            position: 'relative',
                            zIndex: 2,
                        }
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        {data?.data?.company_name} | {data?.data.type}
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
                            onClick={() => window.open('mailto:?subject=Sharing a document')}
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
                            onClick={handleCopyLink}
                        >
                            <Link sx={{ color: 'white' }} />
                        </IconButton>
                    </Box>

                </Box>
                <Card sx={{ mt: 5, backgroundColor: "#f9fafb", p: 2 }}>
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
                                <Typography sx={{ mb: 1, color: '#333' }}>{data?.data?.created?.split('T')[0]}</Typography>

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
                            onClick={() => navigate(`/JobApplication/${data.data.webform}`, { state: { job_name: data?.data.title } })}
                        >
                            I'm Interested
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default SingleJobView
import React, { useEffect, useRef, useState, } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../../assets/css/Careersite.css"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
    ListItemIcon,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContent,
    Box,
    Chip,
    Avatar,
    useMediaQuery,
    CardContent,
    IconButton,
    InputAdornment,
    Pagination,
    Autocomplete
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PersonIcon from '@mui/icons-material/Person';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Carousel from 'react-material-ui-carousel'
import FileUpload from 'react-material-file-upload';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// eslint-disable-next-line import/no-unresolved
import { useGetTestimonialsQuery } from '../../redux/services/settings/TestimonialService';
import ReactQuill from 'react-quill';
import { useGetJobListQuery, useGetJobsByCompanyQuery } from '../../redux/services/jobs/JobListService';
import { companyInfoGET } from '../../utils/apis';
import { showToast } from '../../utils/toast';
import { useGetCareerSiteCompanyDataQuery, useGetCompanyInfoQuery } from '../../redux/services/settings/CareerSiteService';
import { useDepartmentGetQuery } from '../../redux/services/settings/DepartmentService';
import { useGetAddressesQuery } from '../../redux/services/settings/AddressesService';
import DynamicNavbar from '../../components/DynamicNavbar';
import DynamicFooter from '../../components/DynamicFooter';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function CareerSiteDescription() {
    const { id } = useParams()
    // console.log("company id", id)
    const navigate = useNavigate()
    const location = useLocation();
    const applyNowRef = useRef(null);
    const isViewJobsClicked = location.state?.isViewJobsClicked || false;
    const [companyInfo, setCompanyInfo] = useState({})
    const { data, isLoading, refetch } = useGetCompanyInfoQuery();
    const { data: careerSiteCompanyData, refetch: CompanyDatarefetch } = useGetCareerSiteCompanyDataQuery(id);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    // const itemsPerPage = 8;    
    
    useEffect(() => {
        refetch()
        const fetchData = async () => {
            try {
                const response = await companyInfoGET(id);
                // console.log("companie info data", response.data.company)
                setCompanyInfo(response.data.company)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, refetch])
    const { data: JobListByCompany, refetch: JobListByCompanyRefetch } = useGetJobsByCompanyQuery(id);
    // const { data: jobList, refetch: JobListRefetch } = useGetJobListQuery();
    useEffect(() => {
        if (id) {
            JobListByCompanyRefetch()
            CompanyDatarefetch()
            setValue("2");
        }
        else {
            // JobListRefetch()
        }
    // }, [id, JobListByCompanyRefetch, JobListRefetch])
    }, [id, JobListByCompanyRefetch])

    const { data: testimonialData, refetch: testimonialDataRefetch } = useGetTestimonialsQuery();
    useEffect(() => {
        testimonialDataRefetch()
    }, [testimonialDataRefetch])

    const { data: departmentData, refetch: departmentDataRefetch } = useDepartmentGetQuery(id);
    useEffect(() => {
        departmentDataRefetch();
    }, [departmentDataRefetch]);

    // const { data: addressesData, refetch: addressesDataRefetch } = useGetAddressesQuery()
    // useEffect(() => {
    //     addressesDataRefetch()
    // }, [addressesDataRefetch])

    const [AboutData, setAboutData] = useState({
        institute_name: '',
        institute_logo: '',
        institute_description: '',
        institute_address: '',
        institute_landmark: '',
        institute_city: '',
        institute_state: '',
        institute_country: '',
        institute_tags: []
    })
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
        if (data?.company) {
            setAboutData({
                institute_name: data?.company?.name,
                institute_logo: data?.company?.logo,
                institute_description: data?.company?.description,
                institute_address: data?.company?.address,
                institute_landmark: data?.company?.landmark,
                institute_city: data?.company?.city_name,
                institute_state: data?.company?.state_name,
                institute_country: data?.company?.country_name,
                institute_tags: data?.company?.tag
            })
        }
        // if (data?.code !== 200) {
        //     showToast("error", "Error fetching the Data")
        // }
    }, [data])

    // console.log(AboutData.institute_tags)

    const handleClick = () => {
        navigate(-1);
    };

    const handleSearch = () => {
        if (searchTerm) {
            const filtered = JobListByCompany.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(JobListByCompany);
        }
    };

    useEffect(() => {
        setFilteredJobs(JobListByCompany);
    }, [JobListByCompany]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = filteredJobs ? filteredJobs.slice(indexOfFirstItem, indexOfLastItem) : [];

    // const filteredCurrentItems = filteredJobs.filter(job =>
    //     job.title.toLowerCase().includes(searchInput.toLowerCase())
    // )

    const filteredCurrentItems = (filteredJobs ?? []).filter(job =>
        job?.title?.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleViewOpeningsClick = () => {
        if (applyNowRef.current) {
            const offset = 80;
            const topPosition = applyNowRef.current.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    };    
    

    return (
        <div>
            {isViewJobsClicked ? <Navbar /> : <DynamicNavbar companyInfo={companyInfo} />}
    
            <Box sx={{ backgroundColor: "#ffffff", minHeight: "50vh", mt: 13, p: 0 }}>
                <Box
                    sx={{
                        display: 'flex', // Add flexbox
                        flexDirection: 'column', // Align items vertically
                        justifyContent: 'center', // Center items vertically
                        alignItems: 'center', // Center items horizontally
                        backgroundImage: `url(${careerSiteCompanyData?.companies_details.background_image || "https://static.zohocdn.com/recruit/images/cover1.0e02dce62a260cd1dbbafeacf59e558a.jpg"})`, // Use dynamic image
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
                    {isViewJobsClicked && (
                        <IconButton   
                            onClick={() => navigate(-1)} 
                            sx={{ 
                                position: 'absolute', 
                                top: 16, 
                                left: 16,
                                zIndex: 3, 
                                color: '#fff'
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {careerSiteCompanyData?.companies_details.title1 || "Find the career of your dreams"}
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {careerSiteCompanyData?.companies_details.title2 || "We're more than just a workplace. We're a family."}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        {careerSiteCompanyData?.companies_details.title3 || "We know that finding a meaningful and rewarding job can be a long journey. Our goal is to make that process as easy as possible for you, and to create a work environment that's satisfying - one where you'll look forward to coming to every day. Start your journey with us by browsing available jobs."}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleViewOpeningsClick}>
                        View Openings
                    </Button>
                </Box>
            </Box>

            <Box ref={applyNowRef} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Apply Now
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Current Openings
                </Typography>
                <Stack spacing={2} sx={{ width: 300, mx: 'auto', mb: 4 }}>
                <Autocomplete
                    freeSolo
                    options={(Array.isArray(filteredJobs) ? filteredJobs : []).map((job) => job.title)}
                    onInputChange={(event, newInputValue) => {
                        setSearchInput(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Jobs"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                </Stack>
                <Grid container spacing={2} justifyContent="center" sx={{ px: 20 }}>
                    {Array.isArray(filteredCurrentItems) && filteredCurrentItems.length > 0 ? (
                        filteredCurrentItems.map((job, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} sx={{ maxWidth: '300px'}}>
                                <Card
                                    key={job.id}
                                    variant="outlined"
                                    sx={{
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        },
                                        borderRadius: '10px'
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'left' }}>
                                        <Typography variant="subtitle2">
                                            {job.type}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            color="primary"
                                            onClick={() => navigate(`/jobs/Careers/${job?.id}/${encodeURIComponent(job?.title)}`, { state: { logo: companyInfo.logo, company: companyInfo.name, careerSiteCompanyData:careerSiteCompanyData } })}
                                            sx={{ 
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                }, 
                                            }} 
                                        >
                                            {job.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {job.address_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: '300px'}}>
                            <Card 
                                variant="outlined" 
                                sx={{
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    },
                                    borderRadius: '10px'
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="body1" color="primary">
                                        No jobs available.
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
            {isViewJobsClicked ? <Footer /> : <DynamicFooter companyInfo={companyInfo} />}
        </div>
    );
}

export default CareerSiteDescription
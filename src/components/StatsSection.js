import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import img1 from './8.webp'

const StatsSection = ({ stats }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.1,
    });

    return (
        <Box
            ref={ref}
            sx={{
                color: 'black',
                py: 5,
                // backgroundImage: 'url(https://themewagon.github.io/jobboard/images/hero_1.jpg)',
                backgroundImage: `url(${img1})`,
                // background: 'linear-gradient(45deg, rgba(255, 0, 0, 1) 0%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 0, 255, 1) 100%)',
                // background: 'linear-gradient(187deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)',
                // background: 'linear-gradient( rgba(34, 193, 195, 1) , rgba(253, 187, 45, 1) , rgb(73 125 218))',

                // background: 'linear-gradient(109.6deg, rgba(254, 253, 205, 1) 11.2%, rgba(163, 230, 255, 1) 91.1%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    JobBoard Site Stats
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti. */}
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {stats.map((stat, index) => (
                        <Grid item xs={6} sm={3} key={index} align="center">
                            <Typography variant="h3">
                                {inView && <CountUp end={stat.value} duration={2} />}
                            </Typography>
                            <Typography variant="body1">{stat.label}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default StatsSection;
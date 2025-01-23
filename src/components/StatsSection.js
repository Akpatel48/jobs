import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

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
                backgroundImage: 'url(https://themewagon.github.io/jobboard/images/hero_1.jpg)',
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
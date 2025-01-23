import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';

const CategoryCard = ({ category }) => {
    return (
        <Card
            sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderColor: '#1D4ED8',
                },
            }}
        >
            <CardContent>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <img src={category.icon} alt={`${category.name} icon`} width="50px" height="50px" />
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: 'red' }}>
                        {/* ({category.count}) */}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
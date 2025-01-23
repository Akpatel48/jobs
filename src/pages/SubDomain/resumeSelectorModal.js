import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  Button, 
  IconButton 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ResumeSelectorModal({ resumes, onSelect, onClose }) {
    const [selectedResumeId, setSelectedResumeId] = useState(null);

    const handleSelect = (resumeId) => {
        setSelectedResumeId(resumeId);
    };
    
    const handleApplyNow = () => {
        if (selectedResumeId) {
          onSelect(selectedResumeId);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Select a Resume
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <List>
                    {resumes?.map((resume) => (
                        <ListItem key={resume.id}>
                            <Button 
                                fullWidth
                                variant="contained"
                                onClick={() => handleSelect(resume.id)}
                                sx={{
                                    bgcolor: selectedResumeId === resume.id ? 'primary.dark' : 'primary.main',
                                    '&:hover': {
                                        bgcolor: selectedResumeId === resume.id ? 'primary.dark' : 'primary.light',
                                    }
                                }}
                            >
                                {resume.jobTitle}
                            </Button>
                        </ListItem>
                    ))}
                </List>
                {selectedResumeId && (
                    <Button 
                        fullWidth
                        variant="contained"
                        onClick={handleApplyNow}
                        sx={{
                            mt: 2,
                            bgcolor: 'info.main',
                            '&:hover': {
                                bgcolor: 'info.dark',
                            }
                        }}
                    >
                        Apply Now
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}
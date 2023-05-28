import React, { useState, useEffect } from 'react';
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, Card, CardContent } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StudentsList from './students_table_list';

const Student_Table = () => {
    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />} 
                    aria-controls="class-accordian"
                >
                    <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                    <Typography sx={{pl:2, pt:1}}>Class 1A</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Card>
                        <CardContent>
                            <StudentsList />
                        </CardContent>
                    </Card>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default Student_Table
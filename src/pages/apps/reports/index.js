import React, { useEffect, useState } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Button, Select, FormControl, MenuItem, Grid, InputLabel } from '@mui/material';

const Reports_home = () => {
    const [Class, setClass] = useState('');
    const [Subject, setSubject] = useState('');
    const [Duration, setDuration] = useState('');
    const [studentName, setStudentName] = useState('');

    const handleSelect = (event, id) => {
        if (id === 'class-select') {
            setClass(event.target.value);
        } else if (id === 'subject-select') {
            setSubject(event.target.value)
        } else if (id === 'select-duration') {
            setDuration(event.target.value)
        } else if (id === 'select-student') {
            setStudentName(event.target.value)
        } else {
            console.log('please select the remaining')
        }
        console.log(id)
    }


    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
            <Card sx={{ borderRadius: 3 }}>
                <CardHeader
                    avatar={
                        <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                    }
                    title="Class Report"
                />
                <CardContent sx={{ p: 5 }}>
                    <Grid container>
                        <Grid xs={6} sx={{ pl: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id="class-select-label" size='small'>Select Class</InputLabel>
                                <Select
                                    labelId='class-select-label'
                                    id='class-select'
                                    value={Class}
                                    label="Select Class"
                                    onChange={(e) => {
                                        handleSelect(e, 'class-select')
                                    }}
                                    size='small'
                                    placeholder='Select Class'
                                >
                                    <MenuItem value={'Class1'}>Class 1</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6} sx={{ pl: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id="subject-select-label" size="small">Select Subject</InputLabel>
                                <Select
                                    labelId='subject-select-label'
                                    id='subject-select'
                                    value={Subject}
                                    label="Select Subject"
                                    onChange={(e) => {
                                        handleSelect(e, 'subject-select')
                                    }}
                                    size='small'
                                    placeholder='Select subject'
                                >
                                    <MenuItem value={'English'}>English</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sx={{ pl: 5, pt: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-duration-label" size='small'>Select Duration</InputLabel>
                                <Select
                                    labelId="select-duration-label"
                                    id='select-duration'
                                    value={Duration}
                                    label='Select Duration'
                                    onChange={(e) => {
                                        handleSelect(e, 'select-duration')
                                    }}
                                    size='small'
                                    placeholder='Select Duration'
                                >
                                    <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                    <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                    <MenuItem value={'Term'}>Term</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Button>Get Report</Button>
                </CardContent>
            </Card>
            <br />
            <Card sx={{ borderRadius: 3 }}>
                <CardHeader
                    avatar={
                        <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                    }
                    title="Student Report"
                />
                <CardContent>
                    <Grid container>
                        <Grid xs={12} sx={{ pl: 5, pt: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="studentName-search" size="small">Search Student by roll no./name</InputLabel>
                                <Select
                                    labelId="studentName-search"
                                    id="search-studentName"
                                    value={studentName}
                                    label="Search Student by roll no./name"
                                    onChange={(e) => {
                                        handleSelect(e, 'select-student')
                                    }}
                                    size="small"
                                    placeholder='Search student by name or roll no'
                                >
                                    <MenuItem value={'Mark'}>Mark</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sx={{ pl: 5, pt: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-duration-label" size='small'>Select Duration</InputLabel>
                                <Select
                                    labelId="select-duration-label"
                                    id='select-duration'
                                    value={Duration}
                                    label='Select Duration'
                                    onChange={(e) => {
                                        handleSelect(e, 'select-duration')
                                    }}
                                    size='small'
                                    placeholder='Select Duration'
                                >
                                    <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                    <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                    <MenuItem value={'Term'}>Term</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Button>Get Report</Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Reports_home
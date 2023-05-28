import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Button, Divider, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Popover, FormControl, Select, MenuItem } from '@mui/material';
import { withRouter } from 'next/router';
import { useRouter } from 'next/router'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import { MoreVert } from '@mui/icons-material';

const Class_Det = () => {
    const router = useRouter();
    const [classId, setclassId] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [attendance, setAttendance] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleAttandance = (event) => {
        setAttendance(event.target.value);
    };

    useEffect(() => {
        console.log(router.query.id);
        setclassId(router.query.id)
    }, [router.query]);

    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const id = open ? 'simple-popover' : undefined;
    const id1 = open1 ? 'overview-popover' : undefined;

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
            <Card fullwidth>
                <CardHeader
                    avatar={
                        <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 45 }}></Box>
                    }
                    action={
                        <Button aria-describedby={id1} onClick={handleClick1}><MoreVert></MoreVert></Button>
                    }
                    title={"Class " + classId}
                    subheader="Overview"
                />
                <Divider variant="middle" sx={{ borderWidth: 2, borderRadius: 10 }} />
                <CardContent>
                    <Grid container sx={{ pl: 4, pt: 2 }}>
                        <Grid xs={2}>
                            <Typography>Class Teacher</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography>Mojisola Alheri</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ pl: 4, pt: 2 }}>
                        <Grid xs={2}>
                            <Typography>Room no.</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography>310</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ pl: 4, pt: 2 }}>
                        <Grid xs={2}>
                            <Typography>No. of Students</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography>100</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ pl: 4, pt: 2 }}>
                        <Grid xs={2}>
                            <Typography>Boys</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography>67</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ pl: 4, pt: 2 }}>
                        <Grid xs={2}>
                            <Typography>Girls</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography>33</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ pl: 4, pt: 2 }}>
                        <Grid xs={2}>
                            <Typography>Ongoing Class</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography>English(Dinah Achola)</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Accordion sx={{ border: 'none' }} variant="text" elevation={0}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="students_summary"
                            id="students_header"
                        >
                            <Stack direction="row">
                                <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                                <Typography>&nbsp;&nbsp;Students</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Student details table to come here</Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
                <CardContent>
                    <Stack direction="row" sx={{ pl: 5 }}>
                        <Grid container >
                            <Grid xs={11}>
                                <Stack direction="row">
                                    <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                                    <Typography>&nbsp;&nbsp;Subjects</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Button sx={{ flex: 'end' }} aria-describedby={id} onClick={handleClick}><MoreVert></MoreVert></Button>
                    </Stack>
                    <Divider />
                    <Stack direction="row">
                        <Button>English</Button>
                        <Button>Mathematics</Button>
                        <Button>Science</Button>
                        <Button>Subject 4</Button>
                        <Button>Subject 5</Button>
                        <Button>Subject 6</Button>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction="row" sx={{ pl: 5 }}>
                        <Grid container >
                            <Grid xs={11}>
                                <Stack direction="row">
                                    <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                                    <Typography>&nbsp;&nbsp;Subjectwise Attendance %</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <FormControl>
                            <Select
                                labelId="selectAttendance"
                                id="AttendanceSelect"
                                value={attendance}
                                onChange={handleAttandance}
                                size="small"
                                fullWidth
                                sx={{ width: '100%', borderRadius: 10 }}
                            >
                                <MenuItem value={'Term'}>Term</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Divider />
                    <Typography>Here goes the attendance graph</Typography>
                </CardContent>
                <CardContent>
                    <Stack direction="row" sx={{ pl: 5 }}>
                        <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                        <Typography>&nbsp;&nbsp;Red Zone</Typography>
                    </Stack>
                    <Divider />
                    <Typography>Here goes the table for the red zoned students</Typography>
                </CardContent>
                <CardContent>
                    <Stack direction="row" sx={{ pl: 5 }}>
                        <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                        <Typography>&nbsp;&nbsp;Red Zone</Typography>
                    </Stack>
                    <Divider />
                    <Typography>Here goes the table for the red zoned students</Typography>
                </CardContent>
            </Card>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <Stack sx={{ p: 2 }}>
                    <Button varient="text" sx={{ textAlign: 'left' }}>Add Subject</Button>
                    <Button varient="text" sx={{ textAlign: 'left' }}>Manage Subjects</Button>
                </Stack>
            </Popover>
            <Popover id={id1} open={open1} anchorEl={anchorEl1} onClose={handleClose1} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <Stack sx={{ p: 2 }}>
                    <Button varient="text" sx={{ textAlign: 'left' }}>Edit Details</Button>
                    <Button varient="text" sx={{ color: '#FF0000', borderColor: '#FF0000', border: 1, textAlign: 'left' }}>Delete</Button>
                </Stack>
            </Popover>
        </Box>
    )
}

export default Class_Det
import React, { useState, useEffect } from 'react';
import { Box, Card, CardHeader, CardContent, Button, CardActions, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const Announcement_home = () => {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
            <Card sx={{borderRadius: 3}}>
                <CardHeader
                    avatar={
                        <Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
                    }
                    action={
                        <Button><MoreVert></MoreVert></Button>
                    }
                    title="Teacher's meet"
                />
                <CardContent>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                </CardContent>
                <CardActions>
                    <Typography sx={{textAlign: 'right'}}>25 Nov 2022</Typography>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Announcement_home
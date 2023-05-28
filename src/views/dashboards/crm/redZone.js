// ** MUI Imports
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

function createData(rollNo, studName, attendance) {
  return { rollNo, studName, attendance };
}

const rows = [
  createData(0, 159, 6.0),
  createData(0, 237, 9.0),
  createData(0, 262, 16.0),
  createData(0, 305, 3.7),
  createData(0, 356, 16.0),
  createData(0, 262, 16.0),
  createData(0, 305, 3.7),
  createData(0, 356, 16.0)
];


const RedZone = () => {
  const [ClassValue, setClassValue] = useState('')

  const handleChange = (event) => {
    setClassValue(event.target.value);
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Box sx={{ width: 12, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>
        }
        title={
          <Typography
            sx={{ fontSize: 15, fontWeight: 'bold' }}
          >
            Red Zone
          </Typography>
        }
        action={
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ClassValue}
                onChange={handleChange}
                sx={{ width: 100, height: 23, backgroundColor: '#EEEFF7', borderRadius: 16, fontSize: 'small', fontWeight: 550 }}
              >
                <MenuItem value={10}>Class 1A</MenuItem>
                <MenuItem value={20}>Class 1B</MenuItem>
                <MenuItem value={30}>Class 1C</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
      />
      <CardContent >
        <TableContainer sx={{ minWidth: 320, maxHeight: 300 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textTransform: 'capitalize' }}>Roll No</TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize' }}>Student's Name</TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize' }}>Attendance%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.rollNo}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" align="center" sx={{ border: 'none', color: '#212121', fontFamily: 'Poppins', fontWeight: 500, fontSize: 16 }}>
                    {row.rollNo}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 'none', fontFamily: 'Poppins', fontWeight: 500, fontSize: 16 }}>{row.studName}</TableCell>
                  <TableCell align="center" sx={{ border: 'none', fontFamily: 'Poppins', fontWeight: 500, fontSize: 16 }}>{row.attendance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default RedZone;
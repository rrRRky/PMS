import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, description, imageUrl, link }) => {
    return (
      <Card className='dashboardCard col-lg-3 col-sm-6 col-12 mt-2 mb-2 border-0 shadow-none' sx={{ minWidth: 275 }}>
        <CardContent className='d-flex p-4 border border-1 rounded flex-column' elevation={4}>
          <Box className='d-flex flex-column'>
            <Typography sx={{ fontWeight: 500,  }} className="text-uppercase fs-14 fw-medium text-muted text-truncate" gutterBottom>
              {title}
            </Typography>
            <Box className='d-flex flex-column'>
              <Box className='d-flex flex-row flex-row justify-content-start align-items-center'>
                <Avatar className='me-4 avatar-title text-primary fw-semibold bg-soft-primary rounded' sx={{ backgroundColor: 'rgba(37,160,226,.18)!important;', fontSize:'14px' }} aria-label="avatar">
                  {imageUrl}
                </Avatar>
                <Typography sx={{ fontSize: 22 }} className="fs-22 fw-semibold mt-3 mb-4" style={{color:'#495057'}} gutterBottom>
                  {description}
                </Typography>
              </Box>
              <Box className='d-flex flex-row justify-content-start'>
                <Link className="link-secondary text-decoration-underline" to={{}}>{link}</Link> 
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  
  export default DashboardCard;
  
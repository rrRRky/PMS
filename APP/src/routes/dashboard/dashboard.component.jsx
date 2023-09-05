import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import './dashboard.styles.css'
import DashboardCard from './dashboard-card/dashboard-card.component';
import Sidebar from '../../component/sidebar/sidebar.component';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CategoryIcon from '@mui/icons-material/Category';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SpaIcon from '@mui/icons-material/Spa';
import LayersIcon from '@mui/icons-material/Layers';
// import DashboardGraphCard from './graphs/dashboard-graph-component';
import { Typography } from '@mui/material';
const Dashboard = () => {

  const [Name, setUsername] = useState(localStorage.getItem('Name'));

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
    }
  }, [Name]);

  const DashboardData = [
    {
      avatar: <Diversity3Icon/>,
      cardTitle: 'Total Users',
      cardDetail: '500',
      cardLink: 'View Total User',
    },
    {
      avatar: <CategoryIcon/>,
      cardTitle: 'Total Contacts',
      cardDetail: '10',
      cardLink: 'View Total Contacts',
    },
    {
      avatar: <ViewModuleIcon/>,
      cardTitle: 'Total Campaigns',
      cardDetail: '80',
      cardLink: 'View Total Campaigns',
    },
    {
      avatar: <SpaIcon/>,
      cardTitle: 'Total Leads',
      cardDetail: '25',
      cardLink: 'View Total Leads',
    },
    {
      avatar: <LayersIcon/>,
      cardTitle: 'Total Opporunities',
      cardDetail: '5',
      cardLink: 'View Total Opporunities',
    },
    {
      avatar: <LayersIcon/>,
      cardTitle: 'Total Deals',
      cardDetail: '15',
      cardLink: 'View Total Deals',
    },
    {
      avatar: <LayersIcon/>,
      cardTitle: 'Annual Profit(in INR)',
      cardDetail: '1500000.25',
      cardLink: 'View Annual Profit(in INR)',
    },

  ];
  return (
    <div>
      <div className='d-flex justify-content-start p-0 dashboardMain'>
        <Sidebar />
        <div className='mainContainConatiner d-flex flex-column'>
          <Box className="row m-0 p-0 mt-4">
            <Box className="d-flex justify-content-center align-items-between flex-column">
              <Typography className='fw-semibold mb-1 dashboardUser'>
                Good Morning, {Name}
              </Typography>
              <Typography className='text-muted mb-0 dashboardGreeting'>
                Here's what's happening with your store today.
              </Typography>
            </Box>
          </Box>
          <Box className="row m-0 p-0 mt-3" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {DashboardData.map((card, index) => (
              <DashboardCard key={index}
                title={card.cardTitle}
                description={card.cardDetail}
                imageUrl={card.avatar}
                link={card.cardLink}
              />
            ))}
          </Box>
          {/* <Box className="row m-0 p-0 mt-3">
            <DashboardGraphCard/>
          </Box> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

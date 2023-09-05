import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


export const navData = [
 {
    id: 0,
    icon: <HomeIcon/>,
    text: "Dashboard",
    link: "/dashboard"
 },
 {
    id: 1,
    icon: <TravelExploreIcon/>,
    text: "Role Type",
    children: [
      {
        id: 111,
        icon: <SettingsIcon />,
        text: "View Role Type",
        link: "/role-type",
      }
    ]
 },
 {
    id: 2,
    icon: <AdminPanelSettingsIcon/>,
    text: "Permission",
    link: "/roles-and-permission"
 },
 {
    id: 3,
    icon: <BarChartIcon/>,
    text: "Action",
    link: "/action"
 },
 {
    id: 4,
    icon: <SettingsIcon/>,
    text: "ModuleMaster",
    link: "/module"
 },
 {
    id: 5,
    icon: <SettingsIcon/>,
    text: "ModuleCatMaster",
    link: "/module-category"
 }
]




import './sidebar.styles.css';
import { Fragment, useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import API_URL from '../../config';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [sidebarData, setSidebarData] = useState([]);
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const storedUserData = localStorage.getItem('userSession');
        const userToken = localStorage.getItem('token');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUsername(userData.Name);
          setToken(userData.token);
        // }
        const response = await fetch(`${API_URL}Users/ModuleRight?userId=${userData.Name}`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            console.log(userData.Name);
            console.error('Unauthorized access:', response.status);
            // Handle unauthorized access here
          } else if (response.status === 403) {
            console.error('Forbidden access:', response.status);
            // Handle forbidden access here
          } else {
            throw new Error(`API request failed with status: ${response.status}`);
          }
        }
  
        const data = await response.json();
        console.log('API response data:', data);
        if (!Array.isArray(data)) {
          throw new Error('Invalid API response format');
        }
  
        const transformedData = data.map(category => {
          const { ModuleCategoryID, ModuleCategory, CategoryIconURL, Modules } = category;
  
          const categoryItem = {
            id: ModuleCategoryID,
            icon: <i className={CategoryIconURL}  aria-hidden="true"/>,
            text: ModuleCategory,
            children: Modules.map(module => ({
              id: module.moduleid,
              icon: <i className={module.iconurl} />,
              text: module.module,
              link: module.routingpage,
            })),
          };
  
          // console.log('Transformed category item:', categoryItem);
          return categoryItem;
        });
  
        // console.log('Transformed data:', transformedData);
        setSidebarData(transformedData);
      }
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }

    };
  
    fetchSidebarData();
  }, [Name]);


  const SidebarItem = ({ item, open }) => {
    const hasChildren = item.children && item.children.length > 0;

    const [menuopen, setMenuOpen] = useState(true);
    const toggleMenuOpen = () => {
      setMenuOpen(!menuopen);
    };

    const handleModuleClick = (module) => {
      localStorage.setItem('selectedCategoryModuleId', module.id);
      localStorage.setItem('selectedModuleName', module.text);
      console.log('clicked', module.id, module.text);
    };


    return (
      <div className='sideitem-container' key={item.id}>
        <div className='sideitem'>
          <div className="sidebar-menu-container">
            <div className={`${menuopen ? 'subMenuClosed' : 'subMenu'}`} onClick={toggleMenuOpen}>
              <div className={`${open ? 'linkTextClosed' : 'linkText'}`}>
                {item.icon}
                <Link className="nav-link text-dark" to={item.link}>
                  <span className='sidebarMainText fw-bold'  onClick={() => handleModuleClick(item)}>{item.text}</span>
                </Link>
                {hasChildren && (
                  <span>{menuopen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</span>
                )}
              </div>
              {hasChildren && (
                <div className="submenu-coveritem">
                  {item.children.map((childItem) => (
                    <SidebarItem item={childItem} className="submenu-item" open={open} key={childItem.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className={`sidebar ${open ? '' : 'open'}`}>
        <div className={`${open ? 'sidenavClosed' : 'sidenav'}`}>
          <button className="menuBtn d-none" onClick={toggleOpen}>
            {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
          </button>
          {sidebarData.map((item) => <SidebarItem item={item} open={open} key={item.id} />)}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Sidebar;

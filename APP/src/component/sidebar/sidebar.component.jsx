import './sidebar.styles.css';
import { Fragment, useState, useEffect } from 'react';
import { Outlet, Link , useLocation  } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import API_URL from '../../config';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [sidebarData, setSidebarData] = useState([]);
  const [sidebarSpaceData, setSidebarSpaceData] = useState([]);
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation();
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
              parent:ModuleCategoryID,
              parentName:ModuleCategory,
              id: module.moduleid,
              icon: <i className={module.iconurl} />,
              text: module.module,
              link: module.routingpage,
              ModuleCategoryID: ModuleCategoryID,
              ModuleCategory: ModuleCategory,
            })),
          };
          
          return categoryItem;
        });
        
        setSidebarData(transformedData);
      }
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    const fetchSidebarSpaceData = async () => {
      try {
        const storedUserData = localStorage.getItem('userSession');
        const userToken = localStorage.getItem('token');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUsername(userData.Name);
          setToken(userData.token);
        // }
        const response = await fetch(`${API_URL}Spc&ListMenu`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            console.log(userData.Name);
            alert('Unauthorized access:', response.status);
            console.error('Unauthorized access:', response.status);
            // Handle unauthorized access here
          } else if (response.status === 403) {
            console.error('Forbidden access:', response.status);
            alert('Forbidden access:', response.status);
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
  
        const transformedSpaceData = data.map(spaceSubspaces => {
          const { SpaceId, SpaceName, SpaceIcon, Sub_Spaces } = spaceSubspaces;
  
          const spaceSubspaceItem = {
            id: SpaceId,
            icon: <i className={SpaceIcon}  aria-hidden="true"/>,
            text: SpaceName,
            children: Sub_Spaces.map(spaceSubspace => ({
              parent:SpaceId,
              parentName:SpaceName,
              id: spaceSubspace.SpacelistId,
              icon: <i className={spaceSubspace.SpaceListIcon} />,
              text: spaceSubspace.SpaceListName,
              link: spaceSubspace.routingPage,
              SpaceId: SpaceId,
              SpaceName: SpaceName,
            })),
          };
  
          return spaceSubspaceItem;
        });
        // console.log('Transformed data:', transformedData);
        setSidebarSpaceData(transformedSpaceData);
      }
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }

    };
  
    fetchSidebarData();
    fetchSidebarSpaceData();
  }, [Name]);

  const SidebarItem = ({ item, isActive}) => {
    const hasChildren = item.children && item.children.length > 0;
    const [menuopen, setMenuopen] = useState(isActive ); 

    useEffect(() => {
      // Check if the current item's link matches the current pathname
      if (item.link === location.pathname || (item.children && item.children.some(child => child.link === location.pathname))) {
        setMenuopen(true); // Open the menu if it's the active item
      }
    }, [item.children, item.link]);

    const toggleMenuOpen = () => {
      setMenuopen(!menuopen);
    };
    const handleModuleClick = ( module) => {
      const parent = module.parent;
      const parentName = module.parentName;
      localStorage.setItem('selectedCategoryModuleId', module.id);
      localStorage.setItem('selectedModuleName', module.text);

      console.log( 'my log' , module.id , module.text )
      console.log('clicked', module.id, module.text , module);
      console.log('Parent:', parent);
      console.log('Parent Name:', parentName);
      
      localStorage.setItem('spaceID', parent);
      localStorage.setItem('SpaceName', parentName);
      localStorage.setItem('SubSpaceID', module.id);
      localStorage.setItem('SubSpaceName', module.text);
    };


    return (
      <div className={`sideitem-container ${menuopen ? 'active' : ''}`} key={item.id} >
        <div className='sideitem'>
          <div className="sidebar-menu-container">
            <div className={`${menuopen ? 'subMenu' : 'subMenuClosed'}`} onClick={toggleMenuOpen}>
              <div className={`${open ? 'linkTextClosed' : 'linkText'}`}>
                {item.icon}
                {hasChildren ? (
                  <span
                    className={`sidebarMainText fw-bold ${menuopen ? 'active' : ''}`}
                    onClick={() => handleModuleClick(item)}
                  >
                    {item.text}
                    {menuopen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </span>
                ) : (
                  <Link className={`nav-link text-dark ${menuopen ? 'active' : ''}`} to={item.link}>
                    <span className={`sidebarMainText fw-bold ${menuopen ? 'active' : ''}`} onClick={() => handleModuleClick(item)}>
                      {item.text}
                    </span>
                  </Link>
                )}
              </div>
              {hasChildren && (
                <div className="submenu-coveritem">
                {item.children.map((childItem) => (
                  <SidebarItem
                    item={childItem}
                    key={childItem.id}
                    isActive ={isActive  || menuopen} 
                  />
                ))}
              </div>
              )}
            </div>
            {/* spacesubspace list  */}

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
          {sidebarData.map((item) => (
            <SidebarItem item={item} key={item.id} />
          ))}
          {sidebarSpaceData.map((item) => (
            <SidebarItem item={item} key={item.id} />
          ))}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Sidebar;

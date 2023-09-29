// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import Dashboard from "./routes/dashboard/dashboard.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Navigation from "./routes/navigation/navigation.component";
// import ActionMaster from "./component/master/action.master.component/action_master.component";
// import RoleTypeMaster from "./component/master/role-type.master.component/role_type_master.component";
// import ModuleMaster from "./component/master/module.master.component/module_master.component";
// import ModuleCatMaster from "./component/master/module_category.master.component/module_category_master.component";
// import RolePermissionMaster from "./component/master/roles-permission.master.component/roles-permission.component";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import "./assets/CSS/globalTheme/light.theme.styles.css";
// import "./assets/CSS/globalTheme/dark.theme.styles.css";
// import "./App.css";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if user is authenticated
//     const userToken = localStorage.getItem("token");
//     console.log(userToken);
//     setIsAuthenticated(!!userToken);
//     // Check if theme preference exists in local storage
//     const storedTheme = localStorage.getItem("theme");
//     document.body.className = storedTheme || "light";
//   }, []);

//   const toggleDarkMode = () => {
//     const currentTheme = document.body.className;
//     const newTheme = currentTheme === "light" ? "dark" : "light";
//     document.body.className = newTheme;
//     localStorage.setItem("theme", newTheme);
//   };

//   const theme = createTheme({
//     palette: {
//       mode: document.body.className === "dark" ? "dark" : "light",
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route path="/" element={<Authentication />} />
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/" replace />
//               ) : (
//                 <Navigation  toggleDarkMode={toggleDarkMode}>
//                   <Outlet />
//                 </Navigation>
//               )
//             }
//           >
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="role-type" element={<RoleTypeMaster />} />
//             <Route path="action" element={<ActionMaster />} />
//             <Route path="module" element={<ModuleMaster />} />
//             <Route path="module-category" element={<ModuleCatMaster />} />
//             <Route path="roles-and-permission" element={<RolePermissionMaster />} />
//           </Route>
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate,  useLocation } from "react-router-dom";

import Dashboard from "./routes/dashboard/dashboard.component";

import Authentication from "./routes/authentication/authentication.component";

import Navigation from "./routes/navigation/navigation.component";

// import Layout from "./utils/layout";
// import ActionMaster from "./component/master/action.master.component/action_master.component";


import UserComponent from "./component/master/user.component/view-user.component";
import EditUser from "./component/master/user.component/edit-user.component";

import RoleComponent from "./component/master/role-type.component/role_type_master.component";
import EditRole from "./component/master/role-type.component/edit_role_type.component";
import RolePermissionMaster from "./component/master/roles-permission.component/roles-permission.component";

import StageComponent from "./component/master/stage.component/view-stage.component";
import EditStage from "./component/master/stage.component/edit-stage.component";

import SpaceComponent from "./component/master/space.component/view-space.component";
import Editspace from "./component/master/space.component/edit-space.component";

import SubSpaceComponent from "./component/master/sub-space.component/view-sub-space.component";
import Editsubspace from "./component/master/sub-space.component/edit-sub-space.component";

import AllSubSpaceStageComponent from "./component/master/sub-space-stage.component/view-all-sub-space-stage.component";
import SubSpaceStageComponent from "./component/master/sub-space-stage.component/view-sub-space-stage.component";
import EditsubspaceStage from "./component/master/sub-space-stage.component/edit-sub-space-stage.component";

import ModuleCategoryComponent from "./component/master/moduleCategory.component/view-moduleCategory.component";
import EditModuleCategory from "./component/master/moduleCategory.component/edit-moduleCategory.component";

import TemplateComponent from "./component/master/template.component/view-template.component";
import EditTemplate from "./component/master/template.component/edit-template.component";

import AllTemplateDetailComponent from "./component/master/template.component/view-all-template-detail.component";
import AddTemplateDetailComponent from "./component/master/template.component/add-template-detail.component";
import EditTemplateDetails from "./component/master/template.component/edit-template-details.component";

import ModuleComponent from "./component/master/module.component/view-module.component"; 
import EditModule from "./component/master/module.component/edit-module.component";

import ControlComponent from "./component/master/control.component/view-control.component"; 
import EditControl from "./component/master/control.component/edit-control.component";

import FunctionComponent from "./component/master/function.component/view-function.component";
import EditFunction from "./component/master/function.component/edit-function.component"; 

import TaskViewComponent from "./component/task/view-task.component";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/CSS/globalTheme/light.theme.styles.css";
import "./assets/CSS/globalTheme/dark.theme.styles.css";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const userToken = localStorage.getItem("token");
    setIsAuthenticated(!!userToken);

    // Check if theme preference exists in local storage
    const storedTheme = localStorage.getItem("theme");
    document.body.className = storedTheme || "light";

  }, []);

  const toggleDarkMode = () => {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const theme = createTheme({
    palette: {
      mode: document.body.className === "dark" ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes className="abcd" isAuthenticated={isAuthenticated} toggleDarkMode={toggleDarkMode} />
      </Router>
    </ThemeProvider>
  );
}

function AppRoutes({ isAuthenticated, toggleDarkMode }) {
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Save the current location to session storage
    sessionStorage.setItem("lastVisitedPage", location.pathname);
  }, [location]);

  // Retrieve the last visited page from session storage
  const lastVisitedPage = sessionStorage.getItem("lastVisitedPage");

  return (
    <Routes>
      <Route element={ <Navigation />}>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="roles" element={<RoleComponent />} />
        <Route path="edit-role/:id" element={<EditRole />} />

        <Route path="roles-and-permission/:id" element={<RolePermissionMaster />} />

        {/* <Route path="function" element={<FunctionComponent />} /> */}
        <Route path="function" element={<FunctionComponent />} />
        <Route path="edit-function/:id" element={<EditFunction/>} />

        <Route path="modules" element={<ModuleComponent />} />
        <Route path="edit-modules/:id" element={<EditModule/>} />

        <Route path="module-category" element={<ModuleCategoryComponent />} />
        <Route path="edit-module-category/:id" element={<EditModuleCategory/>} />

        <Route path="controls" element={<ControlComponent />} />
        <Route path="edit-controls/:id" element={<EditControl/>} />

        <Route path="spaces" element={<SpaceComponent />} /> 
        <Route path="edit-spaces/:id" element={<Editspace />} /> 

        <Route path="sub-space" element={<SubSpaceComponent />} /> 
        <Route path="edit-sub-space/:id" element={<Editsubspace />} /> 

        <Route path="sub-space-stage" element={<AllSubSpaceStageComponent />} /> 
        <Route path="sub-space-stage/:id" element={<SubSpaceStageComponent />} /> 
        <Route path="edit-sub-space-stage/:id1/:id2" element={<EditsubspaceStage />} /> 

        <Route path="templates" element={<TemplateComponent />} /> 
        <Route path="edit-template/:id" element={<EditTemplate />} /> 

        <Route path="all-template-detail" element={<AllTemplateDetailComponent/>} />
        <Route path="template-Detail/:id" element={<AddTemplateDetailComponent/>} />
        <Route path="edit-template-details/:id1/:id2" element={<EditTemplateDetails />} /> 

        <Route path="stages" element={<StageComponent />} /> 
        <Route path="edit-stage/:id" element={<EditStage />} /> 

        <Route path="users" element={<UserComponent />} /> 
        <Route path="edit-user/:id" element={<EditUser />} /> 

        <Route path="/spacelistTask/:id" element={<TaskViewComponent/>} />
        
      </Route>
      <Route path="/" element={ isAuthenticated ? ( <Navigate to={lastVisitedPage} replace /> ) : ( <Authentication /> ) } />
      {lastVisitedPage && (
        <Route path="/" element={<Navigate to={lastVisitedPage} />} />
      )}
    </Routes>
  );
}
export default App;

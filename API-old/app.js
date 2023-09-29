const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const user_router = require('./Src/routes/users_routes');
const ModuleRouter = require('./SRC/routes/modules_routes');
const FunctionRoutes = require('./SRC/routes/Function_routes');
const ControlsRouter = require('./SRC/routes/Controls_router');
const ModuleCategoryRouter = require('./SRC/routes/ModuleCategory_router');
const StagesRouter = require('./SRC/routes/Stages_router');
const SpaceRouter = require('./SRC/routes/Space_router');
const RolesRouter = require('./SRC/routes/Roles_router');
const RolesPermissionsRouter = require('./SRC/routes/Roles_Permissions_router');


const authenticateToken = require('./SRC/routes/authenticateToken');

// app.use(cors());

// You can also configure CORS with specific options
// Example: Allow specific origins and headers
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.get("/",(req,res)=>{
    res.send("Hi.. this is node+express application.")
})



app.use(bodyParser.raw({ extended: true }));
app.use(bodyParser.json());

//----------------User--------------
app.use("/api/Users",user_router); 

//----------------Module--------------
app.use("/api/Module",ModuleRouter)

//----------------Function--------------
app.use("/api/Function",FunctionRoutes)

//----------------Controls--------------
app.use("/api/Controls",ControlsRouter)

//----------------MCategory--------------
app.use("/api/MCategory",ModuleCategoryRouter)

//----------------Stages--------------
app.use("/api/Stages",StagesRouter)

//----------------Stages--------------
app.use("/api/Spaces",SpaceRouter)

//----------------Roles--------------
app.use("/api/Roles",RolesRouter)

//----------------RolesPermissionsRouter--------------
app.use("/api/RolesPermissions",RolesPermissionsRouter)



// Protected route with JWT authentication
app.use('/api/Protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route.' });
  });

const port = process.env.PORT || 4343;
const start=async()=>{
    try{
        app.listen(port, () => {
            console.log(`API is running at http://localhost:${port}`);
        });
    }catch(error){
        console.log(error)
    }
}
start();
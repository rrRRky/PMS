const Roles_Permissions = require('../repositories/Roles_PermissionRepository');
const jwt = require('jsonwebtoken');
const  TokenKey='J@y@n!t@';

const authenticateToken =(muduleCode,functioncode) => { return    (req, res, next) => {
  
  const token = req.header('Authorization');
  
  if (!token){ 
    return res.status(401).json({ error: 'Please Provide Token ' });
  }
  else {

      jwt.verify(token, TokenKey,async (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ error: 'Token expired' });
        }      
        return res.status(403).json({ error: 'Invalid token' });
      }

      const decodedToken = jwt.verify(token, TokenKey);    
      const modulePermission=await Roles_Permissions.IsAuthorizeModuleForRole(decodedToken.roleId,muduleCode,functioncode);    
      if (muduleCode!='LKUP' &&  modulePermission.MsgFlag == 0) {
        return res.status(401).json({ error: ' This request is Unauthorized!' });
      } 
    next();
  });
}

};
};
module.exports = authenticateToken;

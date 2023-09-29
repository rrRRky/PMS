const ActiveDirectory = require('activedirectory');

const AD_config = {
  url: 'ldap://JAYANITA.jayanita.net', // Replace with your AD server URL ldap://192.168.100.1
  baseDN: 'dc=JAYANITA,dc=jayanita,dc=net',      // Replace with your AD base DN
  //username: 'deepakr@jayanita.com',         // Replace with your AD username
  //password: 'pass@123'          // Replace with your AD passwordsss
};

// const ad = new ActiveDirectory(AD_config);

// ad.authenticate('deepakr@jayanita.com', 'pass@123', (err, auth) => {
//   if (err) {
//     console.log('Connection failed with AD:', err);
//     return;
//   }

//   if (auth) {
//     console.log('successfuly Connect with AD');
//     // You can now perform AD operations here
//   } else {
//     console.log('Getting Some error when connecting AD');
//   }
// });
module.exports=AD_config;


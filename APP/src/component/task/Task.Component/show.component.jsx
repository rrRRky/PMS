// import React, { useState, useEffect }  from 'react';

// const YourComponent = () => {

//   const [badgeData, setBadgeData] = useState(null);

//   var formdata = new FormData();
//   formdata.append("wsfunction", "core_badges_get_user_badges");
//   formdata.append("moodlewsrestformat", "json");
//   formdata.append("wstoken", "92693b7db2e987476c0ef6b4b2d9ba70");
//   formdata.append("userid", "635");
//   const fetchDataCon = async () => {
//     try {
//       const responseCon = await fetch('https://uni.jayanita.com/webservice/rest/server.php', {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow'
//       });

//       if (responseCon.ok) {
//         const rowDataCon = await responseCon.json();
//         setBadgeData(rowDataCon); // Store the badge data in state
//       } else {
//         console.error('Error fetching data:', responseCon.status);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDataCon();
//   }, []);
//   return (
//     <div className='autoOuterLayer'>
//             {badgeData && (
//         <div>
//           <h1>Badge URL:</h1>
//           <img src={badgeData.badgeurl} alt="Badge" />
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default YourComponent;

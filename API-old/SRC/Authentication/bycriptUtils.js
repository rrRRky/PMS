const bcrypt = require ('bcrypt');
const saltRounds = 10; // You can adjust the salt rounds as needed

// Function to hash a plain password
const hashpassword= async (password) =>{
    try{
        return await bcrypt.hash(password,saltRounds);
    }catch(error){
        console.log('erroe hashing password',error);
        throw error;
    }
}

//Function to Compare Has Password
const comparePasswords = async(password, hashpassword)=>{
    try {
        return await bcrypt.compare(password, hashpassword);
      } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
      }
}
module.exports = {
    comparePasswords,
    hashpassword, 
  };
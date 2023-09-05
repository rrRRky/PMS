const isProduction = process.env.NODE_ENV === 'localhost';

const API_URL = isProduction ?  'https://app.jayanita.com/JAYPMSAPP/api/' : 'http://localhost:4343/api/' ;

export default API_URL; 
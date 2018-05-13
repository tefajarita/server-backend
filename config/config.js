//===================================
// Puerto 
//===================================
process.env.PORT = process.env.PORT || 3000;









//=====================================
// Entorno
//=====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=====================================
// Base de datos
//=====================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/bolsaempleo';
} else {
    urlDB = 'mongodb://bolsa-user:123456@ds147070.mlab.com:47070/bolsaempleo';
}

process.env.URLDB = urlDB;
import server from "./src/app";
import database from "./src/db";
const PORT = 3001;

database.sync({force:true}).then(()=>{
    server.listen(PORT, ()=>{
    console.log(`Server raised with so much much++ love in port: ${PORT}😎`);
})
}).catch((error)=>{
    console.log(error.message);
    
})

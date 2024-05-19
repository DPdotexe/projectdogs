import mysql from 'mysql2'
export default defineEventHandler(async() => {
// database config 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '27006',
    database: 'prova',
  })
  
  let res=await new Promise((res, rej)=>{ connection.connect(async (err) => {
    if (err){
      "Errore di connessione al database"
    } 
    
  const query = 'select * from cani';

   connection.query (query, [], (err, result)=>{
    if (err) rej(err)
    res(result)
    })

});
  });




    return  res;
})


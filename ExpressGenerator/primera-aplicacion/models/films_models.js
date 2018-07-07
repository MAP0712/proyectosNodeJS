let CONN = require('../connection/mysqlconnection');
let Films = {};

Films.fetchAll = (callback)=>{
    if(!CONN) return callback(conError);
    const SQL = "SELECT * FROM film limit 5;";
    CONN.query(SQL,(error,rows)=>{
        if (error) return callback(error);
        else
            return callback(null,rows);
        
    })
}


Films.insert = (film,callback) => {
    if(!CONN) return callback(conError);
    console.log([film]);
    CONN.query('INSERT INTO film SET ?', [film], (error, result)=>{
        if(error) return callback(error);

        return callback(null,result.insertId);
    });

}

Films.paginate = (offset,limit,callback)=>{
    if(!CONN) {
        return callback(conError)
    }else{
        CONN.query('SELECT * FROM film LIMIT ?,?',[offset,limit],(error,rows)=>{
                  if(error) return callback(error);
        else {
            CONN.query('SELECT COUNT(*) as total from Film',(error,count)=>{
                if(error) return (callback,error);
                return callback(undefined, {count,rows})
                })
            }  
        });
    }

}
module.exports = Films;
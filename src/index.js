const express= require('express');
const morgan= require('morgan');
const path= require('path');
const {mongoose}=require('./database')
const app = express();

//configuracion
app.set('port',process.env.PORT || 3000);
//middleware
app.use(morgan('dev'));
app.use(express.json());
//rutas
app.use('/api/tasks',require('./routes/task.routes'))
//static

app.use(express.static(path.join(__dirname,'public')))


app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto'+app.get('port'))
})



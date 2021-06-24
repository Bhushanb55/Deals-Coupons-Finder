var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Bhushan_Bire:kohli183@cluster0.7c1th.mongodb.net/dcfApp?retryWrites=true&w=majority', {useNewUrlParser: true}, {dbName: 'DcfApp'}, { useUnifiedTopology: true });
 
var conn = mongoose.connection;
 
conn.on('connected', function() {
 console.log('Database is connected successfully.');
 console.log("db object points to the database : "+ conn.name); 
 
});
conn.on('disconnected',function(){
 console.log('Database is disconnected successfully.');
});
 
conn.on('error', console.error.bind(console, 'connection error:'));
 
module.exports = conn;
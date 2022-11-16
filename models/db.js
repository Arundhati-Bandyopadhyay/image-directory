const{ Sequelize, DataTypes, Model} =require('sequelize');
const sequelize=new Sequelize('phms','root','',{
  host: '127.0.0.1',
  logging:false,
    dialect:'mysql',
    pool:{
        max:5,min:0,idle:10000
    },
    
});

    sequelize.authenticate().then(()=>{
      console.log('Connection has been established successfully.');
  }).catch((err)=>{
      console.log(err);
  })

  
  const db={};
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;



db.users=require('./userModel')(sequelize,DataTypes,Model)
    
try {
  db.sequelize.sync({ force: false })
  console.log("synchronized")
} catch (error) {
  console.error(error)
}

module.exports=db

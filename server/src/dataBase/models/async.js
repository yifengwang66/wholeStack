require('./admin')
require('./item')
require('./user')
const sequelize = require('./db');

sequelize.sync({alter: true}).then(() => {
    console.log('所有模型同步完成')
}, (err) => {
    console.log('失败', err)
})

const userRouter = require('./userRouter')
const noteRouter = require('./noteRouter')
const bookRouter = require('./bookRouter')

const routers = [
    {
        path : '/api/user',
        handler : userRouter
    },
    {
        path : '/api/book',
        handler : bookRouter
    },
    {
        path : '/api/note',
        handler : noteRouter
    },
    {
        path : '/',
        handler : (req,res) =>{
            res.json({
                status : 200,
                success : true,
                message : 'Server successfully running...'
            })
        }
    }
]

const applyRouter = (app) =>{
    routers.map(r=>{
        if(r.path === '/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}

module.exports = applyRouter
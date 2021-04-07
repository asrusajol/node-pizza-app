const User = require('../../models/user.js')
const bcrypt = require('bcrypt')

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },

    register(req,res){
            res.render('auth/register')
        },
    async postRegister(req,res){
        const { name, email, password } = req.body
        //User Validatation
        if(!name || !email || ! password){
            req.flash('error','All fields are required !!!')
            req.flash('name',name)
            req.flash('email',email)
            return res.redirect('/register')
        }
        //email validatation
        User.exists({email: email},(err, result) =>{
            if(result){
                req.flash('error','Email already exist !!!')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }
        })

        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10)

        //user creation to database
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        user.save().then((user)=>{
            return res.redirect('/')
        }).catch(err =>{
            req.flash('error','Something went wrong')
                return res.redirect('/register')
        })
        console.log(req.body)
    }
    }
}

module.exports=authController

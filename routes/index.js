const express = require('express');
const routes = express.Router()

const {user} = require('./../resource/user')
//console.log(user)
routes.get('/', (req, res) => {
    res.render('index.ejs', {title: 'Login'})
})

routes.post('/dashBoard', (req, res) => {
    const {inputUser, inputPassword} = req.body

    for (const [key, value] of user) {
        // console.log(key, " ", value)
        const userFromMap = user.get(key).user
        const passwordFromMap = user.get(key).password
       // console.log(userFromMap, passwordFromMap)
        if (inputUser === userFromMap && inputPassword === passwordFromMap) {
            req.session.loggedIn = true
           return  res.render('dashboard.ejs', {title: 'Dashboard'})

        }
    }
   return  res.redirect('/')

})

routes.get('/dashBoard', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard.ejs', {title: 'Dashboard'})
    } else {
        res.redirect('/');
    }
});


routes.get('/newConsult', (req, res) => {
    if (req.session.loggedIn) {
        res.render('consult.ejs', {title: 'Pagina consulta'})
    }else {
        res.redirect('/')
        }
})

routes.get('/register', (req, res) => {
    if (req.session.loggedIn === true) {
        res.render('register.ejs', {title: 'Pagina Registro'})
    }else {
        res.redirect('/')
    }

})

routes.get('/logOut', (req, res) => {
    if (req.session.loggedIn === true) {
        req.session.loggedIn = false
        return res.redirect('/')
    }
})

module.exports = routes


const express = require('express');
const router = express.Router();
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('../lib/protect');

router.get('/signup',isNotLoggedIn, (req, res) =>{
    res.render('auth/signup');
});

router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin',isNotLoggedIn, (req, res) =>{
    res.render('auth/signin');
});

router.post('/signin',isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn,(req, res) =>{
    res.render('profile');
});

router.get('/logout',isLoggedIn, (req, res)=>{
    req.logOut();
    res.redirect('/signin');
});

router.get('/signup', (req, res) =>{
    res.render('auth/signup');
});

router.post('/signup', (req, res) =>{

});

router.get('/acerca', (req, res) => {
    res.render('acerca');
})

router.get('/caracteristicas', (req, res) => {
    res.render('caracteristicas');
})

router.get('/galeria', (req, res) => {
    res.render('galeria')
})

router.get('/mercados', (req, res) => {
    res.render('mercados')
})

module.exports = router;
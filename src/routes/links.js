const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/protect'); 
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'src/public/images'});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add',isLoggedIn, upload.single('sampleFile'), async (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    const nameImage = req.file.filename + '.' + req.file.mimetype.split('/')[1];
    const {title, url, description, sampleFile} = req.body;
    const newLink = {
        title,
        url,
        description,
        image: nameImage,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO link set ?', [newLink]);
    req.flash('correcto', 'Link agregado correctamente');
    res.redirect('/links'); 
});

router.get('/',isLoggedIn, async (req, res)=>{
    const links = await pool.query('SELECT * FROM link where user_id = ?', [req.user.id]);
    /* console.log(links); */
    res.render('links/list', {links});
});

router.get('/delete/:id',isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM link WHERE id = ?', [id]);
    req.flash('correcto', 'Link eliminado correctamente');
    res.redirect('/links'); 
});

router.get('/edit/:id',isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM link WHERE id = ?', [id]);   
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id',isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    
    await pool.query('update link set ? where id = ?',[newLink, id]);
    req.flash('correcto', 'Link actualizado correctamente');
    res.redirect('/links');
});

module.exports = router;
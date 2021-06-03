const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/protect'); 
const fileupload = require('express-fileupload'); 

const app = express();

app.use(fileupload());

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add',isLoggedIn, async (req, res) => {
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send("No se subieron imagenes");
    }

    sampleFile = req.files.sampleFile;
    console.log(sampleFile);
    /* const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO link set ?', [newLink]);
    req.flash('correcto', 'Link agregado correctamente');
    res.redirect('/links'); */
});

router.get('/',isLoggedIn, async (req, res)=>{
    const links = await pool.query('SELECT * FROM link where user_id = ?', [req.user.id]);
    console.log(links);
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
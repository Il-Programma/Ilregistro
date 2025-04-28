const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/dashboard', (req, res) => {
  const { username, password } = req.body;
  
  // Demo login - in produzione usare un database
  if (username === "NRLV027009007" && password === "Xk9#mP2$vL") {
    req.session.loggedin = true;
    res.render('dashboard.html');
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.render('dashboard.html');
  } else {
    res.redirect('/');
  }
});

app.get('/valutazioni', (req, res) => {
  if (req.session.loggedin) {
    res.render('valutazioni.html');
  } else {
    res.redirect('/');
  }
});

app.get('/note', (req, res) => {
  if (req.session.loggedin) {
    res.render('note.html');
  } else {
    res.redirect('/');
  }
});

app.get('/impostazioni', (req, res) => {
  if (req.session.loggedin) {
    res.render('impostazioni.html');
  } else {
    res.redirect('/');
  }
});

app.get('/presenze', (req, res) => {
  if (req.session.loggedin) {
    res.render('presenze.html');
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

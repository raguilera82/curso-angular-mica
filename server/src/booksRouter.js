const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const router = express.Router();

passport.use(new BasicStrategy(async (username, password, done) => {
    const user = username;
    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    const verifyPass = true;
    if (verifyPass) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}));

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

passport.use(new Strategy(jwtOpts, async (payload, done) => {

    var user = payload.username;

    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }

}));


router.post('/login', passport.authenticate('basic', { session: false }), async (req, res, next) => {
    try {
        const username = req.user;
        const opts = { expiresIn: '30m' };
        const token = jwt.sign({ username }, 'secret', opts);
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

const books = new Map();
let nextId = 1;

function addBook(book) {

    let id = nextId++;

    book.id = id.toString();

    books.set(book.id, book);
}

router.post('/books', passport.authenticate('jwt', { session: false }), (req, res) => {

    let book = {
        title: req.body.title,
        description: req.body.description
    };

    addBook(book);
    res.json(book);
});

router.get('/books', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json([...books.values()]);
});

router.get('/books/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id;
    const book = books.get(id);
    if (!book) {
        res.sendStatus(404);
    } else {
        res.json(book);
    }
});

router.delete('/books/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id;
    const book = books.get(id);
    if (!book) {
        res.sendStatus(404);
    } else {
        books.delete(id);
        res.json(book);
    }
});

router.put('/books/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id;
    const book = books.get(id);
    if (!book) {
        res.sendStatus(404);
    } else {

        let newBook = {
            id,
            title: req.body.title,
            description: req.body.description
        };

        books.set(id, newBook);

        res.json(newBook);

    }
});

module.exports = router;



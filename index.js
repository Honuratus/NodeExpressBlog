import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./03-routes/postRoutes.js"
import methodOverride from "method-override";
import sequelize from './database.js'


import passport from "passport";
import session from "express-session";
import LocalStrategy from 'passport-local';
import { Admin, createAdmin } from "./02-models/adminModel.js";
import bcrypt from "bcryptjs";



await sequelize.sync()

await createAdmin()

const debugMode = true;
const app = express();
const port = 3000;

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await Admin.findOne({ where: { username } });
            if (!user) {
                return done(null, false, {message: "Incorrect username or password"})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, {message: "Incorrect username or password"});
            }

            return done(null, user);
        }
        catch (error) {
            return done(error)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Admin.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use(methodOverride('_method'))

app.use("/", postRoutes)




app.listen(port, '127.0.0.1', () => {
    console.log(`listening on 127.0.0.1:${port}`);
});




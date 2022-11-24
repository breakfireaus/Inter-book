const path = require("path");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = handlebars.create({ helpers });

const sessionConfiguration = {
    secret: "TODO: a Secret secret",
    cookie: {
        // 3,600,000 milliseconds - 1 hour
        maxAge: 60 * 60 * 1000,
        sameSite: true,
        httpOnly: true,
        // Unable to use secure as we do not have an SSL cert
        secure: false,

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sessionConfiguration));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server successfully started, now listening on port ${PORT}`));
});
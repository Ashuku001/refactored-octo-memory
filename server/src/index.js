const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const compress = require("compression");
require("dotenv").config();
const Cookies = require("cookies");
const JWT = require("jsonwebtoken");
const { createServer } = require("http");

const createTemplatesRouter = require("./routes/createTemplates.js");
const webhookRouter = require("./routes/incomingWebhook.js");
const paymentRouter = require("./routes/payment.js");
const servicesLoarder = require("./services/index.js");
const db = require("./database/index.js"); // import the database only once
// Global database instance holds all utilities our services might need access to
const app = express();
const PORT = process.env.LISTEN_PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const server = createServer(app);


const allowedOrigins = ["http://localhost:3000","http://localhost:3000", "http://cesNextClient:3000", "https://graph.facebook.com", "https://hello-customer.onrender.com"]

const corsOption = {
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}




app.use(cors(corsOption));
//initialize the cookies package(come back here later when implementing jwt authentication)
app.use((req, res, next) => {
  const options = { keys: [`${process.env.COOKIE_SIGNATURE}`] };
  req.cookies = new Cookies(req, res, options);
  next();
});

const utils = {
  db,
};


const { json } = bodyParser;
app.use(compress());

// Copy raw body buffer to req["rawBody"] to generate x-hub signature
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);

// default view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// some usefull middleware to process the request
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ##############################################
// Bind graphql to expressjs web server
const services = servicesLoarder(utils);
async function main() {
  const serviceNames = Object.keys(services);

  for (let i = 0; i < serviceNames.length; i += 1) {
    const name = serviceNames[i];
    switch (name) {
      case "graphql":
        let apolloServer = services["graphql"];
        await apolloServer.start();

        app.use(
          "/graphql",
          cors(corsOption),
          json(),
          expressMiddleware(apolloServer, {
            context: async ({ req }) => {
              const authorization = req.headers.authorization; // read the auth token from the headers of the request
              if (typeof authorization !== typeof undefined) {
                var search = "Bearer ";
                var regEx = new RegExp(search, "ig");
                const token = authorization.replace(regEx, "").trim(); // strip out the beare string

                console.log("From cookies".bgBlue, req.cookies.get('authorization', {signed: true}))
                console.log("TOKEN$$$$$$$$$$$$$$$$$".bgBlue,token)
                //verify the token received against our secret
                return JWT.verify(token, JWT_SECRET, function (err, result) {
                  if (err) {
                    return req; // triggers an error when it reaches the auth directive since no merchant is attached to it
                  } else {
                    // if verified retrieve the Merchant from the database based on the id
                    return utils.db.db.models.Merchant.findByPk(
                      result.id // we used id to sign the JWT
                    ).then((merchant) => {
                      return Object.assign({}, req, { merchant }); //add the merchat to the request object as the context(makes the authenticated variable to the merchants)
                    });
                  }
                });
              } else {
                return req;  // return the unauthenticated request the function auth.js will throw an error to the client
              }
            },
          })
        );
        break;
      case "subscriptions":
        console.log("SUBSCRIPTION SERVICES")
        // before initializing SubscriptionServer should already be listening
        server.listen(PORT, () => {
          console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
          console.log("subscription", services[name])
          services[name](server);
        });
      default:
        app.use("/${name}", services[name]);
        break;
    }
  }
}

main();

// all the routes available use(pathname, the file with the route handler)
app.use("/createTemplates", createTemplatesRouter); // create the templates saved
app.use("/incoming", webhookRouter); // webhook
app.use("/payment", paymentRouter); // webhook

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error"); // render the error template
});

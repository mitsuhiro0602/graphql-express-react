const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
require('dotenv').config()
const { authCheckMiddleware } = require('./helpers/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

//express server
const app = express();

// db
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('DB Connected');
  } catch (error) {
    console.log('DB Connection Error' ,error)
  }
};

// execute database connectiuon
db();

// midllewares
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// typeDefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));

//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);


// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({req, res})
});

// apply Middleware metho connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app)

// rest endpoint
app.get('/rest', authCheckMiddleware, function(req, res) {
  res.json({
    data: 'you hit rest endpoint great'
  })
})

// cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


// upload
app.post('/uploadimages', authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      console.log(result);
      res.send({
        url: result.url,
        public_id: result.public_id
      });
    },
    {
      public_id: `${Date.now()}`, //public name
      resource_type: 'auto' // JPEG, PNG
    }
  ); 
});

// remove image
app.post('/removeimage', authCheckMiddleware, (req, res) => {
  let image_id = req.body.public_id

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if(error) return res.json({success: false, error});
    re.send('ok');
  });
});


// port
app.listen(process.env.PORT, function() {
  console.log(`server is ready at http://localhost${process.env.PORT}`)
  console.log(`graphql is ready at http://localhost${process.env.PORT}${apolloServer.graphqlPath}`)
});


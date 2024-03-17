const express = require('express');
const cors = require('cors');
require("dotenv").config();
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const bodyParser = require('body-parser')
const logger = require('./logger');
const chat_model = require('./modules/v1/chat/models/chat_model')
const options = {};
const routes = require('./modules/v1/route_manager')
// const auth = require('./modules/v1/user/controller/user_controllers')
// create express app
const app = express();

// Enable all CORS requests
app.use(cors());

// Setup server port
const port = process.env.PORT || 5000;
/**
 * Code to parse request body
 */
app.use(express.text());
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.use('/v1/api_document/', require('./modules/v1/api_document/index'));

const swaggerDocument = JSON.parse(fs.readFileSync('./modules/v1/api_document/swagger.json', 'utf-8'));
app.use('/api-docs', swaggerUI.serveFiles(swaggerDocument, options), swaggerUI.setup(swaggerDocument));

app.use('/api/v1', routes)

// app.route('/signup').post(auth.signup);

try {

  let server = app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`);
    const io = require('socket.io')(server, {
      cors: {
        origin: '*',
      }
    })

    var users = {};

    const sock = io.of('/socket').on('connection', (socket) => {
      let user_id = socket.handshake.query.user_id

      users[user_id] = {
        socket: socket.id,
      };
      console.log('users connected........', users)

      socket.on('send_message', async (req, res) => {

        // middleware.decryption(req, (request) => {
        let request = req
        request.sender_id = user_id;
        var receiver_id = request.receiver_id;
        request.language = "en";
        let send_message = await chat_model.send_message_socket(request)
        if (send_message.receiver_id != undefined) {
          sock.to(users[user_id]['socket']).emit('send_message', send_message);
          console.log('users                          s: ', users[receiver_id]);
          if (users[receiver_id] != undefined && users[receiver_id] != "") {
            sock.to(users[receiver_id]['socket']).emit('send_message', send_message);
          } else {
            sock.to().emit('send_message', send_message);
          }
        } else {

          //push notification hear....

          // var responseData = { code: code, message: message, data: data }
          // middleware.encryption(responseData, (response) => {
          socket.to(users[user_id]['socket']).emit('send_message', null)
          // })
        }

      });

      socket.on('disconnect', () => {
        for (var user_id in users) {
          if (users[user_id].socket === socket.id) {
            delete users[user_id];
            console.log('disconnected user_id', user_id);
            break;
          }
        }
      });

    })

  });
} catch (error) {

  console.log(error);
}


// listen for requests
// try {
//   module.exports = app.listen(port, () => {
//     logger.info(`Server is listening on port ${port}`);
//   });

// } catch (error) {
//   logger.error("Failed to start server.", error);

// }

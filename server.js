const express = require('express');
const Gpio = require('onoff').Gpio;
const cors = require('cors');
const axios = require('axios');
const port = 3030
const app = express();
const http = require('http').createServer(app);
const { v4: uuidv4 } = require('uuid');
let id = '';

const corsOptions = {
    origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/bind-hardware', (req, res) => {
    if (!id) id = uuidv4();
    res.json({ id })
})
app.get('/', (req, res) => {
    res.send('Nothing Here')
})




const button = new Gpio(4, 'in', 'rising', { debounceTimeout: 400 });

button.watch(async (err, value) => {
    if (err) {
        console.Error('Error', err);
    }

    //value (0 or 1) 
    console.log(value)

    const res = await axios.get(`https://shavimapp-back.onrender.com`, {
        params: {
            id,
        }
    })
    console.log(res.status)

});




http.listen(port, () => {
    console.info('Server is running on port: ' + port)
})
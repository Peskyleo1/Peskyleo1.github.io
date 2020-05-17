
//Server is required to store API_KEY and make requests on behalf of
//the client. There is no safe way to store API_KEYs on the client.
const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

//Server will listen on a dedicated port and serve whatever is in the
//public folder to the client.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb'}));

//The request holds all of the data being sent to the server
//Response holds all of the data that has to be sent back to the client
app.get('/weather/:latitudelongitude', async (request, response) => {
    const latitudelongitude = request.params.latitudelongitude.split(',');
    console.log(latitudelongitude);
    const latitude = latitudelongitude[0];
    const longitude = latitudelongitude[1];
    console.log(latitude, longitude);
    const weather_api_key = process.env.WEATHER_API_KEY;
    //const weather_url = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${latitude},${longitude}`;
    //const weather_response = await fetch(weather_url);

    const weather_url = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
    var headers = {
        'content-type': 'application/json',
        'x-access-token': weather_api_key
    };
    const weather_response = await fetch(weather_url, {method: 'GET', headers: headers});
    
    const weatherData = await weather_response.json();
    console.log(weatherData);
    response.json(weatherData);
})
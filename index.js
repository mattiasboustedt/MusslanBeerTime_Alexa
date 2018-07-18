'use strict';
const Alexa = require('alexa-sdk');
const axios = require('axios');

const APP_ID = 'amzn1.ask.skill.dec4001f-ab34-40cd-9e49-b9250c679b4d';
const SKILL_NAME = 'Musslan Beer Time';

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetMusslanBeerTime');
    },
    'GetMusslanBeerTime': function () {
        let self = this;
        let speechOutput;
        let beerTime;
        let nanoToBeerTime;
        let uri = 'https://api.isitmusslanbeertime.com/time';
        
        axios.get(uri)
        .then(function (response) {
            beerTime = response.data.currentBeerTime;
            nanoToBeerTime = response.data.nanoToBeerTime
            console.log(beerTime);
            
            if (beerTime) {
                speechOutput = 'Fortunately, it is musslan beer time. Enjoy your beer!';
                console.log(speechOutput)
            } else {
                speechOutput = 'Unfortunately, it is not Musslan Beer Time. It is ' + nanoToBeerTime + ' nano seconds to Musslan Beer Time.';
                console.log(speechOutput)
            }

            self.response.cardRenderer(SKILL_NAME, beerTime);
            self.response.speak(speechOutput);
            self.emit(':responseReady');
        })
        .catch(function (error) {
            console.log(error);
        })
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

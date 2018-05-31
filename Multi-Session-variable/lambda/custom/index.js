
'use strict';
const Alexa = require('alexa-sdk');





const handlers = {
    'LaunchRequest': function() { //Executes when a new session is launched
        if (!this.attributes['myLangauge']) {
            this.emit('LaunchIntent');
        } else {
            this.emit('TestIntent');
        }
    },

    'LaunchIntent': function() {
        this.emit(':ask', "Hi, what is your language?");
    },

    'LanguageIntent': function() {
        this.attributes['myLangauge'] = this.event.request.intent.slots.lang.value;
        this.emit(':ask', "I got it.");
    },

    'TestIntent': function() {
        this.emit(':tell', "I still remember that your language is, " + this.attributes['myLangauge']);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.dynamoDBTableName='SampleTable';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

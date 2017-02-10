'use strict';
var Alexa = require("alexa-sdk");
var numeral = require("numeral");
var appId = 'amzn1.ask.skill.b925ac6c-dab0-4bbd-9539-88a457aa24a2'; 

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers,invalidValueHandlers);
    alexa.execute();
};

var handlers = {
    'NewSession': function() {
        console.log('Handler: New Session');
        var response = '<p>How can a skill recognize dollar amounts spoken by users?</p><p>I am going to show you. Please say a dollar amount.</p>';
        var reprompt = 'Dollar amount please.';
        var cardTitle = 'Alexa and Dollar amounts ';
        var cardContent = 'Sample of Intents will go here';
        var imageObj = {
            "smallImageUrl": "",
            "largeImageUrl": "https://s3-us-west-2.amazonaws.com/ask-skills/AmazonAlexa_Talk+to+me-ring.png"
        };
        this.emit(':askWithCard', response, reprompt, cardTitle, cardContent, imageObj);
    },
    'LaunchRequest': function() {
        console.log('Handler: New Session');
        var response = '<p>How can a skill recognize dollar amounts spoken by users?</p><p>I am going to show you. Please say a dollar amount.</p>';
        var reprompt = 'Dollar amount please.';
        var cardTitle = 'Alexa and Dollar amounts ';
        var cardContent = 'Sample of Intents will go here';
        var imageObj = {
            "smallImageUrl": "",
            "largeImageUrl": "https://s3-us-west-2.amazonaws.com/ask-skills/AmazonAlexa_Talk+to+me-ring.png"
        };
        this.emit(':askWithCard', response, reprompt, cardTitle, cardContent, imageObj);
    },
    'DollarAmount': function () {
        console.log('user intent: Dollar Amount');
        var myDollar = this.event.request.intent.slots.dollar.value;
        var myCents = this.event.request.intent.slots.cents.value;
        
        function cents(n){
            return n > 9 ? "" + n: "0" + n;
        }
        
        
        var reprompt = 'Say another amount';
        
        var speechTell = '';
        var cardContent = '';
        
        
        if (myCents == '?' || myDollar == '?' || (myCents != null && myCents.length >2)) {
            this.emit('InvalidAmount');
        } else {
            if (myCents != null && myDollar != null) {
            console.log('Dollar Amount passed: '+ myDollar +'.'+cents(myCents));
            speechTell = '<p>I believe you said, ' + myDollar +' dollars and '+myCents +' cents.</p><p>Hope that was right.</p><p>Give me another one.</p>';
            cardContent = 'Is this what you said? $' + myDollar +'.'+cents(myCents);
            } else if (myCents != null && typeof myDollar === 'undefined') {
            console.log('Dollar Amount passed: '+ cents(myCents));
            speechTell = '<p>I believe you said, ' + myCents +' cents.</p><p>Pretty nifty right?</p><p>Wanna give me another one?</p>';
            cardContent = 'Is this what you said? .' + cents(myCents);
            } else {
            console.log('Dollar Amount passed: '+ myDollar);
            speechTell = '<p>I believe you said, ' + myDollar +' dollars. </p><p>I bet that was right.</p><p>Let\'s try another amount.</p>';
            cardContent = 'Is this what you said? $' + myDollar;
            }
        
            var cardTitle ='Amount you said...';
            var imageObj = {};
            this.emit(':askWithCard', speechTell, reprompt, cardTitle, cardContent, imageObj);
        
        } 
    },
    'AMAZON.HelpIntent': function() {
        console.log('user intent: Help');
        var reprompt = 'Speak a amount';
        var speechTell = '<p>This skill is meant to demostrate one way to pass in dollar amounts to your skill.</p><p>All you need to do is say a dollar amount and I\'ll repeat it back to you and put it in a card.</p><p>Go ahead, say an amount.</p>';

        this.emit(':ask', speechTell, reprompt);
    },
    'AMAZON.StopIntent': function() {
        console.log('user intent: Exit - StopIntent');
        var speechTell = 'Thanks for playing. Hope to see you soon!';   
        
        this.emit(':tell',speechTell);
    },
    'AMAZON.CancelIntent': function() {
        console.log('user intent: Exit - CancelIntent');
        var speechTell = 'Thanks for playing. Hope to see you soon!';   
        
        this.emit(':tell',speechTell);
    },
    'Unhandled': function() {
        console.log('user intent: Invalid response');
        this.emit(':ask', 'Sorry, I didn\'t get that.<break strength="medium" /> Please repeat the request.', 'Say a dollar amount');
    }
};

var invalidValueHandlers = {
    'InvalidAmount': function() {
        console.log('Invalid amount passed');
        this.emit(':ask', 'Sorry, I didn\'t catch a valid amount. Please say a valid amount.', 'Please say a valid amount.');
    }
}
/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.837123d4-69bc-489e-82f9-1754fa54ea1c"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing facts about da Vinci.
 */
var FACTS = [
    "The name Leonardo da Vinci translates to Leonard from the town of Vinci.",
    "Leonardo was raised by his single father.",
    "Leonardo was one of the first Italians to use oil paint.",
    "He was left-handed.",
    "Leonardo da Vinci left many paintings unfinished and destroyed most of his work.",
    "Two of his works, the Mona Lisa and The Last Supper, are the most famous, most reproduced and most parodied portrait and religious painting of all time.",
    "Leonardo was a vegetarian who loved animals and despised war, yet he worked as a military engineer to invent advanced and deadly weapons.",
    "Leonardo drew the plans for the first armored car in 1485!",
    "He invented the bicycle 300 years before it appeared on the road.",
    "Leonardo di Vinci created an inflatable tube so people could float in the water.",
    "Leonardo da Vinci had dyslexia, when he made notes on his inventions it was all written in reverse, which made it hard for others to dig through his notes and steal his ideas.",
    "Leonardo da Vinci dug into graveyards at night to steal corpses and study human anatomy and find out where the soul was.",
    "He produced aeriel maps for Cesare Borgia which are still accurate today.",
    "Leonardo is considered by many as the father of modern science.",
    "He was one of the most acclaimed artists of the Renaissance.",
    "He was the illegitimate child of Messer Piero Fruosino di Antonio da Vinci, a Florentine notary, and Caterina, a peasant.",
    "Leonardo sketched the first parachute, first helicopter, first aeroplane, first tank, first repeating rifle, swinging bridge, paddleboat and the first motorcar.",
    "Leonardo was very much interested in the possibility of human flight. He produced many studies of the flight of birds and plans for several flying machines.",
    "He was also a sculptor, designer of costumes, mathematician and botanist.",
    "He made maps of Europe.",
    "He invented hydraulic pumps.",
    "He designed a movable bridge for the Duke of Milan.",
    "He drew the plans of the first armored car in 1485.",
    "It took da Vinci about ten years to paint Mona Lisa's lips.",
    "Leonardo was famous for the way he used light in his portraits.",
    "He painted The Last Supper at Santa Maria delle Grazie in Milan; a dramatic depiction of the moment Jesus announced that he would be betrayed.",
    "He established modern techniques of scientific illustration with highly accurate renderings such as Embryo in the Womb",
    "Da Vinci wrote in the opposite direction to what is normal, meaning you’d need a mirror to read it properly.",
    "After he had drawn an impressive map of Imola, Leonardo was hired as his chief military engineer and architect by Cesare.",
    "Leonardo also drew a map of Chiana Valley, Tuscany so that Cesare would be better prepared with the knowledge of the overlay of the land.",
    "From September 1513 to 1516, Leonardo lived in the Belvedere located in the Vatican in Rome.",
    "In 1515, Leonardo da Vinci was commissioned to make a mechanical lion which could walk forward and open its chest to reveal a cluster of lilies.",
    "Because of his vegetarianism, Leonardo had a habit of purchasing caged birds and then releasing them into the wild.",
    "Leonardo’s drawings and notes range grocery lists and people who owed him money to designs for winged shoes to walk on water.",
    "It is believed the account that King Francis the first held Leonardo’s head in his arms as he died was fiction instead of fact.",
    "In 1499, Leonardo da Vinci fled to Venice where he created a system of moveable barricades to protect the city from attack."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * daVinciFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    // console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //  console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a fact about Leonardo da Vinci, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random fact from the facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the da Vinci Facts skill.
    var fact = new Fact();
    fact.execute(event, context);
};

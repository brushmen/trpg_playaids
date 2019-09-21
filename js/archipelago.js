
var gamehandle = 'archipelago';
var gamedata = {};

var fate_text = [
    "Somebody important to this character faces trouble because of the element you own - severe illness, bankruptcy, doubt in their faith or similar.",
    "This character does something rash that causes them a lot of trouble with the element you own. An unwise liaison; insulting an ally; destruction of property.",
    "An area on the map is threatened. An attack by enemies, a natural disaster, a change from within or similar.",
    "Someone from this character's past suddenly appears in an area on the map, with a request or demand.",
    "The element you own is interfering with this character's desires, wishes or needs.",
    "Something important is stolen from this character by someone connected to the element you own.",
    "The element you own changes allegiance, motivation or direction.",
    "This character receives an unwanted and troublesome gift from an area on the map.",
    "The element you own claims something from you that you might not be able to give.",
    "This character makes an enemy in the element you own.",
    "This character must come to terms with the element you own, either mastering it, co-opting it, or accepting the element's control.",
    "The element you own comes to this character's aid in some unexpected and surprising way. This is not without consequences."
];

var resolution_text = [
    "YES, and... you earn a friend, reward or good reputation in the process.",
    "YES, and... something completely unrelated is a smashing success.",
    "YES, but... you earn a new enemy, debt or bad reputation in the process.",
    "YES, but... something entirely unrelated goes badly wrong.",
    "YES, but... your success will cause great personal harm.",
    "YES, but... your success has dangerous and unintended consequences.",
    "YES, but... your success will harm a friend, ally or loved one.",
    "YES, but... in order to succeed you must sacrifice something dear to you.",
    "PERHAPS... but this isn't something you can do alone. Help is needed.",
    "PERHAPS... but if you want this done, someone more suited to the task must do it.",
    "NO, but... your failure helps another succeed.",
    "NO, but... you gain insight or knowledge that will be useful in the future.",
    "NO, but... you earn a friend, ally or goodwill in the process.",
    "NO, but... your failure has unexpected positive consequences.",
    "NO, and... something entirely unrelated goes badly wrong.",
    "NO, and... someone or something dear to you is harmed, lost or destroyed."
];

initGameData();

function initGameData() {
    gamedata = {
		"profiles": [
			{
				"portrait": "https://raw.githubusercontent.com/brushmen/trpgplayaid_server/master/public/images/portraiticon.png",
				"player": null,
				"character": null,
				"ownedelement": null,
				"notes": null,
				"destiny": null
			},
			{
				"portrait": "https://raw.githubusercontent.com/brushmen/trpgplayaid_server/master/public/images/portraiticon.png",
				"player": null,
				"character": null,
				"ownedelement": null,
				"notes": null,
				"destiny": null
			},
			{
				"portrait": "https://raw.githubusercontent.com/brushmen/trpgplayaid_server/master/public/images/portraiticon.png",
				"player": null,
				"character": null,
				"ownedelement": null,
				"notes": null,
				"destiny": null
			}
		],
        "currentimage": null
    }

   // prepare decks

   gamedata['fate_deck'] = shuffle(fate_text);
   gamedata['fate_discard'] = [];

   gamedata['resolution_deck'] = shuffle(resolution_text);
   gamedata['resolution_discard'] = [];

   gamedata['currentcard'] = null;
   gamedata['currentcardtype'] = null;
}

function drawCard(type = 'resolution') {
    var text = '';

    if (gamedata[type + '_deck'].length < 1) {
        // shuffle discard back into deck
        gamedata[type + '_deck'] = shuffle(gamedata[type + '_discard']);
        gamedata[type + '_discard'] = [];
    }

    text = gamedata[type + '_deck'][0];
    // move card from deck to discard
    gamedata[type + '_discard'].push(gamedata[type + '_deck'].shift());

    return text;
}

function JSONtoGame(obj) {
    if (obj) {
        gamedata = obj[gamehandle];
    }
}

function GametoJSON() {
    var gameJSON = {};
    if (gamedata) {
        gameJSON[gamehandle] = gamedata;
        gameJSON = JSON.stringify(gameJSON, null, "\t");
    }
    return gameJSON;
}

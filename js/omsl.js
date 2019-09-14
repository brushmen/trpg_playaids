

var gamehandle = 'omsl';
var gamedata = {};
initGameData();

function initGameData() {
    gamedata = {
        "roles": {
            "mundane": {
                "name": null,
                "pronoun": null,
                "notes": null,
                "problem": null,
                "activities": []
            },
            "supernatural": {
                "name": null,
                "pronoun": null,
                "notes": null,
                "problem": null,
                "supernaturaltype": null,
                "activities": []
            }
        },
        "shared": {
            "relationship": null,
            "activities": []
        },
        "ourday": {
            "activities": [],
            "indicesofactivitygonewrong" : []
        },
        "scenelength": null
    }
}

function sortSchedules() {

    // every merge re-generates the random indices

    if (!gamedata['ourday']) {
        gamedata['ourday'] = {};
    }
    gamedata['ourday']['indicesofactivitygonewrong'] = [];

    while (gamedata['ourday']['indicesofactivitygonewrong'].length < 5) {
        var random_number = Math.floor(Math.random() * 12); // random value from 0 to 11
        if (gamedata['ourday']['indicesofactivitygonewrong'].indexOf(random_number) == -1) {
            gamedata['ourday']['indicesofactivitygonewrong'].push( random_number );
        }
    }

    // get all times/activities from mundane and supernatural

    var list = [];
    var activities = [];
    var i = 0;
    for (var r in gamedata['roles']) {
        activities = gamedata['roles'][r]['activities'];
        for (i = 0; i < activities.length; i++) {
            list.push({'role': r, 'index': i,
                       'time': sanitize(activities[i]['time'], 'time'),
                       'activity': activities[i]['activity']
            });
        }
    }

    // add in shared activities
    activities = gamedata['shared']['activities'];
    for (i = 0; i < activities.length; i++) {
        list.push({'role': 'shared', 'index': i,
                   'time': sanitize(activities[i]['time'], 'time'),
                   'activity': activities[i]['activity']
        });
    }

    list.sort(compareActivities);
    // console.log('list length: ' + list.length);
    gamedata['ourday']['activities'] = list;
}

function getSceneLength() {
    // 1d4+1 minutes
    return Math.floor((Math.random() * 4) + 1) + 1;
}

// comparators for activity object
// (with element's source role, index, time and activity)
function compareActivities(a, b) {
    var result = 0;
    // compare time first
    if (parseInt(a.time) < parseInt(b.time)) {
        result = -1;
    }
    else if (parseInt(a.time) > parseInt(b.time)) {
        result = 1;
    }
    else {
        // if time ties, compare string value of activity
        if (a.activity < b.activity) {
            result = -1
        }
        else if (a.activity > b.activity) {
            result = 1;
        }
        else {
            // if still ties, compare index
            if (a.index < b.index) {
                result = -1;
            }
            else if (a.index > b.index) {
                result = 1;
            }
            else {
                // if still ties, supernatural above mundane
                if (a.role == 'mundane' && b.role == 'supernatural') {
                    result = -1;
                }
                else if (a.role == 'supernatural' && b.role == 'mundane') {
                    result = 1;
                }
            }
        }
    }

    return result;
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

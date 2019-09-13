

var gamehandle = 'omsl';
var gamedata = {};

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

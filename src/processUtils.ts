import {writeLaunchConfiguration} from "./debugUtils"

import find = require("find-process");

export async function getPidByName(processName: string, interval: NodeJS.Timeout){
    if(processName === undefined){
        return;
    }
    processName = processName.trim();
    if (processName === ""){
        return;
    }
    find('name', processName, true).then(function (list) {
        if(list.length == 0){
            return;
        }
        let p = list[0]
        clearInterval(interval);
        console.log("successfully find process " + p.pid +" with name: " + processName)

        writeLaunchConfiguration(p.pid);
    }, function (err) {
        console.log(err.stack || err);
    })
}
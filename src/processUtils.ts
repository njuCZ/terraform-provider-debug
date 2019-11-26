import * as vscode from 'vscode';
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
        console.log(p.pid);
        return
    }, function (err) {
        console.log(err.stack || err);
    })
  
    //         vscode.window.showErrorMessage('can not find process by name: ' + processName)
    //     });
    // } else {
    //     vscode.window.showInformationMessage('currently only windows is supported!');
    // }
}
import * as path from 'path';
import * as vscode from 'vscode';

const fs = require('fs');

let attachConfig = {
    "name": "debug terraform provider",
    "type": "go",
    "request": "attach",
    "mode": "local",
    "processId": 0
}

export function writeLaunchConfiguration(pid: number){
    attachConfig.processId = pid;

    let dir: string =  path.join(vscode.workspace.rootPath || "", ".vscode")

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    let fileJson: Object;
    let launchFile: string = path.join(dir, "launch.json")
    if (!fs.existsSync(launchFile)){
        fileJson = {
            "version": "0.2.0",
            "configurations":[ attachConfig ]
        }
    } else {
        fileJson = require('launchFile');
        fileJson.configurations.add(attachConfig)
    }
    fs.writeFile(launchFile, JSON.stringify(fileJson, null, 2), function (err: any, data: any) { 
        if (err) throw err;
        console.log(data + ' saved!');
    })
}
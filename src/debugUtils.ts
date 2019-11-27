import * as path from 'path';
import * as vscode from 'vscode';
import * as _ from "lodash";
import {getWorkspaceFolder} from "./workspaceUtils"

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
    let rootPath: string = getWorkspaceFolder() || "";
    let dir: string =  path.join(rootPath || "", ".vscode")

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
        fileJson = require(launchFile);
        
        let configList: Map<string, any> = fileJson.configurations.filter(config => config.name === attachConfig.name)
        if(_.isEmpty(configList)){
            fileJson.configurations.add(attachConfig)    
        } else {
            configList[0].processId = pid
        }
    }
    fs.writeFile(launchFile, JSON.stringify(fileJson, null, 2), function (err: any, data: any) { 
        if (err) throw err;
        vscode.debug.startDebugging(vscode.workspace.workspaceFolders[0], attachConfig.name)
            .then(function(bool){
                console.log("start debug: " + bool);
            })
    })
}
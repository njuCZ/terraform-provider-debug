import * as cp from "child_process";
import {isWindows} from "./osUtils"
import * as vscode from 'vscode';

export async function getPidByName(processName: string){
    if(isWindows){
        cp.exec('tasklist', function(err, stdout, stderr) { 
            var lines = stdout.toString().split('\n');
            for(let i = 0; i < lines.length; i ++){
                let line = lines[i];
                if (line.indexOf(processName) > -1){
                    let pid = extractPid(line)
                    if (pid == null){
                        continue;
                    }
                    console.log(pid)
                    return pid;
                }
            }
            vscode.window.showErrorMessage('can not find process by name: ' + processName)
        });
    } else {
        vscode.window.showInformationMessage('currently only windows is supported!');
    }
}

function extractPid(line: string){
    let arr = line.match(/\d+/)
    if( arr == null ) {
        return null
    }
    return arr[0]
}
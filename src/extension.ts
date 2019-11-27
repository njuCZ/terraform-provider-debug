import * as vscode from 'vscode';
import {listenLocalProcessPeriodly} from "./timer"
import * as _ from "lodash";

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('terraformProviderDebug.attachLocalProcess', async () => {
		let inputBoxOptions: vscode.InputBoxOptions = {
			placeHolder: "pick the process to attach to"
		}
		vscode.window.showInputBox(inputBoxOptions)
			.then(processName => {
				if(processName === undefined) {
					return;
				}
				processName = processName.trim();
				if(_.isEmpty(processName)){
					vscode.window.showErrorMessage("process name input can not be blank")
					return;
				}
				listenLocalProcessPeriodly(processName);
			})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

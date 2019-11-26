import * as vscode from 'vscode';
import {getPidByName} from './processUtils'
import {listenLocalProcessPeriodly} from "./timer"
import {getWorkspaceFolder} from "./workspaceUtils"
import {writeLaunchConfiguration} from "./debugUtils"

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		writeLaunchConfiguration(123);
		listenLocalProcessPeriodly();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

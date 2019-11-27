import * as vscode from 'vscode';
import {listenLocalProcessPeriodly} from "./timer"

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		listenLocalProcessPeriodly();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

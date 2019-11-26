import * as vscode from 'vscode';
import {getPidByName} from './processUtils'

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		// vscode.window.showInformationMessage('Hello World!');
		await getPidByName("wininit.exe")
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

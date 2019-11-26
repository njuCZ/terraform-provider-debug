"use strict";

import * as _ from "lodash";
import * as vscode from "vscode";

export function getWorkspaceFolder(): string | undefined {
    let folders: vscode.WorkspaceFolder[] = vscode.workspace.workspaceFolders || [];
    if (!_.isEmpty(vscode.workspace.workspaceFolders)) {
        return folders[0].uri.fsPath;
    }
    return undefined;
}

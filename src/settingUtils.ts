import * as vscode from "vscode";

export function getTotalListenTime(): number {
    return vscode.workspace.getConfiguration().get("terraformProviderDebugger.totalListenTime") || 600;
}

export function getListenInterval(): number {
    return vscode.workspace.getConfiguration().get("terraformProviderDebugger.listenInterval") || 1;
}


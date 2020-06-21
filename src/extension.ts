// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
import { getColorTheme } from './vscode/getColorTheme';
import { vscodeColorThemeToItermProfile, updateDynamicProfile } from './iterm2/index';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeActiveColorTheme(async (event) => {		
		try {
			const vscodeColorTheme = await getColorTheme(context);
			const itermProfile = vscodeColorThemeToItermProfile(vscodeColorTheme);

			await updateDynamicProfile(itermProfile);
			// debugger;
		} catch (err) {
			debugger;
		}
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}

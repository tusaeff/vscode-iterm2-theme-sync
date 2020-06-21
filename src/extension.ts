import * as vscode from 'vscode';
import { getColorTheme } from './vscode/getColorTheme';
import {
  vscodeColorThemeToItermProfile,
  updateDynamicProfile,
} from './iterm2/index';

async function createProfileWithVSCodeTheme(context: vscode.ExtensionContext) {
  const vscodeColorTheme = await getColorTheme(context);
  const itermProfile = vscodeColorThemeToItermProfile(vscodeColorTheme);

  await updateDynamicProfile(itermProfile);
}

export function activate(context: vscode.ExtensionContext) {
  createProfileWithVSCodeTheme(context);

  vscode.window.onDidChangeActiveColorTheme(async (event) => {
    try {
      createProfileWithVSCodeTheme(context);
    } catch (err) {
      vscode.window.showErrorMessage(
        `vscode-iterm2-theme-sync: can't sync themes because of error`,
        err
      );
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}

import * as vscode from 'vscode';
import { getColorTheme } from './vscode/getColorTheme';
import {
  vscodeColorThemeToItermProfile,
  updateDynamicProfile,
} from './iterm2/index';

async function createProfileWithVSCodeTheme(context: vscode.ExtensionContext) {
  try {
    const vscodeColorTheme = await getColorTheme(context);
    const itermProfile = vscodeColorThemeToItermProfile(vscodeColorTheme);

    await updateDynamicProfile(itermProfile);

    return itermProfile;
  } catch (error) {
    vscode.window.showErrorMessage(`[iTerm2 Theme Sync] An unknown error has occurred :( You can create an issue in the github repository and I will try to fix it as soon as possible. Error message: ${error.message}`);
  }
}

function showFirstActivationNotification(profileName: string) {
  const text = [
    'The extension «iTerm2 Theme Sync» was successfully installed!',
    `Now you can open iTerm2 preferences and make the profile called «${profileName}» default. 
    After restart, iTerm will be synchronized with the selected VSCode theme.`,
  ];

  return vscode.window.showInformationMessage(text.join('\n'), 'Ok');
}

async function checkFirstActivation(context: vscode.ExtensionContext) {
  const wasActivated = context.globalState.get<boolean>('wasActivated');

  if (!wasActivated) {
    const profile = await createProfileWithVSCodeTheme(context);

    if (!profile) {
      return;
    }

    if (profile.Name) {
      showFirstActivationNotification(profile.Name);
    }

    await context.globalState.update('wasActivated', true);
  }
}

export function activate(context: vscode.ExtensionContext) {
  checkFirstActivation(context);

  vscode.window.onDidChangeActiveColorTheme(async (event) => {
    createProfileWithVSCodeTheme(context);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}

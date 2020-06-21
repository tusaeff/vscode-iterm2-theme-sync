import * as vscode from 'vscode';
import { IColorTheme } from '../types';

const fs = require('fs');

export const getColorTheme = (context: vscode.ExtensionContext) => {
  return new Promise<IColorTheme>(async (resolve, reject) => {
    const ref = vscode.window.createWebviewPanel(
      'color-theme-loader',
      'Syncing vscode theme with iterm2',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
      }
    );

    ref.webview.html = await getWebViewContent(
      context.asAbsolutePath('./dist/webview.html'),
    );

    ref.webview.onDidReceiveMessage((message) => {
			ref.dispose();
			resolve(message as IColorTheme);
    });
  });
};

const getWebViewContent = async (htmlPath: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(htmlPath, 'utf8', (err: Error, html: string) => {
      if (err) {
        return reject(err);
      }

      resolve(html);
    });
  });
};

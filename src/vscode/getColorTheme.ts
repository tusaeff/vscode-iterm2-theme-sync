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
      context.asAbsolutePath('./webview/index.js'),
    );

    ref.webview.onDidReceiveMessage((message) => {
			ref.dispose();
			resolve(message as IColorTheme);
    });
  });
};

const wrapWithHtml = (content: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <script>
        ${content}
      </script>
    </body>
  </html>
`;
};

const getWebViewContent = async (webviewScriptPath: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(webviewScriptPath, 'utf8', (err: Error, script: string) => {
      if (err) {
        return reject(err);
      }

      // TODO: fix webview bundling
      script = script.replace('Object.defineProperty(exports, "__esModule", { value: true });', '');
      resolve(wrapWithHtml(script));
    });
  });
};

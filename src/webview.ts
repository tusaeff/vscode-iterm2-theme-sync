// loaded as vscode webview
import type { IColorTheme } from './types';

const editorStyle = window.getComputedStyle(document.documentElement);

// @ts-ignore
const vscode = acquireVsCodeApi();

const themeName = document.body.getAttribute('data-vscode-theme-name');

const colorTheme: IColorTheme = {
  name: themeName || '',
  foreground: editorStyle.getPropertyValue('--vscode-editor-foreground'),
  background: editorStyle.getPropertyValue('--vscode-editor-background'),
  selection: editorStyle.getPropertyValue('--vscode-editor-selectionBackground'),
  selectedText: editorStyle.getPropertyValue('--vscode-editor-foreground'),
  cursorText: editorStyle.getPropertyValue('--vscode-terminalCursor-foreground'),
  cursor: editorStyle.getPropertyValue('--vscode-terminalCursor-background'),
  bold: editorStyle.getPropertyValue('--vscode-editor-foreground'),
  link: editorStyle.getPropertyValue('--vscode-textLink-foreground'),
  statusBarBackground: editorStyle.getPropertyValue('--vscode-statusBar-background'),
  statusBarForeground: editorStyle.getPropertyValue('--vscode-statusBar-foreground'),

  ansi: {
    normal: {
      black: editorStyle.getPropertyValue('--vscode-terminal-ansiBlack'),
      blue: editorStyle.getPropertyValue('--vscode-terminal-ansiBlue'),
      cyan: editorStyle.getPropertyValue('--vscode-terminal-ansiCyan'),
      green: editorStyle.getPropertyValue('--vscode-terminal-ansiGreen'),
      magenta: editorStyle.getPropertyValue('--vscode-terminal-ansiMagenta'),
      red: editorStyle.getPropertyValue('--vscode-terminal-ansiRed'),
      white: editorStyle.getPropertyValue('--vscode-terminal-ansiWhite'),
      yellow: editorStyle.getPropertyValue('--vscode-terminal-ansiYellow'),
    },
    bright: {
      black: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightBlack'),
      blue: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightBlue'),
      cyan: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightCyan'),
      green: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightGreen'),
      magenta: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightMagenta'),
      red: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightRed'),
      white: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightWhite'),
      yellow: editorStyle.getPropertyValue('--vscode-terminal-ansiBrightYellow'),
    }
  }
};

vscode.postMessage(colorTheme);
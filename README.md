# iTerm2 theme sync
  ![Version](https://img.shields.io/visual-studio-marketplace/v/tusaeff.vscode-iterm2-theme-sync) ![Build Status](https://img.shields.io/github/workflow/status/tusaeff/vscode-iterm2-theme-sync/Create%20Release)
  
  Syncs ITerm2 color profile with selected VSCode theme

  ![Screencast](screencast.gif)

## Install
* Install [extension from VSCode Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=tusaeff.vscode-iterm2-theme-sync)
* Once installed, the extension will create a [dynamic iTerm profile](https://www.iterm2.com/documentation-dynamic-profiles.html)
* Open iTerm settings and set this new dynamic profile as default (its name should be suffixed with "synchronized with VSCode").
* Restart iTerm for changes to take effect or create a new tab
* Now we're all set! If you change the VSCode's theme, the iTerm profile must be updated (there may be a small lag while the terminal picks up the update).

## Prerequisites
* iTerm2 Version 2.9.20140923 and later
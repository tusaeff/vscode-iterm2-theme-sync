
export interface IColorTheme {
  name: string;
  foreground: string;
  background: string;
  selection: string;
  selectedText: string;
  cursor: string;
  cursorText: string;
  bold?: string;
  link?: string;

  statusBarBackground: string;
  statusBarForeground: string;

  ansi: {
    normal: IColorThemeAnsiColors;
    bright: IColorThemeAnsiColors;
  };
}

export interface IColorThemeAnsiColors {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
}

export interface IItermColor {
  "Red Component" : number,
  "Color Space" ?: "sRGB",
  "Blue Component" : number,
  "Alpha Component"?: number,
  "Green Component" : number,
}

export interface IItermProfile {
  "Use Non-ASCII Font" : boolean;
  "Tags" : string[];
  "Keyboard Map": unknown;
  "Ansi 0 Color": IItermColor;
  "Ansi 1 Color": IItermColor;
  "Ansi 2 Color": IItermColor;
  "Ansi 3 Color": IItermColor;
  "Ansi 4 Color": IItermColor;
  "Ansi 5 Color": IItermColor;
  "Ansi 6 Color": IItermColor;
  "Ansi 7 Color": IItermColor;
  "Ansi 8 Color": IItermColor;
  "Ansi 9 Color": IItermColor;
  "Ansi 10 Color": IItermColor;
  "Ansi 11 Color": IItermColor;
  "Ansi 12 Color": IItermColor;
  "Ansi 13 Color": IItermColor;
  "Ansi 14 Color": IItermColor;
  "Ansi 15 Color" : IItermColor,
  "Bold Color": IItermColor;
  "Link Color" : IItermColor,
  "Cursor Guide Color" : IItermColor;
  "Foreground Color" : IItermColor,
  "Selection Color" : IItermColor,
  "Selected Text Color" : IItermColor,
  "Badge Color" : IItermColor,
  "Cursor Text Color" : IItermColor,
  "Cursor Color" : IItermColor,
  "Background Color" : IItermColor
  "Rows": number;
  "Default Bookmark" : string;
  "Non-ASCII Anti Aliased" : boolean;
  "Use Bright Bold" : boolean;
  "Ambiguous Double Width" : boolean;
  "Jobs to Ignore" : string[];
  "Bound Hosts" : unknown[],
  "Working Directory" : string,
  "Blinking Cursor" : boolean,
  "Disable Window Resizing" : boolean,
  "Sync Title" : boolean;
  "Prompt Before Closing 2" : boolean;
  "BM Growl" : boolean;
  "Command" : string;
  "Description" : string;
  "Mouse Reporting" : boolean;
  "Screen" : number;
  "Columns" : number,
  "Idle Code" : number

  "Custom Command" : string
  "ASCII Anti Aliased" : boolean
  "Non Ascii Font" : string,
  "Vertical Spacing" : number
  "Use Bold Font" : boolean;
  "Option Key Sends" : number
  "Character Encoding" : number

  "Use Italic Font" : boolean
  "Unlimited Scrollback" : boolean
  
  "Window Type" : number
  "Blink Allowed" : boolean
  "Cursor Type" : number
  "Background Image Location" : string;
  "Blur" : boolean;
  "Scrollback Lines" : number,
  "Send Code When Idle" : boolean,
  "Close Sessions On End" : boolean,
  "Terminal Type" : string;
  "Visual Bell" : boolean,
  "Flashing Bell" : boolean,
  "Silence Bell" : boolean,

  "Name" : string,
  "Guid": string;
  "Shortcut" : string,
  "Transparency" : number,

  "Horizontal Spacing" : number
  

  "Custom Directory" : string
  "Normal Font" : string
  
  "Right Option Key Sends" : number
}
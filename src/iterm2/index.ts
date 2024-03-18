import { IColorTheme, IItermProfile, IItermColor } from '../types';

const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const VSCODE_DYNAMIC_PROFILE_NAME = 'vscode-synced.json';
const DYNAMIC_PROFILE_GUID = '1bbe081f-c02f-497b-9ace-1f588dab1a7a'; // TODO: think about names clash
// relative to ~
const ITERM2_DYNAMIC_PROFILES_DIRECTORY_PATH = './Library/Application\ Support/iTerm2/DynamicProfiles/';

export const vscodeColorThemeToItermProfile = (
  theme: IColorTheme
): Partial<IItermProfile> => {
  return {
    'Guid': DYNAMIC_PROFILE_GUID,
    'Name': `${theme.name} (synchronized with VSCode)`,
    'Ansi 0 Color': vscodeColorToItermColor(theme.ansi.normal.black),
    'Ansi 1 Color': vscodeColorToItermColor(theme.ansi.normal.red),
    'Ansi 2 Color': vscodeColorToItermColor(theme.ansi.normal.green),
    'Ansi 3 Color': vscodeColorToItermColor(theme.ansi.normal.yellow),
    'Ansi 4 Color': vscodeColorToItermColor(theme.ansi.normal.blue),
    'Ansi 5 Color': vscodeColorToItermColor(theme.ansi.normal.magenta),
    'Ansi 6 Color': vscodeColorToItermColor(theme.ansi.normal.cyan),
    'Ansi 7 Color': vscodeColorToItermColor(theme.ansi.normal.white),
    'Ansi 8 Color': vscodeColorToItermColor(theme.ansi.bright.black),
    'Ansi 9 Color': vscodeColorToItermColor(theme.ansi.bright.red),
    'Ansi 10 Color': vscodeColorToItermColor(theme.ansi.bright.green),
    'Ansi 11 Color': vscodeColorToItermColor(theme.ansi.bright.yellow),
    'Ansi 12 Color': vscodeColorToItermColor(theme.ansi.bright.blue),
    'Ansi 13 Color': vscodeColorToItermColor(theme.ansi.bright.magenta),
    'Ansi 14 Color': vscodeColorToItermColor(theme.ansi.bright.cyan),
    'Ansi 15 Color': vscodeColorToItermColor(theme.ansi.bright.white),
    'Bold Color': vscodeColorToItermColor(theme.bold),
    'Link Color': vscodeColorToItermColor(theme.link),
    'Foreground Color': vscodeColorToItermColor(theme.foreground),
    'Selection Color': vscodeColorToItermColor(theme.selection),
    'Selected Text Color': vscodeColorToItermColor(theme.selectedText),
    'Cursor Text Color': vscodeColorToItermColor(theme.cursorText),
    'Cursor Color': vscodeColorToItermColor(theme.cursorText),
    'Background Color': vscodeColorToItermColor(theme.background),
  };
};

const vscodeColorToItermColor = (color?: string): IItermColor | undefined => {
  if (!color) {
    return undefined;
  }

  let rgba = color;

  if (rgba.indexOf('#') === 0) {
    rgba = hexToRGBA(color);
  }

  const [red, green, blue, alpha] = parseRGBA(rgba);

  return {
    'Color Space': 'sRGB',
    'Red Component': Number.parseFloat(red) / 255,
    'Green Component': Number.parseFloat(green) / 255,
    'Blue Component': Number.parseFloat(blue) / 255,
    'Alpha Component': alpha ? Number.parseFloat(alpha) : undefined,
  };
};

const hexToRGBA = (hex: string) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16),
    a = parseInt(hex.slice(7, 9), 16);

  if (a) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};

const parseRGBA = (
  rgba: string
): [string, string, string, string | undefined] => {
  return rgba.split('(')[1].split(')')[0].split(',') as [
    string,
    string,
    string,
    string | undefined
  ];
};

export const updateDynamicProfile = async (profile: Partial<IItermProfile>) => {
  const homeDirectory = os.homedir();
  const json = JSON.stringify({ Profiles: [{ ...profile }] });

  const profilePath = path.join(
    homeDirectory,
    ITERM2_DYNAMIC_PROFILES_DIRECTORY_PATH,
    VSCODE_DYNAMIC_PROFILE_NAME
  );
  const profilePathTmp = `${profilePath}.tmp`;

  await fs.writeFile(profilePathTmp, json);
  /**
   * Overwrite original file with new temp file. This should prevent "Dynamic
   * Profile Error"s.
   */
  await fs.rename(profilePathTmp, profilePath);
};

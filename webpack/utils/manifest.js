const { generateVersion, getPackageJsonVersion } = require('./version');
const { getCommitsCount } = require('./get-commits-count');

const getBasicManifest = () => {
  const packageVersion = getPackageJsonVersion();
  const commitsCount = getCommitsCount();
  const version = generateVersion({ version: packageVersion, commitsCount });
  let name = 'Lazzzy';
  if (version !== packageVersion) {
    name = 'Lazzzy Beta';
  }
  return { version, name };
};

function isBeta() {
  const packageVersion = getPackageJsonVersion();
  const commitsCount = getCommitsCount();
  const version = generateVersion({ version: packageVersion, commitsCount });
  return version !== packageVersion;
}

function generateManifest(options) {
  const { publishToStore, targetBrowser, basicManifest } = options;
  if (targetBrowser === 'Chrome') {
    return {
      ...basicManifest,
      permissions: [
        'activeTab',
        'storage',
        'https://api.lazzzy.app/*',
        'https://resource.lazzzy.app/*',
        'contextMenus',
      ],
      commands: {
        'toggle-feature-foo': {
          suggested_key: {
            default: 'Alt+S',
          },
          description: 'Test',
        },
      },
      optional_permissions: [
        'cookies',
        '<all_urls>',
        'webRequest',
        'webRequestBlocking',
        'pageCapture',
      ],
    };
  }
  if (targetBrowser === 'Firefox') {
    let extra = {};
    if (!publishToStore) {
      extra = {
        applications: {
          gecko: {
            id: 'lazzzy@lazzzy',
          },
        },
      };
    }
    return {
      ...basicManifest,
      ...extra,
      commands: {
        'toggle-feature-foo': {
          suggested_key: {
            default: 'Alt+S',
          },
          description: 'Test',
        },
      },
      permissions: [
        'contextMenus',
        'activeTab',
        'webRequest',
        'webRequestBlocking',
        'storage',
        'https://api.lazzzy.app/*',
        'https://resource.lazzzy.app/*',
        'cookies',
        '<all_urls>',
      ],
    };
  }
  throw Error(`unknown ${targetBrowser}`);
}

module.exports = { getBasicManifest, isBeta, generateManifest };

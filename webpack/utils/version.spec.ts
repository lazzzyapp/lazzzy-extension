const { generateVersion, getPackageJsonVersion } = require('./version');

it('test pre-release', () => {
  expect(generateVersion({ version: '0.0.2-alpha.0', commitsCount: 100 })).toEqual('0.1.100');
});

it('test normal', () => {
  expect(generateVersion({ version: '0.0.2', commitsCount: 100 })).toEqual('0.0.2');
});

it('test getPackageJsonVersion', () => {
  expect(getPackageJsonVersion().length > 0).toBeTruthy();
});

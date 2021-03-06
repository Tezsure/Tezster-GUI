/* eslint-disable no-plusplus */
/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */
function occurrence(string, substring) {
  let counter = 0;
  // eslint-disable-next-line no-unused-vars
  let i = 0;
  const sub = substring.toLowerCase();
  const str = string.toLowerCase();
  const array = [];
  let index = -1;

  do {
    index = str.indexOf(sub, index + 1);
    if (index !== -1) {
      array[counter++] = index;
      i = index;
    }
  } while (index !== -1);
  return counter;
}

function createRegexPattern(regex, initialStorage, patternString) {
  let preparedRegex = regex;
  const ln = occurrence(initialStorage.split(patternString)[0], '(') + 1;
  for (let i = 0; i < ln; i++) {
    preparedRegex += '\\)';
  }
  return preparedRegex;
}

function balancedString(str) {
  let resultString = '';
  let count = 0;
  const n = str.length;
  for (let i = 0; i < n; i++) {
    if (str[i] === '(') {
      resultString += str[i];
      count++;
    } else if (str[i] === ')' && count !== 0) {
      resultString += str[i];
      count--;
    } else if (str[i] !== ')') resultString += str[i];
  }
  if (count !== 0) for (let i = 0; i < count; i++) resultString += ')';
  return resultString;
}
function reduceMapAndBigMap(initialStorage) {
  let pattern = `\\(map .*?\\)`;
  const mapRegex = new RegExp(
    createRegexPattern(pattern, initialStorage, 'map'),
    'g'
  );
  pattern = '\\(big_map .*?\\)';
  const bigMapRegex = new RegExp(
    createRegexPattern(pattern, initialStorage, 'big_map'),
    'g'
  );
  if (mapRegex.test(initialStorage)) {
    initialStorage = initialStorage.replace(mapRegex, `{}`);
  }
  if (bigMapRegex.test(initialStorage)) {
    initialStorage = initialStorage.replace(bigMapRegex, `{}`);
  }
  return initialStorage;
}
export default function getExampleStorage(initialStorage) {
  let regex;
  initialStorage = reduceMapAndBigMap(initialStorage);
  switch (true) {
    case /\(address .*?\)/gm.test(initialStorage):
      regex = /\(address .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
      return getExampleStorage(initialStorage);
    case /\(mutez .*?\)/gm.test(initialStorage):
      regex = /\(mutez .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 0);
      return getExampleStorage(initialStorage);
    case /\(int .*?\)/gm.test(initialStorage):
      regex = /\(int .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 10);
      return getExampleStorage(initialStorage);
    case /\(nat .*?\)/gm.test(initialStorage):
      regex = /\(nat .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 100);
      return getExampleStorage(initialStorage);
    case /\(bool .*?\)/gm.test(initialStorage):
      regex = /\(bool .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 'False');
      return getExampleStorage(initialStorage);
    case /\(bytes .*?\)/gm.test(initialStorage):
      regex = /\(bytes .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '0xABCDEF42');
      return getExampleStorage(initialStorage);
    case /\(chain_id .*?\)/gm.test(initialStorage):
      regex = /\(chain_id .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '0x7a06a770');
      return getExampleStorage(initialStorage);
    case /\(key .*?\)/gm.test(initialStorage):
      regex = /\(key .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
      return getExampleStorage(initialStorage);
    case /\(key_hash .*?\)/gm.test(initialStorage):
      regex = /\(key_hash .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
      return getExampleStorage(initialStorage);
    case /\(lambda .*?\)/gm.test(initialStorage):
      regex = /\(lambda .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{}');
      return getExampleStorage(initialStorage);
    case /\(signature .*?\)/gm.test(initialStorage):
      regex = /\(signature .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"edsigthTzJ8X7MPmNeEwybRAvdxS1pupqcM5Mk4uCuyZAe7uEk68YpuGDeViW8wSXMrCi5CwoNgqs8V2w8ayB5dMJzrYCHhD8C7"`
      );
      return getExampleStorage(initialStorage);
    case /\(string .*?\)/gm.test(initialStorage):
      regex = /\(string .*?\)/gm;
      initialStorage = initialStorage.replace(regex, `"ABC123"`);
      return getExampleStorage(initialStorage);
    case /\(timestamp .*?\)/gm.test(initialStorage):
      regex = /\(timestamp .*?\)/gm;
      initialStorage = initialStorage.replace(regex, `"2019-09-26T10:59:51Z"`);
      return getExampleStorage(initialStorage);
    case /\(unit .*?\)/gm.test(initialStorage):
      regex = /\(unit .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 10);
      return getExampleStorage(initialStorage);
    case /\(list .*?\)/gm.test(initialStorage):
      regex = /\(list .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{}');
      return getExampleStorage(initialStorage);
    case /(address)|\(address .*?\)/gm.test(initialStorage):
      regex = /(address)|\(address .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
      return getExampleStorage(initialStorage);
    case /(mutez)|\(mutez .*?\)/gm.test(initialStorage):
      regex = /(mutez)|\(mutez .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 0);
      return getExampleStorage(initialStorage);
    case /(int)|\(int .*?\)/gm.test(initialStorage):
      regex = /(int)|\(int .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 10);
      return getExampleStorage(initialStorage);
    case /(nat)|\(nat .*?\)/gm.test(initialStorage):
      regex = /(nat)|\(nat .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 100);
      return getExampleStorage(initialStorage);
    case /(bool)|\(bool .*?\)/gm.test(initialStorage):
      regex = /(bool)|\(bool .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 'False');
      return getExampleStorage(initialStorage);
    case /(bytes)|\(bytes .*?\)/gm.test(initialStorage):
      regex = /(bytes)|\(bytes .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '0xABCDEF42');
      return getExampleStorage(initialStorage);
    case /(chain_id)|\(chain_id .*?\)/gm.test(initialStorage):
      regex = /(chain_id)|\(chain_id .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '0x7a06a770');
      return getExampleStorage(initialStorage);
    case /(key)|\(key .*?\)/gm.test(initialStorage):
      regex = /(key)|\(key .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
      return getExampleStorage(initialStorage);
    case /(key_hash)|\(key_hash .*?\)/gm.test(initialStorage):
      regex = /(key_hash)|\(key_hash .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
      return getExampleStorage(initialStorage);
    case /(lambda)|\(lambda .*?\)/gm.test(initialStorage):
      regex = /(lambda)|\(lambda .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{}');
      return getExampleStorage(initialStorage);
    case /(signature)|\(signature .*?\)/gm.test(initialStorage):
      regex = /(signature)|\(signature .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"edsigthTzJ8X7MPmNeEwybRAvdxS1pupqcM5Mk4uCuyZAe7uEk68YpuGDeViW8wSXMrCi5CwoNgqs8V2w8ayB5dMJzrYCHhD8C7"`
      );
      return getExampleStorage(initialStorage);
    case /(string)|\(string .*?\)/gm.test(initialStorage):
      regex = /(string)|\(string .*?\)/gm;
      initialStorage = initialStorage.replace(regex, `"ABC123"`);
      return getExampleStorage(initialStorage);
    case /(timestamp)|\(timestamp .*?\)/gm.test(initialStorage):
      regex = /(timestamp)|\(timestamp .*?\)/gm;
      initialStorage = initialStorage.replace(regex, `"2019-09-26T10:59:51Z"`);
      return getExampleStorage(initialStorage);
    case /(unit)|\(unit .*?\)/gm.test(initialStorage):
      regex = /(unit)|\(unit .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 10);
      return getExampleStorage(initialStorage);
    case /;/gm.test(initialStorage):
      regex = /;/gm;
      initialStorage = initialStorage.replace(regex, '');
      return getExampleStorage(initialStorage);
    default:
      regex = /(pair)/gm;
      initialStorage = initialStorage.replace(regex, 'Pair');
      regex = /\(map .*?\)\s+/gm;
      initialStorage = initialStorage.replace(regex, '{} ');
      regex = /\(big_map .*?\)\s+/gm;
      initialStorage = initialStorage.replace(regex, '{} )');
      regex = /\(map .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{} ');
      regex = /\(big_map .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{} )');
      initialStorage = balancedString(initialStorage);
      return initialStorage.trim();
  }
}

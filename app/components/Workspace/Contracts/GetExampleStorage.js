/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */
export default function GetExampleStorage(initialStorage) {
  let regex;
  initialStorage = initialStorage.trim();
  switch (true) {
    case /(address)|\(address .*?\)/gm.test(initialStorage):
      regex = /(address)|\(address .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
    case /(mutez)|\(mutez .*?\)/gm.test(initialStorage):
      regex = /(mutez)|\(mutez .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 0);
    case /(int)|\(int .*?\)/gm.test(initialStorage):
      regex = /(int)|\(int .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 10);
    case /(nat)|\(nat .*?\)/gm.test(initialStorage):
      regex = /(nat)|\(nat .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 100);
    case /(bool)|\(bool .*?\)/gm.test(initialStorage):
      regex = /(bool)|\(bool .*?\)/gm;
      initialStorage = initialStorage.replace(regex, true);
    case /(bytes)|\(bytes .*?\)/gm.test(initialStorage):
      regex = /(bytes)|\(bytes .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '0xABCDEF42');
    case /(chain_id)|\(chain_id .*?\)/gm.test(initialStorage):
      regex = /(chain_id)|\(chain_id .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '0x7a06a770');
    case /(key)|\(key .*?\)/gm.test(initialStorage):
      regex = /(key)|\(key .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
    case /(key_hash)|\(key_hash .*?\)/gm.test(initialStorage):
      regex = /(key_hash)|\(key_hash .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`
      );
    case /(lambda)|\(lambda .*?\)/gm.test(initialStorage):
      regex = /(lambda)|\(lambda .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{}');
    case /(signature)|\(signature .*?\)/gm.test(initialStorage):
      regex = /(signature)|\(signature .*?\)/gm;
      initialStorage = initialStorage.replace(
        regex,
        `"edsigthTzJ8X7MPmNeEwybRAvdxS1pupqcM5Mk4uCuyZAe7uEk68YpuGDeViW8wSXMrCi5CwoNgqs8V2w8ayB5dMJzrYCHhD8C7"`
      );
    case /(string)|\(string .*?\)/gm.test(initialStorage):
      regex = /(bool)|\(string .*?\)/gm;
      initialStorage = initialStorage.replace(regex, `"ABC\n123"`);
    case /(timestamp)|\(timestamp .*?\)/gm.test(initialStorage):
      regex = /(timestamp)|\(timestamp .*?\)/gm;
      initialStorage = initialStorage.replace(regex, `"2019-09-26T10:59:51Z"`);
    case /(unit)|\(unit .*?\)/gm.test(initialStorage):
      regex = /(unit)|\(unit .*?\)/gm;
      initialStorage = initialStorage.replace(regex, 10);
    case /\(map .*?\)/gm.test(initialStorage):
      regex = /\(map .*?\)\s+/gm;
      initialStorage = initialStorage.replace(regex, '{} ');
    case /\(big_map .*?\)/gm.test(initialStorage):
      regex = /\(big_map .*?\)\s+/gm;
      initialStorage = initialStorage.replace(regex, '{} ');
    case /\(list .*?\)/gm.test(initialStorage):
      regex = /\(list .*?\)/gm;
      initialStorage = initialStorage.replace(regex, '{}');
    case /;/gm.test(initialStorage):
      regex = /;/gm;
      initialStorage = initialStorage.replace(regex, '');
    default:
      regex = /(pair)/gm;
      initialStorage = initialStorage.replace(regex, 'Pair');
      return initialStorage;
  }
}

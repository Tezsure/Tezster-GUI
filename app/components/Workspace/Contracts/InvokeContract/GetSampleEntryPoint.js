/* eslint-disable no-param-reassign */
export default function GetSampleEntryPoint(type) {
  type = type.trim();
  switch (true) {
    case /(address)|\(address .*?\)/gm.test(type):
      return `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`;
    case /(mutez)|\(mutez .*?\)/gm.test(type):
      return 0;
    case /(int)|\(int .*?\)/gm.test(type):
      return 0;
    case /(nat)|\(nat .*?\)/gm.test(type):
      return 0;
    case /(bool)|\(bool .*?\)/gm.test(type):
      return 'True';
    case /(bytes)|\(bytes .*?\)/gm.test(type):
      return '0xABCDEF42';
    case /(chain_id)|\(chain_id .*?\)/gm.test(type):
      return '0x7a06a770';
    case /(key)|\(key .*?\)/gm.test(type):
      return `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`;
    case /(key_hash)|\(key_hash .*?\)/gm.test(type):
      return `"tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx"`;
    case /(lambda)|\(lambda .*?\)/gm.test(type):
      return '{}';
    case /(signature)|\(signature .*?\)/gm.test(type):
      return `"edsigthTzJ8X7MPmNeEwybRAvdxS1pupqcM5Mk4uCuyZAe7uEk68YpuGDeViW8wSXMrCi5CwoNgqs8V2w8ayB5dMJzrYCHhD8C7"`;
    case /(string)|\(string .*?\)/gm.test(type):
      return `"ABC"`;
    case /(timestamp)|\(timestamp .*?\)/gm.test(type):
      return `"2019-09-26T10:59:51Z"`;
    case /(unit)|\(unit .*?\)/gm.test(type):
      return 0;
    case /(map)|\(map .*?\)/gm.test(type):
      return '{}';
    case /(big_map)|\(big_map .*?\)/gm.test(type):
      return '{}';
    case /(list)|\(list .*?\)/gm.test(type):
      return '{}';
    default:
      return 'Hello World!';
  }
}

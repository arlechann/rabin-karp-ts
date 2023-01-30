type Hash = number;
type Index = number;

export const RabinKarp = (
  text: string,
  base: number = (1 << 20) - 1,
  mod: number = 20000003
) => {
  const mulMod = (a: number, b: number): number => (a * b) % mod;

  const hash = (str: string, length: number): Hash => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = mulMod(h, base) + str.charCodeAt(i);
      if (h > mod) {
        h -= mod;
      }
    }
    return h;
  };

  const findImpl = (substrs: string[]): Index[] => {
    const substrLength = substrs.reduce(
      (acc, v) => Math.min(acc, v.length),
      Infinity
    );
    if (substrLength > text.length) {
      return [];
    }

    const substrHashs = new Set();
    substrs.forEach(substr => substrHashs.add(hash(substr, substrLength)));

    let h = 0;
    let bpow = 1;
    for (let i = 0; i < substrLength; i++) {
      h = mulMod(h, base) + text.charCodeAt(i);
      bpow = mulMod(bpow, base);
      if (h > mod) {
        h -= mod;
      }
    }

    const ret = [];
    let i;
    for (i = 0; i + substrLength < text.length; i++) {
      if (substrHashs.has(h)) {
        ret.push(i);
      }
      h =
        mulMod(h, base) +
        text.charCodeAt(i + substrLength) +
        mod -
        mulMod(text.charCodeAt(i), bpow);
      if (h > mod) {
        h -= mod;
      }
    }
    if (substrHashs.has(h)) {
      ret.push(i);
    }

    return ret;
  };
  const find = (substrs: string | string[]): Index[] =>
    findImpl([substrs].flat());

  return {
    text,
    length: text.length,
    find,
    hash,
  };
};

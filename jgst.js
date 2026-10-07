/**
 * jgst.js (Diperbarui sesuai Spesifikasi JGST Konsonan Murni)
 * Pemetaan Aksara Jawa ke Latin JGST.
 */

const jgstMap = {
  // Candrabindu, Anusvara, Repha, Visarga
  '\uA980': 'ṃ',    // Candrabindu
  '\uA981': 'ŋ',    // Anusvara
  '\uA982': 'ṙ',    // Repha
  '\uA983': 'ḥ',    // Visarga

  // Swara & Kombinasi Swara
  '\uA984\uA9B4': 'ā', // Swara A + Tarung
  '\uA984': 'a',       // Swara A
  '\uA985': 'i',       // Swara I Kawi
  '\uA986': 'i',       // Swara I
  '\uA987': 'ī',       // Swara II
  '\uA988\uA9B4': 'ū', // Swara U + Tarung
  '\uA988': 'u',       // Swara U
  '\uA989\uA9B4': 'ṛě',// Vocalic R + Tarung
  '\uA989': 'ṛ',       // Vocalic R (Pa Cerek)
  '\uA98A': 'ḷ',       // Vocalic L (Nga Lelet)
  '\uA98B': 'ḷö',      // Vocalic LL
  '\uA98C': 'é',       // Swara E
  '\uA98D': 'ꜽ',      // Swara AI
  '\uA98E\uA9B4': 'ꜷ', // Swara O + Tarung
  '\uA98E': 'o',       // Swara O

  // Wyanjana & Murda (Konsonan Murni)
  '\uA98F': 'k',       // Ka
  '\uA990': 'q',       // Qa / Ka Murda
  '\uA991': 'ḳ',       // Ka Sasak
  '\uA992': 'g',       // Ga
  '\uA993': 'g̣',       // Ga Murda Gha
  '\uA994': 'ṅ',       // Nga
  '\uA995': 'c',       // Ca
  '\uA996': 'c̣',       // Ca Murda Cha
  '\uA997': 'j',       // Ja
  '\uA998': 'jñ',      // Ja Mahaprana / Nya Murda Jnya
  '\uA999': 'j̣',       // Nya Murda
  '\uA99A': 'ñ',       // Nya
  '\uA99B': 'ṭ',       // Tta
  '\uA99C': 'ṭh',      // Tta Mahaprana Ttha
  '\uA99D': 'ḍ',       // Dda
  '\uA99E': 'ḍh',      // Dda Mahaprana Ddha
  '\uA99F': 'ṇ',       // Na Murda Nna
  '\uA9A0': 't',       // Ta
  '\uA9A1': 'th',      // Ta Murda Tha
  '\uA9A2': 'd',       // Da
  '\uA9A3': 'dh',      // Da Mahaprana Dha
  '\uA9A4': 'n',       // Na
  '\uA9A5': 'p',       // Pa
  '\uA9A6': 'p̣',       // Pa Murda Pha
  '\uA9A7': 'b',       // Ba
  '\uA9A8': 'ḅ',       // Ba Murda Bha
  '\uA9A9': 'm',       // Ma
  '\uA9AA': 'y',       // Ya
  '\uA9AB\uA9C0': 'r/',// Ra + Pangkon
  '\uA9AB': 'r',       // Ra
  '\uA9AC': 'ṟ',       // Ra Agung
  '\uA9AD': 'l',       // La
  '\uA9AE': 'w',       // Wa
  '\uA9AF': 'ś',       // Sa Murda Sha
  '\uA9B0': 'ṣ',       // Sa Mahaprana Ssa
  '\uA9B1': 's',       // Sa
  '\uA9B2': 'h',       // Ha
  '\uA9B3': '',        // Cecak telu / Nukta

  // Sandhangan Swara & Kombinasi
  '\uA9B4': 'ā',       // Tarung
  '\uA9B5': 'o',       // Tolong varian glyph
  '\uA9B6': 'i',       // Wulu
  '\uA9B7': 'ī',       // Wulu Melik
  '\uA9B8': 'u',       // Suku
  '\uA9B9': 'ū',       // Suku Mendut
  '\uA9BA\uA9B4': 'o',  // Taling + Tarung
  '\uA9BA\uA9B5': 'õ',  // Taling + Tolong
  '\uA9BA': 'é',       // Taling
  '\uA9BB\uA9B4': 'ꜹ', // Dirga Mure + Tarung
  '\uA9BB\uA9B5': 'ã', // Dirga Mure + Tolong
  '\uA9BB': 'ꜽ',      // Dirga Mure
  '\uA9BC\uA9B4': 'ö', // Pepet + Tarung
  '\uA9BC': 'ě',       // Pepet
  '\uA9BD': 'ŕě',      // Keret
  '\uA9BE': 'ỿa',      // Pengkal
  '\uA9BF': 'ŕ',       // Cakra
  '\uA9C0': '/',       // Pangkon / Virama

  // Tanda Baca
  '\uA9C8': ',',
  '\uA9C9': '.',

  // Angka Jawa
  '\uA9D0': '0', '\uA9D1': '1', '\uA9D2': '2', '\uA9D3': '3', '\uA9D4': '4',
  '\uA9D5': '5', '\uA9D6': '6', '\uA9D7': '7', '\uA9D8': '8', '\uA9D9': '9'
};

// Peta Rekan (Konsonan Murni)
const rekanMap = {
  '\uA9A5\uA9B3': 'f',
  '\uA9AE\uA9B3': 'v',
  '\uA997\uA9B3': 'z',
  '\uA9A2\uA9B3': 'dz',
  '\uA9B2\uA9B3': 'ḥ',
  '\uA994\uA9B3': '‘',
  '\uA9B1\uA9B3': 'ṡ',
  '\uA9B0\uA9B3': 'ṣ',
  '\uA9AF\uA9B3': 'ś',
  '\uA9AD\uA9B3': 'ḍ',
  '\uA9A1\uA9B3': 'ṭ',
  '\uA9A3\uA9B3': 'ẓ',
  '\uA98F\uA9B3': 'x',
  '\uA990\uA9B3': 'x'
};

function transliterateToJGST(text) {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let char2 = i + 1 < text.length ? text.substring(i, i + 2) : "";
    
    if (rekanMap[char2] !== undefined) {
      result += rekanMap[char2];
      i += 2;
    } else if (jgstMap[char2] !== undefined) {
      result += jgstMap[char2];
      i += 2;
    } else if (jgstMap[text[i]] !== undefined) {
      result += jgstMap[text[i]];
      i++;
    } else {
      result += text[i];
      i++;
    }
  }
  return result;
}

function appendJGST(text) {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let char2 = i + 1 < text.length ? text.substring(i, i + 2) : "";
    if (rekanMap[char2] !== undefined) {
      result += char2 + "[" + rekanMap[char2] + "]";
      i += 2;
    } else if (jgstMap[char2] !== undefined) {
      result += char2 + "[" + jgstMap[char2] + "]";
      i += 2;
    } else if (jgstMap[text[i]] !== undefined) {
      result += text[i] + "[" + jgstMap[text[i]] + "]";
      i++;
    } else {
      result += text[i]; 
      i++;
    }
  }
  return result;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { jgstMap, rekanMap, appendJGST, transliterateToJGST };
} else {
  window.jgstMap = jgstMap;
  window.rekanMap = rekanMap;
  window.appendJGST = appendJGST;
  window.transliterateToJGST = transliterateToJGST;
}

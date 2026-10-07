/**
 * jgst.js (Diperbarui dengan Vokal Inheren /a/ dan Penanganan Spasi/Pemisah Kata)
 * Pemetaan Aksara Jawa ke Latin JGST.
 */

// Peta Swara & Aksara Nglegena dasar (dengan vokal inheren /a/)
const jgstMap = {
  // Candrabindu, Anusvara, Repha, Visarga
  '\uA980': 'ṃ',    // Candrabindu
  '\uA981': 'ŋ',    // Anusvara
  '\uA982': 'ṙ',    // Repha
  '\uA983': 'ḥ',    // Visarga

  // Swara Mandiri (Aksara Swara)
  '\uA984\uA9B4': 'ā', // Swara A + Tarung
  '\uA984': 'a',       // Swara A
  '\uA985': 'i',       // Swara I Kawi
  '\uA986': 'i',       // Swara I
  '\uA987': 'ī',       // Swara II
  '\uA988\uA9B4': 'ū', // Swara U + Tarung
  '\uA988': 'u',       // Swara U
  '\uA989\uA9B4': 'ṛě',// Vocalic R + Tarung (Pa Cerek Dirga)
  '\uA989': 'ṛ',       // Vocalic R (Pa Cerek)
  '\uA98A': 'ḷ',       // Vocalic L (Nga Lelet)
  '\uA98B': 'ḷö',      // Vocalic LL
  '\uA98C': 'é',       // Swara E
  '\uA98D': 'ꜽ',      // Swara AI
  '\uA98E\uA9B4': 'ꜷ', // Swara O + Tarung
  '\uA98E': 'o',       // Swara O

  // Wyanjana & Murda (Dengan Vokal Inheren 'a')
  '\uA98F': 'ka',       // Ka
  '\uA990': 'qa',       // Qa / Ka Murda
  '\uA991': 'ḳa',       // Ka Sasak
  '\uA992': 'ga',       // Ga
  '\uA993': 'g̣a',       // Ga Murda Gha
  '\uA994': 'ṅa',       // Nga
  '\uA995': 'ca',       // Ca
  '\uA996': 'c̣a',       // Ca Murda Cha
  '\uA997': 'ja',       // Ja
  '\uA998': 'jña',      // Ja Mahaprana / Nya Murda Jnya
  '\uA999': 'j̣a',       // Nya Murda
  '\uA99A': 'ña',       // Nya
  '\uA99B': 'ṭa',       // Tta
  '\uA99C': 'ṭha',      // Tta Mahaprana Ttha
  '\uA99D': 'ḍa',       // Dda
  '\uA99E': 'ḍha',      // Dda Mahaprana Ddha
  '\uA99F': 'ṇa',       // Na Murda Nna
  '\uA9A0': 'ta',       // Ta
  '\uA9A1': 'tha',      // Ta Murda Tha
  '\uA9A2': 'da',       // Da
  '\uA9A3': 'dha',      // Da Mahaprana Dha
  '\uA9A4': 'na',       // Na
  '\uA9A5': 'pa',       // Pa
  '\uA9A6': 'p̣a',       // Pa Murda Pha
  '\uA9A7': 'ba',       // Ba
  '\uA9A8': 'ḅa',       // Ba Murda Bha
  '\uA9A9': 'ma',       // Ma
  '\uA9AA': 'ya',       // Ya
  '\uA9AB\uA9C0': 'r',  // Ra + Pangkon
  '\uA9AB': 'ra',       // Ra
  '\uA9AC': 'ṟa',       // Ra Agung
  '\uA9AD': 'la',       // La
  '\uA9AE': 'wa',       // Wa
  '\uA9AF': 'śa',       // Sa Murda Sha
  '\uA9B0': 'ṣa',       // Sa Mahaprana Ssa
  '\uA9B1': 'sa',       // Sa
  '\uA9B2': 'ha',       // Ha
  '\uA9B3': '',        // Cecak telu / Nukta

  // Tanda Baca Pada Aksara Jawa
  '\uA9C8': ',',
  '\uA9C9': '.',

  // Angka Jawa
  '\uA9D0': '0', '\uA9D1': '1', '\uA9D2': '2', '\uA9D3': '3', '\uA9D4': '4',
  '\uA9D5': '5', '\uA9D6': '6', '\uA9D7': '7', '\uA9D8': '8', '\uA9D9': '9'
};

// Peta Rekan (Dengan Vokal Inheren 'a')
const rekanMap = {
  '\uA9A5\uA9B3': 'fa',
  '\uA9AE\uA9B3': 'va',
  '\uA997\uA9B3': 'za',
  '\uA9A2\uA9B3': 'dza',
  '\uA9B2\uA9B3': 'ḥa',
  '\uA994\uA9B3': '‘a',
  '\uA9B1\uA9B3': 'ṡa',
  '\uA9B0\uA9B3': 'ṣa',
  '\uA9AF\uA9B3': 'śa',
  '\uA9AD\uA9B3': 'ḍa',
  '\uA9A1\uA9B3': 'ṭa',
  '\uA9A3\uA9B3': 'ẓa',
  '\uA98F\uA9B3': 'xa',
  '\uA990\uA9B3': 'xa'
};

// Peta Sandhangan Swara & Pangkon
const sandhanganMap = {
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
  '\uA9BD': 'ṛě',      // Cakra Keret
  '\uA9BE': 'ya',      // Pengkal
  '\uA9BF': 'ra',      // Cakra
  '\uA9C0': '/'        // Pangkon / Virama
};

function transliterateToJGST(text) {
  let result = "";
  let i = 0;

  while (i < text.length) {
    let char1 = text[i];
    let char2 = i + 1 < text.length ? text.substring(i, i + 2) : "";

    // Abaikan / Lewati karakter Zero Width Joiner/Non-Joiner jika ada
    if (char1 === '\u200C' || char1 === '\u200D') {
      i++;
      continue;
    }

    // Pemrosesan karakter spasi, ganti baris, atau karakter pemisah standar
    if (/\s/.test(char1)) {
      result += char1;
      i++;
      continue;
    }

    // 1. Cek Rekan / Kombinasi 2 Karakter
    let baseText = "";
    let matchedLen = 0;

    if (rekanMap[char2] !== undefined) {
      baseText = rekanMap[char2];
      matchedLen = 2;
    } else if (jgstMap[char2] !== undefined) {
      baseText = jgstMap[char2];
      matchedLen = 2;
    } else if (jgstMap[char1] !== undefined) {
      baseText = jgstMap[char1];
      matchedLen = 1;
    }

    if (matchedLen > 0) {
      i += matchedLen;

      // Cek apakah ada sandhangan swara / pangkon setelah aksara ini
      let next2 = i + 1 < text.length ? text.substring(i, i + 2) : "";
      let next1 = i < text.length ? text[i] : "";

      if (sandhanganMap[next2] !== undefined) {
        let sandh = sandhanganMap[next2];
        if (sandh === '/') {
          baseText = baseText.endsWith('a') ? baseText.slice(0, -1) + '/' : baseText + '/';
        } else {
          if (baseText.endsWith('a')) baseText = baseText.slice(0, -1);
          baseText += sandh;
        }
        i += 2;
      } else if (sandhanganMap[next1] !== undefined) {
        let sandh = sandhanganMap[next1];
        if (sandh === '/') {
          baseText = baseText.endsWith('a') ? baseText.slice(0, -1) + '/' : baseText + '/';
        } else {
          if (baseText.endsWith('a')) baseText = baseText.slice(0, -1);
          baseText += sandh;
        }
        i += 1;
      }

      result += baseText;
    } else {
      result += char1;
      i++;
    }
  }
  return result;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { jgstMap, rekanMap, transliterateToJGST };
} else {
  window.jgstMap = jgstMap;
  window.rekanMap = rekanMap;
  window.transliterateToJGST = transliterateToJGST;
}

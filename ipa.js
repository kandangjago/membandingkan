/**
 * ipa.js
 * Modul Konversi Transliterasi JGST ke IPA (International Phonetic Alphabet)
 */

function convertJGSTtoIPA(jgstStr, rawLatinToken) {
    if (!jgstStr || jgstStr === '-') return '-';
    
    let words = jgstStr.split(/(\s+)/);
    
    let ipaWords = words.map(word => {
        if (/^\s+$/.test(word)) return word;
        
        let str = word.toLowerCase().replace(/\/$/, '');
        const vowels = 'aāiīuūěéèeoꜽꜷṛḷ';

        // 1. Deteksi Ha Tipis vs Ha Tebal berdasarkan input Latin asli user
        const isLatinStartWithH = /^h/i.test(rawLatinToken || '');
        
        if (!isLatinStartWithH) {
            str = str.replace(/^h([aāiīuūěéèeoꜽꜷṛḷ])/i, '$1');
        } else {
            str = str.replace(/^h/i, 'h');
        }

        // Pengecualian khusus kata turunan/majemuk tertentu
        if (str === 'macapat') {
            str = 'mɔcɔpat';
        } else {
            // 2. Evaluasi Suku Kata Terakhir & Pembacaan Vokal A
            let lastChar = str.slice(-1);
            let isVowelEnd = /[aāiīuūěéèeoꜽꜷ]/.test(lastChar);

            if (isVowelEnd) {
                if (lastChar === 'a') {
                    // A. Jika suku kata penultima (sebelum akhir) berupa vokal 'a' terbuka (tanpa konsonan penutup):
                    // Pasangan vokal terbuka (seperti 'ga-ra' di nagara, 'da-ya' di kabudaya) ikut berubah menjadi 'ɔ'.
                    // Pengecualian: kata berakhiran '-ana' (seperti kahanana) vokal penultimanya tetap 'a'.
                    if (!/ana$/i.test(str)) {
                        str = str.replace(/([bcdfghjklmnpqrstvwxyzñṅṇṭḍcjywśṣḥqxfvz]*a)([bcdfghjklmnpqrstvwxyzñṅṇṭḍcjywśṣḥqxfvz]+a)$/i, function(match, penult, ult) {
                            return penult.replace(/a/g, 'ɔ') + ult;
                        });
                    }
                    
                    // B. Vokal 'a' terbuka di akhir kata (ultima) selalu berubah menjadi 'ɔ'
                    str = str.replace(/a$/i, 'ɔ');
                }
            } else {
                // Untuk kata yang diakhiri suku kata tertutup (konsonan mati):
                // Seluruh vokal 'a' pada kata dasar/imbuhan tetap dibaca 'a' (misal: gamelan, prasasat, salaman, pralambang, pituduh).
                
                // Vokal miring pada suku kata tertutup akhir (i->ɪ, u->ʊ, e->ɛ, o->ɔ)
                str = str.replace(new RegExp(`([${vowels}])([^${vowels}]*)$`), function(match, vowel, cons) {
                    if (vowel === 'i') return 'ɪ' + cons;
                    if (vowel === 'u') return 'ʊ' + cons;
                    if (vowel === 'é' || vowel === 'è' || vowel === 'e') return 'ɛ' + cons;
                    if (vowel === 'o') return 'ɔ' + cons;
                    return vowel + cons; // vokal 'a' tetap 'a'
                });
                
                // Harmony vokal untuk suku kata tertutup
                if (/ɔ[^aeiouɔɛɪʊ]*$/.test(str)) str = str.replace(/o/g, 'ɔ');
                if (/ɛ[^aeiouɔɛɪʊ]*$/.test(str)) str = str.replace(/[éèe]/g, 'ɛ');
            }
        }

        // Normalisasi vokal jejeg
        str = str.replace(/[éè]/g, 'e'); 
        str = str.replace(/ě/g, 'ə'); 

        // 3. Pemetaan Karakter IPA Utuh
        const ipaMap = {
            'ā': 'aː', 'ī': 'iː', 'ū': 'uː',
            'ñ': 'ɲ', 'ṅ': 'ŋ', 'ṇ': 'ɳ',
            'ṭ': 'ʈ', 'ḍ': 'ɖ', 'c': 'tʃ', 'j': 'dʒ',
            'y': 'j',
            'w': 'w',
            'ś': 'ʃ', 'ṣ': 'ʂ', 'ḥ': 'h',
            'q': 'q', 'x': 'x', 'f': 'f', 'v': 'v', 'z': 'z',
            'ṃ': 'm', 'ṙ': 'r', 'ṛ': 'rə', 'ḷ': 'lə',
            'ꜽ': 'aɪ', 'ꜷ': 'aʊ'
        };

        let res = '';
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            res += (ipaMap[char] !== undefined) ? ipaMap[char] : char;
        }

        // 4. Penentuan Ya Tebal [j̤] & Wa Tebal [w̤]
        res = res.replace(/^w/g, 'w̤').replace(/^j/g, 'j̤');
        res = res.replace(/^([bcdfghjklmnpqrstvwxyzḥŋṙṃñṅṇʈɖtʃdʒʃʂqxfvz])w/g, '$1w̤');
        res = res.replace(/^([bcdfghjklmnpqrstvwxyzḥŋṙṃñṅṇʈɖtʃdʒʃʂqxfvz])j/g, '$1j̤');

        return res;
    });

    return ipaWords.join('').trim() || '-';
}

if (typeof window !== 'undefined') {
    window.convertJGSTtoIPA = convertJGSTtoIPA;
}

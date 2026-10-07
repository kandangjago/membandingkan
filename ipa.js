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
            // Jika input Latin TIDAK diawali 'h', maka aksara Ha di awal adalah Ha Tipis -> Lebur/dihilangkan
            str = str.replace(/^h([aāiīuūěéèeoꜽꜷṛḷ])/i, '$1');
        } else {
            // Jika input Latin DIAWALI 'h', maka Ha Tebal -> Pertahankan [h]
            str = str.replace(/^h/i, 'h');
        }

        // 2. Evaluasi Suku Kata Terakhir (Vokal Terbuka vs Tertutup)
        let lastChar = str.slice(-1);
        let isVowelEnd = /[aāiīuūěéèeoꜽꜷ]/.test(lastChar);

        if (isVowelEnd) {
            if (lastChar === 'a') {
                str = str.replace(/a/g, 'ɔ'); // a miring terbuka -> ɔ
            }
        } else {
            // Vokal miring pada suku kata tertutup
            str = str.replace(new RegExp(`([${vowels}])([^${vowels}]*)$`), function(match, vowel, cons) {
                if (vowel === 'i') return 'ɪ' + cons; // i miring -> ɪ
                if (vowel === 'u') return 'ʊ' + cons; // u miring -> ʊ
                if (vowel === 'é' || vowel === 'è' || vowel === 'e') return 'ɛ' + cons; // e miring -> ɛ
                if (vowel === 'o') return 'ɔ' + cons; // o miring -> ɔ
                return vowel + cons; // a miring -> tetap a
            });
            
            // Harmony vokal untuk suku kata tertutup
            if (/ɔ[^aeiouɔɛɪʊ]*$/.test(str)) str = str.replace(/o/g, 'ɔ');
            if (/ɛ[^aeiouɔɛɪʊ]*$/.test(str)) str = str.replace(/[éèe]/g, 'ɛ');
        }

        // Normalisasi vokal jejeg
        str = str.replace(/[éè]/g, 'e'); 
        str = str.replace(/ě/g, 'ə'); 

        // 3. Penerapan Wa & Ya (Suku Kata Pertama = Tebal, Panglancar = Tipis)
        str = str.replace(/^w/g, 'w̤').replace(/^y/g, 'j̤');
        str = str.replace(/^([bcdfghjklmnpqrstvwxyzḥŋṙṃñṅṇṭḍc jśṣqxfvz])w/g, '$1w̤');
        str = str.replace(/^([bcdfghjklmnpqrstvwxyzḥŋṙṃñṅṇṭḍc jśṣqxfvz])y/g, '$1j̤');

        // 4. Pemetaan Karakter IPA Utuh
        const ipaMap = {
            'ā': 'aː', 'ī': 'iː', 'ū': 'uː',
            'ñ': 'ɲ', 'ṅ': 'ŋ', 'ṇ': 'ɳ',
            'ṭ': 'ʈ', 'ḍ': 'ɖ', 'c': 'tʃ', 'j': 'dʒ',
            'y': 'j', // Ya Tipis (panglancar/medial biasa)
            'w': 'w', // Wa Tipis (panglancar/medial biasa)
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

        return res;
    });

    return ipaWords.join('').trim() || '-';
}

if (typeof window !== 'undefined') {
    window.convertJGSTtoIPA = convertJGSTtoIPA;
}

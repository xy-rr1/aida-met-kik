// ================================================================
// VARIABLE GLOBAL (Kunci Bahasa Pilihan, Masa & Pendaftaran)
// ================================================================
let currentLang = 'BM'; 
let followUpTimeout; // 💡 Simpan ID masa di sini supaya boleh dipadam dari mana-mana fungsi

// 📋 Kunci Mod Pendaftaran 1-by-1
// Tahap stage: 'GREETING', 'AWAITING_NAME', 'AWAITING_PHONE', 'AWAITING_EMAIL', 'COMPLETED'
let chatStage = 'GREETING'; 
let userData = {
    name: '',
    phone: '',
    email: ''
};

// ================================================================
// 1. FUNGSI TERAS CHAT (Toggle, Send, Add Message)
// ================================================================

function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    const chatMessages = document.getElementById('chatMessages');
    chatbox.classList.toggle('active');

    if (chatbox.classList.contains('active') && chatMessages.innerHTML.trim() === "") {
        setTimeout(() => {
            addMessage("Welcome to MET MALAYSIA.\n\nMy name is AIDA, your MET AI Chatbot. Before we proceed, please select your preferred language.", 'bot');
            showLanguageOptions(); 
        }, 400);
    }
}

function resetChat() {
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('quickReplies').innerHTML = '';
    document.getElementById('userInput').value = '';
    localStorage.removeItem('chatLogs');
    clearTimeout(followUpTimeout); // Bersihkan timeout semasa reset

    // Reset semula parameter data peribadi
    chatStage = 'GREETING';
    userData = { name: '', phone: '', email: '' };

    setTimeout(() => {
        addMessage("Welcome to MET MALAYSIA.\n\nMy name is AIDA, your MET AI Chatbot. Before we proceed, please select your preferred language.", 'bot');
        showLanguageOptions(); 
    }, 400);
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    // Papar mesej user pada skrin sembang
    addMessage(message, 'user');
    input.value = '';
    
    const activeReplies = document.querySelectorAll('.chat-messages .quick-replies');
    activeReplies.forEach(replyBox => { replyBox.remove(); });
    
    // Potong timer menyampuk jika ada input baharu masuk
    clearTimeout(followUpTimeout);

    // 🚦 LOGIK PINTASAN: KUTIP DATA PENGGUNA 1-BY-1
    if (chatStage === 'AWAITING_NAME') {
        userData.name = message;
        chatStage = 'AWAITING_PHONE';
        setTimeout(() => {
            const responsTelefon = currentLang === 'BM'
                ? `Terima kasih Tuan/Puan ${userData.name}. Bolehkah saya dapatkan nombor telefon anda? (contoh: 012-3456789)`
                : `Thank you Sir/Madam. May I have your telephone number? (example: 012-3456789)`;
            addMessage(responsTelefon, 'bot');
        }, 600);
        return;
    }

    if (chatStage === 'AWAITING_PHONE') {
        userData.phone = message;
        chatStage = 'AWAITING_EMAIL';
        setTimeout(() => {
            const responsEmel = currentLang === 'BM'
                ? `Terima kasih. Bolehkah anda berikan alamat e-mel anda untuk rekod kami?`
                : `Thank you. Can you please provide your email address for our record?`;
            addMessage(responsEmel, 'bot');
        }, 600);
        return;
    }

    if (chatStage === 'AWAITING_EMAIL') {
        userData.email = message;
        chatStage = 'COMPLETED';
        setTimeout(() => {
            const responsSelesai = currentLang === 'BM'
                ? `Pendaftaran profil anda berjaya direkodkan! ✅\n\nSila pilih soalan FAQ di bawah atau kemukakan pertanyaan kepada pembantu AI AIDA.`
                : `Profile registration successful! ✅\n\nPlease select any FAQ question below or type your inquiry for AI assistant AIDA.`;
            addMessage(responsSelesai, 'bot');
            
            // Console log untuk tujuan debug semakan pembentangan KIK
            console.log("=== DATA PROFIL CLIENT BERJAYA DIKUMPUL ===", userData);
            
            showFaqOptions(currentLang);
        }, 600);
        return;
    }

    // 🔍 DETEKSI BAHASA OTOMATIK (Hanya dipicu jika urusan borang tamat)
    const lowerMessage = message.toLowerCase();
    const englishKeywords = ['what', 'how', 'why', 'who', 'where', 'is', 'are', 'rain', 'weather', 'buy', 'purchase', 'data', 'price', 'fee', 'waiver', 'student', 'document'];
    
    // Semak kalau ada mana-mana perkataan Inggeris dalam mesej
    const isEnglish = englishKeywords.some(word => lowerMessage.includes(word));

    if (isEnglish) {
        currentLang = 'EN';
    } else {
        currentLang = 'BM'; // Auto-fallback ke BM jika tiada perkataan Inggeris
    }
    
    setTimeout(() => botReply(message), 600);
}

// ================================================================
// 2. LOGIK PILIHAN BAHASA, T&C & QUICK REPLIES
// ================================================================

function showLanguageOptions() {
    const quickReplies = document.getElementById('quickReplies');
    quickReplies.innerHTML = `
        <button class="lang-btn" onclick="setLanguage('BM', event)">Bahasa Malaysia</button>
        <button class="lang-btn" onclick="setLanguage('EN', event)">English</button>
    `;
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // 💡 GENERASI ID UNIK: Setiap kali bot reply peta, kita bagi ID unik (cth: map_17182928) 
    // supaya Leaflet tak berebut ID map lama yang dah wujud!
    const uniqueMapId = "map_" + new Date().getTime();
    let formattedText = text;
    if (text.includes('id="leafletMap"')) {
        formattedText = text.replace('id="leafletMap"', `id="${uniqueMapId}"`);
    }

    div.innerHTML = '<div class="text-content">' + formattedText.replace(/\n/g, '<br>') + '</div>' +
                    '<div class="chat-time">' + timeString + '</div>';

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    saveChatLog(sender, text);

    // 💡 LOGIK PETA KEBANGSAAN LEAFLET (KEMAS KINI KALIS BLANK & AUTOPILOT REGIONAL)
    if (text.includes('id="leafletMap"')) {
        // Kita naikkan masa menunggu ke 400ms supaya buih chat selesai kembang sepenuhnya
        setTimeout(() => {
            try {
                const stations = [
                    { "name": "Stesen Meteorologi Pulau Langkawi", "lat": 6.3333, "lng": 99.7333, "state": "kedah" },
                    { "name": "Stesen Meteorologi Bayan Lepas", "lat": 5.2969, "lng": 100.2722, "state": "pulau pinang" },
                    { "name": "Stesen Meteorologi Butterworth", "lat": 5.4572, "lng": 100.3883, "state": "pulau pinang" },
                    { "name": "Stesen Meteorologi Alor Setar", "lat": 6.2, "lng": 100.4, "state": "kedah" },
                    { "name": "Stesen Meteorologi Chuping", "lat": 6.4833, "lng": 100.2667, "state": "perlis" },
                    { "name": "Stesen Meteorologi Kerteh", "lat": 4.5372, "lng": 103.4267, "state": "terengganu" },
                    { "name": "Stesen Meteorologi Kota Bharu", "lat": 6.1636, "lng": 102.3006, "state": "kelantan" },
                    { "name": "Stesen Meteorologi Kuala Krai", "lat": 5.5333, "lng": 102.2, "state": "kelantan" },
                    { "name": "Stesen Meteorologi Gong Kedak", "lat": 5.8, "lng": 102.5, "state": "kelantan" },
                    { "name": "Stesen Meteorologi Kuala Terengganu", "lat": 5.3833, "lng": 103.1, "state": "terengganu" },
                    { "name": "Stesen Meteorologi Sitiawan", "lat": 4.2211, "lng": 100.7011, "state": "perak" },
                    { "name": "Stesen Meteorologi Lubok Merbau", "lat": 4.7944, "lng": 100.8972, "state": "perak" },
                    { "name": "Stesen Meteorologi Ipoh", "lat": 4.5667, "lng": 101.1, "state": "perak" },
                    { "name": "Stesen Meteorologi Cameron Highlands", "lat": 4.4667, "lng": 101.3667, "state": "pahang" },
                    { "name": "Stesen Meteorologi Batu Embun", "lat": 3.9667, "lng": 102.35, "state": "pahang" },
                    { "name": "Stesen Meteorologi Subang", "lat": 3.1306, "lng": 101.5525, "state": "selangor" },
                    { "name": "Stesen Meteorologi Muadzam Shah", "lat": 3.05, "lng": 103.0833, "state": "pahang" },
                    { "name": "Stesen Meteorologi Klia Sepang", "lat": 2.7308, "lng": 101.7031, "state": "selangor" },
                    { "name": "Stesen Meteorologi Kuala Pilah", "lat": 2.7269, "lng": 102.2489, "state": "negeri sembilan" },
                    { "name": "Stesen Meteorologi Temerloh", "lat": 3.4667, "lng": 102.3833, "state": "pahang" },
                    { "name": "Stesen Meteorologi Kuantan", "lat": 3.7722, "lng": 103.2119, "state": "pahang" },
                    { "name": "Stesen Meteorologi Melaka", "lat": 2.2667, "lng": 102.25, "state": "melaka" },
                    { "name": "Stesen Meteorologi Batu Pahat", "lat": 1.8667, "lng": 102.9833, "state": "johor" },
                    { "name": "Stesen Meteorologi Kluang", "lat": 2.0167, "lng": 103.3167, "state": "johor" },
                    { "name": "Stesen Meteorologi Mersing", "lat": 2.445, "lng": 103.8333, "state": "johor" },
                    { "name": "Stesen Meteorologi Senai", "lat": 1.6333, "lng": 103.6667, "state": "johor" },
                    { "name": "Stesen Meteorologi Kuching", "lat": 1.4903, "lng": 110.3525, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Sri Aman", "lat": 1.2167, "lng": 111.45, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Kapit", "lat": 2.0086, "lng": 112.9253, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Sibu", "lat": 2.25, "lng": 111.9667, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Bintulu", "lat": 3.12, "lng": 113.0247, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Mulu", "lat": 4.0486, "lng": 114.81, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Miri", "lat": 4.3333, "lng": 113.9833, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Limbang", "lat": 4.8097, "lng": 115.0042, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Mukah", "lat": 2.8895, "lng": 112.0431, "state": "sarawak" },
                    { "name": "Stesen Meteorologi Labuan", "lat": 5.3075, "lng": 115.2425, "state": "sabah" },
                    { "name": "Stesen Meteorologi Keningau", "lat": 5.3372, "lng": 116.1364, "state": "sabah" },
                    { "name": "Stesen Meteorologi Ranau", "lat": 5.9558, "lng": 116.6789, "state": "sabah" },
                    { "name": "Stesen Meteorologi Kota Kinabalu", "lat": 5.9325, "lng": 116.0475, "state": "sabah" },
                    { "name": "Stesen Meteorologi Kudat", "lat": 6.9167, "lng": 116.8333, "state": "sabah" },
                    { "name": "Stesen Meteorologi Tawau", "lat": 4.3161, "lng": 118.1189, "state": "sabah" },
                    { "name": "Stesen Meteorologi Sandakan", "lat": 5.8992, "lng": 118.0664, "state": "sabah" }
                ];

                const logs = JSON.parse(localStorage.getItem('chatLogs')) || [];
                const userMsg = logs.reverse().find(l => l.sender === 'user')?.message.toLowerCase() || "";
                
                let mapCenter = [4.2105, 101.9758]; 
                let zoomLevel = 6; 

                // 🗺️ Logik Pembahagian Geografi & Super Zoom untuk Daerah
                if (userMsg.includes("langkawi")) { 
                    mapCenter = [6.3333, 99.7333]; zoomLevel = 11; // ⚡ TEPAT KE PULAU LANGKAWI
                }
                else if (userMsg.includes("sabah") || userMsg.includes("tawau") || userMsg.includes("sandakan") || userMsg.includes("kudat") || userMsg.includes("keningau") || userMsg.includes("ranau") || userMsg.includes("kota kinabalu")) { 
                    mapCenter = [5.8, 117.0]; zoomLevel = 8; 
                }
                else if (userMsg.includes("sarawak") || userMsg.includes("kuching") || userMsg.includes("miri") || userMsg.includes("bintulu") || userMsg.includes("sibu") || userMsg.includes("kapit") || userMsg.includes("mulu") || userMsg.includes("limbang") || userMsg.includes("mukah")) { 
                    mapCenter = [2.5, 113.0]; zoomLevel = 7; 
                }
                else if (userMsg.includes("utara") || userMsg.includes("kedah") || userMsg.includes("penang") || userMsg.includes("pinang") || userMsg.includes("perlis") || userMsg.includes("alor setar") || userMsg.includes("butterworth") || userMsg.includes("chuping")) { 
                    mapCenter = [6.0, 100.4]; zoomLevel = 8; 
                }
                else if (userMsg.includes("johor") || userMsg.includes("senai") || userMsg.includes("kluang") || userMsg.includes("batu pahat") || userMsg.includes("mersing")) { 
                    mapCenter = [1.9, 103.3]; zoomLevel = 8; 
                }
                else if (userMsg.includes("pantai timur") || userMsg.includes("kelantan") || userMsg.includes("terengganu") || userMsg.includes("bharu") || userMsg.includes("krai") || userMsg.includes("gong kedak") || userMsg.includes("kerteh")) { 
                    mapCenter = [5.5, 102.8]; zoomLevel = 8; 
                }
                else if (userMsg.includes("perak") || userMsg.includes("ipoh") || userMsg.includes("sitiawan") || userMsg.includes("lubok merbau")) { 
                    mapCenter = [4.6, 101.0]; zoomLevel = 8; 
                }
                else if (userMsg.includes("pahang") || userMsg.includes("kuantan") || userMsg.includes("cameron") || userMsg.includes("batu embun") || userMsg.includes("muadzam") || userMsg.includes("temerloh")) { 
                    mapCenter = [3.8, 102.5]; zoomLevel = 8; 
                }
                else if (userMsg.includes("selangor") || userMsg.includes("kl") || userMsg.includes("kuala lumpur") || userMsg.includes("subang") || userMsg.includes("sepang") || userMsg.includes("klia")) { 
                    mapCenter = [3.1306, 101.5525]; zoomLevel = 9; 
                }
                else if (userMsg.includes("melaka") || userMsg.includes("negeri sembilan") || userMsg.includes("pilah")) { 
                    mapCenter = [2.5, 102.2]; zoomLevel = 9; 
                }

                // 1. Lakarkan peta Leaflet menggunakan ID Unik yang dijana
                const map = L.map(uniqueMapId).setView(mapCenter, zoomLevel);

                // 2. Masukkan tile OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(map);

                // 3. Sumbat semua marker
                stations.forEach(st => {
                    L.marker([st.lat, st.lng]).addTo(map)
                        .bindPopup(`<b>${st.name}</b><br>Negeri: ${st.state.toUpperCase()}`);
                });

                // 4. Double check force rendering tile 
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
                
            } catch (mapError) {
                console.error("Gagal memaparkan peta Satu Malaysia:", mapError);
            }
        }, 400); // Dilebihkan ke 400ms untuk bagi HTML bersedia sepenuhnya
    }
}

function setLanguage(lang, event) {
    if (event) event.stopPropagation();
    document.getElementById('quickReplies').innerHTML = ''; 
    currentLang = lang;

    if (currentLang === 'BM') {
        addMessage('Bahasa Malaysia', 'user');
        setTimeout(() => {
            addMessage('Perbualan ini dikawal oleh Terma dan Syarat Chatbot AI MET Malaysia, yang memastikan interaksi anda selamat dan dilindungi selaras dengan undang-undang. Sebelum meneruskan perbualan, sila baca Terma dan Syarat dengan teliti.', 'bot');
            showTermsOptions(); 
        }, 600);
    } else {
        addMessage('English', 'user');
        setTimeout(() => {
            addMessage('This chat is governed by the Terms and Conditions of MET Malaysia\'s AI Chatbot, which ensure your interactions are secured and protected in line with applicable laws. Before you proceed, please read these Terms and Conditions carefully.', 'bot');
            showTermsOptions();
        }, 600);
    }
}

function showTermsOptions() {
    const quickReplies = document.getElementById('quickReplies');
    if (currentLang === 'BM') {
        quickReplies.innerHTML = `
            <button class="lang-btn" onclick="handleTerms('AGREE', event)">Setuju ✅</button>
            <button class="lang-btn" onclick="handleTerms('DISAGREE', event)">Tidak Setuju ❌</button>
        `;
    } else {
        quickReplies.innerHTML = `
            <button class="lang-btn" onclick="handleTerms('AGREE', event)">Agree ✅</button>
            <button class="lang-btn" onclick="handleTerms('DISAGREE', event)">Disagree ❌</button>
        `;
    }
}

function handleTerms(status, event) {
    if (event) event.stopPropagation();
    document.getElementById('quickReplies').innerHTML = '';

    if (status === 'AGREE') {
        if (currentLang === 'BM') {
            addMessage('Setuju', 'user');
            chatStage = 'AWAITING_NAME'; // 🚦 Kunci mod sembang masuk ke kutipan nama
            setTimeout(() => {
                addMessage('Terima kasih kerana bersetuju. Sebelum memulakan, sila masukkan nama anda ', 'bot');
            }, 600);
        } else {
            addMessage('Agree', 'user');
            chatStage = 'AWAITING_NAME'; // 🚦 Kunci mod sembang masuk ke kutipan nama
            setTimeout(() => {
                addMessage('To begin with, may I have your name?', 'bot');
            }, 600);
        }
    } else {
        if (currentLang === 'BM') {
            addMessage('Tidak Setuju', 'user');
            setTimeout(() => { addMessage('Maaf, anda perlu bersetuju dengan terma untuk menggunakan chatbot ini.', 'bot'); }, 600);
        } else {
            addMessage('Disagree', 'user');
            setTimeout(() => { addMessage('Sorry, you must agree to the terms to use this chatbot.', 'bot'); }, 600);
        }
    }
}

function showFaqOptions(lang) {
    const chatMessages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'quick-replies';
    
    if (lang === 'BM') {
        div.innerHTML = `
            <button class="lang-btn" onclick="quickAsk('Panduan sistem & Laman web', event)">Panduan Laman Web</button>
            <button class="lang-btn" onclick="quickAsk('Waktu operasi', event)">Waktu Operasi</button>
            <button class="lang-btn" onclick="quickAsk('Alamat jabatan', event)">Alamat Jabatan</button>
            <button class="lang-btn" onclick="quickAsk('Portal pembelian MyMETdata', event)">Portal MyMETData</button>
            <button class="lang-btn" onclick="quickAsk('Urusan bayaran', event)">Urusan Bayaran</button>
            <button class="lang-btn" onclick="quickAsk('Walk-in', event)">Urusan Walk-in</button>
            <button class="lang-btn" onclick="quickAsk('Tempoh data legal & Non-routine', event)">Tempoh Data Legal</button>
            <button class="lang-btn" onclick="quickAsk('Jenis format data', event)">Jenis & Format Data</button>
            <button class="lang-btn" onclick="quickAsk('Pengecualian yuran & Diskaun pelajar', event)">Pengecualian Fi Pelajar</button>
            <button class="lang-btn" onclick="quickAsk('Prosedur & Dokumen sokongan', event)">Prosedur & Dokumen</button>
            <button class="lang-btn" onclick="quickAsk('Tempoh proses data', event)">Tempoh Proses Data</button>
            <button class="lang-btn" onclick="quickAsk('Pegawai bertugas', event)">📞 Hubungi Pegawai</button>
        `;
    } else {
        div.innerHTML = `
            <button class="lang-btn" onclick="quickAsk('Website guide', event)">Website Guide</button>
            <button class="lang-btn" onclick="quickAsk('Operating hours', event)">Operating Hours</button>
            <button class="lang-btn" onclick="quickAsk('Department address', event)">Department address</button>
            <button class="lang-btn" onclick="quickAsk('myMETdata portal', event)">MyMETData Portal</button>
            <button class="lang-btn" onclick="quickAsk('Payment', event)">Payment Info</button>
            <button class="lang-btn" onclick="quickAsk('Walk-in / Counter services', event)">Walk-in Counter</button>
            <button class="lang-btn" onclick="quickAsk('Legal & Non-routine data period', event)">Special Data Period</button>
            <button class="lang-btn" onclick="quickAsk('Data format', event)">Data Types & Format</button>
            <button class="lang-btn" onclick="quickAsk('Fee waivers & Student discount', event)">Student Fee Waiver</button>
            <button class="lang-btn" onclick="quickAsk('Procedures & Required documents', event)">Documents Required</button>
            <button class="lang-btn" onclick="quickAsk('Data processing period', event)">Data processing period</button>
            <button class="lang-btn" onclick="quickAsk('Officer in charge', event)">📞 Contact Officer</button>
        `;
    }    
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function quickAsk(text, event) {
    if (event) event.stopPropagation();
    
    const dynamicReplies = document.querySelectorAll('.chat-messages .quick-replies');
    if (dynamicReplies.length > 0) {
        dynamicReplies[dynamicReplies.length - 1].remove();
    }
    
    addMessage(text, 'user');
    setTimeout(() => botReply(text), 400);
}

// ================================================================
// 3. LOGIK BOT SAMBUNG KE AI BACKEND SERVER
// ================================================================
async function botReply(userMessage) {
    try {
        // 💡 Padam sebarang jangka masa lama jika ada soalan baru masuk bertubi-tubi
        clearTimeout(followUpTimeout);

        // 🚀 URL BACKEND DISAMBUNGKAN TERUS KE SERVER RENDER!
        const response = await fetch("https://aida-met-kik.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage,
                lang: currentLang 
            })
        });

        const data = await response.json();
        const reply = data.reply;

        addMessage(reply, 'bot');

        // 💡 Masukkan pembilang masa responsif (3 saat) dengan VARIASI AYAT RAWAK
        followUpTimeout = setTimeout(() => {
            const listAyatBM = [
                'Ada apa-apa lagi maklumat yang boleh saya bantu anda?',
                'Ada sebarang soalan lain berkenaan perkhidmatan MET Malaysia?',
                'Bagaimana lagi saya boleh bantu anda hari ini?',
                'Sila beritahu jika anda memerlukan penjelasan lanjut.'
            ];
            
            const listAyatEN = [
                'Is there anything else I can help you with?',
                'Do you have any other inquiries regarding MET Malaysia services?',
                'How else may I assist you today?',
                'Feel free to ask if you need further clarification.'
            ];

            const randomBM = listAyatBM[Math.floor(Math.random() * listAyatBM.length)];
            const randomEN = listAyatEN[Math.floor(Math.random() * listAyatEN.length)];

            const sambunganMesej = currentLang === 'BM' ? randomBM : randomEN;
            
            addMessage(sambunganMesej, 'bot');
            showFaqOptions(currentLang); 
        }, 3000);

    } catch (error) {
        console.error("Ralat sambungan server:", error);
        addMessage(
            currentLang === 'EN'
                ? 'Sorry, the AI server is currently offline. Please try again later.'
                : 'Maaf, pelayan AI sedang luar talian. Sila cuba sebentar lagi.',
            'bot'
        );
    }
}

// ================================================================
// 4. PENYIMPANAN DATA & AUTO-SUGGEST
// ================================================================

function saveChatLog(sender, message) {
    const logs = JSON.parse(localStorage.getItem('chatLogs')) || [];
    logs.push({ sender, message, time: new Date().toLocaleString() });
    localStorage.setItem('chatLogs', JSON.stringify(logs));
}

const suggestionList = ["Bagaimana cara membeli data?", "Apakah jenis data yang ditawarkan?", "Bagaimana cara membuat bayaran?", "Siapa boleh saya hubungi untuk bantuan?"];
const userInputField = document.getElementById("userInput");
const suggestionBox = document.getElementById("inputSuggestions");

userInputField.addEventListener("input", function () {
    // 💡 KUNCI UTAMA: Sebaik sahaja juri atau user tekan satu huruf pun dekat keyboard, 
    // kita terus padam timer 5 saat bot! Bot akan senyap dan tunggu user habis menaip.
    clearTimeout(followUpTimeout);

    // Sekatan: Matikan fungsi auto-suggest kalau data peribadi masih dalam proses kutipan
    if (chatStage !== 'COMPLETED' && chatStage !== 'GREETING') return;

    const text = this.value.toLowerCase().trim();
    suggestionBox.innerHTML = "";
    if (text.length < 2) return;

    const scoredMatches = suggestionList
        .map(q => {
            let score = 0;
            q.toLowerCase().split(' ').forEach(word => { if (text.includes(word)) score++; });
            return { text: q, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

    scoredMatches.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.textContent = item.text;
        if (index === 0) { div.style.backgroundColor = "#003366"; div.style.color = "#fff"; }
        div.onclick = (e) => {
            e.stopPropagation();
            userInputField.value = item.text;
            suggestionBox.innerHTML = "";
            sendMessage();
        };
        suggestionBox.appendChild(div);
    });
});

userInputField.addEventListener("blur", () => { setTimeout(() => suggestionBox.innerHTML = "", 200); });

userInputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

document.addEventListener('click', function(e) {
    const chatbox = document.getElementById('chatbox');
    const chatButton = document.getElementById('chat-button');
    const quickReplies = document.getElementById('quickReplies');
    
    if (chatbox && !chatbox.contains(e.target) && 
        quickReplies && !quickReplies.contains(e.target) && 
        chatButton && !chatButton.contains(e.target)) {
        chatbox.classList.remove('active');
    }
});

// ================================================================
// 5. FUNGSI EKSPORT LOG PERBUALAN (CIRI AUDIT TRAIL KIK DENGAN PASSWORD)
// ================================================================
function exportChatLog() {
    // 🔐 Kata laluan khas pegawai untuk muat turun log
    const ADMIN_PASSWORD = "fadilensem678"; 

    // 1. Minta pengesahan kata laluan daripada pengguna
    const userPrompt = prompt(
        currentLang === 'BM' 
            ? "Sila masukkan kata laluan:" 
            : "Please enter password:"
    );

    // 2. Jika pengguna tekan 'Cancel' atau tidak taip apa-apa
    if (userPrompt === null || userPrompt.trim() === "") {
        alert(currentLang === 'BM' ? "Akses dibatalkan." : "Access cancelled.");
        return;
    }

    // 3. Semak jika kata laluan salah
    if (userPrompt !== ADMIN_PASSWORD) {
        alert(
            currentLang === 'BM' 
                ? "⚠️ Kata laluan salah." 
                : "⚠️ Incorrect password."
        );
        return;
    }

    // 4. Semak jika ada log tersimpan
    const logs = JSON.parse(localStorage.getItem('chatLogs'));
    if (!logs || logs.length === 0) {
        alert(currentLang === 'BM' ? 'Tiada rekod perbualan untuk diekstrak.' : 'No chat records to extract.');
        return;
    }

    // 5. Jika kata laluan BETUL, teruskan eksport log perbualan
    let textContent = "==================================================\n";
    textContent += "    AIDA MET MALAYSIA - CHATBOX AUDIT TRAIL LOG   \n";
    textContent += `    Tarikh Eksport: ${new Date().toLocaleString()} \n`;
    if (userData.name) {
        textContent += `    Profil Pengguna : ${userData.name} | ${userData.phone} | ${userData.email}\n`;
    }
    textContent += "==================================================\n\n";

    logs.forEach((log, index) => {
        const masa = log.time || "Tiada Masa";
        let mesejBersih = log.message.replace(/<[^>]*>/g, '');
        
        textContent += `[${index + 1}] [${masa}] [${log.sender.toUpperCase()}] :\n`;
        textContent += `${mesejBersih}\n`;
        textContent += "--------------------------------------------------\n";
    });

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    const namaFail = `AIDA_ChatLog_${new Date().toISOString().slice(0,10)}.txt`;
    
    link.href = URL.createObjectURL(blob);
    link.download = namaFail;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(currentLang === 'BM' ? "✅ Kata laluan disahkan. Muat turun log perbualan berjaya!" : "✅ Password verified. Chat log downloaded successfully!");
}
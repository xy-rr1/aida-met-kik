// ================================================================
// VARIABLE GLOBAL (Kunci Bahasa Pilihan, Masa & Pendaftaran)
// ================================================================
let currentLang = 'BM'; 
let followUpTimeout; 
let lastUserQuery = ''; 

// 📋 Kunci Mod Pendaftaran 1-by-1
let chatStage = 'GREETING'; 
let userData = {
    name: '',
    phone: '',
    email: ''
};

// 📍 SENARAI 42 STESEN UTAMA MET MALAYSIA
const mainStations = [
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
    { "name": "Stesen Meteorologi Temerloh", "lat": 3.4712, "lng": 102.3790, "state": "pahang" },
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

// 📐 FUNGSI MATEMATIK: Mengira jarak sebenar antara 2 koordinat (Haversine Formula dalam KM)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

// 🌐 FUNGSI CARIAN LOKASI BEBAS (PANDUAN GEOCODING DARI OPENSTREETMAP NOMINATIM API)
async function fetchCoordinatesFromAPI(queryText) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryText + ", Malaysia")}`;
        const response = await fetch(url, { headers: { 'User-Agent': 'AIDA-MET-Malaysia-KIKApp/1.0' } });
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
    } catch (e) {
        console.error("Gagal geocoding API:", e);
    }
    return null;
}

// 🔍 FUNGSI TERAS CARIAN: Mencari stesen utama terdekat apabila pengguna menekan butang 'Cari'
async function findNearestStation(btnElement) {
    const parentContainer = btnElement.parentElement.parentElement;
    const locationInput = parentContainer.querySelector('.user-location-input');
    const resultBox = parentContainer.querySelector('.nearest-result-box');
    const stationNameSpan = parentContainer.querySelector('.nearest-station-name');
    
    const query = locationInput.value.toLowerCase().trim();
    if (!query) {
        alert("Sila masukkan lokasi, kampung, mukim atau daerah anda terlebih dahulu.");
        return;
    }

    const mapDiv = parentContainer.querySelector('[id^="map_"]');
    if (!mapDiv || !mapDiv._leaflet_map) return;
    const map = mapDiv._leaflet_map;
    const allMarkers = mapDiv._all_markers_data || [];

    // Tukar status butang sementara sedang mencari
    const originalBtnText = btnElement.innerText;
    btnElement.innerText = "⏳...";
    btnElement.disabled = true;

    let userLat = null, userLng = null;

    // 1. SEMAKAN PANTAS LOKASI UTAMA MALAYSIA (Pangkalan Data Tempatan)
    // PULAU PINANG & SEBERANG PERAI
    if (query.includes("seberang perai") || query.includes("prai") || query.includes("butterworth") || query.includes("seberang jaya") || query.includes("bukit mertajam") || query.includes("nibong tebal") || query.includes("kepala batas")) { 
        userLat = 5.3700; userLng = 100.4000; 
    }
    else if (query.includes("penang") || query.includes("pulau pinang") || query.includes("george town") || query.includes("bayan lepas") || query.includes("balik pulau")) { 
        userLat = 5.4140; userLng = 100.3290; 
    }
    // MELAKA
    else if (query.includes("jasin")) { userLat = 2.3100; userLng = 102.4300; }
    else if (query.includes("alor gajah")) { userLat = 2.3800; userLng = 102.2094; }
    else if (query.includes("melaka")) { userLat = 2.1900; userLng = 102.2500; }
    // JOHOR
    else if (query.includes("mersing")) { userLat = 2.4450; userLng = 103.8333; }
    else if (query.includes("muar")) { userLat = 2.0442; userLng = 102.5689; }
    else if (query.includes("batu pahat")) { userLat = 1.8548; userLng = 102.9325; }
    else if (query.includes("kluang")) { userLat = 2.0305; userLng = 103.3172; }
    else if (query.includes("segamat")) { userLat = 2.5083; userLng = 102.8139; }
    else if (query.includes("johor") || query.includes("jb") || query.includes("senai") || query.includes("kulai")) { userLat = 1.4927; userLng = 103.7414; }
    // KELANTAN
    else if (query.includes("pasir mas") || query.includes("pasirmas")) { userLat = 6.0400; userLng = 102.1400; }
    else if (query.includes("tumpat")) { userLat = 6.1953; userLng = 102.1673; }
    else if (query.includes("gua musang")) { userLat = 4.8811; userLng = 101.9622; }
    else if (query.includes("kelantan") || query.includes("kota bharu")) { userLat = 6.1250; userLng = 102.2400; }
    // KEDAH & PERLIS
    else if (query.includes("langkawi")) { userLat = 6.3333; userLng = 99.7333; }
    else if (query.includes("sungai petani")) { userLat = 5.6433; userLng = 100.4900; }
    else if (query.includes("kulim")) { userLat = 5.3708; userLng = 100.5517; }
    else if (query.includes("baling")) { userLat = 5.6792; userLng = 100.9167; }
    else if (query.includes("kedah") || query.includes("alor setar")) { userLat = 6.1200; userLng = 100.3600; }
    else if (query.includes("perlis") || query.includes("kangar")) { userLat = 6.4410; userLng = 100.1980; }
    // PERAK
    else if (query.includes("taiping")) { userLat = 4.8517; userLng = 100.7386; }
    else if (query.includes("teluk intan")) { userLat = 4.0211; userLng = 101.0089; }
    else if (query.includes("sitiawan") || query.includes("manjung") || query.includes("lumut")) { userLat = 4.2211; userLng = 100.7011; }
    else if (query.includes("ipoh") || query.includes("perak")) { userLat = 4.5970; userLng = 101.0900; }
    // SELANGOR & KL
    else if (query.includes("shah alam") || query.includes("klang")) { userLat = 3.0730; userLng = 101.5180; }
    else if (query.includes("kajang") || query.includes("bangi")) { userLat = 2.9927; userLng = 101.7909; }
    else if (query.includes("petaling jaya") || query.includes("pj") || query.includes("subang")) { userLat = 3.1306; userLng = 101.5525; }
    else if (query.includes("selangor") || query.includes("kl") || query.includes("kuala lumpur")) { userLat = 3.0730; userLng = 101.5180; }
    // NEGERI SEMBILAN
    else if (query.includes("port dickson")) { userLat = 2.5228; userLng = 101.7953; }
    else if (query.includes("seremban") || query.includes("negeri sembilan")) { userLat = 2.7290; userLng = 101.9380; }
    // PAHANG
    else if (query.includes("cameron highlands")) { userLat = 4.4667; userLng = 101.3667; }
    else if (query.includes("temerloh")) { userLat = 3.4712; userLng = 102.3790; }
    else if (query.includes("kuantan") || query.includes("pahang")) { userLat = 3.8080; userLng = 103.3260; }
    // TERENGGANU
    else if (query.includes("kemaman") || query.includes("cukai")) { userLat = 4.2333; userLng = 103.4167; }
    else if (query.includes("dungun")) { userLat = 4.7303; userLng = 103.4189; }
    else if (query.includes("kuala terengganu") || query.includes("terengganu")) { userLat = 5.3300; userLng = 103.1400; }
    // SABAH, SARAWAK & LABUAN
    else if (query.includes("labuan")) { userLat = 5.3075; userLng = 115.2425; }
    else if (query.includes("sandakan")) { userLat = 5.8992; userLng = 118.0664; }
    else if (query.includes("tawau")) { userLat = 4.3161; userLng = 118.1189; }
    else if (query.includes("kota kinabalu") || query.includes("sabah")) { userLat = 5.9800; userLng = 116.0700; }
    else if (query.includes("sibu")) { userLat = 2.2500; userLng = 111.9667; }
    else if (query.includes("miri")) { userLat = 4.3333; userLng = 113.9833; }
    else if (query.includes("bintulu")) { userLat = 3.1200; userLng = 113.0247; }
    else if (query.includes("kuching") || query.includes("sarawak")) { userLat = 1.5530; userLng = 110.3590; }

    // 2. JIKA LOKASI TIADA DALAM LIST (KAMPUNG / PEKAN KECIL) -> GUNAKAN AUTOMATIC GEOCODING API
    if (userLat === null || userLng === null) {
        const geoRes = await fetchCoordinatesFromAPI(query);
        if (geoRes) {
            userLat = geoRes.lat;
            userLng = geoRes.lng;
        } else {
            // Fallback default
            userLat = 4.2105;
            userLng = 101.9758;
        }
    }

    btnElement.innerText = originalBtnText;
    btnElement.disabled = false;

    // 3. BANDINGKAN JARAK KEPADA KESEMUA STESEN UTAMA MENGGUNAKAN HAVERSINE
    let nearestStation = null;
    let minDistance = Infinity;

    allMarkers.forEach(st => {
        const dist = calculateDistance(userLat, userLng, st.lat, st.lng);
        if (dist < minDistance) {
            minDistance = dist;
            nearestStation = st;
        }
    });

    // 4. PAPARKAN KEPUTUSAN TERDEKAT & ZOOM PETA
    if (nearestStation) {
        resultBox.style.display = 'block';
        const typeTag = '<b style="color:blue;">[Stesen Utama]</b>';
        stationNameSpan.innerHTML = `${nearestStation.rawName} ${typeTag} <br><small>📍 Jarak anggaran: <b>${minDistance.toFixed(1)} km</b> dari lokasi anda</small>`;
        
        map.flyTo([nearestStation.lat, nearestStation.lng], 13, { duration: 1.2 });
        nearestStation.marker.openPopup();
    }
}

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
    clearTimeout(followUpTimeout); 

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

    lastUserQuery = message.toLowerCase();

    addMessage(message, 'user');
    input.value = '';
    
    const activeReplies = document.querySelectorAll('.chat-messages .quick-replies');
    activeReplies.forEach(replyBox => { replyBox.remove(); });
    
    clearTimeout(followUpTimeout);

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
            
            console.log("=== DATA PROFIL CLIENT BERJAYA DIKUMPUL ===", userData);
            
            showFaqOptions(currentLang);
        }, 600);
        return;
    }

    const lowerMessage = message.toLowerCase();
    
    // 1. Senarai kata kunci Bahasa Inggeris (ditambah kata penutup & penegasan)
    const englishKeywords = [
        'what', 'how', 'why', 'who', 'where', 'is', 'are', 'rain', 'weather', 
        'buy', 'purchase', 'data', 'price', 'fee', 'waiver', 'student', 'document',
        'no', 'thanks', 'thankyou', 'thank', 'yes', 'okay', 'bye', 'address', 'hours'
    ];
    
    // 2. Semak jika ada perkataan Inggeris dalam mesej
    const isEnglish = englishKeywords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(lowerMessage));

    // 3. Hanya kemaskini bahasa jika perkataan Inggeris ditemui
    if (isEnglish) {
        currentLang = 'EN';
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

    if (text.includes('id="leafletMap"')) {
        setTimeout(() => {
            try {
                const userMsg = lastUserQuery || "";
                
                let mapCenter = [4.2105, 101.9758]; 
                let zoomLevel = 6; 

                const hasWord = (word) => new RegExp(`\\b${word}\\b`, 'i').test(userMsg);
                
                // 🗺️ LOGIK PENETAPAN PETA IBU NEGERI & DAERAH (DISUSUN LENGKAP 14 NEGERI)
                if (hasWord("mersing")) { mapCenter = [2.4450, 103.8333]; zoomLevel = 11; }
                else if (hasWord("johor") || userMsg.includes("johor bahru") || hasWord("jb") || hasWord("senai")) { mapCenter = [1.4927, 103.7414]; zoomLevel = 9; }

                else if (hasWord("jasin")) { mapCenter = [2.3100, 102.4300]; zoomLevel = 11; }
                else if (hasWord("melaka") || userMsg.includes("bandaraya melaka") || userMsg.includes("melaka tengah")) { mapCenter = [2.1900, 102.2500]; zoomLevel = 10; }

                else if (userMsg.includes("pasir mas") || userMsg.includes("pasirmas")) { mapCenter = [6.0400, 102.1400]; zoomLevel = 11; }
                else if (hasWord("kelantan") || userMsg.includes("kota bharu") || userMsg.includes("kotabharu")) { mapCenter = [6.1250, 102.2400]; zoomLevel = 10; }

                else if (hasWord("langkawi")) { mapCenter = [6.3333, 99.7333]; zoomLevel = 11; }
                else if (hasWord("kedah") || userMsg.includes("alor setar")) { mapCenter = [6.1200, 100.3600]; zoomLevel = 10; }

                else if (hasWord("perlis") || hasWord("kangar") || hasWord("arau") || userMsg.includes("padang besar") || hasWord("chuping")) { mapCenter = [6.4410, 100.1980]; zoomLevel = 10; }

                else if (hasWord("penang") || userMsg.includes("pulau pinang") || userMsg.includes("george town") || userMsg.includes("georgetown") || userMsg.includes("bayan lepas") || hasWord("seberang perai") || hasWord("butterworth")) { mapCenter = [5.4140, 100.3290]; zoomLevel = 10; }

                else if (hasWord("perak") || hasWord("ipoh") || hasWord("taiping") || hasWord("sitiawan") || hasWord("lumut") || hasWord("pangkor") || userMsg.includes("kuala kangsar") || userMsg.includes("teluk intan")) { mapCenter = [4.5970, 101.0900]; zoomLevel = 10; }

                else if (hasWord("selangor") || userMsg.includes("shah alam") || hasWord("kl") || userMsg.includes("kuala lumpur") || userMsg.includes("putrajaya") || userMsg.includes("petaling jaya") || hasWord("subang") || hasWord("klang")) { mapCenter = [3.0730, 101.5180]; zoomLevel = 10; }

                else if (userMsg.includes("negeri sembilan") || hasWord("seremban") || hasWord("nilai") || userMsg.includes("port dickson") || userMsg.includes("kuala pilah") || hasWord("rembau") || hasWord("tampin")) { mapCenter = [2.7290, 101.9380]; zoomLevel = 10; }

                else if (hasWord("pahang") || hasWord("kuantan") || hasWord("pekan") || hasWord("rompin") || hasWord("temerloh") || hasWord("bentong") || userMsg.includes("cameron highlands")) { mapCenter = [3.8080, 103.3260]; zoomLevel = 10; }

                else if (hasWord("terengganu") || userMsg.includes("kuala terengganu") || hasWord("marang") || hasWord("dungun") || hasWord("kemaman") || hasWord("kerteh") || hasWord("besut")) { mapCenter = [5.3300, 103.1400]; zoomLevel = 10; }

                else if (hasWord("labuan")) { mapCenter = [5.3075, 115.2425]; zoomLevel = 11; }

                else if (hasWord("sabah") || userMsg.includes("kota kinabalu") || hasWord("kk") || hasWord("sandakan") || hasWord("tawau") || userMsg.includes("lahad datu") || hasWord("semporna") || hasWord("keningau")) { mapCenter = [5.9800, 116.0700]; zoomLevel = 9; }

                else if (hasWord("sarawak") || hasWord("kuching") || hasWord("sibu") || hasWord("miri") || hasWord("bintulu") || hasWord("kapit") || hasWord("limbang")) { mapCenter = [1.5530, 110.3590]; zoomLevel = 9; }
               
                const map = L.map(uniqueMapId).setView(mapCenter, zoomLevel);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(map);

                const allMarkers = [];

                // HANYA TAMBAH STESEN UTAMA SAHAJA
                mainStations.forEach(st => {
                    const marker = L.circleMarker([st.lat, st.lng], {
                        radius: 6, fillColor: "#0056b3", color: "#ffffff", weight: 2, opacity: 1, fillOpacity: 0.9
                    }).addTo(map)
                        .bindPopup(`<b>${st.name}</b><br><span style="color:blue;"><b>Kategori: Stesen Utama</b></span><br>Negeri: ${st.state ? st.state.toUpperCase() : 'MALAYSIA'}`);
                    
                    allMarkers.push({ name: st.name.toLowerCase(), rawName: st.name, isMain: true, marker: marker, lat: st.lat, lng: st.lng });
                });

                const mapContainerEl = document.getElementById(uniqueMapId);
                if (mapContainerEl) {
                    mapContainerEl._leaflet_map = map;
                    mapContainerEl._all_markers_data = allMarkers;
                }

                setTimeout(() => { map.invalidateSize(); }, 100);
                
            } catch (mapError) {
                console.error("Gagal memaparkan peta:", mapError);
            }
        }, 400); 
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
            chatStage = 'AWAITING_NAME'; 
            setTimeout(() => {
                addMessage('Terima kasih kerana bersetuju. Sebelum memulakan, sila masukkan nama anda ', 'bot');
            }, 600);
        } else {
            addMessage('Agree', 'user');
            chatStage = 'AWAITING_NAME'; 
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
            <button class="lang-btn" onclick="quickAsk('Stesen cuaca', event)" style="background-color: #0056b3; color: #ffffff; font-weight: bold;">📍 Carian Peta Stesen</button>
            <button class="lang-btn" onclick="quickAsk('Panduan sistem & Laman web', event)">Panduan Laman Web</button>
            <button class="lang-btn" onclick="quickAsk('Waktu operasi', event)">Waktu Operasi</button>
            <button class="lang-btn" onclick="quickAsk('Alamat jabatan', event)">Alamat Jabatan</button>
            <button class="lang-btn" onclick="quickAsk('Portal pembelian MyMETdata', event)">Portal MyMETData</button>
            <button class="lang-btn" onclick="quickAsk('Urusan bayaran', event)">Urusan Bayaran</button>
            <button class="lang-btn" onclick="quickAsk('Walk-in', event)">Urusan Walk-in</button>
            <button class="lang-btn" onclick="quickAsk('Tempoh proses data', event)">Tempoh Proses Data</button>
            <button class="lang-btn" onclick="quickAsk('Jenis format data', event)">Jenis & Format Data</button>
            <button class="lang-btn" onclick="quickAsk('Pengecualian yuran & Diskaun pelajar', event)">Pengecualian Fi Pelajar</button>
            <button class="lang-btn" onclick="quickAsk('Prosedur & Dokumen sokongan', event)">Prosedur & Dokumen</button>
            <button class="lang-btn" onclick="quickAsk('Pegawai bertugas', event)">📞 Hubungi Pegawai</button>
        `;
    } else {
        div.innerHTML = `
            <button class="lang-btn" onclick="quickAsk('Weather station', event)" style="background-color: #0056b3; color: #ffffff; font-weight: bold;">📍 Interactive Station Map</button>
            <button class="lang-btn" onclick="quickAsk('Website guide', event)">Website Guide</button>
            <button class="lang-btn" onclick="quickAsk('Operating hours', event)">Operating Hours</button>
            <button class="lang-btn" onclick="quickAsk('Department address', event)">Department address</button>
            <button class="lang-btn" onclick="quickAsk('myMETdata portal', event)">MyMETData Portal</button>
            <button class="lang-btn" onclick="quickAsk('Payment', event)">Payment Info</button>
            <button class="lang-btn" onclick="quickAsk('Walk-in / Counter services', event)">Walk-in Counter</button>
            <button class="lang-btn" onclick="quickAsk('Data processing period', event)">Data Processing Period</button>
            <button class="lang-btn" onclick="quickAsk('Data format', event)">Data Types & Format</button>
            <button class="lang-btn" onclick="quickAsk('Fee waivers & Student discount', event)">Student Fee Waiver</button>
            <button class="lang-btn" onclick="quickAsk('Procedures & Required documents', event)">Documents Required</button>
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
        clearTimeout(followUpTimeout);

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
// 4. PENYIMPANAN DATA & INPUT ENTER
// ================================================================

function saveChatLog(sender, message) {
    const logs = JSON.parse(localStorage.getItem('chatLogs')) || [];
    logs.push({ sender, message, time: new Date().toLocaleString() });
    localStorage.setItem('chatLogs', JSON.stringify(logs));
}

const userInputField = document.getElementById("userInput");

if (userInputField) {
    userInputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
}

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
    const ADMIN_PASSWORD = "bukanuser678"; 

    const userPrompt = prompt(
        currentLang === 'BM' 
            ? "Sila masukkan kata laluan:" 
            : "Please enter password:"
    );

    if (userPrompt === null || userPrompt.trim() === "") {
        alert(currentLang === 'BM' ? "Akses dibatalkan." : "Access cancelled.");
        return;
    }

    if (userPrompt !== ADMIN_PASSWORD) {
        alert(
            currentLang === 'BM' 
                ? "⚠️ Kata laluan salah." 
                : "⚠️ Incorrect password."
        );
        return;
    }

    const logs = JSON.parse(localStorage.getItem('chatLogs'));
    if (!logs || logs.length === 0) {
        alert(currentLang === 'BM' ? 'Tiada rekod perbualan untuk diekstrak.' : 'No chat records to extract.');
        return;
    }

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
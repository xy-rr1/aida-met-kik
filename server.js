// 💡 PANGGIL DOTENV UNTUK BACA FAIL .ENV (KESELAMATAN KIK)
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 BACA API KEY DARIPADA FAIL .ENV (Lebih Selamat & Bersih)
const GROQ_API_KEY = process.env.GROQ_API_KEY; 

// 📦 PANGGIL PANGKALAN DATA PENGETAHUAN DINAMIK DARI JSON
const knowledgeData = require("./knowledge.json");

/* ================================================================
   PANGKALAN DATA FAQ MANUAL
   ================================================================ */
const faqData = [
    {
        keywords: ['navigasi', 'panduan laman', 'fungsi website', 'browse', 'navigate', 'panduan sistem & website', 'panduan sistem & laman web', 'website navigation guide', 'website guide'],
        answerBM: 'Untuk menggunakan website ini, sila rujuk menu utama di bahagian atas laman.',
        answerEN: 'To use this website, please refer to the main menu at the top of the page.'
    },
    {
        keywords: ['waktu operasi', 'waktu pejabat', 'pejabat buka', 'operating hours', 'office hours', 'jam berapa buka', 'waktu kaunter'],
        answerBM: 'Waktu operasi kaunter MET Malaysia adalah seperti berikut:<br><br><b>Isnin - Khamis:</b><br>• 8:00 pagi - 1:00 petang<br>• 2:00 petang - 4:00 petang<br><br><b>Jumaat:</b><br>• 8:00 pagi - 12:00 tengah hari<br>• 3:00 petang - 4:00 petang<br><br><i>*Tutup pada hari Sabtu, Ahad & Cuti Umum.</i>',
        answerEN: 'MET Malaysia counter operating hours are as follows:<br><br><b>Monday - Thursday:</b><br>• 8:00 AM - 1:00 PM<br>• 2:00 PM - 4:00 PM<br><br><b>Friday:</b><br>• 8:00 AM - 12:00 PM<br>• 3:00 PM - 4:00 PM<br><br><i>*Closed on Saturdays, Sundays & Public Holidays.</i>'
    },
    {
        keywords: ['alamat jabatan', 'lokasi jabatan', 'di mana met', 'alamat met', 'jalan sultan', 'department address', 'met location', 'alamat pejabat', 'lokasi pejabat', 'alamat', 'lokasi'],
        answerBM: 'Jabatan Meteorologi Malaysia, Jalan Sultan, 46667 Petaling Jaya, Selangor Darul Ehsan.',
        answerEN: 'Jabatan Meteorologi Malaysia, Jalan Sultan, 46667 Petaling Jaya, Selangor Darul Ehsan.'
    },
    {
        keywords: ['mymetdata', 'web beli data', 'portal data', 'link beli data', 'portal pembelian mymetdata', 'mymetdata purchase portal', 'cara beli data', 'beli data', 'cara beli'],
        answerBM: 'Tuan/Puan boleh membeli data secara dalam talian di Portal MyMETData melalui pautan <a href="https://mymetdata.met.gov.my" target="_blank" class="chat-link">mymetdata.met.gov.my</a>.',
        answerEN: 'You can purchase data online at the MyMETData Portal via <a href="https://mymetdata.met.gov.my" target="_blank" class="chat-link">mymetdata.met.gov.my</a>.'
    },
    {
        keywords: ['urusan bayar', 'transaksi pembayaran', 'pending for payment', 'maybank2u', 'cimb clicks', 'payment transactions', 'payment'],
        answerBM: 'Bayaran boleh dibuat melalui maybank2u, bank draf atau wang pos.',
        answerEN: 'Payment can be made via Maybank2u, bank draft, or postal order.'
    },
    {
        keywords: ['walk-in', 'hadir kaunter', 'pergi kaunter', 'kaunter tingkat 3', 'counter services', 'walk-in / counter services'],
        answerBM: 'Tuan/Puan boleh hadir ke Tingkat 3, Pusat Iklim Nasional, Jabatan Meteorologi Malaysia, 46667 Petaling Jaya, Selangor.',
        answerEN: 'Sir/Madam can come to Floor 3, National Climate Centre, Department of Meteorology Malaysia, 46667 Petaling Jaya, Selangor.'
    },
    {
        keywords: ['tempoh data legal', 'data non-routine', 'compiling data', '3 hari bekerja', '7 hari bekerja', 'legal & non-routine data period', 'tempoh data legal & non-routine'],
        answerBM: 'Permohonan bagi kategori berbayar (Legal) akan diproses dalam tempoh 3 hingga 5 hari bekerja, manakala permohonan bagi data Non-Routine diproses dalam tempoh 7 hingga 10 hari bekerja selepas status bertukar "Compiling data". Data dibekalkan dalam masa 1 hari bekerja selepas bayaran disahkan.',
        answerEN: 'Applications for the paid category (Legal) will be processed within 3 to 5 working days, while Non-Routine data applications will be processed within 7 to 10 working days after the status changes to "Compiling data". Data will be provided within 1 working day once payment is confirmed.'
    },
    {
        keywords: ['perintah fi', 'katalog data', 'format data', 'jenis data', 'data format', 'data catalog', 'jenis format data'],
        answerBM: 'Data/produk yang disediakan oleh Jabatan Meteorologi Malaysia adalah tertakluk di bawah Perintah Fi (Perkhidmatan dan Penerbitan Jabatan Meteorologi Malaysia) 2010, selaras dengan Akta Fi 1951. Katalog rasmi: <a href="https://mymetdata.met.gov.my/shop/category/pin" target="_blank" class="chat-link">mymetdata.met.gov.my/shop/category/pin</a>',
        answerEN: 'Data/products provided by the Malaysian Meteorological Department are regulated under the Fees Order 2010. Official catalog: <a href="https://mymetdata.met.gov.my/shop/category/pin" target="_blank" class="chat-link">mymetdata.met.gov.my/shop/category/pin</a>'
    },
    {
        keywords: ['pengecualian fi', 'diskaun pelajar', 'fee waiver', 'student discount', 'researcher waiver', 'fee waivers & student discount', 'pengecualian yuran & diskaun pelajar'],
        answerBM: 'Secara amnya, pengecualian bayaran boleh diberikan kepada Agensi Kerajaan / penyelidik atau pelajar warganegara, tertakluk kepada had maksimum. Sila daftar di <a href="https://mymetdata.met.gov.my" target="_blank" class="chat-link">mymetdata.met.gov.my</a> dan letak nota "pengecualian/waiver".',
        answerEN: 'In general, a fee waiver may be granted to Government Agencies / researchers or students who are citizens. Kindly register at <a href="https://mymetdata.met.gov.my" target="_blank" class="chat-link">mymetdata.met.gov.my</a> and state \'waiver/exemption\'.'
    },
    {
        keywords: ['4 dokumen sokongan', 'dokumen pengecualian', 'surat sokongan', 'kad pelajar', 'required documents', 'prosedur & dokumen sokongan', 'procedures & required documents'],
        answerBM: 'Dokumen yang diperlukan untuk permohonan data Non-Routine:<br>1. Salinan IC & kad pelajar / kad kerja<br>2. Surat sokongan rasmi daripada institusi atau agensi<br>3. Keterangan ringkas mengenai projek/penyelidikan<br>4. Surat pengesahan tiada sebarang tajaan luar',
        answerEN: 'Required documents for Non-Routine data applications:<br>1. Copy of IC & student / staff card<br>2. Official support letter from the institution or agency<br>3. Brief description of the project/research<br>4. Confirmation letter of no external sponsorship'
    },
    {
        keywords: ['stesen cuaca', 'stesen meteorologi', 'lokasi stesen', 'senarai stesen', 'stesen malaysia', 'stesen di', 'stesen dekat', 'stesen', 'penang', 'pulau pinang', 'kedah', 'perlis', 'ipoh', 'perak', 'selangor', 'kl', 'peta stesen', 'stesen mana', 'paling dekat'],
        answerBM: 'Berikut ialah peta interaktif stesen meteorologi utama di Malaysia bagi negeri yang anda cari:<br><br><div id="leafletMap" style="width: 100%; height: 220px; border-radius: 8px; margin-top: 10px; border: 1px solid #ccc;"></div>',
        answerEN: 'Here is the interactive map of primary meteorological stations in Malaysia for the state you searched for:<br><br><div id="leafletMap" style="width: 100%; height: 220px; border-radius: 8px; margin-top: 10px; border: 1px solid #ccc;"></div>'
    },
    {
        keywords: ['tempoh proses am', 'proses data 5 hari', 'processing timeline', 'five working days', 'tempoh proses data', 'data processing period'],
        answerBM: 'Data dan maklumat akan diproses dan dibekalkan dalam tempoh LIMA (5) hari bekerja selepas menerima permohonan yang lengkap.',
        answerEN: 'Data and information will be processed and provided within FIVE (5) working days upon receipt of a complete application.'
    },
    {
        keywords: ['pegawai dihubungi', 'hubungi pegawai', 'nama pegawai', 'nombor telefon pegawai', 'contact person', 'officer in charge', 'siapa hubungi', 'hubungi', 'telefon', 'nombor'],
        answerBM: 'Untuk urusan permohonan dan pembelian data, sila hubungi <b>Unit Pembekalan Data, Sektor Perkhidmatan Klimatologi</b> melalui talian berikut:<br><br>📞 <b>Unit Request (Permohonan Data):</b> 03-7967 8169<br><br>👤 <b>Puan Siti Rohana:</b> 03-7967 8203<br>👤 <b>Puan Siti Norbaizura:</b> 03-7967 8168<br><br>☎️ Talian Am Jabatan: 03-7967 8000',
        answerEN: 'For data applications and purchases, please contact the <b>Request Unit, Climatological Services Sector</b> via the following lines:<br><br>📞 <b>Request Unit (Data Application):</b> 03-7967 8169<br><br>👤 <b>Puan Siti Rohana:</b> 03-7967 8203<br>👤 <b>Puan Siti Norbaizura:</b> 03-7967 8168<br><br>☎️ Department General Line: 03-7967 8000'
    }
];

function checkFAQ(message, lang) {
    const text = message.toLowerCase().trim();
    for (const faq of faqData) {
        if (faq.keywords.some(k => text === k.toLowerCase() || text.includes(k.toLowerCase()))) {
            return lang === 'EN' ? faq.answerEN : faq.answerBM;
        }
    }
    return null;
}

/* ================================================================
   ROUTE UTAMA CHATBOX
   ================================================================ */
app.post("/chat", async (req, res) => {
    const userMsg = req.body.message || "";
    const lang = req.body.lang || "BM"; 

    const faqAnswer = checkFAQ(userMsg, lang);
    if (faqAnswer) {
        return res.json({ reply: faqAnswer, source: "faq" });
    }

    try {
        let promptSystem = "";

        if (lang === 'EN') {
            promptSystem = `You are AIDA, the official AI Chatbot for the Malaysian Meteorological Department (MET Malaysia). The current year is 2026.

            Please use the official department knowledge data below to answer the user's question accurately:
            ${JSON.stringify(knowledgeData)}

            SAFETY & FORMATTING INSTRUCTIONS (STRICTLY COMPLY):
            1. STRICT GROUNDING RULE: Answer ONLY based on the official knowledge data provided above. If the requested information is not in the data or if you are unsure, DO NOT MAKE UP OR FABRICATE INFORMATION. Politely inform the user that the information is not available and ask them to contact the general line at 03-7967 8000.
            2. Answer directly, professionally, politely, and provide a COMPLETE and IN-DEPTH response structure:
               - Paragraph 1: A clear scientific definition or technical description of the topic based directly on official data.
               - Paragraph 2: The relevance/importance of the topic within the context of services, monitoring, or warnings by MET Malaysia.
               - Paragraph 3: A friendly follow-up closing question at the end (e.g., "Would you like to know more about...").
            3. It is STRICTLY FORBIDDEN to mention the words "JSON", "database", "provided file", "knowledgeData", or "information from JSON" in your response. Act as if you naturally know all this information.
            4. LANGUAGE RULE: You MUST reply 100% in ENGLISH. Do not mix languages or use Malay words.
            5. If the user's question is about weather stations or locations, advise them to type "Stesen Cuaca" to view the Interactive Map.
            6. If the user's question is completely unrelated to MET Malaysia's scope or meteorology, politely state that you are only trained for the department's scope.`;
        } else {
            promptSystem = `Anda ialah AIDA, AI Chatbot rasmi untuk Jabatan Meteorologi Malaysia (MET Malaysia). Tahun semasa ialah 2026.

            Sila gunakan data pengetahuan rasmi jabatan di bawah untuk menjawab soalan pengguna secara tepat:
            ${JSON.stringify(knowledgeData)}

            ARAHAN KESELAMATAN & FORMAT (WAJIB DIPATUHI):
            1. PERATURAN DATA KETAT: Jawab HANYA berdasarkan maklumat dalam data pengetahuan rasmi yang diberikan di atas. Jika maklumat tiada dalam data atau tidak pasti, JANGAN REKA MAKLUMAT. Beritahu pengguna secara sopan bahawa maklumat tidak wujud dalam pangkalan data dan minta pengguna hubungi talian am 03-7967 8000.
            2. Jawab secara terus, profesional, mesra, dan berikan struktur jawapan yang LENGKAP serta MENDALAM:
               - Perenggan 1: Definisi saintifik atau huraian teknikal topik secara jelas berdasarkan data rasmi.
               - Perenggan 2: Kaitan/kepentingan topik tersebut dalam konteks perkhidmatan, pemantauan, atau amaran oleh MET Malaysia.
               - Perenggan 3: Soalan ramah pembuka bicara di hujung jawapan (Contoh: "Adakah anda ingin tahu lebih lanjut mengenai...").
            3. HARAM dan DILARANG SAMA SEKALI menyebut perkataan "JSON", "pangkalan data", "fail yang diberikan", "knowledgeData", atau "maklumat dari JSON" dalam jawapan anda. Berlakon seolah-olah anda memang sudah tahu semua maklumat ini secara semula jadi.
            4. PERATURAN BAHASA: Anda WAJIB menjawab 100% dalam BAHASA MALAYSIA yang profesional tanpa bercampur bahasa.
            5. Sekiranya soalan pengguna berkaitan lokasi stesen cuaca, nasihatkan pengguna untuk menaip "Stesen Cuaca" untuk melihat Peta Interaktif.
            6. Sekiranya soalan pengguna tidak berkaitan dengan skop MET Malaysia atau meteorologi, jawab dengan sopan bahawa anda hanya dilatih untuk skop jabatan sahaja.`;
        }
        
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant", 
                temperature: 0.1,
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: userMsg }
                ]
            })
        });

        const data = await response.json();
        
        let aiReply = "";
        if (data.choices && data.choices[0] && data.choices[0].message) {
            aiReply = data.choices[0].message.content;
        } else {
            console.log("\n[RALAT GROQ API]:", JSON.stringify(data, null, 2)); 
            aiReply = (lang === 'EN' 
                ? "I'm sorry, I could not process that request. Connection issue." 
                : "Maaf, saya tidak dapat memproses permintaan tersebut. Sila cuba sebentar lagi.");
        }

        res.json({ reply: aiReply, source: "ai" });

    } catch (error) {
        console.error("Ralat Blok Try-Catch Back-end:", error);
        res.json({ 
            reply: lang === 'EN' ? "Connection error to AI system." : "Ralat sambungan ke sistem AI.", 
            source: "error" 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AIDA Server berjaya berjalan di http://localhost:${PORT}`);
});
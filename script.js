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

// 📍 SENARAI STESEN AUKISILIARI (249 STESEN DARI EXCEL)
const auxiliaryStations = [
    { "name": "Stesen Auksiliari RPS Kuala Betis", "lat": 4.9006, "lng": 101.7851 },
    { "name": "Stesen Auksiliari KESEDAR Lebir", "lat": 5.0123, "lng": 102.3812 },
    { "name": "Stesen Auksiliari FELDA Chiku 3", "lat": 4.9716, "lng": 102.2000 },
    { "name": "Stesen Auksiliari Masjid Besar Jeli", "lat": 5.6948, "lng": 101.8468 },
    { "name": "Stesen Auksiliari MARDI Jeram Pasu", "lat": 5.8129, "lng": 102.3444 },
    { "name": "Stesen Auksiliari Pertubuhan Peladang G Stong", "lat": 5.3762, "lng": 102.0113 },
    { "name": "Stesen Auksiliari Pej. Haiwan Jajahan Machang", "lat": 5.7691, "lng": 102.2165 },
    { "name": "Stesen Auksiliari Pst. Pertanian Batang Merbau", "lat": 5.8103, "lng": 102.0194 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Melor", "lat": 5.9669, "lng": 102.3003 },
    { "name": "Stesen Auksiliari Pejabat Kastam Pengkalan Kubor", "lat": 6.2331, "lng": 102.0962 },
    { "name": "Stesen Auksiliari Loji Air Telong", "lat": 5.9734, "lng": 102.4304 },
    { "name": "Stesen Auksiliari MARDI Pasir Puteh", "lat": 5.8364, "lng": 102.3905 },
    { "name": "Stesen Auksiliari Pej. Pertanian Tanah Merah", "lat": 5.8126, "lng": 102.1528 },
    { "name": "Stesen Auksiliari MARDI Bachok", "lat": 6.0628, "lng": 102.4093 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Tumpat", "lat": 6.1953, "lng": 102.1673 },
    { "name": "Stesen Auksiliari Kompleks Vokasional Pasir Mas", "lat": 6.0147, "lng": 102.1121 },
    { "name": "Stesen Auksiliari Hospital Jeli", "lat": 5.6980, "lng": 101.8436 },
    { "name": "Stesen Auksiliari Klinik Desa Meranti", "lat": 6.0697, "lng": 102.2081 },
    { "name": "Stesen Auksiliari Pusat Pertanian Lundang", "lat": 6.1042, "lng": 102.2592 },
    { "name": "Stesen Auksiliari Hospital Gua Musang", "lat": 4.8811, "lng": 101.9622 },
    { "name": "Stesen Auksiliari Kompleks Pertanian Tunjuk Laut", "lat": 1.7766, "lng": 104.0326 },
    { "name": "Stesen Auksiliari MARDI Kluang", "lat": 2.0163, "lng": 103.3242 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Air Hitam", "lat": 1.9320, "lng": 103.1764 },
    { "name": "Stesen Auksiliari Pusat Pertanian Bekok", "lat": 2.3023, "lng": 103.1293 },
    { "name": "Stesen Auksiliari Pejabat Jabatan Kerja Raya Labis", "lat": 2.3831, "lng": 103.0201 },
    { "name": "Stesen Auksiliari Jabatan Pertanian Pagoh", "lat": 2.1481, "lng": 102.7712 },
    { "name": "Stesen Auksiliari Jabatan Pertanian Parit Botak", "lat": 1.7028, "lng": 103.1192 },
    { "name": "Stesen Auksiliari Pusat Pertanian Parit Sulong", "lat": 1.9723, "lng": 102.8833 },
    { "name": "Stesen Auksiliari Pusat Pertanian Sagil", "lat": 2.3167, "lng": 102.6167 },
    { "name": "Stesen Auksiliari Kolej Komuniti Segamat 2", "lat": 2.5083, "lng": 102.8139 },
    { "name": "Stesen Auksiliari Loji Air Sungai Layang", "lat": 1.5039, "lng": 103.9511 },
    { "name": "Stesen Auksiliari Loji Air Sultan Iskandar", "lat": 1.5542, "lng": 103.8839 },
    { "name": "Stesen Auksiliari Klinik Desa Sungai Tiram", "lat": 1.5976, "lng": 103.8967 },
    { "name": "Stesen Auksiliari Pusat Pertanian Tangkak", "lat": 2.2686, "lng": 102.5401 },
    { "name": "Stesen Auksiliari Pejabat Ladang Telok Sengat", "lat": 1.5647, "lng": 104.0294 },
    { "name": "Stesen Auksiliari Pusat Pertanian Sungai Buntu", "lat": 1.3094, "lng": 103.5042 },
    { "name": "Stesen Auksiliari SMK Bandar Putra", "lat": 1.6667, "lng": 103.6231 },
    { "name": "Stesen Auksiliari Pusat Pertanian Renggam", "lat": 1.8842, "lng": 103.4020 },
    { "name": "Stesen Auksiliari SM Teknik Johor Bahru", "lat": 1.5033, "lng": 103.7431 },
    { "name": "Stesen Auksiliari SK FELDA Inas", "lat": 1.8344, "lng": 103.5350 },
    { "name": "Stesen Auksiliari SMK Tengku Temenggung Ahmad", "lat": 2.1228, "lng": 102.5694 },
    { "name": "Stesen Auksiliari SK Bukit Rahmat", "lat": 2.1389, "lng": 102.6500 },
    { "name": "Stesen Auksiliari SK Seri Jitu", "lat": 2.0583, "lng": 102.8639 },
    { "name": "Stesen Auksiliari SK Sungai Boh", "lat": 1.3286, "lng": 103.5283 },
    { "name": "Stesen Auksiliari Hospital Pontian", "lat": 1.4886, "lng": 103.3906 },
    { "name": "Stesen Auksiliari Kompleks Penghulu Mukim Jelutong", "lat": 1.5794, "lng": 103.4475 },
    { "name": "Stesen Auksiliari SK LKTP Tenggaroh 2", "lat": 2.1006, "lng": 103.9264 },
    { "name": "Stesen Auksiliari Kolej Vokasional Kota Tinggi", "lat": 1.7289, "lng": 103.8825 },
    { "name": "Stesen Auksiliari SK Seri Pulai", "lat": 1.8322, "lng": 103.0231 },
    { "name": "Stesen Auksiliari Pusat Pertanian Batu Pahai", "lat": 1.8586, "lng": 102.9367 },
    { "name": "Stesen Auksiliari SK Seri Kampung Renggam", "lat": 1.8797, "lng": 103.1814 },
    { "name": "Stesen Auksiliari SK FELDA Pengeli Timur", "lat": 1.8653, "lng": 103.6267 },
    { "name": "Stesen Auksiliari Pejabat Penghulu Mukim Sedili Besar", "lat": 1.9214, "lng": 104.1081 },
    { "name": "Stesen Auksiliari SK FELDA Lok Heng", "lat": 1.8153, "lng": 103.9856 },
    { "name": "Stesen Auksiliari SK Kota Raja", "lat": 2.1869, "lng": 102.8308 },
    { "name": "Stesen Auksiliari SK Bandar Endau", "lat": 2.6517, "lng": 103.6200 },
    { "name": "Stesen Auksiliari Pusat Pertanian Cahaya Bahru", "lat": 1.5056, "lng": 103.9431 },
    { "name": "Stesen Auksiliari MRSM Mersing", "lat": 2.4183, "lng": 103.8394 },
    { "name": "Stesen Auksiliari Pusat Pertanian Ayer Manis", "lat": 1.6378, "lng": 103.5239 },
    { "name": "Stesen Auksiliari Kolej Komuniti Bandar Penawar", "lat": 1.5583, "lng": 104.2306 },
    { "name": "Stesen Auksiliari Stesen MARDI Seberang Perai", "lat": 5.5392, "lng": 100.4631 },
    { "name": "Stesen Auksiliari Stesen MARDI Teluk Chengai", "lat": 6.1022, "lng": 100.3325 },
    { "name": "Stesen Auksiliari Pusat Pertanian Charok Padang", "lat": 5.7950, "lng": 100.8122 },
    { "name": "Stesen Auksiliari Pusat Pertanian Gajah Mati", "lat": 6.1839, "lng": 100.4358 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Pendang", "lat": 5.9903, "lng": 100.4789 },
    { "name": "Stesen Auksiliari Jabatan Pertanian Bukit Tangga", "lat": 6.4258, "lng": 100.4289 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Kulim", "lat": 5.3708, "lng": 100.5517 },
    { "name": "Stesen Auksiliari Pusat Pertanian Serdang", "lat": 5.2106, "lng": 100.6128 },
    { "name": "Stesen Auksiliari Sek. Men. Sains Kubang Pasu", "lat": 6.4211, "lng": 100.3686 },
    { "name": "Stesen Auksiliari Sek. Keb. Pulau Tuba", "lat": 6.2417, "lng": 99.8406 },
    { "name": "Stesen Auksiliari Kompleks KEDA Kampung Bukit", "lat": 6.0683, "lng": 100.7225 },
    { "name": "Stesen Auksiliari SK FELDA Guan San", "lat": 6.4381, "lng": 100.4900 },
    { "name": "Stesen Auksiliari Sek. Keb. Padang Sanai", "lat": 6.3686, "lng": 100.7061 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Lubuk Bunter", "lat": 5.2014, "lng": 100.6728 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Sik", "lat": 5.8203, "lng": 100.7486 },
    { "name": "Stesen Auksiliari Sek. Keb. Pedu", "lat": 6.2575, "lng": 100.7481 },
    { "name": "Stesen Auksiliari Kolej Vokasional Sungai Petani 2", "lat": 5.6703, "lng": 100.5283 },
    { "name": "Stesen Auksiliari Sek. Keb. Guar Lobak", "lat": 5.4678, "lng": 100.5622 },
    { "name": "Stesen Auksiliari Pusat Pertanian Batu Lanchang", "lat": 5.3942, "lng": 100.3061 },
    { "name": "Stesen Auksiliari Pusat Pertanian Bukit Temiang", "lat": 6.5408, "lng": 100.2481 },
    { "name": "Stesen Auksiliari SM Teknik Tuanku Jaafar", "lat": 2.7300, "lng": 101.9547 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Kampong Gelami", "lat": 3.0136, "lng": 102.0406 },
    { "name": "Stesen Auksiliari SMK Batu Kikir", "lat": 2.8311, "lng": 102.3161 },
    { "name": "Stesen Auksiliari Jabatan Pertanian Rembau", "lat": 2.5936, "lng": 102.0911 },
    { "name": "Stesen Auksiliari Pusat Pertanian Gemas", "lat": 2.5833, "lng": 102.6108 },
    { "name": "Stesen Auksiliari SM Sains Tuanku Munawir", "lat": 2.7067, "lng": 101.9867 },
    { "name": "Stesen Auksiliari SMK Serting Hilir Complex", "lat": 2.9150, "lng": 102.4339 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Lukut", "lat": 2.5636, "lng": 101.8319 },
    { "name": "Stesen Auksiliari Pejabat Jabatan Kerja Raya Tampin", "lat": 2.4764, "lng": 102.2286 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Pantai", "lat": 2.7844, "lng": 101.9897 },
    { "name": "Stesen Auksiliari SMK Pasir Panjang", "lat": 2.4228, "lng": 101.9333 },
    { "name": "Stesen Auksiliari Pusat Pertanian Chembong", "lat": 2.5622, "lng": 102.0808 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Seram", "lat": 2.8711, "lng": 102.0231 },
    { "name": "Stesen Auksiliari SK Keru", "lat": 2.4939, "lng": 102.2908 },
    { "name": "Stesen Auksiliari SMK Linggi", "lat": 2.4889, "lng": 102.0000 },
    { "name": "Stesen Auksiliari SMK Felda Palong 7", "lat": 2.7303, "lng": 102.5861 },
    { "name": "Stesen Auksiliari Pusat Pertanian Sungai Udang", "lat": 2.2925, "lng": 102.1389 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Selandar", "lat": 2.3872, "lng": 102.3789 },
    { "name": "Stesen Auksiliari Pusat Pertanian Pulau Gadong", "lat": 2.2283, "lng": 102.2047 },
    { "name": "Stesen Auksiliari Pusat Pertanian Merlimau", "lat": 2.1444, "lng": 102.4289 },
    { "name": "Stesen Auksiliari SM Teknik Melaka Tengah", "lat": 2.2475, "lng": 102.2611 },
    { "name": "Stesen Auksiliari Sek. Keb. Alor Gajah 1", "lat": 2.3800, "lng": 102.2094 },
    { "name": "Stesen Auksiliari Sek. Keb. Simpang Empat", "lat": 2.4283, "lng": 102.1831 },
    { "name": "Stesen Auksiliari Loji Air Gadek", "lat": 2.4089, "lng": 102.2486 },
    { "name": "Stesen Auksiliari Pusat Pertanian Kuala Linggi", "lat": 2.3886, "lng": 102.0169 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Seri Bemban", "lat": 2.2603, "lng": 102.3769 },
    { "name": "Stesen Auksiliari Loji Air Chin Chin", "lat": 2.3025, "lng": 102.4914 },
    { "name": "Stesen Auksiliari Loji Air Merlimau", "lat": 2.1469, "lng": 102.4244 },
    { "name": "Stesen Auksiliari Sek. Keb. Kem Terendak 1", "lat": 2.2858, "lng": 102.1067 },
    { "name": "Stesen Auksiliari Kolej Vokasional Datuk Seri Mohd Zin", "lat": 2.3928, "lng": 102.1969 },
    { "name": "Stesen Auksiliari Stesen MARDI Kuala Linggi", "lat": 2.3822, "lng": 102.0169 },
    { "name": "Stesen Auksiliari Sek. Keb. Nyalas", "lat": 2.4339, "lng": 102.4703 },
    { "name": "Stesen Auksiliari Sek. Keb. Chabau", "lat": 2.2356, "lng": 102.4839 },
    { "name": "Stesen Auksiliari Stesen MARDI Cameron Highlands", "lat": 4.4719, "lng": 101.3853 },
    { "name": "Stesen Auksiliari Pusat Pertanian Teluk Bharu", "lat": 3.9631, "lng": 100.9575 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Titi Serong", "lat": 5.0681, "lng": 100.4686 },
    { "name": "Stesen Auksiliari Pusat Pertanian Lekir", "lat": 4.1408, "lng": 100.7417 },
    { "name": "Stesen Auksiliari Stesen Penyelidikan Pertanian FELDA Selama", "lat": 5.2289, "lng": 100.6869 },
    { "name": "Stesen Auksiliari MARDI Bagan Datoh", "lat": 3.8867, "lng": 100.8358 },
    { "name": "Stesen Auksiliari Loji Air Sultan Idris II", "lat": 4.0200, "lng": 101.0267 },
    { "name": "Stesen Auksiliari SMK Seri Perak", "lat": 4.0211, "lng": 101.0089 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Slim River", "lat": 3.8342, "lng": 101.4011 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Sultan Tajul Ariffin", "lat": 4.9389, "lng": 100.7817 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Dr. Burhanuddin", "lat": 4.8469, "lng": 100.7417 },
    { "name": "Stesen Auksiliari Sek. Keb. Tapah", "lat": 4.1925, "lng": 101.2608 },
    { "name": "Stesen Auksiliari SM Teknik Kompleks Pertanian Lenggong", "lat": 5.0933, "lng": 100.9639 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Pangkor", "lat": 4.2250, "lng": 100.5658 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Gunung Semanggol", "lat": 5.0211, "lng": 100.6417 },
    { "name": "Stesen Auksiliari Klinik Desa Padang Rengas", "lat": 4.7778, "lng": 100.8528 },
    { "name": "Stesen Auksiliari Hospital Baling", "lat": 5.6792, "lng": 100.9167 },
    { "name": "Stesen Auksiliari Loji Air Parit Buntar", "lat": 5.1228, "lng": 100.4883 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Tapah", "lat": 4.1983, "lng": 101.2589 },
    { "name": "Stesen Auksiliari Stesen MARDI Kuala Kangsar", "lat": 4.7578, "lng": 100.9317 },
    { "name": "Stesen Auksiliari Sek. Keb. Sungai Siput (U)", "lat": 4.8197, "lng": 101.0717 },
    { "name": "Stesen Auksiliari Sek. Keb. Sri Adika Raja", "lat": 5.4267, "lng": 101.1278 },
    { "name": "Stesen Auksiliari Sek. Keb. Felda Besout 1", "lat": 3.7314, "lng": 101.2828 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Sungai Sumun", "lat": 3.8828, "lng": 100.8600 },
    { "name": "Stesen Auksiliari Pusat Pertanian Seri Manjung", "lat": 4.1856, "lng": 100.6653 },
    { "name": "Stesen Auksiliari Stesen MARDI Jeram", "lat": 3.2383, "lng": 101.3789 },
    { "name": "Stesen Auksiliari Stesen MARDI Serdang", "lat": 2.9981, "lng": 101.7019 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Telok Datok", "lat": 2.8108, "lng": 101.4933 },
    { "name": "Stesen Auksiliari Stesen MARDI Tanjung Karang", "lat": 3.4686, "lng": 101.1578 },
    { "name": "Stesen Auksiliari Kompleks Pertanian Sungai Leman", "lat": 3.5606, "lng": 101.0803 },
    { "name": "Stesen Auksiliari Sek. Keb. Sungai Binjai", "lat": 3.0903, "lng": 101.4422 },
    { "name": "Stesen Auksiliari Pusat Pengeluaran Benih Pertanian Cheras", "lat": 3.0378, "lng": 101.7619 },
    { "name": "Stesen Auksiliari Loji Air Rantau Panjang", "lat": 3.2981, "lng": 101.4447 },
    { "name": "Stesen Auksiliari Hospital Kuala Kubu Bharu", "lat": 3.5644, "lng": 101.6508 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Sungai Besar", "lat": 3.6706, "lng": 100.9889 },
    { "name": "Stesen Auksiliari Loji Air Semenyih", "lat": 2.9242, "lng": 101.8389 },
    { "name": "Stesen Auksiliari SM Teknik Sepang", "lat": 2.8228, "lng": 101.7408 },
    { "name": "Stesen Auksiliari Stesen MARDI Klang", "lat": 3.0039, "lng": 101.4011 },
    { "name": "Stesen Auksiliari Loji Air Sungai Bernam", "lat": 3.6800, "lng": 101.3700 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Sungai Batu", "lat": 3.2667, "lng": 101.6833 },
    { "name": "Stesen Auksiliari Sek. Keb. Sungai Pelalek", "lat": 3.3931, "lng": 101.2725 },
    { "name": "Stesen Auksiliari Sek. Keb. Salak", "lat": 2.7844, "lng": 101.7333 },
    { "name": "Stesen Auksiliari SM Sains Hulu Selangor", "lat": 3.4475, "lng": 101.6703 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Kepong", "lat": 3.2294, "lng": 101.6367 },
    { "name": "Stesen Auksiliari Sek. Keb. Bukit Badong", "lat": 3.3131, "lng": 101.4117 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Sungai Langat", "lat": 3.0806, "lng": 101.7878 },
    { "name": "Stesen Auksiliari Hospital Sabak Bernam", "lat": 3.7667, "lng": 100.9883 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Banting", "lat": 2.8089, "lng": 101.5033 },
    { "name": "Stesen Auksiliari Stesen MARDI Kuala Linggi (Selangor)", "lat": 2.3822, "lng": 102.0169 },
    { "name": "Stesen Auksiliari Sek. Keb. Sungai Rawang", "lat": 2.6289, "lng": 101.7061 },
    { "name": "Stesen Auksiliari SK Sungai Pelek", "lat": 2.6428, "lng": 101.7161 },
    { "name": "Stesen Auksiliari SK Dengkil", "lat": 2.8592, "lng": 101.6811 },
    { "name": "Stesen Auksiliari SK Sungai Choh", "lat": 3.3278, "lng": 101.5739 },
    { "name": "Stesen Auksiliari SAM Bandar Baru Salak Tinggi", "lat": 2.8125, "lng": 101.7358 },
    { "name": "Stesen Auksiliari SM Sains Kuala Selangor", "lat": 3.3228, "lng": 101.2728 },
    { "name": "Stesen Auksiliari SK Berendam", "lat": 3.5283, "lng": 101.3267 },
    { "name": "Stesen Auksiliari Pusat Pertanian Kemasik", "lat": 4.4172, "lng": 103.4561 },
    { "name": "Stesen Auksiliari Stesen MARDI Jerangau", "lat": 4.8361, "lng": 103.2081 },
    { "name": "Stesen Auksiliari Pusat Pertanian Ajil", "lat": 5.0803, "lng": 103.0867 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Chalok", "lat": 5.4192, "lng": 102.8228 },
    { "name": "Stesen Auksiliari Pusat Pertanian Pelagat", "lat": 5.7289, "lng": 102.5028 },
    { "name": "Stesen Auksiliari Hospital Besut", "lat": 5.7539, "lng": 102.5528 },
    { "name": "Stesen Auksiliari Kolej Vokasional Wakaf Tembusu", "lat": 5.3781, "lng": 103.0850 },
    { "name": "Stesen Auksiliari Sek. Men. Sains Dungun", "lat": 4.7303, "lng": 103.4189 },
    { "name": "Stesen Auksiliari SK Pasir Gajah", "lat": 4.2411, "lng": 103.2953 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Paya Datok", "lat": 5.5900, "lng": 102.4836 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Marang", "lat": 5.2028, "lng": 103.2072 },
    { "name": "Stesen Auksiliari SK LKTP Belara", "lat": 5.2631, "lng": 103.0039 },
    { "name": "Stesen Auksiliari Kompleks Pertanian Sungai Baging", "lat": 4.0722, "lng": 103.3889 },
    { "name": "Stesen Auksiliari MARDI Muadzam Shah", "lat": 3.0642, "lng": 103.0853 },
    { "name": "Stesen Auksiliari Loji Air Chini", "lat": 3.3242, "lng": 102.8794 },
    { "name": "Stesen Auksiliari Pusat Pertanian Bukit Rokan", "lat": 2.5083, "lng": 102.4283 },
    { "name": "Stesen Auksiliari Loji Air Mempaga", "lat": 3.5358, "lng": 101.9961 },
    { "name": "Stesen Auksiliari Sek. Men. Keb. Triang 3", "lat": 3.1672, "lng": 102.3958 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Chenor", "lat": 3.4867, "lng": 102.5925 },
    { "name": "Stesen Auksiliari Loji Rawatan Air Gali", "lat": 3.8631, "lng": 101.8883 },
    { "name": "Stesen Auksiliari Pusat Latihan Pertanian Inderapura", "lat": 3.7547, "lng": 103.2503 },
    { "name": "Stesen Auksiliari Kompleks Pertanian Teluk Cempedak", "lat": 3.8094, "lng": 103.3711 },
    { "name": "Stesen Auksiliari Sek. Keb. Sungai Soi", "lat": 3.7381, "lng": 103.3236 },
    { "name": "Stesen Auksiliari Sek. Keb. Lepar", "lat": 3.6331, "lng": 102.9367 },
    { "name": "Stesen Auksiliari Pusat Pertanian Sungai Bedaun", "lat": 5.2639, "lng": 115.2281 },
    { "name": "Stesen Auksiliari Stesen MARDI Cameron Highlands (Labuan)", "lat": 5.2833, "lng": 115.2333 },
    { "name": "Stesen Auksiliari Stesen Pertanian Merotai", "lat": 4.3853, "lng": 117.8286 },
    { "name": "Stesen Auksiliari Stesen Pertanian Quoin Hill", "lat": 4.4172, "lng": 118.0247 },
    { "name": "Stesen Auksiliari Stesen Pertanian Lahad Datu", "lat": 5.0311, "lng": 118.3183 },
    { "name": "Stesen Auksiliari Stesen Pertanian Telupid", "lat": 5.6264, "lng": 117.1264 },
    { "name": "Stesen Auksiliari Stesen Pertanian Ulu Dusun", "lat": 5.7828, "lng": 117.9547 },
    { "name": "Stesen Auksiliari Stesen Pertanian Kota Belud", "lat": 6.3536, "lng": 116.4283 },
    { "name": "Stesen Auksiliari Stesen Pertanian Tenom", "lat": 5.1228, "lng": 115.9458 },
    { "name": "Stesen Auksiliari Stesen Pertanian Tuaran", "lat": 6.1772, "lng": 116.2306 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Beaufort", "lat": 5.3464, "lng": 115.7489 },
    { "name": "Stesen Auksiliari Stesen Pertanian Papar", "lat": 5.7336, "lng": 115.9328 },
    { "name": "Stesen Auksiliari Stesen Pertanian Kundasang", "lat": 5.9867, "lng": 116.5786 },
    { "name": "Stesen Auksiliari Stesen Pertanian Lagud Seberang", "lat": 5.0883, "lng": 115.9228 },
    { "name": "Stesen Auksiliari Stesen Pertanian Mengattal", "lat": 6.0236, "lng": 116.1558 },
    { "name": "Stesen Auksiliari Stesen Pertanian Sandakan", "lat": 5.8458, "lng": 118.0608 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Keningau", "lat": 5.3386, "lng": 116.1583 },
    { "name": "Stesen Auksiliari Stesen Pertanian Kota Marudu", "lat": 6.4950, "lng": 116.7686 },
    { "name": "Stesen Auksiliari Stesen Penyelidikan MARDI Saratok", "lat": 1.7483, "lng": 111.3411 },
    { "name": "Stesen Auksiliari Pusat Penyelidikan Pertanian Semenggok", "lat": 1.3986, "lng": 110.3208 },
    { "name": "Stesen Auksiliari Stesen Pertanian Tarat", "lat": 1.2094, "lng": 110.4578 },
    { "name": "Stesen Auksiliari Stesen Pertanian Kabuloh", "lat": 4.1200, "lng": 113.8867 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Limbang", "lat": 4.7522, "lng": 115.0089 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Lawas", "lat": 4.8569, "lng": 115.4028 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Kapit", "lat": 2.0161, "lng": 112.9389 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Marudi", "lat": 4.1803, "lng": 114.3236 },
    { "name": "Stesen Auksiliari Stesen Pertanian Simunjan", "lat": 1.3986, "lng": 110.7850 },
    { "name": "Stesen Auksiliari Stesen Pertanian Bau", "lat": 1.4136, "lng": 110.1586 },
    { "name": "Stesen Auksiliari Stesen Pertanian Lundu", "lat": 1.6739, "lng": 109.8519 },
    { "name": "Stesen Auksiliari Stesen Pertanian Serian", "lat": 1.1719, "lng": 110.5694 },
    { "name": "Stesen Auksiliari Stesen Pertanian Lubok Antu", "lat": 1.0408, "lng": 111.8328 },
    { "name": "Stesen Auksiliari Stesen Pertanian Betong", "lat": 1.4111, "lng": 111.5283 },
    { "name": "Stesen Auksiliari Stesen Pertanian Mukah", "lat": 2.8895, "lng": 112.0911 },
    { "name": "Stesen Auksiliari Stesen Pertanian Kanowit", "lat": 2.1039, "lng": 112.1558 },
    { "name": "Stesen Auksiliari Stesen Pertanian Bintulu", "lat": 3.2081, "lng": 113.0886 },
    { "name": "Stesen Auksiliari Stesen Pertanian Tatau", "lat": 2.8767, "lng": 112.8600 },
    { "name": "Stesen Auksiliari Stesen Pertanian Belaga", "lat": 2.7039, "lng": 113.7808 },
    { "name": "Stesen Auksiliari Stesen Pertanian Sundar", "lat": 4.8867, "lng": 115.2039 },
    { "name": "Stesen Auksiliari Stesen Pertanian Bario", "lat": 3.7533, "lng": 115.4528 },
    { "name": "Stesen Auksiliari Pejabat Pertanian Dalat", "lat": 2.7417, "lng": 111.9472 },
    { "name": "Stesen Auksiliari Stesen Pertanian Sebauh", "lat": 3.1111, "lng": 113.2625 },
    { "name": "Stesen Auksiliari Stesen MARDI Bintulu", "lat": 3.2167, "lng": 113.0833 },
    { "name": "Stesen Auksiliari Stesen MARDI Sessang", "lat": 1.9167, "lng": 111.2167 }
];

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

    // 💡 LOGIK PETA KEBANGSAAN LEAFLET (STESEN UTAMA, AUKISILIARI & KOTAK CARIAN)
    if (text.includes('id="leafletMap"')) {
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

                const logs = JSON.parse(localStorage.getItem('chatLogs')) || [];
                const userMsg = logs.reverse().find(l => l.sender === 'user')?.message.toLowerCase() || "";
                
                let mapCenter = [4.2105, 101.9758]; 
                let zoomLevel = 6; 

                if (userMsg.includes("langkawi")) { mapCenter = [6.3333, 99.7333]; zoomLevel = 11; }
                else if (userMsg.includes("sabah") || userMsg.includes("tawau") || userMsg.includes("sandakan") || userMsg.includes("kudat") || userMsg.includes("keningau") || userMsg.includes("ranau") || userMsg.includes("kota kinabalu")) { mapCenter = [5.8, 117.0]; zoomLevel = 8; }
                else if (userMsg.includes("sarawak") || userMsg.includes("kuching") || userMsg.includes("miri") || userMsg.includes("bintulu") || userMsg.includes("sibu") || userMsg.includes("kapit") || userMsg.includes("mulu") || userMsg.includes("limbang") || userMsg.includes("mukah")) { mapCenter = [2.5, 113.0]; zoomLevel = 7; }
                else if (userMsg.includes("utara") || userMsg.includes("kedah") || userMsg.includes("penang") || userMsg.includes("pinang") || userMsg.includes("perlis") || userMsg.includes("alor setar") || userMsg.includes("butterworth") || userMsg.includes("chuping")) { mapCenter = [6.0, 100.4]; zoomLevel = 8; }
                else if (userMsg.includes("johor") || userMsg.includes("senai") || userMsg.includes("kluang") || userMsg.includes("batu pahat") || userMsg.includes("mersing")) { mapCenter = [1.9, 103.3]; zoomLevel = 8; }
                else if (userMsg.includes("pantai timur") || userMsg.includes("kelantan") || userMsg.includes("terengganu") || userMsg.includes("bharu") || userMsg.includes("krai") || userMsg.includes("gong kedak") || userMsg.includes("kerteh")) { mapCenter = [5.5, 102.8]; zoomLevel = 8; }
                else if (userMsg.includes("perak") || userMsg.includes("ipoh") || userMsg.includes("sitiawan") || userMsg.includes("lubok merbau")) { mapCenter = [4.6, 101.0]; zoomLevel = 8; }
                else if (userMsg.includes("pahang") || userMsg.includes("kuantan") || userMsg.includes("cameron") || userMsg.includes("batu embun") || userMsg.includes("muadzam") || userMsg.includes("temerloh")) { mapCenter = [3.8, 102.5]; zoomLevel = 8; }
                else if (userMsg.includes("selangor") || userMsg.includes("kl") || userMsg.includes("kuala lumpur") || userMsg.includes("subang") || userMsg.includes("sepang") || userMsg.includes("klia")) { mapCenter = [3.1306, 101.5525]; zoomLevel = 9; }
                else if (userMsg.includes("melaka") || userMsg.includes("negeri sembilan") || userMsg.includes("pilah")) { mapCenter = [2.5, 102.2]; zoomLevel = 9; }

                // 1. Bina Peta Leaflet
                const map = L.map(uniqueMapId).setView(mapCenter, zoomLevel);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(map);

                // Array simpan rujukan semua marker untuk carian
                const allMarkers = [];

                // 🔵 2. Masukkan Stesen UTAMA (Bulatan Biru)
                stations.forEach(st => {
                    const marker = L.circleMarker([st.lat, st.lng], {
                        radius: 6, fillColor: "#0056b3", color: "#ffffff", weight: 2, opacity: 1, fillOpacity: 0.9
                    }).addTo(map)
                        .bindPopup(`<b>${st.name}</b><br><span style="color:blue;"><b>Kategori: Stesen Utama</b></span><br>Negeri: ${st.state ? st.state.toUpperCase() : 'MALAYSIA'}`);
                    
                    allMarkers.push({ name: st.name.toLowerCase(), marker: marker, lat: st.lat, lng: st.lng });
                });

                // 🔴 3. Masukkan Stesen AUKISILIARI (Bulatan Merah)
                auxiliaryStations.forEach(st => {
                    const marker = L.circleMarker([st.lat, st.lng], {
                        radius: 4, fillColor: "#dc3545", color: "#ffffff", weight: 1, opacity: 1, fillOpacity: 0.8
                    }).addTo(map)
                        .bindPopup(`<b>${st.name}</b><br><span style="color:red;"><b>Kategori: Stesen Auksiliari</b></span>`);
                    
                    allMarkers.push({ name: st.name.toLowerCase(), marker: marker, lat: st.lat, lng: st.lng });
                });

                // 🔍 4. FUNGSI CARIAN NAMA STESEN DALAM PETA
                const mapContainer = document.getElementById(uniqueMapId);
                const searchInput = mapContainer ? mapContainer.parentElement.querySelector('.map-search-input') : null;

                if (searchInput) {
                    searchInput.addEventListener('input', function () {
                        const query = this.value.toLowerCase().trim();
                        if (query.length < 2) return;

                        // Cari stesen pertama yang sepadan
                        const found = allMarkers.find(item => item.name.includes(query));
                        if (found) {
                            map.flyTo([found.lat, found.lng], 12, { duration: 1.2 });
                            found.marker.openPopup();
                        }
                    });
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
            <button class="lang-btn" onclick="quickAsk('Tempoh proses data', event)">Tempoh Proses Data</button>
            <button class="lang-btn" onclick="quickAsk('Jenis format data', event)">Jenis & Format Data</button>
            <button class="lang-btn" onclick="quickAsk('Pengecualian yuran & Diskaun pelajar', event)">Pengecualian Fi Pelajar</button>
            <button class="lang-btn" onclick="quickAsk('Prosedur & Dokumen sokongan', event)">Prosedur & Dokumen</button>
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
    // 🔐 Kata laluan khas pegawai untuk muat turun log
    const ADMIN_PASSWORD = "bukanuser678"; 

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
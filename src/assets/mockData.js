// Smart Mahalla (Mening Mahallam) - Markazlashtirilgan Ma'lumotlar Bazasining Mock Moduli

export const MAHALLA_INFO = {
  name: "Mening Mahallam",
  subdistrict: "Toshkent shahar, Yunusobod tumani, 7-mavze",
  established: "1994",
  totalResidents: 12450,
  households: 3120,
  youthCount: 4200,
  satisfactionRate: 98.4,
  avgResolutionTime: "4.2 soat",
  resolvedIssuesCount: 1420,
  activeCitizensCount: 3850,
  greenProjectsCount: 28,
  streets: [
    "Amir Temur shoh ko'chasi",
    "Alisher Navoiy ko'chasi",
    "G'afur G'ulom ko'chasi",
    "Ibn Sino ko'chasi",
    "Bobur ko'chasi",
    "Zulfiya ko'chasi",
    "Abdulla Qodiriy ko'chasi",
    "Chilonzor ko'chasi"
  ],
  workingHours: "Dushanba - Shanba: 08:30 - 18:30",
  address: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi 45-uy",
  telegramBot: "@MeningMahallam_bot",
  phone: "+998 71 200-11-22"
};

export const INITIAL_UTILITIES = [
  {
    id: "electric",
    title: "Elektr energiyasi",
    status: "Online",
    statusText: "Tarmoq barqaror ishlamoqda. Uzilishlar kutilmayapti.",
    type: "online",
    level: 98,
    lastUpdate: "Bugun, 14:30",
    color: "#10B981"
  },
  {
    id: "water",
    title: "Suv ta'minoti",
    status: "Normal bosim",
    statusText: "Markaziy nasos stansiyasida bosim me'yorda.",
    type: "online",
    level: 92,
    lastUpdate: "Bugun, 13:45",
    color: "#06B6D4"
  },
  {
    id: "gas",
    title: "Tabiiy gaz",
    status: "Ta'mirlash",
    statusText: "4-ko'chada profilaktika ishlari. Tiklanish: 18:00",
    type: "maintenance",
    level: 65,
    lastUpdate: "Bugun, 11:20",
    color: "#F59E0B"
  }
];

export const INITIAL_NEWS = [
  {
    id: 1,
    title: "Kuzgi Umumxalq Hashari",
    category: "HASHAR",
    categoryType: "hashar",
    date: "24 Okt",
    year: "2024",
    readTime: "3 daqiqa",
    excerpt: "Mahallamiz obodonchiligi uchun barchani shanba kungi umumxalq hashariga taklif qilamiz. Asosiy e'tibor bolalar maydonchalari va ariqlarni tozalashga qaratiladi.",
    fullContent: "Hurmatli mahalla ahlari! Joriy yilning 24-oktyabr shanba kuni mahallamiz bo'ylab keng ko'lamli 'Yashil Makon' umumxalq obodonlashtirish hashari bo'lib o'tadi. Barcha xonadon egalari, yoshlar va faollarni o'z uylari atrofi, ko'chalar va xiyobonlarni tartibga keltirish, 200 dan ortiq manzarali va mevali daraxt ko'chatlarini ekish aksiyasida faol ishtirok etishga chaqiramiz. Hashar ishtirokchilari uchun issiq choy va palov tashkil etiladi.",
    image: "/src/assets/images/news-hashar.jpg",
    views: 432,
    author: "Mahalla Kengashi"
  },
  {
    id: 2,
    title: "Ichimlik Suvi Tarmog'ini Yangilash",
    category: "KOMMUNAL",
    categoryType: "kommunal",
    date: "28 Okt",
    year: "2024",
    readTime: "4 daqiqa",
    excerpt: "Navoiy ko'chasidagi eski ichimlik suvi quvurlarini yangisiga almashtirish ishlari boshlanmoqda. Shu munosabat bilan vaqtinchalik cheklovlar kiritiladi.",
    fullContent: "Mahallamizning Alisher Navoiy va Ibn Sino ko'chalarida 35 yildan beri xizmat qilayotgan markaziy suv quvurlarini yangi polietilen yuqori bosimli quvurlarga almashtirish loyihasi boshlandi. Ishlar 3 kun davom etadi. Suv ta'minotida qisqa muddatli uzilishlar bo'lganida mahalla guzari orqali maxsus suv tashuvchi mashinalar bepul xizmat ko'rsatadi.",
    image: "/src/assets/images/news-water.jpg",
    views: 521,
    author: "Suv Ta'minoti Korxonasi"
  },
  {
    id: 3,
    title: "Oqsoqollar Kengashi Yig'ilishi",
    category: "YIG'ILISH",
    categoryType: "meeting",
    date: "02 Noy",
    year: "2024",
    readTime: "2 daqiqa",
    excerpt: "Mahalla fuqarolar yig'inida qishki mavsumga tayyorgarlik bo'yicha oqsoqollar kengashining navbatdagi muhim maslahat yig'ilishi o'tkaziladi.",
    fullContent: "2-noyabr kuni soat 10:00 da Mahalla Markazida Oqsoqollar va ko'cha boshilari kengashi yig'iladi. Kun tartibida: kam ta'minlangan oilalarni qish mavsumiga tayyorlash, isitish tizimlarini tekshirish, yangi ko'cha chiroqlari o'rnatilgan hududlarni monitoring qilish va jamoat tartibini saqlash masalalari ko'rib chiqiladi.",
    image: "/src/assets/images/news-meeting.jpg",
    views: 310,
    author: "Mahalla Kotibiyati"
  },
  {
    id: 4,
    title: "Mahalla Shaxmat Turniri",
    category: "MADANIY",
    categoryType: "cultural",
    date: "04 Noy",
    year: "2024",
    readTime: "3 daqiqa",
    excerpt: "Mahallamiz yoshlari va keksalar o'rtasida shaxmat bo'yicha 'Mahalla Kubogi' musobaqasi o'tkaziladi. G'oliblarni qimmatbaho sovg'alar kutmoqda.",
    fullContent: "Mahalla Yoshlar yetakchisi tashabbusi bilan 4-noyabr kuni Mahalla bog'ida an'anaviy 'Zakovat va Shaxmat' turniri tashkil etiladi. Musobaqa 3 ta yosh toifasida (bolalar, o'smirlar va keksalar) o'tkaziladi. 1-, 2- va 3-o'rin sohiblariga noutbuk, planshet va shaxmat to'plamlari taqdim etiladi. Ro'yxatdan o'tish Telegram orqali.",
    image: "/src/assets/images/news-chess.jpg",
    views: 680,
    author: "Yoshlar Yetakchisi"
  },
  {
    id: 5,
    title: "Obodonlashtirish Rejasi Muhokamasi",
    category: "YIG'ILISH",
    categoryType: "meeting",
    date: "08 Noy",
    year: "2024",
    readTime: "5 daqiqa",
    excerpt: "Kelgusi yil uchun mahallamizni obodonlashtirish, yangi bolalar maydonchalari qurish va yashil xiyobonlar yaratish loyihasi jamoatchilikka taqdim etildi.",
    fullContent: "Tuman hokimligi va mahalla faollari hamkorligida 2025-yilga mo'ljallangan 'Tashabbusli Byudjet' loyihasi doirasida 3 ta yangi 'Workout' sport maydonchasi, 2 ta zamonaviy bolalar o'yingohi va 1.5 km piyodalar ekoyo'lagi loyihasi taqdimoti bo'lib o'tadi. Fuqarolar o'z taklif va ovozlarini saytimiz orqali bildirishi mumkin.",
    image: "/src/assets/images/news-greenery.jpg",
    views: 450,
    author: "Hokim Yordamchisi"
  },
  {
    id: 6,
    title: "Yangi Ko'cha Chiroqlari O'rnatish",
    category: "KOMMUNAL",
    categoryType: "kommunal",
    date: "12 Noy",
    year: "2024",
    readTime: "3 daqiqa",
    excerpt: "Navoiy va Abdulla Qodiriy ko'chalarida zamonaviy, energiya tejamkor quyosh panelli ko'cha chiroqlari o'rnatish ishlari muvaffaqiyatli yakunlandi.",
    fullContent: "Aholi murojaatlariga asosan mahallamizning yoritilmagan 6 ta berk ko'chasi va asosiy yo'l bo'ylariga 48 ta zamonaviy 'Smart LED' chiroqlari o'rnatildi. Ushbu chiroqlar quyosh energiyasida ishlaydi va harakat datchiklari bilan jihozlangan bo'lib, tungi vaqtda xavfsizlikni to'liq ta'minlaydi.",
    image: "/src/assets/images/news-lights.jpg",
    views: 890,
    author: "Obodonlashtirish Boshqarmasi"
  }
];

export const LEADERS = [
  {
    id: 1,
    name: "Rustamov Alisher",
    role: "MAHALLA RAISI",
    phone: "+998 71 200-11-22",
    telegram: "@rais_rustamov",
    receptionHours: "Dushanba - Juma, 09:00 - 12:00",
    bio: "Mahalla boshqaruvi va fuqarolar farovonligi bo'yicha 10 yillik tajribaga ega rahbar.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Karimov Sardor",
    role: "PROFILAKTIKA INSPEKTORI",
    phone: "+998 90 123-45-67",
    telegram: "@inspektor_karimov",
    receptionHours: "Har kuni, 24/7 xizmatda",
    bio: "Jamoat xavfsizligi, tinchlik va huquqbuzarliklarning oldini olish mas'uli.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Toshpo'latov Aziz",
    role: "YOSHLAR YETAKCHISI",
    phone: "+998 93 555-77-88",
    telegram: "@aziz_yoshlar",
    receptionHours: "Seshanba - Shanba, 14:00 - 18:00",
    bio: "Yoshlar bandligi, sport, IT to'garaklari va startap loyihalari koordinatori.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Abdullayeva Nargiza",
    role: "XOTIN-QIZLAR FAOLI",
    phone: "+998 94 999-11-22",
    telegram: "@nargiza_faol",
    receptionHours: "Dushanba - Chorshanba, 10:00 - 16:00",
    bio: "Oilalarni mustahkamlash, xotin-qizlar tadbirkorligi va ijtimoiy yordam dasturlari rahbari.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Jalolov Baxtiyor",
    role: "HOKIM YORDAMCHISI",
    phone: "+998 97 777-33-44",
    telegram: "@baxtiyor_tadbirkor",
    receptionHours: "Juma, 09:00 - 18:00",
    bio: "Kambag'allikni qisqartirish, subsidiya va imtiyozli kreditlar ajratish bo'yicha mas'ul.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_MASTERS = [
  {
    id: 1,
    name: "Alisher S.",
    specialty: "Santexnik",
    rating: 4.9,
    jobsCount: 142,
    phone: "+998 90 321-11-22",
    description: "Quvurlar, kranlar, vanna va isitish qozonlarini yuqori sifatda o'rnatish va ta'mirlash.",
    experience: "8 yil tajriba",
    available: true,
    avatar: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Bobir T.",
    specialty: "Elektrik",
    rating: 4.7,
    jobsCount: 98,
    phone: "+998 91 654-33-11",
    description: "Kabel montaji, qisqa tutashuvlarni bartaraf etish, avtomatlar va hisoblagichlar.",
    experience: "6 yil tajriba",
    available: true,
    avatar: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Malika R.",
    specialty: "Repetitor (Ingliz tili & Matematika)",
    rating: 5.0,
    jobsCount: 64,
    phone: "+998 93 888-99-00",
    description: "Maktab o'quvchilari va abituriyentlar uchun individual va guruh darslari (IELTS 8.0).",
    experience: "5 yil tajriba",
    available: true,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Dilnoza K.",
    specialty: "Hamshira (Uyda tibbiy xizmat)",
    rating: 4.9,
    jobsCount: 85,
    phone: "+998 94 444-55-66",
    description: "Shifokor ko'rsatmasi bo'yicha ukollar, tomchilar (kapelnitsa) va qon bosimini o'lchash.",
    experience: "12 yil tajriba",
    available: true,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Jamshid N.",
    specialty: "Duradgor / Mebel ta'miri",
    rating: 4.8,
    jobsCount: 110,
    phone: "+998 90 777-88-99",
    description: "Eshik-romlar, oshxona va yotoqxona mebellarini yig'ish, restavratsiya va qulflar.",
    experience: "10 yil tajriba",
    available: true,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_REQUESTS = [
  {
    id: "#1042",
    numericId: 1042,
    title: "Navoiy ko'chasida chiroq o'chgan",
    category: "Ko'cha Chiroqlari",
    categoryType: "lighting",
    date: "14 Okt, 09:15",
    status: "Ko'rib chiqilmoqda",
    statusType: "pending",
    address: "Alisher Navoiy ko'chasi, 24-uy qarshisi",
    author: "Akmal Karimov",
    phone: "+998 90 111-22-33",
    description: "Tungi vaqtda 3 ta tayanchdagi quyosh panelli chiroqlar yonmayapti. Hudud qorong'i bo'lib qolgan.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    urgency: "Shoshilinch",
    lat: 41.3111,
    lng: 69.2797
  },
  {
    id: "#1041",
    numericId: 1041,
    title: "Suv quvuridan chakki o'tyapti",
    category: "Suv Muammosi",
    categoryType: "water",
    date: "13 Okt, 18:30",
    status: "Jarayonda",
    statusType: "in_progress",
    address: "Ibn Sino ko'chasi, 12-uy",
    author: "Zuhra Aliyeva",
    phone: "+998 93 444-55-66",
    description: "Magistral tarmoqqa ulanish joyidan suv sizib chiqib, yo'lni yuvib ketyapti.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    urgency: "Favqulodda",
    lat: 41.3125,
    lng: 69.2810
  },
  {
    id: "#1040",
    numericId: 1040,
    title: "Asfalt ta'miri bo'yicha taklif",
    category: "Yo'l Ta'miri",
    categoryType: "roads",
    date: "12 Okt, 10:00",
    status: "Bajarildi",
    statusType: "resolved",
    address: "Amir Temur shoh ko'chasi, 45-uy ichki yo'li",
    author: "Jasur Rahmonov",
    phone: "+998 97 777-00-11",
    description: "Chuqurliklar to'liq asfalt qoplamasi bilan yopildi va tekislandi.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
    urgency: "Oddiy",
    lat: 41.3140,
    lng: 69.2780
  },
  {
    id: "#1039",
    numericId: 1039,
    title: "Tom ta'miri bo'yicha",
    category: "Kommunal",
    categoryType: "roads",
    date: "12 Okt, 2024",
    status: "Jarayonda",
    statusType: "in_progress",
    address: "Amir Temur ko'chasi, 45-uy",
    author: "Botirbek Olimov",
    phone: "+998 91 222-33-44",
    description: "Ko'p qavatli uyning tom qismida yomg'ir suvi oqishi bartaraf etilmoqda.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80",
    urgency: "Shoshilinch",
    lat: 41.3150,
    lng: 69.2770
  },
  {
    id: "#1038",
    numericId: 1038,
    title: "Ma'lumotnoma olish",
    category: "Hujjat",
    categoryType: "docs",
    date: "10 Okt, 2024",
    status: "Hal etilgan",
    statusType: "resolved",
    address: "Nizomiy mahallasi, 8-uy",
    author: "Dilshod Fayzullayev",
    phone: "+998 90 999-88-77",
    description: "Yashash joyidan ma'lumotnoma elektron shaklda tasdiqlab berildi.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
    urgency: "Oddiy",
    lat: 41.3160,
    lng: 69.2790
  },
  {
    id: "#1037",
    numericId: 1037,
    title: "Suv quvuri nosozligi",
    category: "Suv",
    categoryType: "water",
    date: "08 Okt, 2024",
    status: "Ko'rib chiqilmoqda",
    statusType: "pending",
    address: "Istiqlol ko'chasi, 12-uy",
    author: "Nodira Qosimova",
    phone: "+998 94 333-22-11",
    description: "Kran bosimi pasayib ketgan va loyqa suv kelmoqda.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80",
    urgency: "Shoshilinch",
    lat: 41.3100,
    lng: 69.2800
  }
];

export const LEADERBOARD_CITIZENS = [
  {
    rank: 1,
    name: "Azizbek Rahimov",
    title: "Mahalla Qahramoni",
    points: 1450,
    reportsCount: 24,
    votesCount: 312,
    badge: "Eco-Aktivist 👑",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    medal: "gold"
  },
  {
    rank: 2,
    name: "Shahnoza Qodirova",
    title: "Yashil Mahalla Himoyachisi",
    points: 1280,
    reportsCount: 19,
    votesCount: 245,
    badge: "Tashabbuskor 🥈",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    medal: "silver"
  },
  {
    rank: 3,
    name: "Farrux Ergashev",
    title: "Tungi Kuzatuvchi",
    points: 1120,
    reportsCount: 17,
    votesCount: 198,
    badge: "Master Kuzatuvchi 🥉",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
    medal: "bronze"
  },
  {
    rank: 4,
    name: "Gulbahor Usmonova",
    title: "Faol Jamoatchi",
    points: 950,
    reportsCount: 14,
    votesCount: 156,
    badge: "Tashabbuskor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
  },
  {
    rank: 5,
    name: "Jasur Bekmurodov",
    title: "Obodonlashtirish Yetakchisi",
    points: 890,
    reportsCount: 12,
    votesCount: 142,
    badge: "Eco-Aktivist",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=80"
  },
  {
    rank: 6,
    name: "Nigora Shokirova",
    title: "G'amxo'r Qo'shni",
    points: 820,
    reportsCount: 11,
    votesCount: 130,
    badge: "Faol Fuqaro",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
  }
];

export const REWARDS = [
  {
    id: 1,
    title: "Nomli Daraxt Ekish Sertifikati",
    points: 500,
    icon: "TreePine",
    description: "Mahalla markaziy xiyobonida o'z nomingiz yozilgan manzarali chinor daraxti ekiladi."
  },
  {
    id: 2,
    title: "Jamoat Transporti Oylik Yo'l Chiptasi",
    points: 800,
    icon: "Bus",
    description: "Toshkent shahridagi barcha avtobus va metro yo'nalishlarida 1 oylik bepul qatnash kartasi."
  },
  {
    id: 3,
    title: "Mahalla Raisi Faxriy Yorlig'i & Sovg'a",
    points: 1200,
    icon: "Award",
    description: "Yil yakunida tantanali tadbirda rasmiy sertifikat va qimmatbaho esdalik sovg'asi."
  },
  {
    id: 4,
    title: "Kitoblar To'plami & Wi-Fi Router",
    points: 1500,
    icon: "BookOpen",
    description: "Zamonaviy IT va badiiy adabiyotlar to'plami hamda yuqori tezlikdagi 5G Wi-Fi qurilmasi."
  }
];

export const EMERGENCY_CONTACTS = [
  { number: "103", title: "Tez Tibbiy Yordam", color: "#EF4444", icon: "Ambulance" },
  { number: "102", title: "Ichki Ishlar (Militsiya)", color: "#3B82F6", icon: "ShieldAlert" },
  { number: "101", title: "Yong'in Xavfsizligi", color: "#F97316", icon: "Flame" },
  { number: "104", title: "Gaz Ta'minoti Avariya", color: "#EAB308", icon: "Fuel" },
  { number: "1055", title: "Toshkent Shoshilinch Call-markaz", color: "#10B981", icon: "PhoneCall" }
];

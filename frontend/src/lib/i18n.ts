import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      app: { name: 'Warisan', tagline: 'Library of Human Skills' },
      nav: { home: 'Home', search: 'Search', submit: 'Submit Skill', map: 'Map', about: 'About', login: 'Login', register: 'Register', profile: 'Profile', logout: 'Logout' },
      home: { featured: 'Featured Skills', skillOfDay: 'Skill of the Day', categories: 'Browse Categories', latest: 'Latest Skills' },
      skill: { difficulty: 'Difficulty', learningTime: 'Learning Time', country: 'Country', language: 'Language', steps: 'Step-by-Step Instructions', related: 'Related Skills', versions: 'Version History', bookmark: 'Bookmark', share: 'Share', export: 'Export' },
      search: { placeholder: 'Search skills...', noResults: 'No skills found', filters: 'Filters' },
      auth: { loginTitle: 'Welcome Back', registerTitle: 'Join Warisan', email: 'Email', password: 'Password', name: 'Name', submit: 'Submit' },
      submit: { title: 'Submit a Skill', description: 'Share your knowledge with the world' },
      footer: { mission: 'Preserving and sharing practical human knowledge and traditional skills.' },
    },
  },
  ms: {
    translation: {
      app: { name: 'Warisan', tagline: 'Perpustakaan Kemahiran Manusia' },
      nav: { home: 'Utama', search: 'Cari', submit: 'Hantar Kemahiran', map: 'Peta', about: 'Tentang', login: 'Log Masuk', register: 'Daftar', profile: 'Profil', logout: 'Log Keluar' },
      home: { featured: 'Kemahiran Pilihan', skillOfDay: 'Kemahiran Hari Ini', categories: 'Lihat Kategori', latest: 'Kemahiran Terkini' },
      skill: { difficulty: 'Tahap Kesukaran', learningTime: 'Masa Pembelajaran', country: 'Negara', language: 'Bahasa', steps: 'Arahan Langkah demi Langkah', related: 'Kemahiran Berkaitan', versions: 'Sejarah Versi', bookmark: 'Penanda', share: 'Kongsi', export: 'Eksport' },
      search: { placeholder: 'Cari kemahiran...', noResults: 'Tiada kemahiran dijumpai', filters: 'Penapis' },
      auth: { loginTitle: 'Selamat Kembali', registerTitle: 'Sertai Warisan', email: 'E-mel', password: 'Kata Laluan', name: 'Nama', submit: 'Hantar' },
      submit: { title: 'Hantar Kemahiran', description: 'Kongsi pengetahuan anda dengan dunia' },
      footer: { mission: 'Memelihara dan berkongsi pengetahuan dan kemahiran tradisional manusia.' },
    },
  },
  id: {
    translation: {
      app: { name: 'Warisan', tagline: 'Perpustakaan Keterampilan Manusia' },
      nav: { home: 'Beranda', search: 'Cari', submit: 'Kirim Keterampilan', map: 'Peta', about: 'Tentang', login: 'Masuk', register: 'Daftar', profile: 'Profil', logout: 'Keluar' },
      home: { featured: 'Keterampilan Unggulan', skillOfDay: 'Keterampilan Hari Ini', categories: 'Jelajahi Kategori', latest: 'Keterampilan Terbaru' },
      skill: { difficulty: 'Tingkat Kesulitan', learningTime: 'Waktu Belajar', country: 'Negara', language: 'Bahasa', steps: 'Panduan Langkah demi Langkah', related: 'Keterampilan Terkait', versions: 'Riwayat Versi', bookmark: 'Penanda', share: 'Bagikan', export: 'Ekspor' },
      search: { placeholder: 'Cari keterampilan...', noResults: 'Tidak ada keterampilan ditemukan', filters: 'Filter' },
      auth: { loginTitle: 'Selamat Datang Kembali', registerTitle: 'Bergabung dengan Warisan', email: 'Email', password: 'Kata Sandi', name: 'Nama', submit: 'Kirim' },
      submit: { title: 'Kirim Keterampilan', description: 'Bagikan pengetahuan Anda dengan dunia' },
      footer: { mission: 'Melestarikan dan membagikan pengetahuan dan keterampilan tradisional manusia.' },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
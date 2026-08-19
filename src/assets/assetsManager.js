/**
 * ASSET ARCHITECTURE & PATH MANAGER (Senior Level)
 * 
 * Ushbu fayl barcha logotiplar va rasmlar yo'llarini (paths) bir joyda boshqaradi.
 * O'zingizning rasmlaringizni quyidagi papkalarga tashlab, shu yerdan ulab olishingiz mumkin:
 *  - Logotiplar uchun:  src/assets/logos/
 *  - Barcha rasmlar:   src/assets/images/
 */

// LOGOTIPLAR (O'zingizning logotipingizni src/assets/logo/ papkasiga tashlang)
export const ASSETS = {
  logos: {
    mainLogo: '/src/assets/logo/logo.png', // asosiy logo
    emblem: '/src/assets/logo/logo.png', // emblem sifatida ham xuddi shu
  },
  
  // Backgrounds and Textures
  backgrounds: {
    girih: '/src/assets/images/girih-pattern.jpg',
  },
  
  // Yangiliklar rasmlari (src/assets/images/news-1.jpg ...)
  news: {
    hashar: '/src/assets/images/news-hashar.jpg',
    water: '/src/assets/images/news-water.jpg',
    meeting: '/src/assets/images/news-meeting.jpg',
    chess: '/src/assets/images/news-chess.jpg',
    greenery: '/src/assets/images/news-greenery.jpg',
    lights: '/src/assets/images/news-lights.jpg',
  },

  // Rahbariyat portretlari (src/assets/images/leader-1.jpg ...)
  leaders: {
    rais: '/src/assets/images/leader-rais.jpg',
    inspektor: '/src/assets/images/leader-inspektor.jpg',
    yoshlar: '/src/assets/images/leader-yoshlar.jpg',
    xotinQizlar: '/src/assets/images/leader-xotin-qizlar.jpg',
    hokimYordamchisi: '/src/assets/images/leader-hokim.jpg',
  },

  // Mahalla Ustalari (src/assets/images/master-1.jpg ...)
  masters: {
    santexnik: '/src/assets/images/master-santexnik.jpg',
    elektrik: '/src/assets/images/master-elektrik.jpg',
    repetitor: '/src/assets/images/master-repetitor.jpg',
    hamshira: '/src/assets/images/master-hamshira.jpg',
    duradgor: '/src/assets/images/master-duradgor.jpg',
  },

  // Oldin va Keyin taqqoslash suratlari
  beforeAfter: {
    beforeRoad: '/src/assets/images/road-before.jpg',
    afterRoad: '/src/assets/images/road-after.jpg',
  }
};

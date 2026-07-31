/* Aytekin Mücevherat — paylaşımlı katalog + sepet/favori mağazası.
   Hem ana sayfa hem iç sayfalar bu dosyayı yükler. Global: window.AYTEKIN */
(function () {
  const CATEGORIES = [
    { slug: 'kolye',    name: 'Kolye',    tr: 'Kolyeler' },
    { slug: 'yuzuk',    name: 'Yüzük',    tr: 'Yüzükler' },
    { slug: 'bileklik', name: 'Bileklik', tr: 'Bileklikler' },
    { slug: 'kupe',     name: 'Küpe',     tr: 'Küpeler' }
  ];

  // slot = image-slot id (kullanıcı kendi fotoğrafını sürükler, kalıcı kalır)
  const PRODUCTS = [
    { id: 'kolye-mehtap',   cat: 'kolye', name: 'Mehtap Kolye',      price: 2450, old: 2890, tag: 'Yeni',
      material: '925 Ayar Gümüş', length: '45 cm', weight: '6,2 g', stone: 'Zirkon taş',
      desc: 'İnce zincir üzerine hilal formunda el işi sarkaç. Günlük kullanıma da özel günlere de uygun, zamansız bir parça.' },
    { id: 'kolye-inci',     cat: 'kolye', name: 'İnci Damla Kolye',  price: 1980, old: null, tag: null,
      material: '925 Ayar Gümüş', length: '42 cm', weight: '5,4 g', stone: 'Tatlısu incisi',
      desc: 'Tek damla tatlısu incisi ile sade ve zarif. Rodyum kaplama sayesinde kararmaya karşı dayanıklıdır.' },
    { id: 'kolye-harf',     cat: 'kolye', name: 'Harf Kolye (Kişiye Özel)', price: 1650, old: null, tag: 'Kişiye Özel',
      material: '925 Ayar Gümüş', length: '40-45 cm ayar', weight: '4,1 g', stone: '—',
      desc: 'İsminizin baş harfi ile üretilen kişiye özel kolye. Sipariş notunda harf belirtmeniz yeterli.' },
    { id: 'kolye-kalp',     cat: 'kolye', name: 'Kalp Madalyon',     price: 2180, old: null, tag: null,
      material: '925 Ayar Gümüş', length: '45 cm', weight: '7,0 g', stone: '—',
      desc: 'Açılabilir kalp madalyon; içine iki adet fotoğraf yerleştirilebilir. Sevdiklerinize anlamlı bir hediye.' },
    { id: 'kolye-zincir',   cat: 'kolye', name: 'İtalyan Zincir Kolye', price: 1290, old: null, tag: null,
      material: '925 Ayar Gümüş', length: '50 cm', weight: '9,3 g', stone: '—',
      desc: 'Figaro örgü İtalyan zincir. Tek başına ya da ucu ile birlikte şık duruş sağlar.' },

    { id: 'yuzuk-hilal',    cat: 'yuzuk', name: 'Hilal Yüzük',       price: 1180, old: null, tag: 'Çok Satan',
      material: '925 Ayar Gümüş', length: '—', weight: '3,8 g', stone: 'Beyaz zirkon',
      desc: 'İnce bantlı, hilal ve yıldız motifli günlük yüzük. Tüm ölçülerde üretilebilir.' },
    { id: 'yuzuk-imza',     cat: 'yuzuk', name: 'İmza Taşlı Yüzük',  price: 1540, old: 1790, tag: null,
      material: '925 Ayar Gümüş', length: '—', weight: '5,1 g', stone: 'Tek taş zirkon',
      desc: 'Tek taş tırnak montür. Pırlanta görünümlü zirkon ile şık ve gösterişli.' },
    { id: 'yuzuk-bogum',    cat: 'yuzuk', name: 'Boğumlu Fedora',    price: 990,  old: null, tag: null,
      material: '925 Ayar Gümüş', length: '—', weight: '4,4 g', stone: '—',
      desc: 'Sade, boğumlu tasarım. İki üç parça birlikte de kombinlenebilen modern bir model.' },
    { id: 'yuzuk-cift',     cat: 'yuzuk', name: 'Söz & Alyans (Çift)', price: 3200, old: null, tag: 'Kişiye Özel',
      material: '925 Ayar Gümüş', length: '—', weight: '9,0 g (çift)', stone: '—',
      desc: 'İçine tarih ve isim lazerle yazılabilen çift alyans seti. Söz ve nişan için ideal.' },

    { id: 'bileklik-zincir', cat: 'bileklik', name: 'Zincir Bileklik', price: 960, old: null, tag: null,
      material: '925 Ayar Gümüş', length: '19 cm ayar', weight: '4,7 g', stone: '—',
      desc: 'Ayarlanabilir boy, klasik zincir örgü. Kadın-erkek herkese uygun.' },
    { id: 'bileklik-tas',    cat: 'bileklik', name: 'Taşlı Tenis Bileklik', price: 2350, old: 2650, tag: 'Yeni',
      material: '925 Ayar Gümüş', length: '18 cm', weight: '6,9 g', stone: 'Sıra zirkon',
      desc: 'Baştan sona sıra taş, tenis kurgu. Işıltısıyla dikkat çeken özel gün parçası.' },
    { id: 'bileklik-bileziği', cat: 'bileklik', name: 'Kelepçe Bilezik', price: 1780, old: null, tag: null,
      material: '925 Ayar Gümüş', length: 'Standart', weight: '11,2 g', stone: '—',
      desc: 'Açık uçlu, esnek kelepçe form. Bileğe kolay geçen minimal tasarım.' },
    { id: 'bileklik-isim',   cat: 'bileklik', name: 'İsimli Bileklik',  price: 1420, old: null, tag: 'Kişiye Özel',
      material: '925 Ayar Gümüş', length: '17-19 cm ayar', weight: '4,0 g', stone: '—',
      desc: 'Plaka üzerine istediğiniz ismin lazerle yazıldığı kişiye özel bileklik.' },

    { id: 'kupe-damla',   cat: 'kupe', name: 'Damla Küpe',        price: 1320, old: null, tag: null,
      material: '925 Ayar Gümüş', length: '2,4 cm', weight: '3,3 g (çift)', stone: 'Damla zirkon',
      desc: 'Damla kesim taşlı sallantılı küpe. Zarafeti günlük kombinlere taşır.' },
    { id: 'kupe-halka',   cat: 'kupe', name: 'İnce Halka Küpe',   price: 780,  old: null, tag: 'Çok Satan',
      material: '925 Ayar Gümüş', length: '2 cm çap', weight: '2,1 g (çift)', stone: '—',
      desc: 'Klasik ince halka. Her yaşa ve her tarza uyan vazgeçilmez bir parça.' },
    { id: 'kupe-civi',    cat: 'kupe', name: 'Tek Taş Çivi Küpe', price: 890,  old: null, tag: null,
      material: '925 Ayar Gümüş', length: '0,5 cm', weight: '1,4 g (çift)', stone: 'Tek taş zirkon',
      desc: 'Minimal tek taş çivi küpe. Tek başına veya çoklu delikte kombinlenebilir.' }
  ];

  const CART_KEY = 'aytekin_cart_v1';
  const FAV_KEY  = 'aytekin_fav_v1';
  const USER_KEY = 'aytekin_user_v1';

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { return {}; }
  }
  function write(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {}
    window.dispatchEvent(new CustomEvent('aytekin:store', { detail: { key } }));
  }

  const AYTEKIN = {
    categories: CATEGORIES,
    products: PRODUCTS,
    byId: (id) => PRODUCTS.find(p => p.id === id),
    byCat: (slug) => PRODUCTS.filter(p => p.cat === slug),
    fmt: (n) => '₺' + n.toLocaleString('tr-TR'),

    // ---- cart ----
    getCart: () => read(CART_KEY),
    cartCount() { const c = read(CART_KEY); return Object.values(c).reduce((a, b) => a + b, 0); },
    cartTotal() {
      const c = read(CART_KEY);
      return Object.entries(c).reduce((sum, [id, q]) => {
        const p = AYTEKIN.byId(id); return sum + (p ? p.price * q : 0);
      }, 0);
    },
    addToCart(id, qty = 1) { const c = read(CART_KEY); c[id] = (c[id] || 0) + qty; write(CART_KEY, c); },
    setQty(id, qty) { const c = read(CART_KEY); if (qty <= 0) delete c[id]; else c[id] = qty; write(CART_KEY, c); },
    removeFromCart(id) { const c = read(CART_KEY); delete c[id]; write(CART_KEY, c); },
    clearCart() { write(CART_KEY, {}); },

    // ---- favorites ----
    getFavs: () => read(FAV_KEY),
    isFav: (id) => !!read(FAV_KEY)[id],
    toggleFav(id) { const f = read(FAV_KEY); if (f[id]) delete f[id]; else f[id] = 1; write(FAV_KEY, f); return !!f[id]; },
    favCount() { return Object.keys(read(FAV_KEY)).length; },

    // ---- account (demo oturum) ----
    getUser() { const u = read(USER_KEY); return u && u.email ? u : null; },
    isLoggedIn() { return !!AYTEKIN.getUser(); },
    login(email, name) {
      const clean = (email || '').trim() || 'misafir@aytekinjewelry.com';
      const nm = (name || '').trim() || clean.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      write(USER_KEY, { email: clean, name: nm, since: '2026' });
      return AYTEKIN.getUser();
    },
    logout() { write(USER_KEY, {}); },
    // demo sipariş geçmişi
    orders() {
      return [
        { no: 'AY-10428', date: '12 Tem 2026', status: 'Teslim edildi', items: ['kolye-mehtap', 'kupe-halka'] },
        { no: 'AY-10391', date: '28 Haz 2026', status: 'Kargoda', items: ['yuzuk-imza'] }
      ];
    }
  };

  window.AYTEKIN = AYTEKIN;
})();

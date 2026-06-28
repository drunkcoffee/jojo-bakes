import { useEffect, useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '601110788823';
const PICKUP_CONFIG = { pickupStart: '18:45', pickupEnd: '22:30', pickupIntervalMinutes: 10, pickupBufferMinutes: 15 };
const LANG_KEY = 'jojo-bakes-language';
const photo = (file) => `/assets/products/${file}`;
const money = (amount) => `RM${amount.toFixed(2)}`;
const text = (value, lang) => (typeof value === 'string' ? value : value?.[lang] || value?.zh || '');
const joinOptionNames = (items) => ({
  zh: items.map((item) => text(item.name, 'zh')).join(' + '),
  en: items.map((item) => text(item.name, 'en')).join(' + '),
});

const translations = {
  zh: {
    menuAria: '菜单分类',
    chooseMenu: '选择菜单',
    madeFresh: '现点现烤',
    madeDrink: '现点现调',
    waitTime: '约 15 分钟',
    paymentChip: 'Cash / QR',
    whatsappConfirm: 'WhatsApp 确认',
    tipTitle: '小提醒',
    tipBody: '选好后加入购物车，选择取餐时间，再 WhatsApp 下单。',
    firstTime: '第一次点可以看这里',
    recommends: 'Jojo 推荐',
    tonightPopular: '今晚最多人点这几款',
    classicEyebrow: '简单好吃',
    classicTitle: '经典口味',
    specialEyebrow: '固定口味',
    specialTitle: '特别口味',
    cookiesEyebrow: '选一种喜欢的饼干口味',
    cookiesTitle: '饼干系列',
    nutellaEyebrow: 'Nutella 榛果巧克力酱已包含',
    nutellaTitle: 'Nutella 系列',
    drinksEyebrow: '配华夫饼刚刚好',
    drinksTitle: '饮料',
    footerTitle: '下单后我们会 WhatsApp 确认',
    footerBody: '如果现场太忙，可能会稍微等一下，但都会现烤给你。',
    add: '加入',
    soldOutToday: '今天售完',
    imageMissing: '图片暂缺',
    from: '起',
    selected: '你选了',
    chooseFirst: '先帮你选',
    collapseOptions: '收起选项',
    expandOptions: '展开选项',
    chooseFlavour: '选择口味',
    choose: '选择',
    pairing: '搭配',
    series: '系列',
    style: '方式',
    flavour: '口味',
    cart: '购物车',
    tonightQuestion: '今晚想吃什么？',
    emptyCart: '你的购物车是空的',
    decreaseQuantity: '减少数量',
    increaseQuantity: '增加数量',
    selectPickupTime: '选择取餐时间',
    todayEvery: `今天 · 每 ${PICKUP_CONFIG.pickupIntervalMinutes} 分钟一个时段`,
    closedToday: '今天已结束，明天再来找 Jojo。',
    pickupRequired: '请选择取餐时间',
    paymentMethod: '付款方式',
    cash: '现金',
    qr: 'QR',
    sendWhatsapp: '发送 WhatsApp 下单',
    tonightOrder: '今晚点单纸 · 选好再确认',
    close: '关闭',
    chooseMochiStyle: '先选麻薯方式',
    chooseMochiTier: '再选麻薯口味等级',
    chooseTwo: (label) => `选两种 ${label}`,
    chooseOne: (label) => `选一种 ${label}`,
    optionHint: (min, max) => min && max && min !== max ? `（可选 ${min} 至 ${max} 个）` : '',
    addToCart: '加入购物车',
    confirmAddTitle: '确认加入购物车',
    quantity: '数量',
    totalQuantity: '总数量',
    total: '总额',
    cancel: '取消',
    confirmAdd: '确认加入',
    addedToCart: '已加入购物车',
    remark: '备注',
    pleaseFill: '请填写',
    orderTitle: 'JOJO BAKES 点单',
    orderTime: '下单时间',
    pickupTime: '取餐时间',
    orderItems: '订单内容',
    subtotal: '小计',
    waitConfirm: '下单后请等我们 WhatsApp 确认。',
    warningClassic: '请至少选一个口味',
    warningMochiStyle: '麻薯方式也要选一个',
    warningMochiFlavour: '先选一个口味哦',
    warningDrink: '饮料甜度和冰量要选哦',
  },
  en: {
    menuAria: 'Menu categories',
    chooseMenu: 'Choose Menu',
    madeFresh: 'Made Fresh',
    madeDrink: 'Freshly Mixed',
    waitTime: 'About 15 min',
    paymentChip: 'Cash / QR',
    whatsappConfirm: 'WhatsApp Confirm',
    tipTitle: 'Quick note',
    tipBody: 'Add your picks to cart, select a pickup time, then send the order on WhatsApp.',
    firstTime: 'Good place to start',
    recommends: 'Jojo Recommends',
    tonightPopular: 'Most ordered tonight',
    classicEyebrow: 'Simple and good',
    classicTitle: 'Classic Flavours',
    specialEyebrow: 'Fixed flavours',
    specialTitle: 'Special Flavours',
    cookiesEyebrow: 'Choose your cookie topping',
    cookiesTitle: 'Cookie Series',
    nutellaEyebrow: 'Nutella hazelnut chocolate spread included',
    nutellaTitle: 'Nutella Series',
    drinksEyebrow: 'Good with waffles',
    drinksTitle: 'Drinks',
    footerTitle: 'We will confirm on WhatsApp after you order',
    footerBody: 'If the stall is busy, there may be a short wait. Everything is made fresh.',
    add: 'Add',
    soldOutToday: 'Sold Out Today',
    imageMissing: 'Image unavailable',
    from: 'from',
    selected: 'Selected',
    chooseFirst: 'Default pick',
    collapseOptions: 'Hide Options',
    expandOptions: 'Show Options',
    chooseFlavour: 'Choose Flavour',
    choose: 'Choose',
    pairing: 'Pairing',
    series: 'Series',
    style: 'Style',
    flavour: 'Flavour',
    cart: 'Cart',
    tonightQuestion: 'What are you craving tonight?',
    emptyCart: 'Your cart is empty',
    decreaseQuantity: 'Decrease quantity',
    increaseQuantity: 'Increase quantity',
    selectPickupTime: 'Select Pickup Time',
    todayEvery: `Today · every ${PICKUP_CONFIG.pickupIntervalMinutes} minutes`,
    closedToday: 'Orders are closed for today. Please come back tomorrow.',
    pickupRequired: 'Please select a pickup time',
    paymentMethod: 'Payment Method',
    cash: 'Cash',
    qr: 'QR',
    sendWhatsapp: 'Send Order via WhatsApp',
    tonightOrder: 'Tonight order sheet · confirm your choices',
    close: 'Close',
    chooseMochiStyle: 'Choose Mochi Style',
    chooseMochiTier: 'Choose Mochi Tier',
    chooseTwo: (label) => `Choose two ${label}`,
    chooseOne: (label) => `Choose one ${label}`,
    optionHint: (min, max) => min && max && min !== max ? ` (${min} to ${max})` : '',
    addToCart: 'Add to Cart',
    confirmAddTitle: 'Confirm Add to Cart',
    quantity: 'Quantity',
    totalQuantity: 'Total Quantity',
    total: 'Total',
    cancel: 'Cancel',
    confirmAdd: 'Confirm Add',
    addedToCart: 'Added to Cart',
    remark: 'Remark',
    pleaseFill: 'Please fill in',
    orderTitle: 'JOJO BAKES ORDER',
    orderTime: 'Order Time',
    pickupTime: 'Pickup Time',
    orderItems: 'Order Items',
    subtotal: 'Subtotal',
    waitConfirm: 'Please wait for our WhatsApp confirmation after ordering.',
    warningClassic: 'Please choose at least one flavour',
    warningMochiStyle: 'Please choose a mochi style',
    warningMochiFlavour: 'Please choose the flavour first',
    warningDrink: 'Please choose sweetness and ice level',
  },
};

const categories = [
  ['features', { zh: '精选', en: 'Featured' }],
  ['classic', { zh: '经典', en: 'Classic' }],
  ['special', { zh: '特别', en: 'Special' }],
  ['cookies', { zh: '饼干', en: 'Cookies' }],
  ['nutella', { zh: 'Nutella', en: 'Nutella' }],
  ['drinks', { zh: '饮料', en: 'Drinks' }],
];

const flavours = {
  chocolate: { zh: '巧克力', en: 'Chocolate' },
  peanut: { zh: '花生', en: 'Peanut' },
  strawberry: { zh: '草莓', en: 'Strawberry' },
  butter: { zh: '牛油', en: 'Butter' },
  honey: { zh: '蜜糖', en: 'Honey' },
  kaya: { zh: 'Kaya', en: 'Kaya' },
  matcha: { zh: '抹茶', en: 'Matcha' },
  taro: { zh: '芋泥', en: 'Taro' },
  nutella: { zh: 'Nutella', en: 'Nutella' },
  matchaChocolate: { zh: '抹茶巧克力', en: 'Matcha Chocolate' },
  cookiesCream: { zh: 'Cookies & Cream', en: 'Cookies & Cream' },
  apamBalik: { zh: 'Apam Balik', en: 'Apam Balik' },
  chickenFlossTaro: { zh: '鸡肉松芋泥麻薯', en: 'Chicken Floss Taro Mochi' },
  taroChickenFloss: { zh: '芋泥鸡肉松', en: 'Taro Chicken Floss' },
  pistachio: { zh: '开心果', en: 'Pistachio' },
  pistachioChocolateKunafa: { zh: '开心果巧克力 Kunafa', en: 'Pistachio Chocolate Kunafa' },
  pistachioKunafa: { zh: '开心果 Kunafa', en: 'Pistachio Kunafa' },
  oreo: { zh: 'Oreo', en: 'Oreo' },
  lotusCrumbs: { zh: 'Lotus Crumbs', en: 'Lotus Crumbs' },
  crunchBall: { zh: '脆脆珠', en: 'Crunch Ball' },
};

const classicFlavours = [
  ['chocolate', flavours.chocolate],
  ['peanut', flavours.peanut],
  ['strawberry', flavours.strawberry],
  ['butter', flavours.butter],
  ['honey', flavours.honey],
  ['kaya', flavours.kaya],
].map(([id, name]) => ({ id, name }));

const cookieClassicFlavours = [...classicFlavours, { id: 'cookies-cream', name: flavours.cookiesCream }];
const cookieSpecialFlavours = [
  { id: 'matcha', name: flavours.matcha },
  { id: 'taro', name: flavours.taro },
  { id: 'nutella', name: flavours.nutella },
];

const mochiTiers = [
  { id: 'classic-mochi', label: { zh: '经典麻薯口味', en: 'Classic Mochi Flavours' }, price: 8, count: 2, flavours: classicFlavours },
  {
    id: 'special-mochi',
    label: { zh: '特别麻薯口味', en: 'Special Mochi Flavours' },
    price: 10,
    count: 1,
    flavours: [
      { id: 'matcha', name: flavours.matcha },
      { id: 'matcha-chocolate', name: flavours.matchaChocolate },
      { id: 'cookies-cream', name: flavours.cookiesCream },
      { id: 'taro', name: flavours.taro },
      { id: 'apam-balik', name: flavours.apamBalik },
      { id: 'nutella', name: flavours.nutella },
    ],
  },
  {
    id: 'premium-mochi',
    label: { zh: 'Premium 麻薯口味', en: 'Premium Mochi Flavours' },
    count: 1,
    flavours: [
      { id: 'taro-chicken-floss', name: flavours.taroChickenFloss, price: 12 },
      { id: 'chicken-floss-taro-mochi', name: flavours.chickenFlossTaro, price: 12 },
      { id: 'pistachio', name: flavours.pistachio, price: 13 },
      { id: 'pistachio-chocolate-kunafa', name: flavours.pistachioChocolateKunafa, price: 15 },
      { id: 'pistachio-kunafa', name: flavours.pistachioKunafa, price: 16 },
    ],
  },
];

const drinkSettings = [
  {
    id: 'sweetness',
    label: { zh: '甜度', en: 'Sweetness' },
    choices: [
      { id: 'regular-sweet', name: { zh: '正常甜', en: 'Regular Sweet' } },
      { id: 'less-sweet', name: { zh: '少甜', en: 'Less Sweet' } },
    ],
    min: 1,
    max: 1,
  },
  {
    id: 'ice',
    label: { zh: '冰量', en: 'Ice Level' },
    choices: [
      { id: 'regular-ice', name: { zh: '正常冰', en: 'Regular Ice' } },
      { id: 'less-ice', name: { zh: '少冰', en: 'Less Ice' } },
    ],
    min: 1,
    max: 1,
  },
];

const products = [
  { id: 'classic', category: 'classic', name: { zh: '经典口味', en: 'Classic Waffle' }, price: 5, badge: { zh: '经典', en: 'Classic' }, description: { zh: '可选一或两种喜欢的口味', en: 'Choose one or two favourite flavours.' }, image: photo('waffle-classic.webp'), kind: 'classic', available: true, optionGroups: [{ id: 'flavour', label: { zh: '选择口味', en: 'Choose Flavour' }, choices: classicFlavours, min: 1, max: 2 }] },
  { id: 'matcha-pairing', category: 'matcha', name: { zh: '抹茶酱搭配', en: 'Matcha Series' }, price: 8, badge: { zh: '抹茶酱', en: 'Matcha Sauce' }, description: { zh: '抹茶酱配喜欢的口味。', en: 'Matcha sauce paired with your favourite flavour.' }, image: photo('waffle-matcha-chocolate.webp'), kind: 'matcha-series' },
  { id: 'matcha-chocolate', category: 'special', name: { zh: '抹茶巧克力', en: 'Matcha Chocolate' }, price: 9, badge: { zh: '推荐', en: 'Recommended' }, description: { zh: '不用选择，直接点就好。', en: 'Ready flavour, no extra choices needed.' }, image: photo('waffle-matcha-chocolate.webp') },
  { id: 'matcha-lotus-crumbs', category: 'special', name: { zh: '抹茶 Lotus', en: 'Matcha Lotus' }, price: 10, badge: { zh: 'Lotus', en: 'Lotus' }, description: { zh: '不用选择，直接点就好。', en: 'Ready flavour, no extra choices needed.' }, image: photo('waffle-matcha-lotus.webp') },
  { id: 'apam-balik', category: 'special', name: { zh: 'Apam Balik Waffle', en: 'Apam Balik Waffle' }, price: 8, badge: { zh: '香脆', en: 'Crispy' }, description: { zh: '花生香、边边脆，经典不容易错。', en: 'Peanut aroma with crispy edges.' }, image: photo('waffle-apam-balik.webp') },
  { id: 'cookies-cream', category: 'special', name: { zh: 'Cookies & Cream', en: 'Cookies & Cream' }, price: 7, badge: { zh: '奶香', en: 'Creamy' }, description: { zh: '不用选择，直接点就好。', en: 'Ready flavour, no extra choices needed.' }, image: photo('waffle-cookies-cream-oreo.jpg') },
  { id: 'taro-waffle', category: 'special', name: { zh: '芋泥 Waffle', en: 'Taro Waffle' }, price: 8, badge: { zh: '芋泥', en: 'Taro' }, description: { zh: '芋泥比较温柔，不会太腻。', en: 'Soft taro flavour, not too heavy.' }, image: photo('waffle-taro.webp') },
  { id: 'mayo-floss', category: 'special', name: { zh: 'Mayo 鸡肉松', en: 'Mayo Chicken Floss' }, price: 8, badge: { zh: '咸甜', en: 'Sweet Savoury' }, description: { zh: '咸甜口，越吃越顺。', en: 'Sweet and savoury in one bite.' }, image: photo('waffle-mayo-chicken-floss.webp') },
  { id: 'floss-taro', category: 'special', name: { zh: '鸡肉松芋泥', en: 'Chicken Floss Taro' }, price: 10, badge: { zh: '人气', en: 'Popular' }, description: { zh: '咸香鸡肉松配芋泥。', en: 'Savoury chicken floss with taro.' }, image: photo('waffle-chicken-floss-taro.webp') },
  { id: 'chocolate-coffee', category: 'special', name: { zh: '巧克力咖啡', en: 'Chocolate Coffee' }, price: 6, badge: { zh: '咖啡香', en: 'Coffee' }, description: { zh: '巧克力配咖啡香。', en: 'Chocolate with a coffee finish.' }, image: photo('waffle-peanut-coffee.webp') },
  { id: 'peanut-coffee', category: 'special', name: { zh: '花生咖啡', en: 'Peanut Coffee' }, price: 6, badge: { zh: '咖啡香', en: 'Coffee' }, description: { zh: '花生配咖啡香。', en: 'Peanut with a coffee finish.' }, image: photo('waffle-peanut-coffee.webp') },
  { id: 'kunafa', category: 'kunafa', name: { zh: '开心果 Kunafa 系列', en: 'Pistachio Kunafa Series' }, price: 11, badge: { zh: '浓一点', en: 'Rich' }, description: { zh: '酥脆 Kunafa 搭配开心果酱，适合喜欢浓一点口味的。', en: 'Crispy kunafa with pistachio sauce.' }, image: photo('waffle-pistachio-kunafa.webp'), kind: 'kunafa' },
  { id: 'oreo', category: 'cookies', name: { zh: 'Oreo 系列', en: 'Oreo Series' }, price: 7, badge: { zh: 'Oreo 饼干碎', en: 'Oreo Crumbs' }, description: { zh: '每份都有 Oreo 饼干碎，选一种口味。', en: 'Comes with Oreo crumbs. Choose one flavour.' }, image: photo('waffle-chocolate-oreo.jpg'), kind: 'cookie-series' },
  { id: 'lotus', category: 'cookies', name: { zh: 'Lotus 系列', en: 'Lotus Series' }, price: 7, badge: { zh: 'Lotus 碎', en: 'Lotus Crumbs' }, description: { zh: '每份都有 Lotus 碎，选一种口味。', en: 'Comes with Lotus crumbs. Choose one flavour.' }, image: photo('waffle-matcha-lotus.jpg'), kind: 'cookie-series' },
  { id: 'crunch', category: 'cookies', name: { zh: '脆脆珠系列', en: 'Crunch Ball Series' }, price: 7, badge: { zh: '脆脆珠', en: 'Crunch Ball' }, description: { zh: '每份都有脆脆珠，选一种口味。', en: 'Comes with crunch balls. Choose one flavour.' }, image: photo('waffle-choco-crunch-ball.jpg'), kind: 'cookie-series' },
  { id: 'nutella', category: 'nutella', name: { zh: 'Nutella 系列', en: 'Nutella Series' }, price: 8, badge: { zh: '榛果巧克力', en: 'Hazelnut Chocolate' }, description: { zh: 'Nutella 系列都会有 Nutella 榛果巧克力酱，可再加一个经典口味。', en: 'Nutella sauce included. Add one classic flavour if you like.' }, image: photo('waffle-nutella.webp'), kind: 'nutella' },
  { id: 'mochi', category: 'mochi', name: { zh: '拉丝麻薯', en: 'Stretchy Mochi' }, price: 8, badge: { zh: '拉丝麻薯', en: 'Mochi' }, description: { zh: '内烤或外夹，再选口味。', en: 'Choose baked-in or outside mochi, then pick flavours.' }, image: photo('waffle-mochi-pull.webp'), kind: 'mochi' },
];

const drinks = [
  ['matcha-latte', { zh: '抹茶拿铁', en: 'Matcha Latte' }, 9, { zh: '抹茶香，喝起来顺。', en: 'Smooth matcha latte.' }, 'drink-matcha-latte.jpg'],
  ['matcha-choco', { zh: '抹茶可可', en: 'Matcha Cocoa' }, 10, { zh: '抹茶加可可，比较浓。', en: 'Matcha with cocoa, richer taste.' }, 'drink-matcha-choco.jpg'],
  ['strawberry-matcha', { zh: '草莓抹茶', en: 'Strawberry Matcha' }, 10, { zh: '草莓酸甜。', en: 'Sweet and tangy strawberry matcha.' }, 'drink-strawberry-matcha.jpg'],
  ['jasmine-matcha', { zh: '茉莉抹茶', en: 'Jasmine Matcha' }, 10, { zh: '淡淡花香。', en: 'Light jasmine aroma.' }, 'drink-jasmine-matcha.jpg'],
  ['thai-milk-tea', { zh: '泰式奶茶', en: 'Thai Milk Tea' }, 7, { zh: '甜香奶茶，喝起来顺。', en: 'Sweet, creamy Thai milk tea.' }, 'drink-thai-milk-tea.jpg'],
  ['cocoa', { zh: '可可', en: 'Cocoa' }, 6, { zh: '小朋友也会喜欢。', en: 'Easy cocoa, kid-friendly.' }, 'drink-cocoa.jpg'],
  ['strawberry-cocoa', { zh: '草莓可可', en: 'Strawberry Cocoa' }, 8, { zh: '草莓配可可。', en: 'Strawberry with cocoa.' }, 'drink-strawberry-cocoa.jpg'],
].map(([id, name, price, description, image]) => ({
  id,
  category: 'drinks',
  name,
  price,
  description,
  image: photo(image),
  type: 'drink',
  kind: 'drink',
  available: true,
  optionGroups: drinkSettings,
}));

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'zh';
  return window.localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';
}

function ProductImage({ product, lang, className = '' }) {
  const [missing, setMissing] = useState(false);
  if (!product.image || missing) {
    return <div className={`image-fallback ${product.type === 'drink' ? 'drink-fallback' : ''} ${className}`} role="img" aria-label={`${text(product.name, lang)} ${translations[lang].imageMissing}`}><span>{product.type === 'drink' ? '☕' : '🧇'}</span></div>;
  }
  return <img className={className} src={product.image} alt={text(product.name, lang)} loading="lazy" onError={() => setMissing(true)} />;
}

function ProductCard({ product, onAdd, lang }) {
  const t = translations[lang];
  return <article id={product.category === 'mochi' ? 'mochi' : undefined} className={`product-card ${product.type === 'drink' ? 'drink-card' : ''}`}>
    <div className="product-photo"><ProductImage product={product} lang={lang} /><span>{product.available === false ? t.soldOutToday : text(product.badge, lang) || (product.type === 'drink' ? t.madeDrink : t.madeFresh)}</span></div>
    <div className="product-info"><h3>{text(product.name, lang)}</h3><p>{text(product.description, lang)}</p><div><b>{money(product.price)}</b><button type="button" aria-label={`${t.add} ${text(product.name, lang)}`} disabled={product.available === false} onClick={() => onAdd(product)}>{product.available === false ? t.soldOutToday : t.add}</button></div></div>
  </article>;
}

function SeriesCard({ product, options, onAdd, lang, title = product.name, seriesLabel = null, showStartingPrice = true, className = '' }) {
  const t = translations[lang];
  const [selectedId, setSelectedId] = useState(options[0].id);
  const [expanded, setExpanded] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const selected = options.find((option) => option.id === selectedId) || options[0];
  return <article className={`series-card ${className}`}>
    <div className="series-photo"><ProductImage product={product} lang={lang} /><span>{product.available === false ? t.soldOutToday : text(product.badge, lang)}</span></div>
    <div className="series-content"><div className="series-heading"><div><h3>{text(title, lang)}</h3><p>{text(product.description, lang)}</p></div>{showStartingPrice && <b>RM{Math.min(...options.map((option) => option.price))} {t.from}</b>}</div><div className="series-selected"><span>{hasSelected ? t.selected : t.chooseFirst}</span><b>{text(selected.name, lang)}</b></div><button type="button" className="toggle-options" onClick={() => setExpanded((value) => !value)}>{expanded ? t.collapseOptions : hasSelected ? t.expandOptions : t.chooseFlavour}</button>{expanded && <div className="series-options">{options.map((option) => <button type="button" className={selected.id === option.id ? 'selected' : ''} key={option.id} onClick={() => { setSelectedId(option.id); setHasSelected(true); setExpanded(false); }}><span>{text(option.name, lang)}</span><b>{money(option.price)}</b></button>)}</div>}<div className="series-action"><strong>{money(selected.price)}</strong><button type="button" aria-label={`${t.add} ${text(title, lang)}`} disabled={product.available === false} onClick={() => onAdd(product, [...(seriesLabel ? [{ groupId: 'series', valueId: seriesLabel.id, label: seriesLabel.label, value: seriesLabel.name }] : []), { groupId: selected.groupId || 'flavour', valueId: selected.id, label: selected.label, value: selected.name }], selected.price)}>{product.available === false ? t.soldOutToday : t.add}</button></div></div>
  </article>;
}

function minutesFromTime(value) { const [hours, minutes] = value.split(':').map(Number); return hours * 60 + minutes; }
function clockLabel(minutes) { const hours = Math.floor(minutes / 60); const mins = minutes % 60; const suffix = hours >= 12 ? 'PM' : 'AM'; const twelve = hours % 12 || 12; return `${twelve}:${String(mins).padStart(2, '0')} ${suffix}`; }
function orderCreatedAt(lang) { return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-MY' : 'en-MY', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date()); }
function getPickupSlots() {
  const now = new Date();
  const earliest = now.getHours() * 60 + now.getMinutes() + PICKUP_CONFIG.pickupBufferMinutes;
  const start = minutesFromTime(PICKUP_CONFIG.pickupStart); const end = minutesFromTime(PICKUP_CONFIG.pickupEnd);
  return Array.from({ length: Math.floor((end - start) / PICKUP_CONFIG.pickupIntervalMinutes) + 1 }, (_, index) => start + index * PICKUP_CONFIG.pickupIntervalMinutes)
    .filter((minutes) => minutes >= earliest).map((minutes) => ({ value: minutes, label: clockLabel(minutes) }));
}

export default function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const [cart, setCart] = useState([]);
  const [customising, setCustomising] = useState(null);
  const [choices, setChoices] = useState([]);
  const [mochiStyle, setMochiStyle] = useState(null);
  const [mochiTier, setMochiTier] = useState(null);
  const [drinkSweetness, setDrinkSweetness] = useState(null);
  const [drinkIce, setDrinkIce] = useState(null);
  const [optionWarning, setOptionWarning] = useState('');
  const [pendingItem, setPendingItem] = useState(null);
  const [pendingQuantity, setPendingQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState('');
  const [pickupWarning, setPickupWarning] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [toast, setToast] = useState('');
  const pickupSlots = useMemo(getPickupSlots, []);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [cart]);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const t = translations[lang];

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function beginAdd(product) {
    if (product.kind) { setCustomising(product); setChoices([]); setMochiStyle(null); setMochiTier(null); setDrinkSweetness(null); setDrinkIce(null); setOptionWarning(''); return; }
    prepareItem(product, [], product.price);
  }
  function prepareItem(product, options, unitPrice) {
    setPendingItem({ productId: product.id, product, options, unitPrice });
    setPendingQuantity(1);
  }
  function addItem(product, options, unitPrice, requestedQuantity = 1) {
    const key = `${product.id}-${options.map((option) => `${option.groupId}:${option.valueId}`).join('|')}`;
    setCart((items) => {
      const existing = items.find((item) => item.key === key);
      if (existing) return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + requestedQuantity } : item);
      return [...items, { key, productId: product.id, product, options, unitPrice, quantity: requestedQuantity }];
    });
    setCartOpen(true);
    setToast(t.addedToCart);
  }
  function toggleChoice(flavour, maximum) { setOptionWarning(''); setChoices((current) => current.some((item) => item.id === flavour.id) ? current.filter((item) => item.id !== flavour.id) : current.length < maximum ? [...current, flavour] : current); }
  function confirmOptions() {
    if (!customising) return;
    const classicOptions = customising.optionGroups?.[0];
    if (customising.kind === 'classic' && choices.length < classicOptions.min) { setOptionWarning(t.warningClassic); return; }
    if (customising.kind === 'mochi' && !mochiStyle) { setOptionWarning(t.warningMochiStyle); return; }
    if (customising.kind === 'mochi' && (!mochiTier || choices.length !== mochiTier.count)) { setOptionWarning(t.warningMochiFlavour); return; }
    if (customising.kind === 'drink' && (!drinkSweetness || !drinkIce)) { setOptionWarning(t.warningDrink); return; }
    if (customising.kind === 'classic') prepareItem(customising, [{ groupId: classicOptions.id, valueId: choices.map((choice) => choice.id).join('+'), label: classicOptions.label, value: joinOptionNames(choices) }], customising.price);
    if (customising.kind === 'mochi') {
      const price = choices[0]?.price || mochiTier.price;
      prepareItem(customising, [{ groupId: 'style', valueId: mochiStyle.id, label: { zh: '方式', en: 'Style' }, value: mochiStyle.name }, { groupId: mochiTier.id, valueId: choices.map((choice) => choice.id).join('+'), label: { zh: '口味', en: 'Flavour' }, value: joinOptionNames(choices) }], price);
    }
    if (customising.kind === 'drink') prepareItem(customising, [{ groupId: customising.optionGroups[0].id, valueId: drinkSweetness.id, label: customising.optionGroups[0].label, value: drinkSweetness.name }, { groupId: customising.optionGroups[1].id, valueId: drinkIce.id, label: customising.optionGroups[1].label, value: drinkIce.name }], customising.price);
    setCustomising(null);
  }
  function confirmAdd() {
    if (!pendingItem) return;
    addItem(pendingItem.product, pendingItem.options, pendingItem.unitPrice, pendingQuantity);
    setPendingItem(null);
  }
  function updateQuantity(key, difference) { setCart((items) => items.flatMap((item) => item.key !== key ? [item] : item.quantity + difference > 0 ? [{ ...item, quantity: item.quantity + difference }] : [])); }
  function checkout() {
    if (!cart.length) { setCartOpen(true); return; }
    if (!pickupSlots.length) { setCartOpen(true); return; }
    if (!pickupTime) { setPickupWarning(true); setCartOpen(true); return; }
    const paymentText = paymentMethod === 'cash' ? t.cash : t.qr;
    const lines = cart.map((item, index) => `${index + 1}. ${text(item.product.name, lang)} x${item.quantity}\n${item.options.map((option) => `   ${text(option.label, lang)}: ${text(option.value, lang)}`).join('\n')}${item.options.length ? '\n' : ''}   ${t.subtotal}: ${money(item.unitPrice * item.quantity)}`).join('\n\n');
    const message = `${t.orderTitle}\n\n${t.orderTime}: ${orderCreatedAt(lang)}\n${t.pickupTime}: ${pickupTime}\n${t.paymentMethod}: ${paymentText}\n\n${t.orderItems}:\n${lines}\n\n${t.totalQuantity}: ${quantity}\n${t.total}: ${money(total)}\n\n${t.remark}: ${t.pleaseFill}\n\n${t.waitConfirm}`;
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  const section = (id, eyebrow, title, list, extra = null, renderCard = null) => <section className="menu-section" id={id} aria-labelledby={`${id}-title`}><div className="section-heading"><div><small>{eyebrow}</small><h2 id={`${id}-title`}>{title}</h2></div>{extra}</div><div className={id === 'drinks' ? 'drink-list' : 'card-grid'}>{list.map((product) => renderCard ? renderCard(product) : <ProductCard key={product.id} product={product} onAdd={beginAdd} lang={lang} />)}</div></section>;
  const specialItems = products.filter((product) => product.category === 'special');

  return <main className="shop"><style>{styles}</style>
    <section className="hero"><div className="hero-top"><img className="brand-logo" src={photo('logo-jojo-bakes.webp')} alt="JOJO BAKES" /><div className="language-toggle" aria-label="Language"><button type="button" className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中文</button><span>|</span><button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button></div></div><div className="hero-copy"><p>TONIGHT’S SPECIAL · MADE FRESH</p><h1><strong>Good things happen</strong><br /><em>after sunset.</em></h1><span className="hero-feature">Chocolate Matcha Waffle</span><a href="#classic">WhatsApp {lang === 'zh' ? '下单' : 'Order'} <b>→</b></a></div></section>
    <nav className="category-tabs" aria-label={t.menuAria}>{categories.map(([id, label]) => <a href={`#${id}`} key={id}>{text(label, lang)}</a>)}</nav>
    <div className="hero-chips"><span>🧇 {t.madeFresh}</span><span>⏱ {t.waitTime}</span><span>💳 {t.paymentChip}</span><span>📱 {t.whatsappConfirm}</span></div>
    <div className="order-tip"><b>{t.tipTitle}</b><span>{t.tipBody}</span></div>
    <section className="menu-section feature-section" id="features"><div className="section-heading"><div><small>{t.firstTime}</small><h2>{t.recommends}</h2></div><span>{t.tonightPopular}</span></div><div className="feature-grid">{products.filter((product) => product.category === 'matcha').map((product) => <SeriesCard key={product.id} className="feature-card matcha-feature" product={{ ...product, badge: { zh: '抹茶控', en: 'Matcha Pick' } }} lang={lang} showStartingPrice={false} options={[{ id: 'matcha-sauce', name: { zh: '抹茶酱', en: 'Matcha Sauce' }, price: 8, label: { zh: '选择', en: 'Choose' } }, ...['peanut', 'chocolate', 'strawberry', 'butter', 'kaya'].map((id) => ({ id, name: flavours[id], price: 9, label: { zh: '选择', en: 'Choose' } })), ...[{ id: 'oreo', name: flavours.oreo }, { id: 'lotus-crumbs', name: flavours.lotusCrumbs }, { id: 'crunch-ball', name: flavours.crunchBall }].map((option) => ({ ...option, price: 10, label: { zh: '选择', en: 'Choose' } }))]} onAdd={prepareItem} />)}{products.filter((product) => product.category === 'mochi').map((product) => <ProductCard key={product.id} product={{ ...product, badge: { zh: '会拉丝', en: 'Stretchy' } }} onAdd={beginAdd} lang={lang} />)}{products.filter((product) => product.category === 'kunafa').map((product) => <SeriesCard key={product.id} className="feature-card kunafa-feature" product={{ ...product, badge: { zh: '浓郁脆脆', en: 'Rich Crunch' } }} lang={lang} showStartingPrice={false} options={[{ id: 'pistachio-sauce', name: { zh: '开心果酱', en: 'Pistachio Sauce' }, price: 11, label: { zh: '选择', en: 'Choose' } }, { id: 'pistachio-chocolate-kunafa', name: flavours.pistachioChocolateKunafa, price: 13, label: { zh: '选择', en: 'Choose' } }, { id: 'pistachio-kunafa', name: flavours.pistachioKunafa, price: 14, label: { zh: '选择', en: 'Choose' } }]} onAdd={prepareItem} />)}</div></section>
    {section('classic', t.classicEyebrow, t.classicTitle, products.filter((product) => product.category === 'classic'))}
    {section('special', t.specialEyebrow, t.specialTitle, specialItems)}
    {section('cookies', t.cookiesEyebrow, t.cookiesTitle, products.filter((product) => product.category === 'cookies'), null, (product) => { const seriesMap = { oreo: { id: 'oreo', name: { zh: 'Oreo', en: 'Oreo' } }, lotus: { id: 'lotus', name: { zh: 'Lotus', en: 'Lotus' } }, crunch: { id: 'crunch-ball', name: flavours.crunchBall } }; const suffix = seriesMap[product.id]; const join = (flavour) => ({ zh: product.id === 'crunch' ? `${text(flavour.name, 'zh')}${text(suffix.name, 'zh')}` : `${text(flavour.name, 'zh')} ${text(suffix.name, 'zh')}`, en: `${text(flavour.name, 'en')} ${text(suffix.name, 'en')}` }); const options = [...cookieClassicFlavours.map((flavour) => ({ id: `${flavour.id}-${suffix.id}`, name: join(flavour), price: 7, label: { zh: '口味', en: 'Flavour' } })), ...cookieSpecialFlavours.map((flavour) => ({ id: `${flavour.id}-${suffix.id}`, name: join(flavour), price: 10, label: { zh: '口味', en: 'Flavour' } })), { id: `pistachio-${suffix.id}`, name: join({ name: flavours.pistachio }), price: 13, label: { zh: '口味', en: 'Flavour' } }]; return <SeriesCard key={product.id} product={product} options={options} onAdd={prepareItem} lang={lang} />; })}
    {section('nutella', t.nutellaEyebrow, t.nutellaTitle, products.filter((product) => product.category === 'nutella'), <span>RM8 {t.from}</span>, (product) => <SeriesCard key={product.id} product={product} lang={lang} options={[{ id: 'nutella-base', name: { zh: 'Nutella 本身', en: 'Nutella Only' }, price: 8, label: { zh: '选择', en: 'Choose' } }, ...classicFlavours.map((flavour) => ({ id: flavour.id, name: flavour.name, price: 9, label: { zh: '搭配', en: 'Pairing' } }))]} onAdd={prepareItem} />)}
    {section('drinks', t.drinksEyebrow, t.drinksTitle, drinks)}
    <section className="footer-note"><b>{t.footerTitle}</b><span>{t.footerBody}</span></section>

    <aside className={`cart-dock ${cartOpen ? 'open' : ''}`} aria-label={t.cart}><button className="cart-bar" type="button" onClick={() => setCartOpen((open) => !open)}><span>🛒 {t.cart}<b>{quantity}</b></span><strong>{quantity ? money(total) : t.tonightQuestion}</strong><i>{cartOpen ? '⌄' : '⌃'}</i></button>{cartOpen && <div className="cart-panel">{cart.length === 0 ? <p className="empty-cart">{t.emptyCart}</p> : <><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.key}><div><h3>{text(item.product.name, lang)}</h3>{item.options.map((option) => <p key={`${option.groupId}-${option.valueId}`}>{text(option.label, lang)}: {text(option.value, lang)}</p>)}<b>{money(item.unitPrice)}</b></div><div className="quantity"><button type="button" aria-label={t.decreaseQuantity} onClick={() => updateQuantity(item.key, -1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={t.increaseQuantity} onClick={() => updateQuantity(item.key, 1)}>+</button></div></article>)}</div><div className="pickup"><div><b>{t.selectPickupTime}</b><span>{t.todayEvery}</span></div>{pickupSlots.length ? <div className="pickup-slots">{pickupSlots.map((slot) => <button type="button" className={pickupTime === slot.label ? 'selected' : ''} key={slot.value} onClick={() => { setPickupTime(slot.label); setPickupWarning(false); }}>{slot.label}</button>)}</div> : <p>{t.closedToday}</p>}{pickupWarning && <em>{t.pickupRequired}</em>}</div><div className="payment"><b>{t.paymentMethod}</b><div><button type="button" className={paymentMethod === 'cash' ? 'selected' : ''} onClick={() => setPaymentMethod('cash')}>{t.cash}</button><button type="button" className={paymentMethod === 'qr' ? 'selected' : ''} onClick={() => setPaymentMethod('qr')}>{t.qr}</button></div></div><div className="cart-totals"><span>{t.totalQuantity}: {quantity}</span><strong>{t.total}: {money(total)}</strong></div><button className="checkout" type="button" disabled={!pickupSlots.length} onClick={checkout}>{t.sendWhatsapp} <span>{money(total)}</span></button></>}</div>}</aside>

    {toast && <div className="toast" role="status">{toast}</div>}
    {customising && <div className="sheet-mask"><section className="option-sheet" role="dialog" aria-modal="true" aria-labelledby="option-title"><button className="sheet-close" type="button" aria-label={t.close} onClick={() => { setCustomising(null); setOptionWarning(''); }}>×</button><small>{t.tonightOrder}</small><h2 id="option-title">{text(customising.name, lang)}</h2>{customising.kind === 'classic' && <OptionGroup title={customising.optionGroups[0].label} options={customising.optionGroups[0].choices} choices={choices} toggle={(item) => toggleChoice(item, customising.optionGroups[0].max)} min={customising.optionGroups[0].min} max={customising.optionGroups[0].max} lang={lang} t={t} />}{customising.kind === 'mochi' && <><OptionGroup title={t.chooseMochiStyle} options={[{ id: 'inside-mochi', name: { zh: '内烤麻薯', en: 'Baked-in Mochi' } }, { id: 'outside-mochi', name: { zh: '外夹麻薯', en: 'Outside Mochi' } }]} choices={mochiStyle ? [mochiStyle] : []} toggle={(item) => { setMochiStyle(item); setOptionWarning(''); }} lang={lang} t={t} /><OptionGroup title={t.chooseMochiTier} options={mochiTiers} choices={mochiTier ? [mochiTier] : []} toggle={(tier) => { setMochiTier(tier); setChoices([]); setOptionWarning(''); }} formatOption={(tier) => tier.price ? `${text(tier.label, lang)} · ${money(tier.price)}` : text(tier.label, lang)} lang={lang} t={t} />{mochiTier && <OptionGroup title={mochiTier.count === 2 ? t.chooseTwo(text(mochiTier.label, lang)) : t.chooseOne(text(mochiTier.label, lang))} options={mochiTier.flavours} choices={choices} toggle={(item) => toggleChoice(item, mochiTier.count)} formatOption={(item) => item.price ? `${text(item.name, lang)} · ${money(item.price)}` : text(item.name, lang)} lang={lang} t={t} />}</>}{customising.kind === 'drink' && <><OptionGroup title={customising.optionGroups[0].label} options={customising.optionGroups[0].choices} choices={drinkSweetness ? [drinkSweetness] : []} toggle={(item) => { setDrinkSweetness(item); setOptionWarning(''); }} lang={lang} t={t} /><OptionGroup title={customising.optionGroups[1].label} options={customising.optionGroups[1].choices} choices={drinkIce ? [drinkIce] : []} toggle={(item) => { setDrinkIce(item); setOptionWarning(''); }} lang={lang} t={t} /></>}{optionWarning && <p className="option-warning">{optionWarning}</p>}<button className="add-confirm" type="button" onClick={confirmOptions}>{t.addToCart}</button></section></div>}
    {pendingItem && <div className="sheet-mask"><section className="confirmation-sheet" role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><small>{t.confirmAddTitle}</small><h2 id="confirmation-title">{text(pendingItem.product.name, lang)}</h2>{pendingItem.options.length > 0 && <div className="confirmation-options">{pendingItem.options.map((option) => <p key={`${option.groupId}-${option.valueId}`}><span>{text(option.label, lang)}</span><b>{text(option.value, lang)}</b></p>)}</div>}<div className="confirmation-quantity"><span>{t.quantity}</span><div><button type="button" aria-label={t.decreaseQuantity} onClick={() => setPendingQuantity((value) => Math.max(1, value - 1))}>−</button><b>{pendingQuantity}</b><button type="button" aria-label={t.increaseQuantity} onClick={() => setPendingQuantity((value) => value + 1)}>+</button></div></div><div className="confirmation-total"><span>{t.total}</span><strong>{money(pendingItem.unitPrice * pendingQuantity)}</strong></div><div className="confirmation-actions"><button type="button" className="cancel-add" onClick={() => setPendingItem(null)}>{t.cancel}</button><button type="button" className="confirm-add" onClick={confirmAdd}>{t.confirmAdd}</button></div></section></div>}
  </main>;
}

function OptionGroup({ title, options, choices, toggle, formatOption, min, max, lang, t }) {
  const choiceHint = t.optionHint(min, max);
  return <div className="option-group"><label>{text(title, lang)}{choiceHint}</label><div>{options.map((option) => <button type="button" className={choices.some((choice) => choice.id === option.id) ? 'selected' : ''} onClick={() => toggle(option)} key={option.id}>{formatOption ? formatOption(option) : text(option.name || option.label, lang)}</button>)}</div></div>;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap');
*{box-sizing:border-box}html{scroll-behavior:smooth}.shop{--ink:#432819;--brown:#61351f;--caramel:#b96b35;--cream:#fff6e7;--paper:#fffaf0;--line:#e8cfad;--muted:#7e604b;position:relative;isolation:isolate;min-height:100vh;padding-bottom:132px;background:radial-gradient(circle at 10% 8%,#fffdf5 0 4%,transparent 27%),radial-gradient(circle at 85% 18%,#f2c98773 0 3%,transparent 30%),linear-gradient(135deg,#fff8eb,#f7e4c6 62%,#f4d6ad);color:var(--ink);font-family:'Noto Sans SC',sans-serif;overflow:hidden}.shop::before{content:'';position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse at 50% 30%,#fff9e9b3,transparent 44%),repeating-linear-gradient(0deg,transparent 0 4px,#7b471005 5px 6px);pointer-events:none}.hero{height:524px;position:relative;overflow:hidden;padding:20px;background:linear-gradient(90deg,#fff0d4f2 0%,#f7d6a999 49%,#4b2b1975 100%),url('/assets/products/jojo-waffle-hero-drinks.jpg') center/cover;box-shadow:inset 0 -22px 30px #73411b12}.hero:after,.hero::before{display:none}.hero-top{position:relative;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.brand-logo{display:block;width:auto;height:84px;object-fit:contain;filter:drop-shadow(0 3px 7px #4f2e1f2e)}.language-toggle{display:flex;align-items:center;gap:6px;padding:6px 8px;border:1px solid #f3d8af;background:#fff8e8db;border-radius:999px;color:#704125;font:700 11px 'DM Sans','Noto Sans SC',sans-serif;box-shadow:0 5px 14px #4f2e1f17}.language-toggle button{border:0;background:transparent;color:#704125;padding:3px 4px;font:inherit;cursor:pointer}.language-toggle button.active{color:#3f2415;text-decoration:underline;text-underline-offset:3px}.language-toggle span{color:#b67b4c}.hero-copy{position:relative;z-index:2;margin-top:75px;width:min(64%,285px)}.hero-copy p,.section-heading small,.option-sheet small{display:block;color:#a15e35;font-size:10px;font-weight:700;letter-spacing:1.35px}.hero-copy h1{margin:10px 0 13px;font:500 46px/1.08 'Playfair Display','Noto Sans SC',serif;letter-spacing:-1.2px}.hero-copy h1 strong{font-weight:700}.hero-copy h1 em{font-family:'Playfair Display','Noto Sans SC',serif;font-style:italic;color:#7a3f21}.hero-feature{display:inline-flex;margin:0 0 17px;padding:7px 10px;border:1px solid #f7ddb1;background:#fff8e5d9;color:#5f3420;font:700 11px/1 'DM Sans','Noto Sans SC',sans-serif;letter-spacing:.25px}.hero-copy a,.checkout,.add-confirm,.confirm-add{display:inline-flex;align-items:center;gap:11px;background:var(--ink);color:#fffaf2;padding:14px 18px;border:0;border-radius:999px;text-decoration:none;font-size:13px;font-weight:600;box-shadow:0 8px 15px #4b28182b;cursor:pointer}.hero-copy a b{font-size:17px}.hero-chips{display:flex;gap:7px;overflow-x:auto;padding:13px 20px 2px;scrollbar-width:none}.hero-chips span{flex:none;border:1px solid #e1bc90;border-radius:7px 12px 8px 11px;background:#fff9edc7;padding:7px 9px;color:#68452e;font-size:10px;font-weight:700;box-shadow:2px 3px 0 #a6693517}.category-tabs{position:sticky;z-index:8;top:0;display:flex;gap:8px;overflow:auto;padding:11px 14px;background:#fff8e9ee;border-bottom:1px solid #e4c79f;backdrop-filter:blur(10px);scrollbar-width:none}.category-tabs a{flex:none;padding:8px 12px;border:1px solid #d9bd91;border-radius:5px 11px 7px 10px;background:linear-gradient(135deg,#f6e3bf,#efd3a3);box-shadow:1px 2px 0 #9c5c2114;color:#704a33;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap}.category-tabs a:first-child{background:#492a19;border-color:#492a19;color:#fff9ed;box-shadow:2px 3px 0 #9b60332b}.order-tip{display:flex;gap:9px;align-items:start;margin:14px 20px 0;padding:12px 13px;background:#fffdf5c9;border:1px solid var(--line);border-radius:10px 15px 11px 13px;box-shadow:0 8px 22px #6b3d1509;font-size:11px;line-height:1.55}.order-tip b{flex:none;color:#8c512e}.order-tip span{color:var(--muted)}.menu-section{padding:34px 20px 0;scroll-margin-top:58px}.section-heading{display:flex;justify-content:space-between;align-items:end;margin-bottom:15px}.section-heading h2{margin:4px 0 0;font:500 28px/1.15 'Playfair Display','Noto Sans SC',serif;letter-spacing:0}.section-heading>span{font:600 11px 'DM Sans','Noto Sans SC';color:#926342}.card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.product-card{overflow:hidden;background:var(--paper);border:1px solid #efdfcd;border-radius:13px 18px 14px 17px;box-shadow:0 8px 18px #6d3d1910}.product-photo{height:166px;position:relative;background:#ead0a5;overflow:hidden}.product-photo img{display:block;width:100%;height:100%;object-fit:cover}.product-photo span,.series-photo span{position:absolute;top:8px;left:8px;padding:4px 7px;border-radius:5px 10px 6px 9px;background:#fff6e8ed;color:#75401f;box-shadow:1px 2px 0 #8f512126;font-size:9px;font-weight:700}.product-info{padding:11px 10px 12px}.product-info h3{margin:0;font-size:13px;line-height:1.4;font-weight:700}.product-info p{margin:4px 0 8px;color:var(--muted);font-size:10px;line-height:1.45;min-height:29px}.product-info>div{display:flex;align-items:center;justify-content:space-between;gap:5px}.product-info b{font:700 14px 'DM Sans';color:#4c2b1a}.product-info button{min-height:31px;padding:0 9px;border:0;border-radius:7px 10px 8px 9px;background:#f2d3a8;color:#5f331e;font:700 10px 'Noto Sans SC';cursor:pointer}.product-info button:active{background:#d99153;color:white}.drink-list{display:grid;gap:10px}.drink-card{display:flex;min-height:112px;border-radius:14px 20px 15px 18px}.drink-card .product-photo{width:103px;height:auto;flex:none;background:linear-gradient(140deg,#d8bc93,#b77a51)}.drink-card .product-info{display:flex;flex:1;flex-direction:column;justify-content:center}.drink-card .product-info p{min-height:auto;margin-bottom:6px}.image-fallback{display:grid;width:100%;height:100%;place-items:center;background:linear-gradient(135deg,#efd8af,#ad6c44);color:#fff6e6;font:700 32px 'Noto Sans SC'}.drink-fallback{background:radial-gradient(circle at 33% 20%,#fff6df 0 6%,transparent 7%),linear-gradient(135deg,#a96e45,#70432e);font-size:34px}.feature-section{margin:28px 12px 0;padding:22px 8px 8px;border:1px solid #e8c38d;border-radius:20px 25px 17px 23px;background:linear-gradient(135deg,#f4d39e,#f9e8c9 64%,#f3d3a8);box-shadow:0 13px 25px #7d46161a}.feature-section .section-heading{padding:0 12px}.feature-section .section-heading>span{max-width:110px;text-align:right;font:600 10px/1.4 'Noto Sans SC';color:#86512f}.feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:0 4px}.feature-grid .series-card{grid-column:auto;grid-template-columns:1fr}.feature-grid .product-photo,.feature-grid .series-photo{height:158px!important;border-radius:12px}.series-card{grid-column:1/-1;display:grid;grid-template-columns:122px 1fr;gap:12px;overflow:hidden;padding:11px;border:1px solid #ead5bd;border-radius:15px 20px 16px 19px;background:#fffaf0;box-shadow:0 9px 19px #6d3d1912}.series-card .series-photo{position:relative;height:168px!important;min-height:0;align-self:start;overflow:hidden;border-radius:11px;background:#ead0a5}.series-photo img{display:block;width:100%;height:100%;object-fit:cover}.series-content{min-width:0}.series-heading{display:flex;justify-content:space-between;gap:9px;align-items:start}.series-heading h3{margin:0;font-size:16px}.series-heading p{margin:4px 0 10px;color:var(--muted);font-size:10px;line-height:1.5}.series-heading>b{flex:none;color:#87502d;font:700 11px 'DM Sans'}.series-selected{display:flex;align-items:center;gap:6px;margin:7px 0;color:var(--ink);font-size:11px}.series-selected span{padding:3px 6px;border-radius:5px 10px 6px 9px;background:#f2e3d0;color:#8a5837;font-size:9px}.series-selected b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.toggle-options{width:100%;min-height:33px;padding:0 10px;border:1px dashed var(--line);border-radius:7px 11px 8px 10px;background:#fff8e8;color:var(--brown);font:600 11px 'Noto Sans SC';cursor:pointer}.series-options{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}.series-options button{display:flex;align-items:center;gap:5px;min-height:34px;padding:0 8px;border:1px solid var(--line);border-radius:7px 10px 8px 9px;background:white;color:var(--ink);font:500 10px 'Noto Sans SC';cursor:pointer}.series-options button b{font:600 10px 'DM Sans'}.series-options button.selected{background:var(--ink);border-color:var(--ink);color:#fff8ed}.series-action{display:flex;justify-content:space-between;align-items:center;margin-top:11px}.series-action strong{font:700 15px 'DM Sans'}.series-action button{min-height:37px;padding:0 13px;border:0;border-radius:8px 11px 9px 10px;background:var(--brown);color:white;font:600 11px 'Noto Sans SC';cursor:pointer}.footer-note{margin:34px 20px 0;padding:21px 0 25px;border-top:1px dashed #c99c6b;font-size:12px}.footer-note b{display:block}.footer-note span{display:block;margin-top:5px;color:var(--muted);font-size:11px}.cart-dock{position:fixed;z-index:10;left:12px;right:12px;bottom:max(10px,env(safe-area-inset-bottom));overflow:hidden;border:1px solid #8d5331;border-radius:13px 18px 14px 16px;background:linear-gradient(135deg,#3e2316,#5a3420);color:#fffaf0;box-shadow:0 14px 30px #3d20145e}.cart-bar{display:flex;align-items:center;width:100%;min-height:64px;padding:0 17px;border:0;background:none;color:inherit;font:600 14px 'Noto Sans SC';cursor:pointer}.cart-bar b{display:inline-grid;place-items:center;min-width:19px;height:19px;margin-left:5px;border-radius:50%;background:#d98e53;font-size:10px}.cart-bar strong{margin-left:auto;margin-right:18px;margin-top:12px;font:700 15px 'DM Sans','Noto Sans SC'}.cart-bar i{font-style:normal;font-size:17px}.cart-panel{max-height:74vh;overflow:auto;padding:1px 17px max(15px,env(safe-area-inset-bottom));background:repeating-linear-gradient(0deg,#fffaf0 0 28px,#f8ecd9 29px);border-top:1px dashed #d0a16d;color:var(--ink)}.empty-cart{margin:22px 0;padding:5px 0;color:var(--muted);font-size:13px}.cart-item{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid var(--line)}.cart-item h3{margin:0;font-size:13px}.cart-item p{margin:3px 0;color:var(--muted);font-size:10px}.cart-item b{font:600 12px 'DM Sans'}.quantity{display:flex;align-items:center;gap:9px}.quantity button{width:32px;height:32px;border:0;border-radius:9px;background:#f0dfca;color:#593720;font-size:19px;cursor:pointer}.quantity span{min-width:11px;text-align:center;font:600 13px 'DM Sans'}.pickup{padding:14px 0 3px}.pickup>div:first-child{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.pickup>div:first-child b{font-size:13px}.pickup>div:first-child span{color:var(--muted);font-size:10px;font-weight:600}.pickup-slots{display:flex;gap:7px;overflow:auto;margin-top:10px;padding-bottom:5px}.pickup-slots button,.payment button{flex:none;min-height:34px;padding:0 10px;border:1px solid var(--line);border-radius:8px;background:white;color:var(--ink);font:600 11px 'DM Sans','Noto Sans SC';cursor:pointer}.pickup-slots button.selected,.payment button.selected{background:var(--brown);border-color:var(--brown);color:white}.pickup p,.pickup em{display:block;margin:9px 0 0;color:var(--muted);font-size:11px}.pickup em{color:#a53d2f;font-style:normal}.payment{padding:12px 0 4px;border-top:1px solid var(--line)}.payment>b{display:block;margin-bottom:8px;font-size:13px}.payment>div{display:flex;gap:8px}.cart-totals{display:flex;justify-content:space-between;gap:10px;margin-top:10px;color:var(--muted);font-size:12px}.cart-totals strong{color:var(--ink)}.checkout,.add-confirm{width:100%;min-height:53px;border-radius:8px 12px 9px 11px;justify-content:space-between;margin-top:14px;padding:0 15px}.checkout span{font-family:'DM Sans'}.checkout:disabled,.product-info button:disabled,.series-action button:disabled{cursor:not-allowed;opacity:.55}.sheet-mask{position:fixed;z-index:20;inset:0;display:flex;align-items:end;background:#281609b9}.option-sheet,.confirmation-sheet{width:100%;max-height:91vh;overflow:auto;padding:26px 20px max(21px,env(safe-area-inset-bottom));border:1px solid #e5c391;border-radius:24px 24px 0 0;background:repeating-linear-gradient(0deg,#fffaf0 0 29px,#f9ecd8 30px);box-shadow:0 -9px 26px #2512083b;color:var(--ink);position:relative}.option-sheet::before,.confirmation-sheet::before{content:'JOJO BAKES · TONIGHT ORDER';display:block;margin-bottom:10px;color:#a56637;font:700 9px 'DM Sans','Noto Sans SC';letter-spacing:1.4px}.option-sheet h2,.confirmation-sheet h2{margin:5px 0 17px;font:500 26px 'Playfair Display','Noto Sans SC',serif;letter-spacing:0}.sheet-close{position:absolute;right:17px;top:15px;width:32px;height:32px;border:0;border-radius:50%;background:#efd4ab;color:var(--ink);font-size:22px;cursor:pointer}.option-group{margin:16px 0}.option-group label{display:block;margin-bottom:9px;color:#6d452f;font-size:12px;font-weight:700}.option-group>div{display:flex;flex-wrap:wrap;gap:8px}.option-group button{min-height:42px;padding:0 12px;border:1px solid var(--line);border-radius:7px 11px 8px 10px;background:white;color:var(--ink);font:500 12px 'Noto Sans SC';cursor:pointer}.option-group button.selected{background:var(--ink);border-color:var(--ink);color:#fffaf0}.add-confirm{margin-top:6px}.option-warning{margin:0 0 10px;padding:9px 11px;border-radius:8px;background:#fff0dc;color:#a1432d;font-size:12px;font-weight:600}.confirmation-sheet>small{display:block;color:#a15e35;font-size:10px;font-weight:700;letter-spacing:1.2px}.confirmation-options{padding:11px 13px;border-radius:12px;background:#f4dfbd}.confirmation-options p{display:flex;justify-content:space-between;gap:12px;margin:4px 0;font-size:12px}.confirmation-options span{color:var(--muted)}.confirmation-quantity,.confirmation-total{display:flex;align-items:center;justify-content:space-between;padding:17px 0;border-bottom:1px solid var(--line);font-size:13px}.confirmation-quantity>div{display:flex;align-items:center;gap:14px}.confirmation-quantity button{width:35px;height:35px;border:0;border-radius:10px;background:#f0dfca;color:#593720;font-size:20px;cursor:pointer}.confirmation-quantity b{min-width:12px;text-align:center;font:600 14px 'DM Sans'}.confirmation-total{border-bottom:0}.confirmation-total span{color:var(--muted)}.confirmation-total strong{font:700 19px 'DM Sans'}.confirmation-actions{display:grid;grid-template-columns:1fr 1.45fr;gap:9px;margin-top:8px}.confirmation-actions button{min-height:50px;border-radius:10px;font:600 13px 'Noto Sans SC';cursor:pointer}.cancel-add{border:1px solid var(--line);background:white;color:var(--ink)}.confirm-add{border:0;background:#573520;color:#fffaf1}.toast{position:fixed;z-index:30;left:50%;bottom:92px;transform:translateX(-50%);padding:10px 14px;border-radius:999px;background:#432819;color:#fffaf0;box-shadow:0 10px 24px #3d20144d;font:700 12px 'Noto Sans SC';white-space:nowrap}@media(min-width:720px){.hero{height:545px;padding-left:max(45px,calc((100% - 1040px)/2));padding-right:max(45px,calc((100% - 1040px)/2))}.hero-copy{width:480px;margin-top:105px}.hero-copy h1{font-size:68px}.hero-feature{font-size:13px;padding:8px 12px}.hero-chips{max-width:1040px;margin:auto;padding-left:0;padding-right:0}.category-tabs{justify-content:center}.order-tip,.menu-section,.footer-note{max-width:1040px;margin-left:auto;margin-right:auto}.menu-section{padding-left:0;padding-right:0}.card-grid{grid-template-columns:repeat(3,1fr);gap:17px}.product-photo{height:200px}.drink-list{grid-template-columns:repeat(2,1fr);gap:16px}.feature-section{max-width:1040px;margin-left:auto;margin-right:auto;padding:26px 16px 16px}.feature-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.feature-grid .product-photo,.feature-grid .series-photo{height:190px!important}.series-card{grid-column:span 2;grid-template-columns:180px 1fr}.series-card .series-photo{height:210px!important}.feature-grid .series-card{grid-column:auto;grid-template-columns:1fr}.cart-dock{left:auto;right:25px;width:410px}.option-sheet{width:520px;margin:auto;border-radius:22px}.confirmation-sheet{width:460px;margin:auto;border-radius:22px}.sheet-mask{align-items:center;padding:20px}}
`;

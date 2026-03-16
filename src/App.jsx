import { useMemo, useState } from "react";
import "./App.css";

const WHATSAPP_NUMBER = "601110788823";

const translations = {
  zh: {
    subtitle: "摆摊预订 · 自取下单",
    heroText:
      "现做华夫饼、麻薯华夫饼和饮料。网页会自动显示今天的摆摊地点与可取货时间，直接选餐后 WhatsApp 下单即可。",
    lang: "EN",
    viewMenu: "浏览完整菜单",
    orderNowTop: "立即下单",
    featuredTitle: "招牌推荐",
    featuredText: "先看热卖，再往下快速下单。",
    fullMenuTitle: "完整菜单",
    fullMenuText: "先浏览 waffle、麻薯华夫饼与饮料菜单，再往下快速下单。",
    scheduleTitle: "今日地点与取货时间",
    date: "今日日期",
    time: "预计取货时间",
    day: "星期",
    location: "取货地点",
    closed: "休息 / 不营业",
    closedNote: "星期二休息，请选择其他日期。",
    businessHours: "营业时间",
    businessHoursValue: "6:30 PM - 10:30 PM",
    categoryTitle: "选择类别",
    classicFlavour1: "第一口味",
    classicFlavour2: "第二口味",
    chooseOneOrTwo: "可选 1 到 2 个口味",
    specialItem: "口味",
    nutellaItem: "组合",
    drinksItem: "饮料",
    toppings: "加料",
    sugarLevel: "糖度",
    qty: "数量",
    subtotal: "小计",
    addToOrder: "加入订单",
    noTopping: "不加酱",
    mochiStep1: "Step 1：选择麻薯方式",
    mochiStep2: "Step 2：选择口味等级",
    mochiStep3: "Step 3：选择口味",
    mochiStyleInside: "A) 内烤麻薯",
    mochiStyleOutside: "B) 外夹麻薯",
    sameFlavourError: "第一口味和第二口味不能重复。",
    orderSummary: "订单内容",
    emptyOrder: "还没有加入商品。",
    orderNow: "WhatsApp 下单",
    reminder:
      "所选时间为预计取货时间，若同一时段订单较多，实际等待时间将由 WhatsApp 再确认。",
    orderGuideTitle: "下单方式",
    orderGuide1: "先选日期，系统自动带出地点",
    orderGuide2: "再选类别、口味、数量与加料",
    orderGuide3: "最后按 WhatsApp 下单",
    remove: "删除",
    total: "总计",
    chooseFirst: "请先完成必填选择",
    instagram: "Instagram",
    pickupNoteTitle: "取餐说明",
    pickupNoteText:
      "仅限自取。请先选择日期查看当天摆摊地点。最终取餐时间以 WhatsApp 确认为准。",
    noSecondFlavour: "不选第二口味",
    normalSweet: "正常",
    lessSweet: "少甜",
    flavourLine: "口味",
    footerTag: "让你食指大动的美食",
    footerNote: "仅限自取 · 摆摊地点会根据日期自动显示 · 星期二休息",
    footerHours: "营业时间 6:30 PM – 10:30 PM",
    footerCta: "WhatsApp 下单",
    paymentMethod: "付款方式",
    cashPayment: "现金支付",
    qrPayment: "QR 支付",
    qrNote: "选择 QR 支付后，我们会在 WhatsApp 人工发送收款二维码给你。",
  },
  en: {
    subtitle: "Stall Pre-order · Self Pickup",
    heroText:
      "Fresh waffles, mochi waffles, and drinks made to order. Today’s stall location and available pickup times are shown automatically, so you can order directly via WhatsApp.",
    lang: "中文",
    viewMenu: "Browse Menu",
    orderNowTop: "Order Now",
    featuredTitle: "Best Sellers",
    featuredText: "See the top picks first, then order below.",
    fullMenuTitle: "Full Menu",
    fullMenuText: "Browse our waffle, mochi waffle, and drinks menu before placing your order below.",
    scheduleTitle: "Today’s Location & Pickup Time",
    date: "Today",
    time: "Preferred Pickup Time",
    day: "Day",
    location: "Pickup Location",
    closed: "Closed / Unavailable",
    closedNote: "Tuesday is unavailable. Please choose another date.",
    businessHours: "Business Hours",
    businessHoursValue: "6:30 PM - 10:30 PM",
    categoryTitle: "Choose Category",
    classicFlavour1: "First Flavour",
    classicFlavour2: "Second Flavour",
    chooseOneOrTwo: "Choose 1 or 2 flavours",
    specialItem: "Flavour",
    nutellaItem: "Combination",
    drinksItem: "Drink",
    toppings: "Extra",
    sugarLevel: "Sweetness",
    qty: "Quantity",
    subtotal: "Subtotal",
    addToOrder: "Add to Order",
    noTopping: "No extra sauce",
    mochiStep1: "Step 1: Choose Mochi Style",
    mochiStep2: "Step 2: Choose Price Tier",
    mochiStep3: "Step 3: Choose Flavour",
    mochiStyleInside: "A) Baked Inside",
    mochiStyleOutside: "B) Mochi Outside",
    sameFlavourError: "First and second flavours cannot be the same.",
    orderSummary: "Order Summary",
    emptyOrder: "No items added yet.",
    orderNow: "Order via WhatsApp",
    reminder:
      "Selected time is a preferred pickup time. If multiple orders come in for the same slot, final waiting time will be confirmed via WhatsApp.",
    orderGuideTitle: "How It Works",
    orderGuide1: "Choose a date and location appears automatically",
    orderGuide2: "Pick category, flavour, quantity, and extra",
    orderGuide3: "Then send via WhatsApp",
    remove: "Remove",
    total: "Total",
    chooseFirst: "Please complete the required selections first",
    instagram: "Instagram",
    pickupNoteTitle: "Pickup Note",
    pickupNoteText:
      "Self pickup only. Please select the date to see the stall location. Final pickup time will be confirmed via WhatsApp.",
    noSecondFlavour: "No second flavour",
    normalSweet: "Normal",
    lessSweet: "Less sweet",
    flavourLine: "Flavour",
    footerTag: "Fresh bites worth craving",
    footerNote: "Self pickup only · Stall location changes by date · Tuesday closed",
    footerHours: "Business Hours 6:30 PM – 10:30 PM",
    footerCta: "WhatsApp Order",
    paymentMethod: "Payment Method",
    cashPayment: "Cash Payment",
    qrPayment: "QR Payment",
    qrNote: "If you choose QR payment, we will send you the payment QR manually via WhatsApp.",
  },
};

const instagramUrl = "https://instagram.com/jojo.bakess";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

const pickupSchedule = {
  0: { zh: "Bukit Siput", en: "Bukit Siput" },
  1: { zh: "Jementah", en: "Jementah" },
  2: null,
  3: { zh: "Yayasan", en: "Yayasan" },
  4: { zh: "Kampung Tengah", en: "Kampung Tengah" },
  5: { zh: "Yayasan", en: "Yayasan" },
  6: { zh: "Kampung Tengah", en: "Kampung Tengah" },
};

const weekdayNames = {
  zh: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const pickupTimes = [];
for (let totalMinutes = 18 * 60 + 30; totalMinutes <= 22 * 60 + 30; totalMinutes += 5) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
  pickupTimes.push(`${hour12}:${String(minute).padStart(2, "0")} ${suffix}`);
}

const sugarLevels = [
  { zh: "正常", en: "Normal" },
  { zh: "少甜", en: "Less sweet" },
];

const toppingOptions = [
  { id: "none", zh: "不加酱", en: "No extra sauce", price: 0 },
  { id: "extra_sauce", zh: "加多酱", en: "Extra sauce", price: 1 },
];

const categories = [
  { id: "classic", zh: "经典华夫饼", en: "Classic Waffle" },
  { id: "special", zh: "特别口味", en: "Special Flavours" },
  { id: "nutella", zh: "Nutella 系列", en: "Nutella Series" },
  { id: "mochi", zh: "拉丝麻薯", en: "Mochi Waffle" },
  { id: "drinks", zh: "饮料", en: "Drinks" },
];

const classicItems = [
  { id: "chocolate", zh: "巧克力", en: "Chocolate" },
  { id: "peanut", zh: "花生", en: "Peanut" },
  { id: "strawberry", zh: "草莓", en: "Strawberry" },
  { id: "butter", zh: "牛油", en: "Butter" },
  { id: "honey", zh: "蜜糖", en: "Honey" },
  { id: "kaya", zh: "Kaya", en: "Kaya" },
];
const CLASSIC_PRICE = 5;

const specialItems = [
  { id: "pistachio", zh: "Pistachio 开心果", en: "Pistachio", price: 11 },
  { id: "pistachio_choco", zh: "开心果 + 巧克力", en: "Pistachio + Chocolate", price: 13 },
  { id: "coffee_peanut", zh: "咖啡花生", en: "Coffee Peanut", price: 6 },
  { id: "coffee_choco", zh: "咖啡巧克力", en: "Coffee Chocolate", price: 6 },
  { id: "taro", zh: "Taro 芋泥", en: "Taro", price: 8 },
  { id: "peanut_crush", zh: "花生 + 花生碎", en: "Peanut + Peanut Crumbs", price: 6 },
  { id: "choco_oreo", zh: "巧克力 + Oreo", en: "Chocolate + Oreo", price: 7 },
  { id: "choco_lotus", zh: "巧克力 + Lotus", en: "Chocolate + Lotus", price: 7 },
  { id: "cookies_cream", zh: "Cookies & Cream Oreo", en: "Cookies & Cream Oreo", price: 7 },
  { id: "matcha", zh: "抹茶", en: "Matcha", price: 8 },
  { id: "matcha_choco", zh: "抹茶巧克力", en: "Matcha Chocolate", price: 9 },
  { id: "matcha_oreo", zh: "抹茶 + Oreo", en: "Matcha + Oreo", price: 10 },
  { id: "chicken_floss", zh: "鸡肉松美乃滋", en: "Chicken Floss Mayo", price: 8 },
  { id: "taro_floss", zh: "芋泥 + 鸡肉松", en: "Taro + Chicken Floss", price: 10 },
  { id: "double_lotus", zh: "Double Lotus Biscoff", en: "Double Lotus Biscoff", price: 10 },
  { id: "apam_balik", zh: "Apam Balik", en: "Apam Balik", price: 8 },
];

const nutellaItems = [
  { id: "nutella", zh: "Nutella", en: "Nutella", price: 8 },
  { id: "nutella_choco", zh: "Nutella + 巧克力", en: "Nutella + Chocolate", price: 9 },
  { id: "nutella_strawberry", zh: "Nutella + 草莓", en: "Nutella + Strawberry", price: 9 },
  { id: "nutella_peanut", zh: "Nutella + 花生", en: "Nutella + Peanut", price: 9 },
  { id: "nutella_kaya", zh: "Nutella + Kaya", en: "Nutella + Kaya", price: 9 },
  { id: "nutella_butter", zh: "Nutella + 牛油", en: "Nutella + Butter", price: 9 },
  { id: "nutella_honey", zh: "Nutella + 蜜糖", en: "Nutella + Honey", price: 9 },
  { id: "nutella_matcha", zh: "Nutella + 抹茶", en: "Nutella + Matcha", price: 10 },
  { id: "nutella_oreo", zh: "Nutella + Oreo", en: "Nutella + Oreo", price: 10 },
  { id: "nutella_lotus_sauce", zh: "Nutella + Lotus 酱", en: "Nutella + Lotus Spread", price: 11 },
  { id: "nutella_lotus_crumbs", zh: "Nutella + Lotus 碎", en: "Nutella + Lotus Crumbs", price: 10 },
];

const drinksItems = [
  { id: "matcha_choco", zh: "抹茶 Choco", en: "Matcha Choco", price: 10 },
  { id: "strawberry_matcha", zh: "草莓抹茶", en: "Strawberry Matcha", price: 10 },
  { id: "matcha_latte", zh: "抹茶拿铁", en: "Matcha Latte", price: 9 },
  { id: "orange_matcha", zh: "香橙抹茶", en: "Orange Matcha", price: 10 },
  { id: "strawberry_cocoa", zh: "草莓可可", en: "Strawberry Cocoa", price: 8 },
  { id: "jasmine_matcha", zh: "茉莉抹茶", en: "Jasmine Matcha", price: 10 },
  { id: "coconut_matcha", zh: "冰椰抹茶", en: "Coconut Matcha", price: 8 },
  { id: "matcha_honey", zh: "抹茶 Honey", en: "Matcha Honey", price: 9 },
  { id: "cocoa_only", zh: "可可而已", en: "Cocoa Only", price: 6 },
];

const mochiTiers = {
  classic: { id: "classic", labelZh: "经典 RM8", labelEn: "Classic RM8", price: 8, options: classicItems },
  special: {
    id: "special", labelZh: "特别 RM10", labelEn: "Special RM10", price: 10,
    options: [
      { id: "m_matcha", zh: "抹茶", en: "Matcha" },
      { id: "m_nutella", zh: "Nutella", en: "Nutella" },
      { id: "m_cookies_cream", zh: "Cookies & Cream Oreo", en: "Cookies & Cream Oreo" },
      { id: "m_taro", zh: "Taro", en: "Taro" },
      { id: "m_apam_balik", zh: "Apam Balik", en: "Apam Balik" },
    ],
  },
  premium: {
    id: "premium", labelZh: "Premium RM12", labelEn: "Premium RM12", price: 12,
    options: [
      { id: "m_taro_floss", zh: "芋泥肉松麻薯", en: "Taro Chicken Floss Mochi" },
      { id: "m_nutella_matcha", zh: "Nutella Matcha", en: "Nutella Matcha" },
      { id: "m_lotus_crumbs", zh: "Lotus + Crumbs", en: "Lotus + Crumbs" },
    ],
  },
};

const featuredItems = [
  { image: "/images/mochi-waffle.jpeg", titleZh: "Mochi Waffle", titleEn: "Mochi Waffle" },
  { image: "/images/pistachio-waffle.jpeg", titleZh: "开心果华夫饼", titleEn: "Pistachio Waffle" },
  { image: "/images/strawberry-matcha.jpeg", titleZh: "草莓抹茶", titleEn: "Strawberry Matcha" },
  { image: "/images/double-lotus-waffle.jpeg", titleZh: "Double Lotus", titleEn: "Double Lotus" },
];

const menuGallery = [
  { image: "/menu/waffle-menu.jpeg", zh: "Waffle Menu", en: "Waffle Menu" },
  { image: "/menu/mochi-menu.jpeg", zh: "Mochi Waffle Menu", en: "Mochi Waffle Menu" },
  { image: "/menu/drinks-menu.jpeg", zh: "Drinks Menu", en: "Drinks Menu" },
];

function formatPrice(value) { return `RM${value}`; }
function getText(lang, item) { return lang === "zh" ? item.zh : item.en; }
function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function roundUpToNextFiveMinutes(totalMinutes) {
  return Math.ceil(totalMinutes / 5) * 5;
}

function getAvailablePickupTimes(dateStr, allTimes) {
  if (!dateStr) return allTimes;

  const now = new Date();
  const selectedDate = new Date(`${dateStr}T00:00:00`);

  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  if (!isToday) return allTimes;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const earliestMinutes = roundUpToNextFiveMinutes(currentMinutes + 10);

  return allTimes.filter((time) => {
    const [timePart, suffix] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);

    if (suffix === "PM" && hour !== 12) hour += 12;
    if (suffix === "AM" && hour === 12) hour = 0;

    const total = hour * 60 + minute;
    return total >= earliestMinutes;
  });
}

function getPickupDetails(dateStr, lang) {
  if (!dateStr) return { dayIndex: null, dayLabel: "-", locationLabel: "-", closed: false };
  const date = new Date(`${dateStr}T12:00:00`);
  const dayIndex = date.getDay();
  const dayLabel = weekdayNames[lang][dayIndex];
  const location = pickupSchedule[dayIndex];
  const closed = location === null;
  const locationLabel = closed ? translations[lang].closed : getText(lang, location);
  return { dayIndex, dayLabel, locationLabel, closed };
}
function buildOrderMessage({ lang, items, pickupDate, pickupTime, pickupDay, pickupLocation, paymentMethod }) {
  const t = translations[lang];
  const lines = [];
  lines.push(lang === "zh" ? "Hi JojoBakes，我想下单：" : "Hi JojoBakes, I would like to place an order:");
  lines.push("");
  lines.push(`${t.date}: ${pickupDate}`);
  lines.push(`${t.day}: ${pickupDay}`);
  lines.push(`${t.location}: ${pickupLocation}`);
  lines.push(`${t.time}: ${pickupTime}`);
  lines.push("");
  lines.push(lang === "zh" ? "订单内容：" : "Order Items:");
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title}`);
    if (item.extraLine) lines.push(`   ${item.extraLine}`);
    if (item.toppingLine) lines.push(`   ${item.toppingLine}`);
    if (item.sugarLine) lines.push(`   ${item.sugarLine}`);
    lines.push(`   ${t.qty}: ${item.quantity}`);
    lines.push(`   ${t.subtotal}: ${formatPrice(item.subtotal)}`);
  });
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  lines.push("");
  lines.push(`${t.paymentMethod}: ${paymentMethod === "qr" ? t.qrPayment : t.cashPayment}`);
  lines.push(`${t.total}: ${formatPrice(total)}`);
  lines.push("");
  lines.push(t.reminder);
  return lines.join("\n");
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const pickupDate = getTodayString();
  const [pickupTime, setPickupTime] = useState(pickupTimes[0]);
  const [category, setCategory] = useState("classic");
  const [classicFlavour1, setClassicFlavour1] = useState(classicItems[0].id);
  const [classicFlavour2, setClassicFlavour2] = useState("");
  const [selectedSpecial, setSelectedSpecial] = useState(specialItems[0].id);
  const [selectedNutella, setSelectedNutella] = useState(nutellaItems[0].id);
  const [selectedDrink, setSelectedDrink] = useState(drinksItems[0].id);
  const [selectedTopping, setSelectedTopping] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const [drinkSugar, setDrinkSugar] = useState(sugarLevels[0].en);
  const [mochiStyle, setMochiStyle] = useState("inside");
  const [mochiTier, setMochiTier] = useState("classic");
  const [selectedMochiOption1, setSelectedMochiOption1] = useState(mochiTiers.classic.options[0].id);
  const [selectedMochiOption2, setSelectedMochiOption2] = useState("");
  const [mochiQuantity, setMochiQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const t = translations[lang];
  const pickupDetails = useMemo(() => getPickupDetails(pickupDate, lang), [pickupDate, lang]);
  const availablePickupTimes = useMemo(() => {
    return getAvailablePickupTimes(pickupDate, pickupTimes);
  }, [pickupDate]);
  const noAvailableTime = availablePickupTimes.length === 0;
  const todayOnlyInvalid = false;
  const effectivePickupTime = availablePickupTimes.includes(pickupTime)
    ? pickupTime
    : availablePickupTimes[0] || "";
  const selectedToppingObj = toppingOptions.find((item) => item.id === selectedTopping) || toppingOptions[0];

  const activeItem = useMemo(() => {
    if (category === "special") return specialItems.find((item) => item.id === selectedSpecial);
    if (category === "nutella") return nutellaItems.find((item) => item.id === selectedNutella);
    if (category === "drinks") return drinksItems.find((item) => item.id === selectedDrink);
    return null;
  }, [category, selectedSpecial, selectedNutella, selectedDrink]);

  const currentSubtotal = useMemo(() => {
    if (category === "classic") return (CLASSIC_PRICE + selectedToppingObj.price) * quantity;
    if (!activeItem) return 0;
    if (category === "drinks") return activeItem.price * quantity;
    return (activeItem.price + selectedToppingObj.price) * quantity;
  }, [category, activeItem, selectedToppingObj.price, quantity]);

  const currentMochiTier = mochiTiers[mochiTier];
  const currentMochiSubtotal = currentMochiTier.price * mochiQuantity;

  function handleCategoryChange(nextCategory) {
    setCategory(nextCategory);
    setQuantity(1);
    setSelectedTopping("none");
  }
  function handleMochiTierChange(nextTier) {
    setMochiTier(nextTier);
    setSelectedMochiOption1(mochiTiers[nextTier].options[0].id);
    setSelectedMochiOption2("");
  }
  function ensureDifferentFlavours(first, second) {
    return second === "" || first !== second;
  }

  function addCurrentItem() {
    if (category === "classic") {
      if (!ensureDifferentFlavours(classicFlavour1, classicFlavour2)) {
        alert(t.sameFlavourError);
        return;
      }
      const flavour1 = classicItems.find((item) => item.id === classicFlavour1);
      const flavour2 = classicItems.find((item) => item.id === classicFlavour2);
      setOrderItems((prev) => [...prev, {
        id: `classic-${classicFlavour1}-${classicFlavour2}-${Date.now()}`,
        title: `${getText(lang, categories.find((c) => c.id === "classic"))}`,
        extraLine: `${t.flavourLine}: ${getText(lang, flavour1)}${flavour2 ? ` + ${getText(lang, flavour2)}` : ""}`,
        toppingLine: selectedToppingObj.price > 0 ? `${t.toppings}: ${getText(lang, selectedToppingObj)} (+${formatPrice(selectedToppingObj.price)})` : null,
        sugarLine: null, quantity, subtotal: currentSubtotal,
      }]);
      setQuantity(1); setSelectedTopping("none"); return;
    }
    if (!activeItem) { alert(t.chooseFirst); return; }
    setOrderItems((prev) => [...prev, {
      id: `${category}-${activeItem.id}-${Date.now()}`,
      title: `${getText(lang, categories.find((c) => c.id === category))} - ${getText(lang, activeItem)}`,
      extraLine: null,
      toppingLine: category !== "drinks" && selectedToppingObj.price > 0 ? `${t.toppings}: ${getText(lang, selectedToppingObj)} (+${formatPrice(selectedToppingObj.price)})` : null,
      sugarLine: category === "drinks" ? `${t.sugarLevel}: ${lang === "zh" ? (drinkSugar === "Normal" ? t.normalSweet : t.lessSweet) : drinkSugar}` : null,
      quantity, subtotal: currentSubtotal,
    }]);
    setQuantity(1); setSelectedTopping("none");
  }

  function addMochiItem() {
    if (mochiTier === "classic" && !ensureDifferentFlavours(selectedMochiOption1, selectedMochiOption2)) {
      alert(t.sameFlavourError); return;
    }
    const option1 = currentMochiTier.options.find((item) => item.id === selectedMochiOption1);
    const option2 = currentMochiTier.options.find((item) => item.id === selectedMochiOption2);
    setOrderItems((prev) => [...prev, {
      id: `mochi-${selectedMochiOption1}-${selectedMochiOption2}-${Date.now()}`,
      title: `${getText(lang, categories.find((c) => c.id === "mochi"))}`,
      extraLine: `${lang === "zh" ? "麻薯方式" : "Mochi Style"}: ${mochiStyle === "inside" ? t.mochiStyleInside : t.mochiStyleOutside} · ${lang === "zh" ? currentMochiTier.labelZh : currentMochiTier.labelEn} · ${t.flavourLine}: ${getText(lang, option1)}${option2 ? ` + ${getText(lang, option2)}` : ""}`,
      toppingLine: null, sugarLine: null, quantity: mochiQuantity, subtotal: currentMochiSubtotal,
    }]);
    setMochiQuantity(1);
  }

  function removeOrderItem(id) {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleWhatsAppCheckout() {
    if (pickupDetails.closed || orderItems.length === 0) {
      alert(lang === "zh" ? "请先完成日期和商品。" : "Please complete date and items first.");
      return;
    }
    const message = buildOrderMessage({ lang, items: orderItems, pickupDate, pickupTime, pickupDay: pickupDetails.dayLabel, pickupLocation: pickupDetails.locationLabel });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  }

  const orderTotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="page-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <header className="hero-card">
        <div className="hero-topbar">
          <img src="/logo.png" alt="JojoBakes Logo" className="brand-logo" />
          <button className="lang-button" onClick={() => setLang((prev) => (prev === "zh" ? "en" : "zh"))}>{t.lang}</button>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{t.subtitle}</p>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <a href="#menu-gallery" className="primary-link">{t.viewMenu}</a>
            <a href="#order-section" className="secondary-link">{t.orderNowTop}</a>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img src="/images/mochi-waffle.jpeg" alt="Mochi Waffle" className="hero-image" />
        </div>
      </header>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>{t.featuredTitle}</h3>
          <p>{t.featuredText}</p>
          <div className="featured-grid">
            {featuredItems.map((item) => (
              <div className="featured-item" key={item.image}>
                <img src={item.image} alt={lang === "zh" ? item.titleZh : item.titleEn} />
                <strong>{lang === "zh" ? item.titleZh : item.titleEn}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-card">
          <h3>{t.orderGuideTitle}</h3>
          <ul className="guide-list">
            <li>{t.orderGuide1}</li>
            <li>{t.orderGuide2}</li>
            <li>{t.orderGuide3}</li>
          </ul>
          <div className="social-block">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="instagram-link">{t.instagram}: @jojo.bakess</a>
          </div>
          <div className="pickup-note">
            <h4>{t.pickupNoteTitle}</h4>
            <p>{t.pickupNoteText}</p>
          </div>
        </div>
      </section>

      <section className="section-card" id="menu-gallery">
        <div className="section-head"><h2>{t.fullMenuTitle}</h2></div>
        <p className="section-intro">{t.fullMenuText}</p>
        <div className="menu-grid">
          {menuGallery.map((item) => (
            <a className="menu-card" href={item.image} target="_blank" rel="noreferrer" key={item.image}>
              <img src={item.image} alt={getText(lang, item)} />
              <p>{getText(lang, item)}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="section-head"><h2>{t.scheduleTitle}</h2></div>
        <div className="schedule-grid">
          <div className="info-box">
            <small>{t.date}</small>
            <strong>{pickupDate}</strong>
          </div>
          <label className="field">
            <span>{t.time}</span>
            <select
              value={effectivePickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              disabled={noAvailableTime || pickupDetails.closed}
            >
              {availablePickupTimes.map((time) => <option value={time} key={time}>{time}</option>)}
            </select>
          </label>
          <div className="info-box">
            <small>{t.day}</small>
            <strong>{pickupDetails.dayLabel}</strong>
          </div>
          <div className={`info-box ${pickupDetails.closed ? "is-closed" : ""}`}>
            <small>{t.location}</small>
            <strong>{pickupDetails.locationLabel}</strong>
          </div>
        </div>
        <div className="hours-row">
          <div className="hours-chip">
            <span>{t.businessHours}</span>
            <strong>{t.businessHoursValue}</strong>
          </div>
        </div>
        {pickupDetails.closed && <p className="closed-note">{t.closedNote}</p>}
        {noAvailableTime && !pickupDetails.closed && !todayOnlyInvalid && (
          <p className="closed-note">
            {lang === "zh"
              ? "今天可预约时间已结束，请选择其他日期。"
              : "Today's pickup slots are no longer available. Please choose another date."}
          </p>
        )}
      </section>

      <section className="section-card" id="order-section">
        <div className="section-head"><h2>{t.categoryTitle}</h2></div>
        <div className="category-grid">
          {categories.map((item) => (
            <button key={item.id} className={`category-button ${category === item.id ? "active" : ""}`} onClick={() => handleCategoryChange(item.id)}>
              {getText(lang, item)}
            </button>
          ))}
        </div>

        {category === "classic" && (
          <div className="builder-card">
            <div className="builder-row two-select-row">
              <label className="field">
                <span>{t.classicFlavour1}</span>
                <select value={classicFlavour1} onChange={(e) => setClassicFlavour1(e.target.value)}>
                  {classicItems.map((item) => <option value={item.id} key={item.id}>{getText(lang, item)}</option>)}
                </select>
              </label>
              <label className="field">
                <span>{t.classicFlavour2}</span>
                <select value={classicFlavour2} onChange={(e) => setClassicFlavour2(e.target.value)}>
                  <option value="">{t.noSecondFlavour}</option>
                  {classicItems.filter((item) => item.id !== classicFlavour1).map((item) => (
                    <option value={item.id} key={item.id}>{getText(lang, item)}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>{t.toppings}</span>
                <select value={selectedTopping} onChange={(e) => setSelectedTopping(e.target.value)}>
                  {toppingOptions.map((item) => <option value={item.id} key={item.id}>{getText(lang, item)}{item.price > 0 ? ` (+${formatPrice(item.price)})` : ""}</option>)}
                </select>
              </label>
            </div>
            <p className="option-hint">{t.chooseOneOrTwo}</p>
            <div className="builder-footer">
              <div className="qty-box">
                <span>{t.qty}</span>
                <div className="stepper">
                  <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                  <strong>{quantity}</strong>
                  <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                </div>
              </div>
              <div className="subtotal-box">
                <span>{t.subtotal}</span>
                <strong>{formatPrice(currentSubtotal)}</strong>
              </div>
              <button className="primary-button" onClick={addCurrentItem}>{t.addToOrder}</button>
            </div>
          </div>
        )}

        {category !== "classic" && category !== "mochi" && (
          <div className="builder-card">
            <div className="builder-row">
              <label className="field field-grow">
                <span>{category === "special" ? t.specialItem : category === "nutella" ? t.nutellaItem : t.drinksItem}</span>
                <select
                  value={category === "special" ? selectedSpecial : category === "nutella" ? selectedNutella : selectedDrink}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (category === "special") setSelectedSpecial(next);
                    if (category === "nutella") setSelectedNutella(next);
                    if (category === "drinks") setSelectedDrink(next);
                  }}
                >
                  {(category === "special" ? specialItems : category === "nutella" ? nutellaItems : drinksItems).map((item) => (
                    <option key={item.id} value={item.id}>{getText(lang, item)} · {formatPrice(item.price)}</option>
                  ))}
                </select>
              </label>

              {category === "drinks" ? (
                <label className="field">
                  <span>{t.sugarLevel}</span>
                  <select value={drinkSugar} onChange={(e) => setDrinkSugar(e.target.value)}>
                    {sugarLevels.map((level) => <option value={level.en} key={level.en}>{lang === "zh" ? level.zh : level.en}</option>)}
                  </select>
                </label>
              ) : (
                <label className="field">
                  <span>{t.toppings}</span>
                  <select value={selectedTopping} onChange={(e) => setSelectedTopping(e.target.value)}>
                    {toppingOptions.map((item) => <option value={item.id} key={item.id}>{getText(lang, item)}{item.price > 0 ? ` (+${formatPrice(item.price)})` : ""}</option>)}
                  </select>
                </label>
              )}
            </div>

            <div className="builder-footer">
              <div className="qty-box">
                <span>{t.qty}</span>
                <div className="stepper">
                  <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                  <strong>{quantity}</strong>
                  <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                </div>
              </div>
              <div className="subtotal-box">
                <span>{t.subtotal}</span>
                <strong>{formatPrice(currentSubtotal)}</strong>
              </div>
              <button className="primary-button" onClick={addCurrentItem}>{t.addToOrder}</button>
            </div>
          </div>
        )}

        {category === "mochi" && (
          <div className="builder-card mochi-card">
            <div className="mochi-step">
              <h3>{t.mochiStep1}</h3>
              <div className="choice-grid two-cols">
                <button className={`choice-button ${mochiStyle === "inside" ? "active" : ""}`} onClick={() => setMochiStyle("inside")}>{t.mochiStyleInside}</button>
                <button className={`choice-button ${mochiStyle === "outside" ? "active" : ""}`} onClick={() => setMochiStyle("outside")}>{t.mochiStyleOutside}</button>
              </div>
            </div>

            <div className="mochi-step">
              <h3>{t.mochiStep2}</h3>
              <div className="choice-grid three-cols">
                <button className={`choice-button ${mochiTier === "classic" ? "active" : ""}`} onClick={() => handleMochiTierChange("classic")}>{lang === "zh" ? mochiTiers.classic.labelZh : mochiTiers.classic.labelEn}</button>
                <button className={`choice-button ${mochiTier === "special" ? "active" : ""}`} onClick={() => handleMochiTierChange("special")}>{lang === "zh" ? mochiTiers.special.labelZh : mochiTiers.special.labelEn}</button>
                <button className={`choice-button ${mochiTier === "premium" ? "active" : ""}`} onClick={() => handleMochiTierChange("premium")}>{lang === "zh" ? mochiTiers.premium.labelZh : mochiTiers.premium.labelEn}</button>
              </div>
            </div>

            <div className="mochi-step">
              <h3>{t.mochiStep3}</h3>
              {mochiTier === "classic" ? (
                <>
                  <div className="builder-row two-select-row">
                    <label className="field">
                      <span>{t.classicFlavour1}</span>
                      <select value={selectedMochiOption1} onChange={(e) => setSelectedMochiOption1(e.target.value)}>
                        {currentMochiTier.options.map((item) => <option value={item.id} key={item.id}>{getText(lang, item)}</option>)}
                      </select>
                    </label>
                    <label className="field">
                      <span>{t.classicFlavour2}</span>
                      <select value={selectedMochiOption2} onChange={(e) => setSelectedMochiOption2(e.target.value)}>
                        <option value="">{t.noSecondFlavour}</option>
                        {currentMochiTier.options.filter((item) => item.id !== selectedMochiOption1).map((item) => (
                          <option value={item.id} key={item.id}>{getText(lang, item)}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <p className="option-hint">{t.chooseOneOrTwo}</p>
                </>
              ) : (
                <label className="field">
                  <span>{t.classicFlavour1}</span>
                  <select value={selectedMochiOption1} onChange={(e) => setSelectedMochiOption1(e.target.value)}>
                    {currentMochiTier.options.map((item) => <option value={item.id} key={item.id}>{getText(lang, item)}</option>)}
                  </select>
                </label>
              )}
            </div>

            <div className="builder-footer">
              <div className="qty-box">
                <span>{t.qty}</span>
                <div className="stepper">
                  <button onClick={() => setMochiQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                  <strong>{mochiQuantity}</strong>
                  <button onClick={() => setMochiQuantity((prev) => prev + 1)}>+</button>
                </div>
              </div>
              <div className="subtotal-box">
                <span>{t.subtotal}</span>
                <strong>{formatPrice(currentMochiSubtotal)}</strong>
              </div>
              <button className="primary-button" onClick={addMochiItem}>{t.addToOrder}</button>
            </div>
          </div>
        )}
      </section>

      <section className="summary-grid">
        <div className="section-card">
          <div className="section-head"><h2>{t.orderSummary}</h2></div>
          {orderItems.length === 0 ? <p className="empty-text">{t.emptyOrder}</p> : (
            <div className="order-list">
              {orderItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <div>
                    <h4>{item.title}</h4>
                    {item.extraLine && <p>{item.extraLine}</p>}
                    {item.toppingLine && <p>{item.toppingLine}</p>}
                    {item.sugarLine && <p>{item.sugarLine}</p>}
                    <small>{t.qty}: {item.quantity}</small>
                  </div>
                  <div className="order-side">
                    <strong>{formatPrice(item.subtotal)}</strong>
                    <button className="remove-button" onClick={() => removeOrderItem(item.id)}>{t.remove}</button>
                  </div>
                </div>
              ))}
              <div className="total-line">
                <span>{t.total}</span>
                <strong>{formatPrice(orderTotal)}</strong>
              </div>
            </div>
          )}
          <div className="payment-card">
            <h3>{t.paymentMethod}</h3>
            <div className="payment-options">
              <button
                type="button"
                className={`choice-button ${paymentMethod === "cash" ? "active" : ""}`}
                onClick={() => setPaymentMethod("cash")}
              >
                {t.cashPayment}
              </button>
              <button
                type="button"
                className={`choice-button ${paymentMethod === "qr" ? "active" : ""}`}
                onClick={() => setPaymentMethod("qr")}
              >
                {t.qrPayment}
              </button>
            </div>
            {paymentMethod === "qr" && (
              <p className="payment-note">{t.qrNote}</p>
            )}
          </div>

          <p className="help-text">{t.reminder}</p>
          <button className="checkout-button" onClick={handleWhatsAppCheckout} disabled={pickupDetails.closed || noAvailableTime}>{t.orderNow}</button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/logo.png" alt="JojoBakes Logo" className="footer-logo" />
          <p>{t.footerTag}</p>
        </div>
        <div className="footer-links">
          <a href={instagramUrl} target="_blank" rel="noreferrer">@jojo.bakess</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.footerCta}</a>
          <p>{t.footerHours}</p>
        </div>
        <div className="footer-note">
          <p>{t.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}
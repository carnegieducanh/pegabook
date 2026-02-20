// ============================================================
// PEGABOOK - Translations Index
//
// Mỗi ngôn ngữ được quản lý trong file riêng:
//   vi.js    → Tiếng Việt
//   ja.js    → 日本語
//   en.js    → English
//   zh-TW.js → 繁體中文
// ============================================================

import vi from "./vi";
import ja from "./ja";
import en from "./en";
import zhTW from "./zh-TW";

const translations = {
  vi,
  ja,
  en,
  "zh-TW": zhTW,
};

export default translations;

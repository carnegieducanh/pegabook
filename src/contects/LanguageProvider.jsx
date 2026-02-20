import { createContext, useContext, useState } from "react";
import translations from "../i18n/translations";

// -------------------------------------------------------
// LanguageContext: cung cấp ngôn ngữ hiện tại và hàm dịch
// cho toàn bộ ứng dụng thông qua React Context API.
// -------------------------------------------------------

export const LanguageContext = createContext();

// Danh sách ngôn ngữ hỗ trợ (dùng để render danh sách chọn)
export const SUPPORTED_LANGUAGES = [
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "zh-TW", flag: "🇹🇼", label: "繁體中文" },
];

const LanguageProvider = ({ children }) => {
  // Đọc ngôn ngữ đã lưu ở localStorage (nếu có), mặc định là "vi"
  const [language, setLanguage] = useState(
    () => localStorage.getItem("pegabook_lang") || "vi"
  );

  // Hàm chuyển ngôn ngữ: cập nhật state + lưu vào localStorage
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("pegabook_lang", langCode);
  };

  // Hàm dịch: t("nav.home") → trả về chuỗi dịch tương ứng
  // Hỗ trợ key lồng nhau (nested), ví dụ: "nav.community"
  const t = (key) => {
    const keys = key.split(".");
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    // Nếu không tìm thấy bản dịch, trả về key gốc để dễ debug
    return result ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook tiện lợi: dùng useLanguage() thay vì useContext(LanguageContext)
export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;

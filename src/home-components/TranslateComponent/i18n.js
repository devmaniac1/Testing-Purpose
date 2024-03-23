import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    // fallbackLng: 'en',
    lng: "en",
    returnObjects: true,
    resources: {
      en: {
        translation: {
          Home: "Home",
          header: {
            line1: "Explore With Lankan Amigo",
            line2:
              "Are you ready to embark on journey of a limetime? At Lankan Amigo,we specialize in crafting unforgettable travel experiences tailored to your desires",
            line3: "Simple as",
            line4: "Budget",
            line5: "Plan",
            line6: "Enjoy",
            line7: "From",
            line8: "To",
            line9: "Date From",
            line10: "Date To",
            line11: "Travel Mode",
            line12: "Bus",
            line13: "Train",
            line14: "Own Vehicle",
            line15: "Budget",
            line16: "ASK AMIGO CHAT",
            line17: "GENERATE PLAN",
            line18: "Plan your trip.",
          },
          services: {
            line1: "Our Popular Services",
            line2: "Bilingual Experience",
            line3: "Amigo chat",
            line4: "Personalized Recommendations",
            line5: "Location Filtering",
            line6: "Real Time Events",
          },
          howItWorks: {
            line1: "How Lankan Amigo Works",
            line2: "Its easy as 1,2,3",
          },
          popularDestination: {
            line1: "Popular Destinations",
            line2: "Have a look at our popular destinations.",
            line3: "",
            line4: "",
          },
        },
      },
      si: {
        translation: {
          Home: "ගෙදර",
          header: {
            line1: "Lanka Amigo සමඟ ගවේෂණය කරන්න",
            line2:
              "ඔබ සුදානම්ද? ලංකන් ඇමිගෝ හි,අමතක නොවන සංචාරක අත්දැකීම් සකස් කිරීම සඳහා අපි විශේෂීකරණය කරමු ඔබේ ආශාවන්ට",
            line3: "සරල ලෙස",
            line4: "අයවැය",
            line5: "සැලසුම් කරන්න",
            line6: "භුක්ති විඳින්න",
            line7: "සිට",
            line8: "දක්වා",
            line9: "දින සිට",
            line10: "දිනය දක්වා",
            line11: "සංචාරක මාදිලිය",
            line12: "බස්",
            line13: "දුම්රිය",
            line14: "තමන්ගේම වාහනයක්",
            line15: "අයවැය",
            line16: "AMIGO වෙතින් අසන්න",
            line17: "සැලැස්ම ජනනය කරන්න",
            line18: "ඔබගේ සංචාරය සැලසුම් කරන්න.",
          },

          services: {
            line1: "අපගේ ජනප්‍රිය සේවාවන්",
            line2: "ද්විභාෂා අත්දැකීම්",
            line3: "Amigo චැට්",
            line4: "පුද්ගලීකරණය කළ නිර්දේශ",
            line5: "ස්ථානය පෙරීම",
            line6: "තත්‍ය කාලීන සිදුවීම්",
          },
          howItWorks: {
            line1: "Lankan Amigo වැඩ කරන හැටි",
            line2: "එය 1,2,3 ලෙස පහසුයි",
          },
          popularDestination: {
            line1: "ජනප්‍රිය ගමනාන්ත",
            line2: "අපගේ ජනප්‍රිය ගමනාන්ත දෙස බලන්න.",
            line3: "",
            line4: "",
          },
        },
      },
    },
  });

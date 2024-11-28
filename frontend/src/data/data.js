import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";

export const regInputs = [
  {
    id: 1,
    placeholder: "Kullanıcı adı",
    icon: BiUser,
    type: "text",
    name: "username",
  },
  {
    id: 2,
    placeholder: "E-Posta",
    icon: BiEnvelope,
    type: "text",
    name: "email",
  },
  {
    id: 3,
    placeholder: "Parola",
    icon: BiLock,
    type: "password",
    name: "password",
  },
];

export const logInputs = [
  {
    id: 1,
    placeholder: "Kullanıcı adı",
    icon: BiUser,
    type: "text",
    name: "username",
  },
  {
    id: 2,
    placeholder: "Parola",
    icon: BiLock,
    type: "password",
    name: "password",
  },
];

export const createForm = [
  {
    id: 1,
    name: "category",
    type: "select",
    label: "Kategori",
    placeholder: "Blog Kategorisi",
    options: [
      {
        value: "",
        label: "Seçiniz",
      },
      {
        value: "teknoloji",
        label: "Teknoloji",
      },
      {
        value: "araç",
        label: "Araç",
      },
      {
        value: "eğitim",
        label: "Eğitim",
      },
      {
        value: "elektrik",
        label: "Elektrik",
      },
      {
        value: "kodlama",
        label: "Kodlama",
      },
    ],
  },
  {
    id: 2,
    name: "title",
    type: "text",
    label: "Başlık",
    placeholder: "Blog Başlığı",
  },
  {
    id: 3,
    name: "imageURL",
    type: "text",
    label: "Görsel",
    placeholder: "Blog Görseli (URL)",
  },
  {
    id: 4,
    name: "content",
    type: "textarea",
    label: "İçerik",
    placeholder: "Blog İçeriği",
  },
];

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

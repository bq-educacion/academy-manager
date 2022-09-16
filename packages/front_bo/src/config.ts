type ILink = {
  label: string;
  href: string;
};

type DropDownItem = {
  label: string;
  key: string;
};

export type ISection = {
  title: string;
  bigTitle: string;
  links: ILink[];
};

export const sections: ISection[] = [
  {
    title: "general.sections.title",
    bigTitle: "general.sections.big-title",
    links: [
      { label: "general.sections.links.dashboard", href: "/dashboard" },
      { label: "general.sections.links.centers", href: "/centers" },
      { label: "general.sections.links.groups", href: "/groups" },
      { label: "general.sections.links.students", href: "/students" },
      { label: "general.sections.links.instructors", href: "/instructors" },
    ],
  },
];

export const courses: DropDownItem[] = [
  { label: "general.courses.1p", key: "1p" },
  { label: "general.courses.2p", key: "2p" },
  { label: "general.courses.3p", key: "3p" },
  { label: "general.courses.4p", key: "4p" },
  { label: "general.courses.5p", key: "5p" },
  { label: "general.courses.6p", key: "6p" },
  { label: "general.courses.1e", key: "1e" },
  { label: "general.courses.2e", key: "2e" },
  { label: "general.courses.3e", key: "3e" },
  { label: "general.courses.4e", key: "4e" },
];

export const Tools: DropDownItem[] = [
  { label: "general.tools.makey", key: "makey" },
  { label: "general.tools.micro", key: "micro" },
  { label: "general.tools.arduino", key: "arduino" },
  { label: "general.tools.3d", key: "3d" },
  { label: "general.tools.zumkit", key: "zumkit" },
];

export const Platforms: DropDownItem[] = [
  { label: "general.platforms.cospace", key: "cospace" },
  { label: "general.platforms.bitbloq", key: "bitbloq" },
  { label: "general.platforms.inventor", key: "inventor" },
  { label: "general.platforms.scratch", key: "scratch" },
  { label: "general.platforms.tinker", key: "tinker" },
];

export const schedule: string[] = [
  "8:00 a 8:59",
  "9:00 a 9:59",
  "10:00 a 10:59",
  "11:00 a 11:59",
  "12:00 a 12:59",
  "13:00 a 13:59",
  "14:00 a 14:59",
  "15:00 a 15:59",
  "16:00 a 16:59",
  "17:00 a 17:59",
  "18:00 a 18:59",
  "19:00 a 19:59",
  "20:00 a 20:59",
];

type zone = {
  name: string;
  zones: string[];
};

export const zones: zone[] = [
  {
    name: "Comunidad de Madrid",
    zones: [
      "Alcalá de Henares",
      "Alcobendas",
      "Alcorcón",
      "Algete",
      "Arganda del Rey",
      "Arroyomolinos",
      "Boadilla del Monte",
      "Braojos",
      "Buitrago del Lozoya",
      "Cabanillas de la Sierra",
      "Cadalso de los Vidrios",
      "Campo Real",
      "Canencia",
      "Cercedilla",
      "Cervera de Buitrago",
      "Chinchón",
      "Collado Mediano",
      "Collado Villalba",
      "Colmenar de Oreja",
      "Colmenar del Arroyo",
      "Colmenar Viejo",
      "Colmenarejo",
      "Corpa",
      "Coslada",
      "El Boalo",
      "El Escorial",
      "El Molar",
      "El Pardo",
      "El Vellón",
      "El Viso del Alcor",
      "Estremera",
      "Fresnedillas de la Oliva",
      "Fresno de Torote",
      "Fuenlabrada",
      "Fuente el Saz de Jarama",
      "Galapagar",
      "Garganta de los Montes",
      "Gargantilla del Lozoya y Pinilla de Buitrago",
      "Getafe",
      "Griñón",
      "Guadalix de la Sierra",
      "Guadarrama",
      "Hiruela (La)",
      "Horcajo de la Sierra-Aoslos",
      "Horcajuelo de la Sierra",
      "Hoyo de Manzanares",
      "Humanes de Madrid",
      "Leganés",
      "Loeches",
      "Lozoya",
      "Lozoyuela-Navas-Sieteiglesias",
      "Madarcos",
      "Madrid",
      "Majadahonda",
    ],
  },
  {
    name: "Extremadura",
    zones: [
      "Badajoz",
      "Cáceres",
      "Mérida",
      "Plasencia",
      "Don Benito",
      "Almendralejo",
      "Villanueva de la Serena",
      "Navalmoral de la Mata",
      "Zafra",
      "Montijo",
    ],
  },
];

export const googleAuthEndpoint =
  "https://accounts.google.com/o/oauth2/v2/auth";

export const googleScopes =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

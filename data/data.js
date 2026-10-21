export const projects = [
  {
    id: "project_1",
    src: "data/picture/projects/project_1.webp",
    alt:   "alt_picture_project_number_1",
    name:  "name_project_number_1",
    description: "description_project_number_1",
    stack: ["HTML", "SCSS (Sass)", "JavaScript", "js-yaml",],
    urlWatch: "https://yolodreamfox.github.io/portfolio/",
    urlCode: "https://github.com/YoLoDreamFox/portfolio",
  },
  {
    id: "project_2",
    src: "data/picture/projects/project_2.webp",
    alt:   "alt_picture_project_number_2",
    name:    "name_project_number_2",
    description: "description_project_number_2",
    stack: ["", "", ""],
    urlWatch: "https://...",
    urlCode: "https://...",
  },
  {
    id: "project_3",
    src: "data/picture/projects/project_3.webp",
    alt:   "alt_picture_project_number_3",
    name:    "name_project_number_3",
    description: "description_project_number_3",
    stack: ["", "", ""],
    urlWatch: "https://...",
    urlCode: "https://...",
  },
];

export const cards = [
  {
    id: "card_id_1",
    name: "name_card_number_1",
    item: [
      {name: "HTML5", level: 20},
      {name: "SCSS", level: 30},
      {name: "Flexbox", level: 40},
      {name: "Grid", level: 50},
      {name: "RWD", level: 60},
    ],
  },
  {
    id: "card_id_2",
    name: "name_card_number_2",
    item: [
      {name: "DOM", level: 20},
      {name: "Fetch", level: 30},
      {name: "Async", level: 40},
      {name: "API", level: 50},
      {name: "Events", level: 60},
    ],
  },
  {
    id: "card_id_3",
    name: "name_card_number_3",
    item: [
      {name: "VS Code", level: 20},
      {name: "Figma", level: 30},
      {name: "Git", level: 40},
      {name: "DevTools", level: 50},
      {name: "Lighthouse", level: 60},
    ],
  },
  {
    id: "card_id_4",
    name: "name_card_number_4",
    item: [
      {name: "Rust", level: 20},
      {name: "Python", level: 30},
      {name: "Animation", level: 40},
      {name: "Art", level: 50},
      {name: "Typesettin", level: 60},
    ],
  },
];

export const experience = [
  {
    id: "experience_id_1",
    name: "name_experience_number_1",
    start: { year: 2024, month: 3, day: 13},
    end:   { year: 2024, month: 11, day: 19},
    description: [
      {type: "type_experience_team", info: "info_experience_number_1"},
      ["li_experience_number_1_par_1","li_experience_number_1_par_2","li_experience_number_1_par_3","li_experience_number_1_par_4"],
      ["Rust","JavaScript","HTML/CSS"],
    ],
  },
    {
    id: "experience_id_2",
    name: "name_experience_number_2",
    start: { year: 2022, month: 7, day: 11},
    end:   { year: 2022, month: 10, day: 8},
    description: [
      {type: "type_experience_team", info: "info_experience_number_2"},
      ["li_experience_number_2_par_1","li_experience_number_2_par_2","li_experience_number_2_par_3"],
      ["Aegisub"],
    ],
  },
]

export const contacts = [
  {
    id: "contact_id_1",
    icon: "fa-brands fa-telegram",
    name: "telegram",
    url: "tg://resolve?domain=YoLoDreamFox",
  },
  {
    id: "contact_id_2",
    icon: "fal fa-envelope",
    name: "mail",
    url: "mailto:mailforwork12@mail.ru",
  },
  {
    id: "contact_id_3",
    icon: "fab fa-github",
    name: "github",
    url: "https://github.com/YoLoDreamFox",
  },
]
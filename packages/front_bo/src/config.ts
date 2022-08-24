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

export const centerLanguages: string[] = ["English", "Spanish"];

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

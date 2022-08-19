type ILink = {
  label: string;
  href: string;
};

export type ISection = {
  title: string;
  links: ILink[];
};

export const sections: ISection[] = [
  {
    title: "general.sections.title",
    links: [
      { label: "general.sections.links.dashboard", href: "/dashboard" },
      { label: "general.sections.links.centers", href: "/centers" },
      { label: "general.sections.links.groups", href: "/groups" },
      { label: "general.sections.links.students", href: "/students" },
      { label: "general.sections.links.monitors", href: "/monitors" },
    ],
  },
];

export const centerLanguages: string[] = ["English", "Spanish"];

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
      { label: "general.sections.links.dashboard", href: "/extra/dashboard" },
      { label: "general.sections.links.centers", href: "/extra/centers" },
      { label: "general.sections.links.groups", href: "/extra/groups" },
      { label: "general.sections.links.students", href: "/extra/students" },
      { label: "general.sections.links.monitors", href: "/extra/monitors" },
    ],
  },
];

export const centerLanguages: string[] = ["English", "Spanish"];

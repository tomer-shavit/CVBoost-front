import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
    target: "_self",
  },
  {
    id: 2,
    title: "Features",
    newTab: false,
    path: "/#features",
    target: "_self",
  },
  {
    id: 3,
    title: "Reviews",
    newTab: false,
    path: "/#reviews",
    target: "_self",
  },
  {
    id: 4,
    title: "FAQ",
    newTab: false,
    path: "/#FAQ",
    target: "_self",
  },
  {
    id: 5,
    title: "Boost",
    newTab: false,
    path: "/boost",
    target: "_self",
  },
  {
    id: 6,
    title: "Feedback",
    newTab: false,
    path: "https://forms.gle/xCH1FKGoR983uxMRA",
    target: "_blank",
  },
  // {
  //   id: 2.1,
  //   title: "Blog",
  //   newTab: false,
  //   path: "/blog",
  // },
  // {
  //   id: 2.3,
  //   title: "Docs",
  //   newTab: false,
  //   path: "/docs",
  // },
  // {
  //   id: 3,
  //   title: "Pages",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 31,
  //       title: "Blog Grid",
  //       newTab: false,
  //       path: "/blog",
  //     },
  //     {
  //       id: 34,
  //       title: "Sign In",
  //       newTab: false,
  //       path: "/auth/signin",
  //     },
  //     {
  //       id: 35,
  //       title: "Sign Up",
  //       newTab: false,
  //       path: "/auth/signup",
  //     },
  //     {
  //       id: 35,
  //       title: "Docs",
  //       newTab: false,
  //       path: "/docs",
  //     },
  //     {
  //       id: 35.1,
  //       title: "Support",
  //       newTab: false,
  //       path: "/support",
  //     },
  //     {
  //       id: 36,
  //       title: "404",
  //       newTab: false,
  //       path: "/error",
  //     },
  //   ],
  // },

  // {
  //   id: 4,
  //   title: "Support",
  //   newTab: false,
  //   path: "/support",
  // },
];

export default menuData;

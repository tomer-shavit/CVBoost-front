export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  target: string;
  submenu?: Menu[];
};

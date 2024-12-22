import { create } from "zustand";

const colorWheel = ["#9055f0", "#ff0058", "#008500"];

interface AppThemeColor {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const appThemeColor = create<AppThemeColor>((set) => ({
  themeColor: colorWheel[Math.floor(Math.random() * colorWheel.length)],
  setThemeColor: (color: string) => {
    set({ themeColor: color });
  },
}));

export const useAppThemeColor = () => {
  const { themeColor, setThemeColor } = appThemeColor();
  return { themeColor, setThemeColor };
};

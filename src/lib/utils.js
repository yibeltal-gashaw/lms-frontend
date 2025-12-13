import  clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { departmentCodeMap } from "@/data/mockdata";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const normalizeDepartment = (dept) => {
  if (!dept) return null;
  const lower = dept.toLowerCase();
  if (departmentCodeMap[lower]) return departmentCodeMap[lower];
  return dept;
};
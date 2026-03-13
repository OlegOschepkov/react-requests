import type { ReactNode } from "react";

export const mapRecordToOptions = <T extends string>(
  record: Record<T, ReactNode>,
) => {
  return (Object.entries(record) as [T, ReactNode][]).map(([value, label]) => ({
    value,
    label,
  }));
};

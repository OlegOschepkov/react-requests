export interface SelectOption {
  value: string;
  label: string;
}

export const mapRecordToOptions = (
  record: Record<string, string>,
): SelectOption[] =>
  Object.entries(record).map(([value, label]) => ({
    value,
    label,
  }));

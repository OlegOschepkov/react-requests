export const mapRecordToOptions = (record: Record<string, string>) =>
  Object.entries(record).map(([value, label]) => ({ value, label }));

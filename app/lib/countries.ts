export const COUNTRIES = [
  { value: "CN", label: "中国" },
];

export const COUNTRY_MAP = Object.fromEntries(
  COUNTRIES.map((c) => [c.value, c.label])
);
export const SPI_RELATIONSHIP_MASTER_SHEET_ID =
  process.env.SPI_RELATIONSHIP_MASTER_SHEET_ID ??
  "1mE1Y2vJ5uKRW-VcQ6oMs9yUhmlwc-q91vXlFp7caMCg";

export const SPI_RELATIONSHIP_MASTER_URL = `https://docs.google.com/spreadsheets/d/${SPI_RELATIONSHIP_MASTER_SHEET_ID}/edit`;

export const BD_TIMEZONE = process.env.BD_TIMEZONE ?? "America/New_York";

export const BD_STALE_CONTACT_DAYS = Number(process.env.BD_STALE_CONTACT_DAYS ?? "30");

export const BUSINESS_DEVELOPMENT_ROLE = "Business Development";

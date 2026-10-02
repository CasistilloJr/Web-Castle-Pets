import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// La ubicación se calcula desde este archivo.
// Así no depende de la carpeta desde donde ejecutes el comando.
const dataDirectory = fileURLToPath(
  new URL("../../data/", import.meta.url)
);

// Crea la carpeta data si todavía no existe.
mkdirSync(dataDirectory, { recursive: true });

// Ubicación del archivo que contendrá la base.
export const databasePath = fileURLToPath(
  new URL("../../data/castle-pets.sqlite", import.meta.url)
);

// Abre la base. Si no existe, la crea.
export const db = new Database(databasePath);

// Activa las relaciones entre tablas.
db.pragma("foreign_keys = ON");

// Mejora la convivencia entre lecturas y escrituras.
db.pragma("journal_mode = WAL");

// Espera hasta 5 segundos si otra operación está escribiendo.
db.pragma("busy_timeout = 5000");
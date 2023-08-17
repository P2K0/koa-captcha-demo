import { readdirSync } from "node:fs";
import { join } from "node:path";

export function useContextFile(path: string): Promise<any[]> {
  return Promise.all(
    readdirSync(path)
      .filter((file: string) => file.endsWith(".ts") && !file.startsWith("index"))
      .map(async (file: string) => (await import(join(path, file))).default)
  );
}

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve, extname } from "node:path";
import { promisify } from "node:util";
import {
  brotliCompress,
  constants as zlibConstants,
} from "node:zlib";

const compress = promisify(brotliCompress);

const compressibleExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);

async function collectFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(entryPath);
      }

      return [entryPath];
    }),
  );

  return nestedFiles.flat();
}

async function compressFile(filePath) {
  const source = await readFile(filePath);

  if (source.byteLength === 0) {
    return false;
  }

  const compressed = await compress(source, {
    params: {
      [zlibConstants.BROTLI_PARAM_MODE]: zlibConstants.BROTLI_MODE_TEXT,
      [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
      [zlibConstants.BROTLI_PARAM_SIZE_HINT]: source.byteLength,
    },
  });

  if (compressed.byteLength >= source.byteLength) {
    return false;
  }

  await writeFile(`${filePath}.br`, compressed);

  return true;
}

async function main() {
  const outputDirectory = resolve(process.cwd(), process.argv[2] ?? "dist");
  const files = await collectFiles(outputDirectory);
  let compressedCount = 0;

  for (const filePath of files) {
    if (filePath.endsWith(".br")) {
      continue;
    }

    if (!compressibleExtensions.has(extname(filePath))) {
      continue;
    }

    if (await compressFile(filePath)) {
      compressedCount += 1;
    }
  }

  console.log(
    `Brotli generated ${compressedCount} sidecar files in ${outputDirectory}`,
  );
}

main().catch((error) => {
  console.error("Brotli compression failed.");
  console.error(error);
  process.exitCode = 1;
});

const fs = require("fs/promises");

async function cat(filePaths, outputFilePath) {
  let output = [];

  for (const path of filePaths) {
    try {
      const stats = await fs.stat(path);

      if (stats.isFile()) {
        const content = await fs.readFile(path, "utf-8");
        output.push(content.trim());
      } else if (stats.isDirectory()) {
        output.push("Is a directory");
      } else {
        output.push("File not found");
      }
    } catch (err) {
      output.push("File not found");
    }
  }

  await fs.writeFile(outputFilePath, output.join("\n"));
}

module.exports = { cat };

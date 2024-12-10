import fs from "fs/promises";
import path from "path";

const STORAGE_PATHS = {
  base: path.join(process.cwd(), "storage"),
  media: path.join(process.cwd(), "storage", "media"),
  temp: path.join(process.cwd(), "storage", "temp"),
};

export async function setupStorage() {
  try {
    console.log("Setting up storage directories...");
    // Create storage directories
    for (const [key, dir] of Object.entries(STORAGE_PATHS)) {
      try {
        await fs.access(dir);
        console.log(`${key} directory exists:`, dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Created ${key} directory:`, dir);
      }
    }

    // Create .gitignore if it doesn't exist
    const gitignorePath = path.join(STORAGE_PATHS.base, ".gitignore");
    try {
      await fs.access(gitignorePath);
    } catch {
      await fs.writeFile(gitignorePath, "*\n!.gitignore\n");
      console.log("Created .gitignore in storage directory");
    }

    console.log("Storage setup completed successfully");
  } catch (error) {
    console.error("Error setting up storage:", error);
    process.exit(1);
  }
}

setupStorage();

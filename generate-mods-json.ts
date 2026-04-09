import fs from 'node:fs';
import { modDefinitionSchema } from './schema/schema';

const modDefinitions = (fs.readdirSync('./mods', { recursive: true }) as string[]).filter(file => file.endsWith('.json'))
  .flatMap(file => {
    const filePath = `./mods/${file}`;
    const modData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validationResult = modDefinitionSchema.safeParse(modData);
    if (!validationResult.success) {
      console.error(`Validation failed for ${file}:`, validationResult.error);
      return [];
    }

    return [validationResult.data];
  });

fs.writeFileSync('./mods.json', JSON.stringify(modDefinitions, null, 2));
import path from 'path';
import fs from 'fs';

/**
 * Basic validation to ensure fileIds don't contain any path traversal
 * characters. Throws an error if an invalid id is provided.
 */
export const sanitizeFileId = (fileId: string) => {
  if (fileId.includes('..') || fileId.includes('/') || fileId.includes('\\')) {
    throw new Error('Invalid file id');
  }

  return fileId;
};

export const getFileDetails = (fileId: string) => {
  const safeId = sanitizeFileId(fileId);
  const fileLoc = path.join(
    process.cwd(),
    './uploads',
    safeId + '-extracted.json',
  );

  const parsedFile = JSON.parse(fs.readFileSync(fileLoc, 'utf8'));

  return {
    name: parsedFile.title,
    fileId: safeId,
  };
};

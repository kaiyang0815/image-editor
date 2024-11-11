interface StoredFile {
  name: string;
  preview: string;
  id: string;
}

export const saveFiles = (files: StoredFile[]) => {
  try {
    localStorage.setItem('uploadedFiles', JSON.stringify(files));
  } catch (error) {
    console.error('Error saving files:', error);
  }
};

export const getStoredFiles = (): StoredFile[] => {
  try {
    const files = localStorage.getItem('uploadedFiles');
    return files ? JSON.parse(files) : [];
  } catch (error) {
    console.error('Error getting files:', error);
    return [];
  }
};

export const getFileByName = (filename: string): StoredFile | null => {
  const files = getStoredFiles();
  return files.find(f => f.name === filename) || null;
}; 
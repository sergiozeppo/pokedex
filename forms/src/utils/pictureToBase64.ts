export const pictureToBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (): void => resolve(reader.result as string);
    reader.onerror = (error): void => reject(error);
    reader.readAsDataURL(file);
  });
};

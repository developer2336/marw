export const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        // For now, we'll return a placeholder since we can't use external PDF libraries
        // In a real implementation, you'd use pdf-parse or similar
        const text = `[PDF Text Extraction]\nFile: ${file.name}\nSize: ${file.size} bytes\n\nNote: Please copy and paste the text content from your PDF into the text area above for now.`;
        resolve(text);
      } catch (error) {
        reject(new Error('Failed to extract text from PDF'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read PDF file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const isValidPDF = (file: File): boolean => {
  return file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024; // 10MB limit
};
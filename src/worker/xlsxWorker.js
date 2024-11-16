importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js');

self.onmessage = function (e) {
  const { data, path } = e.data;

  try {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const result = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
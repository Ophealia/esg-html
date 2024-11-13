importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js');

self.onmessage = function (e) {
  const { data, path } = e.data;

  if (path.endsWith('.xlsx')) {
    try {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      self.postMessage({ result: JSON.stringify(json, null, 2) });
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  } else {
    self.postMessage({ result: new TextDecoder().decode(data) });
  }
};
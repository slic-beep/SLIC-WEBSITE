import Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}

export function exportToXLSX(filename: string, rows: Record<string, any>[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function exportToPDF(filename: string, rows: Record<string, any>[]) {
  const doc = new jsPDF();
  if (rows.length === 0) {
    doc.text("No data", 10, 10);
    doc.save(`${filename}.pdf`);
    return;
  }

  const headers = Object.keys(rows[0]);
  const data = rows.map((r) => headers.map((h) => (r[h] !== undefined && r[h] !== null ? String(r[h]) : "")));

  // @ts-ignore - autotable is injected
  doc.autoTable({ head: [headers], body: data, startY: 10 });
  doc.save(`${filename}.pdf`);
}

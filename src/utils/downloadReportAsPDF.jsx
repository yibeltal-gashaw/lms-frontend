import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadReportAsPDF(report) {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: report.title,
    subject: report.type,
    author: "LMS System",
    creator: "Lab Management System",
  });

  // Colors
  const primaryColor = [59, 130, 246]; // Blue
  const headerColor = [241, 245, 249]; // Light gray
  const borderColor = [226, 232, 240]; // Border gray

  // Add header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 30, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(report.title, 14, 20);

  // Reset text color
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  let yPos = 40;

  // Report Information Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Report Information", 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const reportInfo = [
    ["Report ID:", report.id],
    ["Type:", report.type],
    ["Period:", report.period],
    ["Status:", report.status],
    ["Created Date:", report.createdDate],
    ["Due Date:", report.dueDate],
  ];

  reportInfo.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 14, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value, 60, yPos);
    yPos += 6;
  });

  yPos += 5;

  // Executive Summary Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const summaryText = `This ${report.type.toLowerCase()} report covers the ${report.period} period and provides comprehensive analysis of lab operations, resource utilization, and key performance indicators.`;
  
  const splitSummary = doc.splitTextToSize(summaryText, 180);
  doc.text(splitSummary, 14, yPos);
  yPos += splitSummary.length * 5 + 5;

  // Key Metrics Table
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Key Metrics", 14, yPos);
  yPos += 8;

  autoTable(doc, {
    startY: yPos,
    head: [["Metric", "Value", "Status"]],
    body: [
      ["Equipment Uptime", "95%", "Excellent"],
      ["Lab Utilization", "87%", "Good"],
      ["Pending Tasks", "12", "Normal"],
      ["Active Assets", "156", "Active"],
    ],
    theme: "striped",
    headStyles: {
      fillColor: headerColor,
      textColor: [0, 0, 0],
      fontStyle: "bold",
      lineColor: borderColor,
    },
    bodyStyles: {
      lineColor: borderColor,
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    margin: { left: 14, right: 14 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Recommendations Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Recommendations", 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const recommendations = [
    "Schedule preventive maintenance for aging equipment",
    "Consider capacity expansion for high-demand labs",
    "Implement automated inventory tracking system",
    "Review and update safety protocols",
    "Optimize resource allocation based on utilization data",
  ];

  recommendations.forEach((rec, index) => {
    doc.text(`${index + 1}. ${rec}`, 14, yPos);
    yPos += 6;
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated on: ${new Date().toLocaleString()} | Page ${i} of ${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }

  // Save the PDF
  const fileName = `${report.id}_${report.title.replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);

  return fileName;
}

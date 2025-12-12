
export function downloadReportAsPDF(report) {
  // Generate report content as text (simulating PDF content)
  const content = `
${report.title}
${"=".repeat(report.title.length)}

Report ID: ${report.id}
Type: ${report.type}
Period: ${report.period}
Status: ${report.status}
Created Date: ${report.createdDate}
Due Date: ${report.dueDate}

---

EXECUTIVE SUMMARY
-----------------
This ${report.type.toLowerCase()} report covers the ${report.period} period and provides 
comprehensive analysis of lab operations, resource utilization, and key performance indicators.

Key highlights include equipment status updates, maintenance schedules, 
and recommendations for operational improvements.

KEY METRICS
-----------
- Equipment Uptime: 95%
- Lab Utilization: 87%
- Pending Tasks: 12

RECOMMENDATIONS
---------------
1. Schedule preventive maintenance for aging equipment
2. Consider capacity expansion for high-demand labs
3. Implement automated inventory tracking system
4. Review and update safety protocols

---
Generated on: ${new Date().toLocaleString()}
  `.trim();

  // Create a Blob with the content
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.id}_${report.title.replace(/\s+/g, "_")}.txt`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

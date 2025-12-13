import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, X, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { categories, allLabs } from "@/data/mockdata";

const isChemicalCategory = (category) => 
  ["Chemicals", "Reagents"].includes(category);

const isComputerCategory = (category) => 
  category === "Computer Equipment";

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(line => line.trim());
  return lines.map(line => {
    const values = [];
    let current = "";
    let inQuotes = false;
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  });
}

function validateAsset(row, data) {
  const errors = [];
  
  // Required fields
  if (!data.name || data.name.length < 2) {
    errors.push("Name is required (min 2 characters)");
  }
  if (!data.category || !categories.includes(data.category)) {
    errors.push(`Invalid category. Must be one of: ${categories.join(", ")}`);
  }
  if (!data.lab || !allLabs.includes(data.lab)) {
    errors.push(`Invalid lab. Must be one of: ${allLabs.join(", ")}`);
  }
  
  const quantity = parseInt(data.quantity);
  if (isNaN(quantity) || quantity < 1) {
    errors.push("Quantity must be a positive number");
  }

  // Category-specific validation
  if (isChemicalCategory(data.category)) {
    if (!data.productionDate) errors.push("Production date is required for chemicals");
    if (!data.expirationDate) errors.push("Expiration date is required for chemicals");
    if (!data.notificationTime) errors.push("Notification time is required for chemicals");
  }

  if (isComputerCategory(data.category)) {
    if (!data.computerType) errors.push("Computer type is required for computer equipment");
  }

  return {
    row,
    name: data.name || "",
    category: data.category || "",
    lab: data.lab || "",
    quantity: quantity || 0,
    manufacturer: data.manufacturer,
    model: data.model,
    serialNumber: data.serialNumber,
    productionDate: data.productionDate,
    expirationDate: data.expirationDate,
    notificationTime: data.notificationTime,
    computerType: data.computerType,
    processor: data.processor,
    ram: data.ram,
    storage: data.storage,
    operatingSystem: data.operatingSystem,
    description: data.description,
    isValid: errors.length === 0,
    errors,
  };
}

export function ImportAssetsDialog({ open, onOpenChange }) {
  const [parsedAssets, setParsedAssets] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const validAssets = parsedAssets.filter(a => a.isValid);
  const invalidAssets = parsedAssets.filter(a => !a.isValid);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Invalid file type", { description: "Please upload a CSV file" });
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      const rows = parseCSV(content);
      
      if (rows.length < 2) {
        toast.error("Invalid CSV", { description: "File must contain a header row and at least one data row" });
        return;
      }

      const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, ''));
      const assets = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const data = {};
        
        headers.forEach((header, index) => {
          data[header] = row[index] || "";
        });

        assets.push(validateAsset(i + 1, data));
      }

      setParsedAssets(assets);
    };

    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (validAssets.length === 0) {
      toast.error("No valid assets to import");
      return;
    }

    setIsImporting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Importing assets:", validAssets);
    toast.success(`Successfully imported ${validAssets.length} assets`, {
      description: invalidAssets.length > 0 
        ? `${invalidAssets.length} rows were skipped due to errors` 
        : undefined
    });

    setIsImporting(false);
    setParsedAssets([]);
    setFileName(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setParsedAssets([]);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  };

  const downloadTemplate = () => {
    const headers = [
      "name", "category", "lab", "quantity", "manufacturer", "model", "serialNumber",
      "productionDate", "expirationDate", "notificationTime", "computerType",
      "processor", "ram", "storage", "operatingSystem", "description"
    ];
    
    const exampleRows = [
      ["Sodium Chloride", "Chemicals", "Chemistry Lab A", "10", "Sigma-Aldrich", "", "", "2024-01-15", "2026-01-15", "1_month", "", "", "", "", "", "Lab grade NaCl"],
      ["Dell OptiPlex 7090", "Computer Equipment", "Computer Lab", "5", "Dell", "OptiPlex 7090", "SN-123456", "", "", "", "Desktop", "Intel i7-12700", "16GB DDR4", "512GB SSD", "Windows 11 Pro", "Workstation"],
      ["Olympus CX23", "Microscopy", "Biology Lab A", "3", "Olympus", "CX23", "MC-789012", "", "", "", "", "", "", "", "", "Light microscope"]
    ];

    const csvContent = [headers.join(","), ...exampleRows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "asset_import_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import Assets from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import multiple assets at once. Download the template for the correct format.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-hidden">
          {/* Upload Area */}
          {parsedAssets.length === 0 ? (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground mt-1">CSV files only</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <Button variant="outline" onClick={downloadTemplate} className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download CSV Template
              </Button>
            </div>
          ) : (
            <>
              {/* File Info & Summary */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  <span className="font-medium">{fileName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="h-3 w-3" />
                    {validAssets.length} valid
                  </Badge>
                  {invalidAssets.length > 0 && (
                    <Badge variant="outline" className="gap-1 bg-destructive/10 text-destructive border-destructive/20">
                      <AlertCircle className="h-3 w-3" />
                      {invalidAssets.length} errors
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setParsedAssets([]);
                      setFileName(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preview Table */}
              <ScrollArea className="h-[300px] rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-16">Row</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Lab</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead>Errors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedAssets.map((asset) => (
                      <TableRow 
                        key={asset.row} 
                        className={cn(!asset.isValid && "bg-destructive/5")}
                      >
                        <TableCell className="font-mono text-sm">{asset.row}</TableCell>
                        <TableCell>
                          {asset.isValid ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{asset.name || "-"}</TableCell>
                        <TableCell>{asset.category || "-"}</TableCell>
                        <TableCell>{asset.lab || "-"}</TableCell>
                        <TableCell className="text-center">{asset.quantity || "-"}</TableCell>
                        <TableCell className="text-sm text-destructive max-w-xs truncate">
                          {asset.errors.join("; ")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={validAssets.length === 0 || isImporting}
          >
            {isImporting ? "Importing..." : `Import ${validAssets.length} Assets`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React from 'react';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/utils';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    isLoading?: boolean;
}

export function FileUpload({ onFilesSelected, isLoading = false }: FileUploadProps) {
    const [dragActive, setDragActive] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const processFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        // Only accept CSVs
        const validFiles = Array.from(files).filter(file => file.type === "text/csv" || file.name.endsWith('.csv'));

        if (validFiles.length === 0) {
            setError("Please upload CSV files only.");
            return;
        }

        setError(null);
        onFilesSelected(validFiles);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <div
                className={cn(
                    "relative group p-12 mt-4 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-center",
                    dragActive
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    accept=".csv"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isLoading}
                />

                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-10 h-10 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2">
                    {isLoading ? "Processing files..." : "Upload Financial Statements"}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                    Drag and drop your P&L, Balance Sheet, and Cash Flow CSV files here, or click to browse.
                </p>

                {error && (
                    <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-md animate-in fade-in zoom-in duration-300">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

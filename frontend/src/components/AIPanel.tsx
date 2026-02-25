import React from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/utils';

// Dummy API data format
interface AIInsightsProps {
    insights: {
        executiveSummary: string;
        riskLevel: 'Low' | 'Medium' | 'High';
        recommendations: string[];
        healthStatus: string;
    } | null;
    isLoading?: boolean;
}

export function AIPanel({ insights, isLoading = false }: AIInsightsProps) {
    if (isLoading) {
        return (
            <div className="w-full h-64 border rounded-xl bg-card flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center text-muted-foreground gap-2">
                    <TrendingUp className="w-8 h-8 animate-bounce" />
                    <p>Analyzing financial data with AI...</p>
                </div>
            </div>
        );
    }

    if (!insights) {
        return null;
    }

    const riskColors = {
        Low: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        Medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        High: "text-destructive bg-destructive/10 border-destructive/20"
    };

    const RiskIcon = insights.riskLevel === 'Low' ? CheckCircle2 : (insights.riskLevel === 'Medium' ? AlertTriangle : AlertCircle);

    return (
        <div className="w-full bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
            <div className="p-6 lg:w-2/3 border-b lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">AI Executive Summary</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                    {insights.executiveSummary}
                </p>

                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Key Recommendations</h3>
                <ul className="space-y-3">
                    {insights.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-3 text-sm items-start">
                            <ArrowUpRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-6 lg:w-1/3 bg-muted/20 flex flex-col justify-center">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Health Assessment</h3>

                <div className={cn("p-4 rounded-lg border mb-4 flex items-center gap-3", riskColors[insights.riskLevel])}>
                    <RiskIcon className="w-6 h-6 flex-shrink-0" />
                    <div>
                        <p className="text-xs uppercase tracking-wider font-bold opacity-80">Risk Level</p>
                        <p className="text-lg font-semibold">{insights.riskLevel} Risk</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-background border">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Status</p>
                    <p className="text-sm font-medium">{insights.healthStatus}</p>
                </div>
            </div>
        </div>
    );
}

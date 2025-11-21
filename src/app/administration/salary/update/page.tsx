"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SalaryUpdatePage() {
    const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();

    const [ctc, setCtc] = useState("");
    const [monthly, setMonthly] = useState("");

    const [monthlyIncrement, setMonthlyIncrement] = useState("");
    const [newMonthly, setNewMonthly] = useState("");
    const [newCtc, setNewCtc] = useState("");

    const [note, setNote] = useState("");

    const router = useRouter()

    type SalaryKey = "basic" | "hra" | "conveyance" | "utility";
    type DeductionKey =
        | "pf"
        | "esic"
        | "professionalTax"
        | "incomeTax"
        | "loan"
        | "healthInsurance";

    type FieldKey = SalaryKey | DeductionKey;

    // CHECKBOX STATES
    const [fields, setFields] = useState<Record<FieldKey, boolean>>({
        basic: false,
        hra: false,
        conveyance: false,
        utility: false,
        pf: false,
        esic: false,
        professionalTax: false,
        incomeTax: false,
        loan: false,
        healthInsurance: false,
    });

    // Earnings Values
    const [salaryValues, setSalaryValues] = useState<Record<SalaryKey, string>>({
        basic: "",
        hra: "",
        conveyance: "",
        utility: "",
    });

    // Deduction Values
    const [deductionValues, setDeductionValues] =
        useState<Record<DeductionKey, string>>({
            pf: "",
            esic: "",
            professionalTax: "",
            incomeTax: "",
            loan: "",
            healthInsurance: "",
        });

    // CALCULATED TOTALS
    const grossEarning = (
        parseFloat(salaryValues.basic || "0") +
        parseFloat(salaryValues.hra || "0") +
        parseFloat(salaryValues.conveyance || "0") +
        parseFloat(salaryValues.utility || "0")
    ).toFixed(2);

    const totalDeductions = (
        parseFloat(deductionValues.pf || "0") +
        parseFloat(deductionValues.esic || "0") +
        parseFloat(deductionValues.professionalTax || "0") +
        parseFloat(deductionValues.incomeTax || "0") +
        parseFloat(deductionValues.loan || "0") +
        parseFloat(deductionValues.healthInsurance || "0")
    ).toFixed(2);

    const netPay = (parseFloat(grossEarning) - parseFloat(totalDeductions)).toFixed(
        2
    );

    // Convert CTC → Monthly
    useEffect(() => {
        if (!ctc) {
            setMonthly("");
            return;
        }
        const numeric = parseFloat(ctc);
        if (numeric > 0) {
            const monthlySal = numeric / 12;
            setMonthly(monthlySal.toFixed(2));
        }
    }, [ctc]);

    // Increment Logic
    useEffect(() => {
        if (!monthly || monthlyIncrement === "") {
            setNewMonthly("");
            setNewCtc("");
            return;
        }

        const baseMonthly = parseFloat(monthly);
        const inc = parseFloat(monthlyIncrement);

        const updatedMonthly = baseMonthly + inc;
        setNewMonthly(updatedMonthly.toFixed(2));

        const updatedCtc = updatedMonthly * 12;
        setNewCtc(updatedCtc.toFixed(2));

        setNewCtc(updatedCtc.toFixed(2));
    }, [monthlyIncrement, monthly]);

    const handleSave = () => {
        const payload = {
            employeeName: "John Doe",
            effectiveDate,
            salaryValues,
            deductionValues,
            grossEarning,
            totalDeductions,
            netPay,
            ctc,
            monthly,
            monthlyIncrement,
            newMonthly,
            newCtc,
            note,
        };

        console.log("PAYSLIP PAYLOAD:", payload);
        alert("Salary Updated! Check console log.");
    };

    // UI field renderer
    const RenderField = (label: string, key: FieldKey) => {
        const isSalary = (
            ["basic", "hra", "conveyance", "utility"] as SalaryKey[]
        ).includes(key as SalaryKey);

        const value = isSalary
            ? salaryValues[key as SalaryKey]
            : deductionValues[key as DeductionKey];

        const onChange = (e: any) => {
            if (isSalary) {
                setSalaryValues({
                    ...salaryValues,
                    [key]: e.target.value,
                });
            } else {
                setDeductionValues({
                    ...deductionValues,
                    [key]: e.target.value,
                });
            }
        };

        return (
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        checked={fields[key]}
                        onChange={() =>
                            setFields({
                                ...fields,
                                [key]: !fields[key],
                            })
                        }
                    />
                    <Label>{label}</Label>
                </div>

                <Input
                    value={value}
                    disabled={!fields[key]}
                    onChange={onChange}
                    className="h-11"
                />
            </div>
        );
    };

    return (
        <div className="p-8  mx-auto">
            {/* PAGE HEADER */}
            <div className="flex items-center gap-3 mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-semibold text-blue-600">
                    Salary Update
                </h1>
            </div>

            {/* CARD */}
            <div className="bg-white shadow-sm border border-gray-300 rounded-xl p-8 space-y-8">

                {/* Employee Name */}
                <div>
                    <Label className="mb-2">Employee Name</Label>
                    <Input value="John Doe" disabled className="bg-blue-50 mt-1" />
                </div>

                {/* Effective Date */}
                <div className="space-y-2">
                    <Label className="font-medium">Effective Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left h-11 border-blue-400",
                                    !effectiveDate && "text-gray-400"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                                {effectiveDate
                                    ? format(effectiveDate, "dd MMM yyyy")
                                    : "Select date"}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 bg-white shadow-md border rounded-lg">
                            <Calendar
                                mode="single"
                                selected={effectiveDate}
                                onSelect={setEffectiveDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Earnings */}
                <div>
                    <h2 className="text-xl font-semibold text-blue-600 mb-3">
                        Earnings
                    </h2>

                    <div className="grid grid-cols-2 gap-4 ">
                        {RenderField("Basic Salary", "basic")}
                        {RenderField("House Rent Allowance (HRA)", "hra")}
                        {RenderField("Conveyance Allowance", "conveyance")}
                        {RenderField("Utility Allowance", "utility")}
                    </div>

                    <div className="mt-4">
                        <Label className="mb-2">Gross Earning</Label>
                        <Input value={grossEarning} disabled className="bg-blue-50 mt-1" />
                    </div>
                </div>

                {/* Deductions */}
                <div>
                    <h2 className="text-xl font-semibold text-blue-600 mb-3">
                        Deductions
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {RenderField("Provident Fund", "pf")}
                        {RenderField("ESIC", "esic")}
                        {RenderField("Professional Tax", "professionalTax")}
                        {RenderField("Income Tax", "incomeTax")}
                        {RenderField("Loan / Advance", "loan")}
                        {RenderField("Health Insurance", "healthInsurance")}
                    </div>

                    <div className="mt-4">
                        <Label className="mb-2">Total Deductions</Label>
                        <Input
                            value={totalDeductions}
                            disabled
                            className="bg-blue-50 "
                        />
                    </div>
                </div>

                {/* Net Pay */}
                <div>
                    <Label className="font-medium mb-2">Net Payable</Label>
                    <Input value={netPay} disabled className="bg-green-50 " />
                </div>

                {/* CTC & Increment */}
                <div>
                    <h2 className="text-xl font-semibold text-blue-600 mb-3">
                        CTC & Increment
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Annual CTC (LPA)</Label>
                            <Input
                                placeholder="e.g. 450000"
                                value={ctc}
                                onChange={(e) => setCtc(e.target.value)}
                                className="h-11 border-blue-400"
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Monthly Salary</Label>
                            <Input value={monthly} disabled className="bg-gray-100" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label className="mb-2">Increment / Decrement (Monthly)</Label>
                        <Input
                            placeholder="e.g. 5000 or -3000"
                            value={monthlyIncrement}
                            onChange={(e) => setMonthlyIncrement(e.target.value)}
                            className="h-11 border-blue-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <Label className="mb-2">Updated CTC (LPA)</Label>
                            <Input value={newCtc} disabled className="bg-gray-100" />
                        </div>

                        <div>
                            <Label className="mb-2">Updated Monthly Salary</Label>
                            <Input value={newMonthly} disabled className="bg-gray-100" />
                        </div>
                    </div>
                </div>

                {/* Note */}
                <div>
                    <Label className="mb-2">Note</Label>
                    <Input
                        placeholder="Write a note…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="h-11 border-blue-400"
                    />
                </div>

                {/* FOOTER BUTTONS */}
                <div className="flex justify-end gap-3 pt-4 border-gray-300 border-t">
                    <Button
                        className="h-10 bg-red-500 hover:bg-red-600 text-white"
                        
                    >
                        Cancel
                    </Button>

                    <Button
                        className="bg-blue-600 text-white h-11 px-8"
                        onClick={handleSave}
                    >
                        Save Salary Update
                    </Button>
                </div>
            </div>
        </div>
    );
}

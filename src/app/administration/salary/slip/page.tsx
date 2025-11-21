"use client";

import Image from "next/image";

export default function SalarySlip() {
  return (
    <div className="w-full max-w-6xl mx-auto p-10  min-h-screen text-gray-900">
      
      {/* MAIN WHITE PAGE */}
      <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-4">
            <Image
              src="/logo_with_name.png"
              alt="Company Logo"
              width={70}
              height={70}
            />
            <div>
              <h1 className="text-xl font-bold">WESTACK SOLUTIONS LLP</h1>
              <p className="text-sm">
                607, Shanti Dazzle, Scheme No 140, Near Agrawal Public School, Indore, Madhya Pradesh 452016
              </p>
              <p className="text-sm">
                Email: hello@westack.ai | Phone: +91 7898919878 | Website: westack.ai
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">Payslip for the month</p>
            <p className="text-2xl font-bold text-gray-700">June 2025</p>
          </div>
        </div>

        {/* EMPLOYEE SUMMARY BOX */}
        <div className="bg-[#f8f9fb] border border-gray-300 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">Employee Pay Summary</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p><strong>Employee Code :</strong> 1001</p>
              <p><strong>Employee Name :</strong> John Doe</p>
              <p><strong>Designation :</strong> Mobile Developer</p>
            </div>

            <div className="space-y-1">
              <p><strong>PAN Number :</strong> XXXXX7171</p>
              <p><strong>Joining Date :</strong> 2nd Jan 2025</p>
            </div>
          </div>
        </div>

        {/* TABLES: EARNING + DEDUCTION */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          
          {/* Earning Table */}
          <table className="w-full border border-gray-400 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-3 py-2 text-left">Earning</th>
                <th className="border border-gray-400 px-3 py-2 text-left">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Basic Salary</td>
                <td className="border border-gray-400 px-3 py-2">₹15,000.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Home Rent Allowance</td>
                <td className="border border-gray-400 px-3 py-2">₹9,000.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Conveyance Allowance</td>
                <td className="border border-gray-400 px-3 py-2">₹3,000.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Utility Allowance</td>
                <td className="border border-gray-400 px-3 py-2">₹3,000.00</td>
              </tr>

              {/* Gross */}
              <tr className="bg-gray-100 font-semibold">
                <td className="border border-gray-400 px-3 py-2">Gross Earning</td>
                <td className="border border-gray-400 px-3 py-2">₹30,000.00</td>
              </tr>
            </tbody>
          </table>

          {/* Deduction Table */}
          <table className="w-full border border-gray-400 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-3 py-2 text-left">Deduction</th>
                <th className="border border-gray-400 px-3 py-2 text-left">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Provident Fund</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">ESIC</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Professional Tax</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Income Tax</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Loan/Advance</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">Health Insurance</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>

              {/* Total */}
              <tr className="bg-gray-100 font-semibold">
                <td className="border border-gray-400 px-3 py-2">Total Deductions</td>
                <td className="border border-gray-400 px-3 py-2">₹0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* NET PAYABLE */}
        <div className="mb-10">
          <p className="text-xl font-bold mb-1">Net Payable : Rs. 30,000</p>
          <p className="text-sm">Amount in words : <strong>Rupees Thirty Thousand Only</strong></p>
        </div>

        {/* NOTES */}
        <div className="mb-16">
          <p className="font-semibold mb-1">Notes:</p>
          <p className="text-sm italic text-gray-600">
            Please check your PAN. If any corrections are needed, inform us at hello@westack.ai
          </p>
        </div>

        {/* FOOTER */}
        <div className="text-right text-sm">
            <p className="font-semibold">Date of Issue</p>
            <p className="font-bold">30ᵗʰ Oct 2025</p>
          </div>
          
        <div className="flex justify-between items-end">
          <div className="text-center text-sm text-gray-500 w-full">
            This is system generated slip.
          </div>

          
        </div>

        {/* PRINT BUTTON */}
        <div className="flex justify-center mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Download Slip
          </button>
        </div>

      </div>
    </div>
  );
}

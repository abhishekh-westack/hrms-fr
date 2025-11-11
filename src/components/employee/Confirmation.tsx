"use client"

import React from "react"
import { Label } from "@/components/ui/label"

type Props = {
  formik: any
}

export default function Confirmation({ formik }: Props) {
  const data = formik.values
  const row = (title: string, value: any) => (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-sm text-gray-800 font-medium">{value ?? "-"}</div>
    </div>
  )

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Confirmation</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded">
          <Label className="mb-2">Basic</Label>
          {row("Employee Code", data.employeeCode)}
          {row("Name", `${data.firstName} ${data.middleName ? data.middleName + " " : ""}${data.lastName}`)}
          {row("Gender", data.gender)}
          {row("DOB", data.dob)}
          {row("Mobile", data.mobileNumber)}
          {row("Official Email", data.officialEmail)}
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <Label className="mb-2">Employment</Label>
          {row("DOJ", data.doj)}
          {row("Department", data.department)}
          {row("Designation", data.designation)}
          {row("Employee Type", data.employeeType)}
          {row("Work Mode", data.workMode)}
          {row("Reporting Manager", data.reportingManager)}
        </div>

        <div className="col-span-1 md:col-span-2 p-4 bg-gray-50 rounded">
          <Label className="mb-2">Bank</Label>
          {row("Bank", data.bankName)}
          {row("Account Holder", data.accountHolderName)}
          {row("Account No", data.accountNumber)}
          {row("IFSC", data.ifscCode)}
          {row("PAN", data.bankPanNumber)}
        </div>
      </div>
    </section>
  )
}

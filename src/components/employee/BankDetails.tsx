"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  formik: any
}

export default function BankDetails({ formik }: Props) {
  const getInputClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-500 mb-4">Bank Details:</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-medium">Bank Name</Label>
          <Input name="bankName" value={formik.values.bankName} onChange={formik.handleChange} className={getInputClasses("bankName")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Account Holder Name</Label>
          <Input name="accountHolderName" value={formik.values.accountHolderName} onChange={formik.handleChange} className={getInputClasses("accountHolderName")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Account Number</Label>
          <Input name="accountNumber" value={formik.values.accountNumber} onChange={(e) => formik.setFieldValue("accountNumber", e.target.value.replace(/\D/g, ""))} className={getInputClasses("accountNumber")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">IFSC Code</Label>
          <Input name="ifscCode" value={formik.values.ifscCode} onChange={formik.handleChange} className={getInputClasses("ifscCode")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Branch Name</Label>
          <Input name="branchName" value={formik.values.branchName} onChange={formik.handleChange} className={getInputClasses("branchName")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">PAN Number</Label>
          <Input name="bankPanNumber" value={formik.values.bankPanNumber} onChange={formik.handleChange} className={getInputClasses("bankPanNumber")} />
        </div>
      </div>

      {/* <hr className="my-6 border-gray-300" /> */}
    </section>
  )
}

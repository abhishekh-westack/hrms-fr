"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  formik: any
}

export default function BasicDetails({ formik }: Props) {
  const getInputClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  const getSelectClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300"
      : "h-11"
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-500 mb-4">Basic Details:</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-medium">Employee Code<span className="text-red-500">*</span></Label>
          <Input name="employeeCode" value={formik.values.employeeCode} onChange={formik.handleChange} className={getInputClasses("employeeCode")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Mobile Number<span className="text-red-500">*</span></Label>
          <div className="flex gap-2">
            <Input value="+91" disabled className="w-20 h-11 bg-gray-50" />
            <Input
              type="tel"
              name="mobileNumber"
              maxLength={10}
              value={formik.values.mobileNumber}
              onChange={(e) => formik.setFieldValue("mobileNumber", e.target.value.replace(/\D/g, ""))}
              placeholder="Enter Number"
              className={getInputClasses("mobileNumber") + " flex-1"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">First Name<span className="text-red-500">*</span></Label>
          <Input name="firstName" value={formik.values.firstName} onChange={formik.handleChange} placeholder="First name" className={getInputClasses("firstName")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Official Email</Label>
          <Input name="officialEmail" type="email" value={formik.values.officialEmail} onChange={formik.handleChange} placeholder="official@company.com" className={getInputClasses("officialEmail")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Middle Name</Label>
          <Input name="middleName" value={formik.values.middleName} onChange={formik.handleChange} placeholder="Middle name" className={getInputClasses("middleName")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Personal Email</Label>
          <Input name="personalEmail" type="email" value={formik.values.personalEmail} onChange={formik.handleChange} placeholder="personal@mail.com" className={getInputClasses("personalEmail")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Last Name<span className="text-red-500">*</span></Label>
          <Input name="lastName" value={formik.values.lastName} onChange={formik.handleChange} placeholder="Last name" className={getInputClasses("lastName")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Date of Birth<span className="text-red-500">*</span></Label>
          <Input type="date" name="dob" value={formik.values.dob} onChange={formik.handleChange} className={getInputClasses("dob")} />
        </div>

        <div className="space-y-2 col-span-2">
          <Label className="font-medium">Gender<span className="text-red-500">*</span></Label>
          <div className="flex gap-6 pt-1">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="gender" value={g} checked={formik.values.gender === g} onChange={formik.handleChange} className="w-4 h-4 accent-blue-600" />
                <span className={formik.values.gender === g ? "text-blue-700 font-medium" : ""}>{g}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Marital Status</Label>
          <Select value={formik.values.maritalStatus} onValueChange={(v) => formik.setFieldValue("maritalStatus", v)}>
            <SelectTrigger className={getSelectClasses("maritalStatus")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Blood Group</Label>
          <Select value={formik.values.bloodGroup} onValueChange={(v) => formik.setFieldValue("bloodGroup", v)}>
            <SelectTrigger className={getSelectClasses("bloodGroup")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <SelectItem key={bg} value={bg}>{bg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* <hr className="my-6 border-gray-300" /> */}
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormik } from "formik"
import * as Yup from "yup"

interface AddEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const validationSchema = Yup.object({
  employeeCode: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
    .required("Required"),
  email: Yup.string().email("Invalid Email").nullable(),
  gender: Yup.string().required("Required"),
  punchInBranch: Yup.string().required("Required"),
  masterBranch: Yup.string().required("Required"),
})

export default function AddEmployeeDialog({ open, onOpenChange }: AddEmployeeDialogProps) {

  const formik = useFormik({
    initialValues: {
      employeeCode: "16",
      name: "",
      mobileNumber: "",
      email: "",
      gender: "",
      punchInBranch: "",
      masterBranch: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted =>", values)
      onOpenChange(false)
      formik.resetForm()
    },
  })

  const handleClose = () => {
    formik.resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-300 pb-4">
          <DialogTitle className="text-xl font-semibold text-blue-500">Add Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6 py-4">

          {/* Employee Code */}
          <div className="space-y-2">
            <Label>Employee Code<span className="text-red-500">*</span></Label>
            <Input
              name="employeeCode"
              value={formik.values.employeeCode}
              onChange={formik.handleChange}
              className="h-11"
            />
            {formik.touched.employeeCode && formik.errors.employeeCode && <p className="text-red-500 text-xs">{formik.errors.employeeCode}</p>}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Name<span className="text-red-500">*</span></Label>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter Employee Name"
              className="h-11"
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs">{formik.errors.name}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label>Mobile Number<span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <div className="w-20">
                <Input value="+91" disabled className="h-11 bg-gray-50" />
              </div>
              <Input
                type="tel"
                name="mobileNumber"
                maxLength={10}
                value={formik.values.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  formik.setFieldValue("mobileNumber", value)
                }}
                placeholder="Enter Number"
                className="h-11 flex-1"
              />
            </div>
            {formik.touched.mobileNumber && formik.errors.mobileNumber && <p className="text-red-500 text-xs">{formik.errors.mobileNumber}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter Employee Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="h-11"
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs">{formik.errors.email}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender<span className="text-red-500">*</span></Label>
            <div className="flex gap-6">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formik.values.gender === g}
                    onChange={formik.handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>
            {formik.touched.gender && formik.errors.gender && <p className="text-red-500 text-xs">{formik.errors.gender}</p>}
          </div>

          {/* Punch In Branch */}
          <div className="space-y-2">
            <Label>Punch In Branch<span className="text-red-500">*</span></Label>
            <Select
              value={formik.values.punchInBranch}
              onValueChange={(value) => formik.setFieldValue("punchInBranch", value)}
            >
              <SelectTrigger className="h-11"><SelectValue placeholder="Select Branches" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="westack">WESTACK SOLUTIONS LLP</SelectItem>
                <SelectItem value="branch2">Branch Office 1</SelectItem>
                <SelectItem value="branch3">Branch Office 2</SelectItem>
                <SelectItem value="branch4">Remote Office</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.punchInBranch && formik.errors.punchInBranch && <p className="text-red-500 text-xs">{formik.errors.punchInBranch}</p>}
          </div>

          {/* Master Branch */}
          <div className="space-y-2">
            <Label>Master Branch<span className="text-red-500">*</span></Label>
            <Select
              value={formik.values.masterBranch}
              onValueChange={(value) => formik.setFieldValue("masterBranch", value)}
            >
              <SelectTrigger className="h-11"><SelectValue placeholder="Select Master Branches" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="westack">WESTACK SOLUTIONS LLP</SelectItem>
                <SelectItem value="branch2">Branch Office 1</SelectItem>
                <SelectItem value="branch3">Branch Office 2</SelectItem>
                <SelectItem value="branch4">Remote Office</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.masterBranch && formik.errors.masterBranch && <p className="text-red-500 text-xs">{formik.errors.masterBranch}</p>}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-300">
            <Button type="button" variant="outline" onClick={handleClose} className="px-6 h-11">Close</Button>
            <Button type="submit" className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white">Save Details</Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}

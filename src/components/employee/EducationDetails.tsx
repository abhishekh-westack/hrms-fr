"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  formik: any
}

export default function EducationDetails({ formik }: Props) {
  // Initialize qualifications array if not exists
  React.useEffect(() => {
    if (!formik.values.qualifications || formik.values.qualifications.length === 0) {
      formik.setFieldValue("qualifications", [{
        degreeType: "",
        courseDegree: "",
        universityBoard: "",
        yearOfPassing: "",
        percentageGrade: "",
        educationDocument: null
      }])
    }
  }, [])

  const qualifications = formik.values.qualifications || []

  const addQualification = () => {
    formik.setFieldValue("qualifications", [
      ...qualifications,
      {
        degreeType: "",
        courseDegree: "",
        universityBoard: "",
        yearOfPassing: "",
        percentageGrade: "",
        educationDocument: null
      }
    ])
  }

  const removeQualification = (index: number) => {
    if (qualifications.length > 1) {
      const updated = qualifications.filter((_: any, i: number) => i !== index)
      formik.setFieldValue("qualifications", updated)
    }
  }

  const updateQualification = (index: number, field: string, value: any) => {
    const updated = [...qualifications]
    updated[index] = { ...updated[index], [field]: value }
    formik.setFieldValue("qualifications", updated)
  }

  const degreeTypes = [
    "UG (Undergraduate)",
    "PG (Postgraduate)",
    "Diploma",
    "Certification",
    "HSC (Higher Secondary)",
    "SSC (Secondary School)",
  ]

  const courseDegrees = [
    "B.Tech / B.E.",
    "M.Tech / M.E.",
    "BCA",
    "MCA",
    "B.Sc",
    "M.Sc",
    "BBA",
    "MBA",
    "B.Com",
    "M.Com",
    "BA",
    "MA",
    "Diploma",
    "Other",
  ]

  const getInputClasses = (value: any) => {
    return value
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  const getSelectClasses = (value: any) => {
    return value
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  const getUploadClasses = (hasFile: boolean) => {
    return hasFile
      ? "h-11 w-full text-sm text-blue-900 bg-blue-50 border border-blue-300 rounded-md cursor-pointer focus:outline-none file:h-full file:border-0 file:bg-blue-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
      : "h-11 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none file:h-full file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-500">
          Education & Qualification:
        </h3>
        <button
          type="button"
          onClick={addQualification}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Qualification
        </button>
      </div>

      <div className="space-y-8">
        {qualifications.map((qualification: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
            {/* Delete button - only show if more than 1 qualification */}
            {qualifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeQualification(index)}
                className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Remove qualification"
              >
                <Trash2 size={18} />
              </button>
            )}

            <h4 className="text-md font-medium text-gray-700 mb-4">
              Qualification {index + 1}
            </h4>

            <div className="grid grid-cols-2 gap-6">
              {/* Degree Type */}
              <div className="space-y-2">
                <Label className="font-medium">Type of Degree</Label>
                <Select
                  value={qualification.degreeType}
                  onValueChange={(value) => updateQualification(index, "degreeType", value)}
                >
                  <SelectTrigger className={getSelectClasses(qualification.degreeType)}>
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Course / Degree */}
              <div className="space-y-2">
                <Label className="font-medium">Course / Degree</Label>
                <Select
                  value={qualification.courseDegree}
                  onValueChange={(value) => updateQualification(index, "courseDegree", value)}
                >
                  <SelectTrigger className={getSelectClasses(qualification.courseDegree)}>
                    <SelectValue placeholder="Select course/degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseDegrees.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* University / Board */}
              <div className="space-y-2">
                <Label className="font-medium">University / Board</Label>
                <Input
                  name={`qualifications[${index}].universityBoard`}
                  value={qualification.universityBoard}
                  onChange={(e) => updateQualification(index, "universityBoard", e.target.value)}
                  className={getInputClasses(qualification.universityBoard)}
                />
              </div>

              {/* Year of Passing */}
              <div className="space-y-2">
                <Label className="font-medium">Year of Passing</Label>
                <Input
                  name={`qualifications[${index}].yearOfPassing`}
                  value={qualification.yearOfPassing}
                  onChange={(e) =>
                    updateQualification(index, "yearOfPassing", e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="YYYY"
                  className={getInputClasses(qualification.yearOfPassing)}
                />
              </div>

              {/* Percentage / Grade */}
              <div className="space-y-2">
                <Label className="font-medium">Percentage / Grade</Label>
                <Input
                  name={`qualifications[${index}].percentageGrade`}
                  value={qualification.percentageGrade}
                  onChange={(e) => updateQualification(index, "percentageGrade", e.target.value)}
                  placeholder="e.g. 85% or A+"
                  className={getInputClasses(qualification.percentageGrade)}
                />
              </div>

              {/* Upload Document */}
              <div className="space-y-2">
                <Label className="font-medium">Upload Document</Label>
               
                <div className="relative">
                  <input
                    type="file"
                    name={`qualifications[${index}].educationDocument`}
                    accept=".svg,.pdf,.png,image/svg+xml,application/pdf,image/png"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0]
                      updateQualification(index, "educationDocument", file)
                    }}
                    className={getUploadClasses(!!qualification.educationDocument)}
                  />
                </div>

                <p className="text-xs text-gray-500 mb-1">
                  Accepted formats: SVG, PDF, PNG
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
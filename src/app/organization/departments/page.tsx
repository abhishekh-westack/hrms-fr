"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus, Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const departments = [
  { id: 1, name: "Software Development / Engineering", employeeCount: 10 },
]

export default function DepartmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [departmentName, setDepartmentName] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDept, setSelectedDept] = useState<any>(null)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)


  const handleCreateDepartment = () => {
    // Handle department creation logic here
    console.log("Creating department:", departmentName)
    setDepartmentName("")
    setIsDialogOpen(false)
  }

  return (
    <div className="w-full space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your organizational departments
          </p>
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>



      {/* Table Container */}
      <div className="">
        <div className="bg-white border rounded-2xl shadow-sm border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-slate-50/40">
                  <th className="px-5 py-4 text-left font-medium text-gray-500 text-sm">
                    Name
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm">
                    Employee Count
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm w-32">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {departments.map((department) => (
                  <tr
                    key={department.id}
                    className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                  >
                    <td className="px-5 py-4">
                      <span className="font-medium text-sm text-gray-800">
                        {department.name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="text-sm text-gray-600 font-medium">
                        {department.employeeCount}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 bg-white border border-gray-200 shadow-lg rounded-xl p-1"
                          >
                            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 hover:bg-blue-50 hover:text-blue-600" onClick={() => {
                              setSelectedDept(department)
                              setDepartmentName(department.name)
                              setIsEditDialogOpen(true)
                            }}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 hover:bg-red-50 hover:text-red-600" onClick={() => {
                              setSelectedDept(department)
                              setIsDeleteAlertOpen(true)
                            }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>

                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50/40 flex items-center justify-between text-sm text-muted-foreground border-t border-gray-200">
        <div>Showing {departments.length} of {departments.length} departments</div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>


      {/* Create Department Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create New Department</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Add a new department to your organization. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="department-name" className="text-sm font-medium">
                Department Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="department-name"
                placeholder="e.g., Software Development / Engineering"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-gray-400">(Optional)</span>
              </Label>
              <textarea
                id="description"
                placeholder="Brief description of the department..."
                className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div> */}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                setDepartmentName("")
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCreateDepartment}
              disabled={!departmentName.trim()}
            >
              Create Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Department</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Modify department name and update changes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Department Name</Label>
              <Input
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full focus:ring-blue-500"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              console.log("updating dept:", selectedDept?.id, departmentName)
              setIsEditDialogOpen(false)
            }}>
              Update Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this department.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                console.log("Deleting department:", selectedDept?.id)
                setIsDeleteAlertOpen(false)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
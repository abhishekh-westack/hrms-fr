# HRMS Backend API Requirements

This document outlines the complete API requirements for the Human Resource Management System (HRMS) backend. These APIs are designed to support the frontend features of the HRMS application.

---

## Table of Contents

1. [Authentication APIs](#1-authentication-apis)
2. [Employee Management APIs](#2-employee-management-apis)
3. [Branch Management APIs](#3-branch-management-apis)
4. [Department Management APIs](#4-department-management-apis)
5. [Designation Management APIs](#5-designation-management-apis)
6. [Employment Type Management APIs](#6-employment-type-management-apis)
7. [Shift Management APIs](#7-shift-management-apis)
8. [Salary Management APIs](#8-salary-management-apis)
9. [Dashboard APIs](#9-dashboard-apis)
10. [Common Data Models](#10-common-data-models)

---

## 1. Authentication APIs

### 1.1 User Registration

**Endpoint:** `POST /api/auth/signup`

**Description:** Register a new user account

**Request Body:**
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "createdAt": "ISO 8601 datetime"
  },
  "token": "JWT token"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    { "field": "email", "message": "Email already exists" }
  ]
}
```

---

### 1.2 User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and return access token

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "remember": "boolean (optional)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "string"
  },
  "token": "JWT token",
  "refreshToken": "JWT refresh token (if remember=true)"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 1.3 Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Request password reset email

**Request Body:**
```json
{
  "email": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

---

### 1.4 Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Description:** Reset password with token

**Request Body:**
```json
{
  "token": "string (required)",
  "newPassword": "string (required)",
  "confirmPassword": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 1.5 Refresh Token

**Endpoint:** `POST /api/auth/refresh-token`

**Description:** Refresh access token

**Request Body:**
```json
{
  "refreshToken": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "token": "new JWT token"
}
```

---

### 1.6 Logout

**Endpoint:** `POST /api/auth/logout`

**Description:** Invalidate current session

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. Employee Management APIs

### 2.1 Get All Employees

**Endpoint:** `GET /api/employees`

**Description:** Retrieve list of all employees with pagination, search, filter, and sort

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| search | string | Search by name, department, or designation |
| status | string | Filter by status: "Active", "Inactive", "all" |
| sortBy | string | Sort field: "name", "department", "doj" |
| sortOrder | string | Sort order: "asc", "desc" |
| department | string | Filter by department |
| branch | string | Filter by branch |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "employeeCode": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "fullName": "string",
      "photo": "string (URL)",
      "department": "string",
      "designation": "string",
      "doj": "ISO 8601 date",
      "branch": "string",
      "status": "Active | Inactive | Resigned"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

---

### 2.2 Get Employee by ID

**Endpoint:** `GET /api/employees/:id`

**Description:** Retrieve complete details of a specific employee

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "basicDetails": {
      "employeeCode": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "gender": "Male | Female | Other",
      "dob": "ISO 8601 date",
      "maritalStatus": "Single | Married | Divorced | Widowed",
      "bloodGroup": "A+ | A- | B+ | B- | AB+ | AB- | O+ | O- | Unknown",
      "mobileNumber": "string",
      "officialEmail": "string",
      "personalEmail": "string"
    },
    "employeeDetails": {
      "doj": "ISO 8601 date",
      "employeeType": "Full Time | Part Time | Intern | Contract",
      "department": "string",
      "designation": "string",
      "workMode": "Office | Hybrid | Remote",
      "reportingManager": "string",
      "workLocation": "string",
      "shiftTiming": "Morning | Evening | Night",
      "employeeStatus": "Active | Inactive | Resigned"
    },
    "bankDetails": {
      "bankName": "string",
      "accountHolderName": "string",
      "accountNumber": "string",
      "ifscCode": "string",
      "branchName": "string"
    },
    "legalDocuments": {
      "photo": "string (URL)",
      "aadhaarDocument": "string (URL)",
      "panDocument": "string (URL)",
      "passportNumber": "string",
      "drivingLicenseNumber": "string",
      "uan": "string",
      "esicNumber": "string"
    },
    "educationDetails": {
      "qualifications": [
        {
          "id": "number",
          "degreeType": "UG (Undergraduate) | PG (Postgraduate) | Diploma | Certification | HSC (Higher Secondary) | SSC (Secondary School)",
          "courseDegree": "string",
          "universityBoard": "string",
          "yearOfPassing": "string",
          "percentageGrade": "string",
          "educationDocument": "string (URL)"
        }
      ]
    },
    "addressDetails": {
      "localAddress": {
        "addressLine": "string",
        "city": "string",
        "state": "string",
        "pincode": "string",
        "country": "string"
      },
      "residentialAddress": {
        "addressLine": "string",
        "city": "string",
        "state": "string",
        "pincode": "string",
        "country": "string"
      },
      "sameAsLocal": "boolean"
    },
    "emergencyContact": {
      "contactName": "string",
      "relationship": "string",
      "mobile": "string",
      "alternateNumber": "string",
      "address": "string"
    },
    "createdAt": "ISO 8601 datetime",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

### 2.3 Create Employee

**Endpoint:** `POST /api/employees`

**Description:** Add a new employee with all details

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
```
Basic Details:
- employeeCode: string (required)
- firstName: string (required)
- middleName: string
- lastName: string (required)
- gender: string (required) - "Male" | "Female" | "Other"
- dob: string (required) - ISO 8601 date
- maritalStatus: string
- bloodGroup: string
- mobileNumber: string (required) - 10 digits
- officialEmail: string
- personalEmail: string

Employee Details:
- doj: string (required) - ISO 8601 date
- employeeType: string (required)
- department: string (required)
- designation: string (required)
- workMode: string (required)
- reportingManager: string
- workLocation: string
- shiftTiming: string
- employeeStatus: string

Bank Details:
- bankName: string
- accountHolderName: string
- accountNumber: string
- ifscCode: string
- branchName: string

Legal Documents:
- passportNumber: string
- drivingLicenseNumber: string
- uan: string
- esicNumber: string

Files:
- photo: file (image/*)
- aadhaarDocument: file (.pdf, .png, .jpg, .jpeg)
- panDocument: file (.pdf, .png, .jpg, .jpeg)

Education (JSON array):
- qualifications: [
    {
      degreeType: string,
      courseDegree: string,
      universityBoard: string,
      yearOfPassing: string,
      percentageGrade: string
    }
  ]
- educationDocuments: file[] (multiple files for education)

Address Details:
- localAddressLine: string
- localCity: string
- localState: string
- localPincode: string
- localCountry: string
- residentialAddressLine: string
- residentialCity: string
- residentialState: string
- residentialPincode: string
- residentialCountry: string
- sameAsLocal: boolean

Emergency Contact:
- emergencyContactName: string
- emergencyRelationship: string
- emergencyMobile: string
- emergencyAlternateNumber: string
- emergencyAddress: string
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Employee added successfully",
  "data": {
    "id": "number",
    "employeeCode": "string"
  }
}
```

---

### 2.4 Update Employee

**Endpoint:** `PUT /api/employees/:id`

**Description:** Update an existing employee's details

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:** Same as Create Employee (only changed fields required)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": "number",
    "employeeCode": "string"
  }
}
```

---

### 2.5 Deactivate Employee

**Endpoint:** `PATCH /api/employees/:id/deactivate`

**Description:** Deactivate an employee (soft delete)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Employee deactivated successfully"
}
```

---

### 2.6 Reactivate Employee

**Endpoint:** `PATCH /api/employees/:id/reactivate`

**Description:** Reactivate a previously deactivated employee

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Employee reactivated successfully"
}
```

---

### 2.7 Delete Employee

**Endpoint:** `DELETE /api/employees/:id`

**Description:** Permanently delete an employee (use with caution)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

## 3. Branch Management APIs

### 3.1 Get All Branches

**Endpoint:** `GET /api/branches`

**Description:** Retrieve list of all branches with employee count

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "employeeCount": "number",
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 10
  }
}
```

---

### 3.2 Get Branch by ID

**Endpoint:** `GET /api/branches/:id`

**Description:** Retrieve a specific branch

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string",
    "employeeCount": "number",
    "createdAt": "ISO 8601 datetime",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

### 3.3 Create Branch

**Endpoint:** `POST /api/branches`

**Description:** Create a new branch

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Branch created successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 3.4 Update Branch

**Endpoint:** `PUT /api/branches/:id`

**Description:** Update an existing branch

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Branch updated successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 3.5 Delete Branch

**Endpoint:** `DELETE /api/branches/:id`

**Description:** Delete a branch (only if no employees assigned)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Branch deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Cannot delete branch with assigned employees"
}
```

---

## 4. Department Management APIs

### 4.1 Get All Departments

**Endpoint:** `GET /api/departments`

**Description:** Retrieve list of all departments with employee count

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "employeeCount": "number",
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "itemsPerPage": 10
  }
}
```

---

### 4.2 Get Department by ID

**Endpoint:** `GET /api/departments/:id`

**Description:** Retrieve a specific department

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string",
    "employeeCount": "number",
    "createdAt": "ISO 8601 datetime",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

### 4.3 Create Department

**Endpoint:** `POST /api/departments`

**Description:** Create a new department

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Department created successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 4.4 Update Department

**Endpoint:** `PUT /api/departments/:id`

**Description:** Update an existing department

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Department updated successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 4.5 Delete Department

**Endpoint:** `DELETE /api/departments/:id`

**Description:** Delete a department (only if no employees assigned)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Department deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Cannot delete department with assigned employees"
}
```

---

## 5. Designation Management APIs

### 5.1 Get All Designations

**Endpoint:** `GET /api/designations`

**Description:** Retrieve list of all designations with employee count

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "employeeCount": "number",
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 7,
    "itemsPerPage": 10
  }
}
```

---

### 5.2 Get Designation by ID

**Endpoint:** `GET /api/designations/:id`

**Description:** Retrieve a specific designation

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string",
    "employeeCount": "number",
    "createdAt": "ISO 8601 datetime",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

### 5.3 Create Designation

**Endpoint:** `POST /api/designations`

**Description:** Create a new designation

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Designation created successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 5.4 Update Designation

**Endpoint:** `PUT /api/designations/:id`

**Description:** Update an existing designation

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Designation updated successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 5.5 Delete Designation

**Endpoint:** `DELETE /api/designations/:id`

**Description:** Delete a designation (only if no employees assigned)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Designation deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Cannot delete designation with assigned employees"
}
```

---

## 6. Employment Type Management APIs

### 6.1 Get All Employment Types

**Endpoint:** `GET /api/employment-types`

**Description:** Retrieve list of all employment types with employee count

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "employeeCount": "number",
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 3,
    "itemsPerPage": 10
  }
}
```

---

### 6.2 Get Employment Type by ID

**Endpoint:** `GET /api/employment-types/:id`

**Description:** Retrieve a specific employment type

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string",
    "employeeCount": "number",
    "createdAt": "ISO 8601 datetime",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

### 6.3 Create Employment Type

**Endpoint:** `POST /api/employment-types`

**Description:** Create a new employment type

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Employment type created successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 6.4 Update Employment Type

**Endpoint:** `PUT /api/employment-types/:id`

**Description:** Update an existing employment type

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Employment type updated successfully",
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 6.5 Delete Employment Type

**Endpoint:** `DELETE /api/employment-types/:id`

**Description:** Delete an employment type (only if no employees assigned)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Employment type deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Cannot delete employment type with assigned employees"
}
```

---

## 7. Shift Management APIs

### 7.1 Get All Shifts

**Endpoint:** `GET /api/shifts`

**Description:** Retrieve list of all shifts

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "startTime": "string (HH:mm format)",
      "endTime": "string (HH:mm format)",
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 3,
    "itemsPerPage": 10
  }
}
```

---

### 7.2 Get Shift by ID

**Endpoint:** `GET /api/shifts/:id`

**Description:** Retrieve a specific shift

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string",
    "startTime": "string (HH:mm format)",
    "endTime": "string (HH:mm format)",
    "createdAt": "ISO 8601 datetime",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

### 7.3 Create Shift

**Endpoint:** `POST /api/shifts`

**Description:** Create a new shift

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)",
  "startTime": "string (required, HH:mm format)",
  "endTime": "string (required, HH:mm format)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Shift created successfully",
  "data": {
    "id": "number",
    "name": "string",
    "startTime": "string",
    "endTime": "string"
  }
}
```

---

### 7.4 Update Shift

**Endpoint:** `PUT /api/shifts/:id`

**Description:** Update an existing shift

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)",
  "startTime": "string (required, HH:mm format)",
  "endTime": "string (required, HH:mm format)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Shift updated successfully",
  "data": {
    "id": "number",
    "name": "string",
    "startTime": "string",
    "endTime": "string"
  }
}
```

---

### 7.5 Delete Shift

**Endpoint:** `DELETE /api/shifts/:id`

**Description:** Delete a shift (only if no employees assigned)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Shift deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Cannot delete shift with assigned employees"
}
```

---

## 8. Salary Management APIs

### 8.1 Get All Employee Salaries

**Endpoint:** `GET /api/salaries`

**Description:** Retrieve salary overview for all employees

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| search | string | Search by employee name |
| from | string | Start date filter (ISO 8601) |
| to | string | End date filter (ISO 8601) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "employeeId": "number",
      "name": "string",
      "photo": "string (URL)",
      "designation": "string",
      "doj": "ISO 8601 date",
      "currentSalary": "number",
      "lastIncrement": "ISO 8601 date"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 9,
    "itemsPerPage": 10
  }
}
```

---

### 8.2 Get Employee Salary Details

**Endpoint:** `GET /api/salaries/employee/:employeeId`

**Description:** Get complete salary breakdown for an employee

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "employeeId": "number",
    "name": "string",
    "employeeCode": "string",
    "department": "string",
    "designation": "string",
    "doj": "ISO 8601 date",
    "currentSalary": {
      "effectiveFrom": "ISO 8601 date",
      "earnings": {
        "basic": "number",
        "hra": "number",
        "conveyance": "number",
        "utility": "number"
      },
      "deductions": {
        "pf": "number",
        "esic": "number",
        "professionalTax": "number",
        "incomeTax": "number",
        "loan": "number",
        "healthInsurance": "number"
      },
      "grossEarning": "number",
      "totalDeductions": "number",
      "netPayable": "number",
      "annualCTC": "number"
    }
  }
}
```

---

### 8.3 Get Employee Salary Transactions

**Endpoint:** `GET /api/salaries/employee/:employeeId/transactions`

**Description:** Get salary history/transactions for an employee

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "date": "ISO 8601 date",
      "salary": "number",
      "change": "number (positive = increment, negative = decrement)",
      "note": "string"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "itemsPerPage": 10
  }
}
```

---

### 8.4 Update Employee Salary

**Endpoint:** `PUT /api/salaries/employee/:employeeId`

**Description:** Update an employee's salary structure

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "effectiveDate": "ISO 8601 date (required)",
  "earnings": {
    "basic": "number (required)",
    "hra": "number",
    "conveyance": "number",
    "utility": "number"
  },
  "deductions": {
    "pf": "number",
    "esic": "number",
    "professionalTax": "number",
    "incomeTax": "number",
    "loan": "number",
    "healthInsurance": "number"
  },
  "note": "string"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Salary updated successfully",
  "data": {
    "grossEarning": "number",
    "totalDeductions": "number",
    "netPayable": "number",
    "annualCTC": "number"
  }
}
```

---

### 8.5 Generate Salary Slip

**Endpoint:** `GET /api/salaries/employee/:employeeId/slip`

**Description:** Generate salary slip PDF for specified months

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| year | number | Year (required) - e.g., 2025 |
| months | string | Comma-separated month numbers (required) - e.g., "1,2,3" for Jan, Feb, Mar |

**Response (Success - 200):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="salary_slip_EMPCODE_Jan2025.pdf"

Binary PDF data
```

---

### 8.6 Send Salary Slip via Email

**Endpoint:** `POST /api/salaries/employee/:employeeId/slip/email`

**Description:** Send salary slip to employee's email

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "year": "number (required) - e.g., 2025",
  "months": ["number (required) - array of month numbers 1-12"]
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Salary slip sent to employee's email"
}
```

---

## 9. Dashboard APIs

### 9.1 Get Dashboard Stats

**Endpoint:** `GET /api/dashboard/stats`

**Description:** Get overall dashboard statistics

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "totalEmployees": "number",
    "activeEmployees": "number",
    "inactiveEmployees": "number",
    "newHiresThisMonth": "number",
    "totalDepartments": "number",
    "totalBranches": "number",
    "totalPayrollThisMonth": "number",
    "pendingApprovals": "number"
  }
}
```

---

### 9.2 Get Recent Activities

**Endpoint:** `GET /api/dashboard/activities`

**Description:** Get recent activities/logs

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | Number of activities (default: 10) |

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "type": "string (employee_added | salary_updated | employee_deactivated | etc.)",
      "description": "string",
      "performedBy": "string",
      "timestamp": "ISO 8601 datetime"
    }
  ]
}
```

---

### 9.3 Get Employee Distribution

**Endpoint:** `GET /api/dashboard/employee-distribution`

**Description:** Get employee distribution by department/branch

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "byDepartment": [
      { "name": "string", "count": "number" }
    ],
    "byBranch": [
      { "name": "string", "count": "number" }
    ],
    "byEmploymentType": [
      { "name": "string", "count": "number" }
    ],
    "byStatus": [
      { "name": "string", "count": "number" }
    ]
  }
}
```

---

## 10. Common Data Models

### 10.1 Error Response Format

All API errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ],
  "code": "ERROR_CODE"
}
```

### 10.2 Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate entry |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Internal Server Error |

### 10.3 Pagination Response Format

All paginated responses include:

```json
{
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number",
    "itemsPerPage": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  }
}
```

### 10.4 Enumerated Values

#### Gender
- `Male`
- `Female`
- `Other`

#### Marital Status
- `Single`
- `Married`
- `Divorced`
- `Widowed`

#### Blood Group
- `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`, `Unknown`

#### Employee Type
- `Full Time`
- `Part Time`
- `Intern`
- `Contract`

#### Work Mode
- `Office`
- `Hybrid`
- `Remote`

#### Employee Status
- `Active`
- `Inactive`
- `Resigned`

#### Shift Timing
- `Morning`
- `Evening`
- `Night`

#### Degree Type
- `UG (Undergraduate)`
- `PG (Postgraduate)`
- `Diploma`
- `Certification`
- `HSC (Higher Secondary)`
- `SSC (Secondary School)`

---

## Implementation Notes

### Authentication
- All protected endpoints require a valid JWT token in the `Authorization` header
- Token format: `Bearer <token>`
- Tokens should expire after a reasonable time (e.g., 24 hours)
- Implement refresh token mechanism for long-lived sessions

### File Uploads
- Maximum file size: 5MB per file
- Supported image formats: JPG, JPEG, PNG, SVG
- Supported document formats: PDF, JPG, JPEG, PNG
- Files should be stored in a cloud storage service (e.g., AWS S3, Cloudflare R2)

### Security Considerations
- Implement rate limiting on authentication endpoints
- Validate all input data on the server side
- Sanitize file uploads and validate file types
- Use HTTPS for all API communications
- Implement proper CORS configuration
- Hash passwords using bcrypt or similar
- Mask sensitive data in responses (e.g., partial account numbers)

### Database Considerations
- Use soft deletes for employee deactivation
- Maintain audit trails for salary changes
- Index frequently queried fields
- Implement proper foreign key constraints

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-01-25 | Initial API requirements document |

---

## Contact

For any questions or clarifications regarding these API requirements, please contact the development team.

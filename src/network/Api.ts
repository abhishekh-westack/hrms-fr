import { postRequest,getRequest, deleteRequest, putRequest } from "./ApiRequest"
import { ENDPOINTS } from "./Endpoints"

export const showAllEmployees = () => {
  return getRequest(ENDPOINTS.GET_ALL_EMPLOYEES);
};

export const showAllDepartments = () => {
  return getRequest(ENDPOINTS.GET_ALL_DEPARTMENT);
};

export const showAllDesignations = () => {
  return getRequest(ENDPOINTS.GET_ALL_DESIGNATION);
}
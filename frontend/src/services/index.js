import { StaffService } from "./staff";
import { TimeService } from "./time";
import { UserService } from "./users";
import { SalaryService } from "./salary";

export const staffService = new StaffService();
export const userService = new UserService();
export const timeService = new TimeService();
export const salaryService = new SalaryService();

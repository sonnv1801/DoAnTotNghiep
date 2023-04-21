import { StaffService } from "./staff";
import { TimeService } from "./time";
import { UserService } from "./users";

export const staffService = new StaffService();
export const userService = new UserService();
export const timeService = new TimeService();
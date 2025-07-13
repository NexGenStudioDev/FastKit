import zod from "zod";

export let UserValidator = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

import z from "zod";

export let joinContributorFormSchema=z.object({
   first_name:z.string().min(1,"This field is required."),
   last_name:z.string().min(1,"This field is required."),
   email:z.email('Email is incorrect.').min(1,'This field is required.'),
   password:z.string().min(8,'6 characters minimum.')
})
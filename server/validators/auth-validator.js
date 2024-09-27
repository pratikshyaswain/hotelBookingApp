const { z } = require("zod");

// Creating an object schema for signup
const signUpSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(255, { message: "Name must not be more than 255 characters." }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(10, { message: "Email must be at least 10 characters." }) // Corrected to match description
    .max(255, { message: "Email must not be more than 255 characters." }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters." })
    .max(20, { message: "Phone must not be more than 20 characters." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),

  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(10, { message: "Address must be at least 10 characters." })
    .max(50, { message: "Address must not be more than 50 characters." }),

  state: z
    .string({ required_error: "State is required" })
    .trim()
    .min(2, { message: "State must be at least 2 characters." })
    .max(50, { message: "State must not be more than 50 characters." }),

  city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(2, { message: "City must be at least 2 characters." })
    .max(50, { message: "City must not be more than 50 characters." }),

  pin: z
    .string({ required_error: "PIN code is required" })
    .trim()
    .length(6, { message: "PIN code must be exactly 6 digits." }) // Assuming it's a 6-digit code
    .regex(/^\d{6}$/, { message: "PIN code must contain only digits." }), // Ensures it contains only digits

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(10, { message: "Password must be at least 10 characters." }) // Corrected to match description
    .max(20, { message: "Password must not be more than 20 characters." }),
});

// Creating an object schema for signIn
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(10, { message: "Email must be at least 10 characters." }) // Corrected to match description
    .max(255, { message: "Email must not be more than 255 characters." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(10, { message: "Password must be at least 10 characters." }) // Corrected to match description
    .max(20, { message: "Password must not be more than 20 characters." }),
});

// booking validation

const bookingValidationSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(100, {
      message: "Username must not be more than 100 characters long.",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(10, { message: "Email must be at least 10 characters long." })
    .max(255, { message: "Email must not be more than 255 characters long." }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters long." })
    .max(20, {
      message: "Phone number must not be more than 20 characters long.",
    })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  location: z
    .string({ required_error: "Location is required" })
    .trim()
    .min(2, { message: "Location must be at least 2 characters long." })
    .max(255, {
      message: "Location must not be more than 255 characters long.",
    }),
  checkInDate: z.string({ required_error: "Check-in date is required" }).refine(
    (dateString) => {
      const [day, month, year] = dateString.split("-").map(Number);
      const checkInDate = new Date(day, month - 1, year);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return checkInDate >= today; // Check if the date is today or in the future
    },
    { message: "Check-in date must be today or in the future." }
  ),
  checkOutDate: z
    .string({ required_error: "Check-out date is required" })
    .refine(
      (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        const checkOutDate = new Date(day, month - 1, year);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return checkOutDate > today; // Check if the date is after today
      },
      { message: "Check-out date must be after check-in date." }
    )
    .refine(
      (dateString, context) => {
        const checkInDateString = context?.parent?.checkInDate;
        if (!checkInDateString) return true; // Skip validation if check-in date is missing
        const [checkInDay, checkInMonth, checkInYear] = checkInDateString
          .split("-")
          .map(Number);
        const [checkOutDay, checkOutMonth, checkOutYear] = dateString
          .split("-")
          .map(Number);
        const checkInDate = new Date(checkInYear, checkInMonth - 1, checkInDay);
        const checkOutDate = new Date(
          checkOutYear,
          checkOutMonth - 1,
          checkOutDay
        );
        return checkOutDate > checkInDate; // Check if check-out date is after check-in date
      },
      { message: "Check-out date must be after check-in date." }
    ),
  hotelName: z
    .string({ required_error: "Hotel name is required" })
    .trim()
    .min(3, { message: "Hotel name must be at least 3 characters long." })
    .max(1054, {
      message: "Hotel name must not be more than 1054 characters long.",
    }),
  rooms: z
    .string({ required_error: "Rooms number is required" })
    .trim()
    .regex(/^\d+$/, {
      message: "Room number must be a valid number.",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "Room number must be greater than zero.",
    })
    .refine((val) => parseInt(val, 10) <= 9999, {
      message: "Rooms number must not be more than 9999.",
    }),

  price: z
    .string({ required_error: "Amount is required" })
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid number with up to two decimal places.",
    })
    .min(1, { message: "Amount cannot be empty." })
    .max(20, { message: "Amount must not be more than 20 characters long." }),
});

module.exports = { signUpSchema, loginSchema, bookingValidationSchema };


export const required =value=> value?undefined:"The value is required";

export const minLength=value=>value?"The length must be more than 3 charactors":undefined;
export const maxLength=value=>value?"The length is too long":undefined;
export const email=value=>value &&
!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)?"The email format is incorrect":undefined;
export const phone=value=> value && !/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/i.test(value)
?"The phone number format is incorrect":undefined;
export const code=value=> value && !/^\\d{4}$/i.test(value)
?"The phone number format is incorrect":undefined;


export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string[];
}

export const validateField = (
  value: string,
  rules: ValidationRule[]
): string[] => {
  const errors: string[] = [];

  for (const rule of rules) {
    if (rule.required && (!value || value.trim() === "")) {
      errors.push(rule.message);
      continue;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors.push(rule.message);
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors.push(rule.message);
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message);
    }

    if (value && rule.custom && !rule.custom(value)) {
      errors.push(rule.message);
    }
  }

  return errors;
};

export const validateForm = (
  formData: { [key: string]: string },
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((field) => {
    const fieldErrors = validateField(formData[field] || "", rules[field]);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });

  return errors;
};

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[a-zA-Z\d@$!%*?&\-]{8,}$/,
  name: /^[a-zA-Z\s]{2,}$/,
};

// Common validation rules
export const commonRules = {
  email: [
    { required: true, message: "Email is required" },
    { pattern: patterns.email, message: "Please enter a valid email address" },
  ],
  password: [
    { required: true, message: "Password is required" },
    { minLength: 8, message: "Password must be at least 8 characters long" },
    {
      pattern: patterns.password,
      message: "Password must contain uppercase, lowercase, and number",
    },
  ],
  firstName: [
    { required: true, message: "First name is required" },
    { minLength: 2, message: "First name must be at least 2 characters" },
    {
      pattern: patterns.name,
      message: "First name can only contain letters and spaces",
    },
  ],
  lastName: [
    { required: true, message: "Last name is required" },
    { minLength: 2, message: "Last name must be at least 2 characters" },
    {
      pattern: patterns.name,
      message: "Last name can only contain letters and spaces",
    },
  ],
  phone: [
    { pattern: patterns.phone, message: "Please enter a valid phone number" },
  ],
  standard: [
    { required: true, message: "Standard is required" },
    { minLength: 1, message: "Atleast 1 character is required" },
    {
      pattern: patterns.name,
      message: "Standard can only contain numbers and letters",
    },
  ],
  age: [
    { required: true, message: "Age is required" },
    { minLength: 1, message: "Age should be more then 1" },
    {
      pattern: patterns.name,
      message: "Age can only contain numbers",
    },
  ],
};

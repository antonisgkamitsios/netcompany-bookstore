export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: (length: number) => `This field must be at least ${length} characters`,
  MAX_LENGTH: (length: number) => `This field must be at most ${length} characters`,
  UPPERCASE: 'The text must start with an uppercase letter',
  MIN: (val: number) => `This field must be more than ${val}`,
  MAX: (val: number) => `This field less be more than ${val}`,
} as const;

import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required, email, min, regex, numeric } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This is not a valid email'
});
extend('password', {
  params: ['target'],
  validate(value, params: Record<string, any>) {
    return value === params.target;
  },
  message: 'Password confirmation does not match'
});
extend('min', {
  ...min,
  message(value, args) {
    return `Must have at least ${args.length} characters`;
  }
});

extend('regex', {
  ...regex,

  message: 'Must be a Valid URL'
});

extend('numeric', {
  ...numeric,

  message: 'Must be a numeric value'
});
export { ValidationObserver, ValidationProvider };

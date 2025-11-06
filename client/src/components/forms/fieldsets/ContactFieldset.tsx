import { useId } from 'react';
import { cn } from '../../../utils/cn';
import { phoneNumberFormatter } from '../../../utils/phoneNumberFormatter';
import type { ContactFieldsetValues } from '../types';

interface ContactFieldsetProps {
  form: ContactFieldsetValues;
  onChange: <K extends keyof ContactFieldsetValues>(name: K, value: ContactFieldsetValues[K]) => void;
}

export const ContactFieldSet = ({ form, onChange }: ContactFieldsetProps) => {
  const handleChange = <K extends keyof ContactFieldsetValues>(e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name as K, e.target.value as ContactFieldsetValues[K]);
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.name as keyof ContactFieldsetValues, phoneNumberFormatter(e.target.value));
  };

  const labelClasses = cn('text-xl font-bold mb-1');

  const firstNameId = useId();
  const lastNameId = useId();
  const companyId = useId();
  const phoneId = useId();
  const emailId = useId();

  return (
    <fieldset className={cn('flex flex-col gap-4')}>
      <legend className={cn('sr-only')}>Contact</legend>

      {/* Name */}
      <fieldset>
        <legend className={labelClasses}>Name</legend>
        <div className={cn('flex flex-col gap-6', 'md:flex-row')}>
          <label htmlFor={firstNameId} className="sr-only">
            First Name
          </label>
          <input
            type="text"
            id={firstNameId}
            name="firstName"
            placeholder="First"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor={lastNameId} className="sr-only">
            Last Name
          </label>
          <input
            type="text"
            id={lastNameId}
            name="lastName"
            placeholder="Last"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>

      {/* Company */}
      <div className={cn('flex flex-col')}>
        <label htmlFor={companyId} className={labelClasses}>
          Company
        </label>
        <input
          type="text"
          id={companyId}
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="(optional)"
        />
      </div>

      <div className={cn('flex flex-col gap-6', 'md:flex-row')}>
        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor={phoneId} className={labelClasses}>
            Phone
          </label>
          <input
            type="tel"
            id={phoneId}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handlePhoneBlur}
            maxLength={14}
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor={emailId} className={labelClasses}>
            Email
          </label>
          <input type="email" id={emailId} name="email" value={form.email} onChange={handleChange} required />
        </div>
      </div>
    </fieldset>
  );
};

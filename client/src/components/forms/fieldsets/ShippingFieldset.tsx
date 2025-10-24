import { useId } from 'react';
import { cn } from '../../../utils/cn';
import { postalCodeFormatter } from '../../../utils/postalCodeFormatter';
import type { ShippingFieldsetValues } from '../types';

interface ShippingFieldsetProps {
  form: ShippingFieldsetValues;
  onChange: <K extends keyof ShippingFieldsetValues>(name: K, value: ShippingFieldsetValues[K]) => void;
}

export const ShippingFieldset = ({ form, onChange }: ShippingFieldsetProps) => {
  const handleChange = <K extends keyof ShippingFieldsetValues>(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onChange(e.target.name as K, e.target.value as ShippingFieldsetValues[K]);
  };

  const handlePostalCodeBlur = <K extends keyof ShippingFieldsetValues>(
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    onChange(e.target.name as K, postalCodeFormatter(e.target.value) as ShippingFieldsetValues[K]);
  };

  const labelClasses = cn('text-xl font-bold mb-1');

  const provinces: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];

  const address1Id = useId();
  const address2Id = useId();
  const cityId = useId();
  const provinceId = useId();
  const postalCodeId = useId();

  return (
    <fieldset className={cn('flex flex-col space-y-4')}>
      <legend className={cn('sr-only')}>Shipping Info</legend>

      {/* Address */}
      <fieldset>
        <legend className={labelClasses}>Address</legend>
        <div className={cn('flex flex-col space-y-2')}>
          <label htmlFor={address1Id} className={cn('sr-only')}>
            Address Line 1
          </label>
          <input
            type="text"
            id={address1Id}
            name="address1"
            placeholder="Address Line 1"
            value={form.address1}
            onChange={handleChange}
            required
          />

          <label htmlFor={address2Id} className={cn('sr-only')}>
            Address Line 2
          </label>
          <input
            type="text"
            id={address2Id}
            name="address2"
            placeholder="Address Line 2 (optional)"
            value={form.address2}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <div className={cn('flex space-x-6')}>
        {/* City*/}
        <div className={cn('flex flex-col')}>
          <label htmlFor={cityId} className={labelClasses}>
            City
          </label>
          <input type="text" id={cityId} name="city" value={form.city} onChange={handleChange} required />
        </div>

        {/* Province */}
        <div className={cn('flex flex-col')}>
          <label htmlFor={provinceId} className={labelClasses}>
            Province
          </label>
          <select id={provinceId} name="province" value={form.province} onChange={handleChange} required>
            {provinces.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* Postal Code */}
        <div className={cn('flex flex-col')}>
          <label htmlFor={postalCodeId} className={labelClasses}>
            Postal Code
          </label>
          <input
            type="text"
            id={postalCodeId}
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            onBlur={handlePostalCodeBlur}
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

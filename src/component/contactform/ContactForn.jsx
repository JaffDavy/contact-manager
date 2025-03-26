import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

export const ContactForm = ({
    onSubmit,
    initialData,
    onCancel
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: initialData || {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            countryCode: '+237', // Default country code Cameroon
            group: '',
            type: 'personal'
        }
    });

    // Watch for country code and phone changes
    const countryCode = watch("countryCode");
    const phone = watch("phone");

    const countryCodes = [
        { code: '+237', name: 'Cameroon' },
        { code: '+1', name: 'USA' },
        { code: '+44', name: 'UK' },
        { code: '+33', name: 'France' },
        { code: '+49', name: 'Germany' },
        { code: '+234', name: 'Nigeria' },
        { code: '+254', name: 'Kenya' },
        { code: '+27', name: 'South Africa' }
    ];

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setValue("phone", phoneValue);
    };

    const handleFinalSubmit = (data) => {
        const fullPhoneNumber = `${data.countryCode} ${data.phone}`;
        onSubmit({ ...data, phone: fullPhoneNumber });
    };

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="form">
            <div className="form-header">
                <h2 className="form-title">
                    {initialData ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="close-button"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                        {...register('firstName', { required: 'First name is required' })}
                        className="form-input"
                    />
                    {errors.firstName && (
                        <p className="error-message">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                        {...register('lastName', { required: 'Last name is required' })}
                        className="form-input"
                    />
                    {errors.lastName && (
                        <p className="error-message">{errors.lastName.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        className="form-input"
                    />
                    {errors.email && (
                        <p className="error-message">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone Number with Country Code */}
                <div className="form-group">
                    <label className="form-label">Phone</label>
                    <div className="phone-input">
                        <select
                            {...register('countryCode')}
                            className="country-code-select"
                        >
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                        <input
                            {...register('phone', {
                                required: 'Phone is required',
                                pattern: {
                                    value: /^\d{6,15}$/,
                                    message: 'Invalid phone number'
                                }
                            })}
                            className="form-input phone-number"
                            onChange={handlePhoneChange}
                        />
                    </div>
                    {errors.phone && (
                        <p className="error-message">{errors.phone.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Group</label>
                    <input
                        {...register('group')}
                        placeholder="e.g., Family, Work, Friends"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                        {...register('type')}
                        className="form-select"
                    >
                        <option value="personal">Personal</option>
                        <option value="professional">Professional</option>
                    </select>
                </div>
            </div>

            <div className="form-footer">
                <button
                    type="button"
                    onClick={onCancel}
                    className="button button-secondary"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="button button-primary"
                >
                    {initialData ? 'Save Changes' : 'Add Contact'}
                </button>
            </div>
        </form>
    );
};

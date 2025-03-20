import React from 'react';
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
        formState: { errors }
    } = useForm({
        defaultValues: initialData || {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            group: '',
            type: 'personal'
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
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

                <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^\+?[\d\s-]+$/,
                                message: 'Invalid phone number'
                            }
                        })}
                        className="form-input"
                    />
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
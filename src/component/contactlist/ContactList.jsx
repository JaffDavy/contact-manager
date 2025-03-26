import React from 'react';
import { Edit2, Trash2, User, Briefcase } from 'lucide-react';

export const ContactList = ({ contacts, onEdit, onDelete }) => {
    // Sort contacts alphabetically by first name
    const sortedContacts = [...contacts].sort((a, b) => 
        a.firstName.localeCompare(b.firstName)
    );

    return (
        <div className="contact-grid">
            {sortedContacts.map((contact) => (
                <div key={contact.id} className="contact-card">
                    <div className="contact-header">
                        <div className="contact-info">
                            <div className={`contact-type-icon ${contact.type}`}>
                                {contact.type === 'personal' ? (
                                    <User className="w-5 h-5" />
                                ) : (
                                    <Briefcase className="w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <h3 className="contact-name">
                                    {contact.firstName} {contact.lastName}
                                </h3>
                                <p className="contact-group">{contact.group}</p>
                            </div>
                        </div>
                        <div className="contact-actions">
                            <button
                                onClick={() => onEdit(contact)}
                                className="action-button edit"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(contact.id)}
                                className="action-button delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="contact-details">
                        <div>
                            <p className="detail-label">Email</p>
                            <p className="detail-value">{contact.email}</p>
                        </div>
                        <div>
                            <p className="detail-label">Phone</p>
                            <p className="detail-value">{contact.phone}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

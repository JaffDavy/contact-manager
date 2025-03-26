import React, { useState, useMemo } from 'react';
import { ContactForm } from './component/contactform/ContactForn';
import { ContactList } from './component/contactlist/ContactList';
import { SearchBar } from './component/searchbar/SearchBar';
import { useContactStore } from './store/useContactStore';
import { Plus } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  
  const {
    contacts,
    searchQuery,
    selectedGroup,
    addContact,
    editContact,
    deleteContact,
    setSearchQuery,
    setSelectedGroup
  } = useContactStore();

  const groups = useMemo(() => {
    const uniqueGroups = new Set(contacts.map(contact => contact.group));
    return Array.from(uniqueGroups).filter(Boolean);
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = (
        contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const matchesGroup = selectedGroup === 'all' || contact.group === selectedGroup;
      
      return matchesSearch && matchesGroup;
    });
  }, [contacts, searchQuery, selectedGroup]);

  const handleSubmit = (data) => {
    if (editingContact) {
      editContact(editingContact.id, data);
    } else {
      addContact(data);
    }
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <div className="header-content">
            <h1 className="title">Contacts</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="add-button"
            >
              <Plus className="w-5 h-5" />
              Add Contact
            </button>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onGroupSelect={setSelectedGroup}
            selectedGroup={selectedGroup}
            groups={groups}
          />
        </div>

        {isFormOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ContactForm
                onSubmit={handleSubmit}
                initialData={editingContact}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        <ContactList
          contacts={filteredContacts}
          onEdit={handleEdit}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
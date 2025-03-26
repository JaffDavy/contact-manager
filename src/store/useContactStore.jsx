import { create } from 'zustand';

export const useContactStore = create((set) => ({
  contacts: [],
  searchQuery: '',
  selectedGroup: 'all',
  
  addContact: (contactData) => set((state) => ({
    contacts: [...state.contacts, { ...contactData, id: crypto.randomUUID() }]
  })),
  
  editContact: (id, contactData) => set((state) => ({
    contacts: state.contacts.map(contact => 
      contact.id === id ? { ...contactData, id } : contact
    )
  })),
  
  deleteContact: (id) => set((state) => ({
    contacts: state.contacts.filter(contact => contact.id !== id)
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedGroup: (group) => set({ selectedGroup: group })
}));
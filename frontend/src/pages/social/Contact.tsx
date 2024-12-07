import { ArchiveBoxXMarkIcon } from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Contact {
  name: string;
  remark: string;
}

const Contact: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<string>('');
  const [newRemark, setNewRemark] = useState<string>('');

  const addContact = () => {
    if (newContact && newRemark) {
      setContacts([...contacts, { name: newContact, remark: newRemark }]);
      setNewContact('');
      setNewRemark('');
    }
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-8">
        <input
          type="text"
          value={newContact}
          onChange={e => setNewContact(e.target.value)}
          placeholder="Add new contact"
          className="w-[300px] box-border py-2.5 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 mb-2"
        />
        <input
          type="text"
          value={newRemark}
          onChange={e => setNewRemark(e.target.value)}
          placeholder="Add remark"
          className="w-[300px] box-border py-2.5 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
        />
        <button
          className="w-[300px] box-border mt-2 py-2.5 px-3 bg-[#2da1ff] text-white text-sm rounded-lg hover:bg-blue-400 transition-colors capitalize"
          onClick={addContact}
        >
          Add
        </button>
      </div>
      <ul className="mt-4 space-y-2 bg-white rounded-lg shadow-md">
        {contacts.map((contact, index) => (
          <li key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-md hover:bg-gray-100">
            <div className="flex flex-1 overflow-auto justify-start items-center gap-2">
              <UserCircleIcon width={40} />
              <div className="flex-1 overflow-auto flex flex-col gap-1">
                <span className="break-word">{contact.name}</span>
                <span className="text-gray-500 text-xs">{contact.remark}</span>
              </div>
            </div>
            <button
              className="ml-2 p-0 border-none bg-transparent text-gray-500 hover:text-red-500 transition-colors frc-center"
              onClick={() => removeContact(index)}
            >
              <ArchiveBoxXMarkIcon className="w-6 h-6 hover:text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;

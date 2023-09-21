const ContactList = () => {
  const contacts = [
    { id: 1, name: "Alice", phone: "010-1234-5678" },
    { id: 2, name: "John", phone: "010-0987-6543" },
  ];

  const handleClickItem = () => {};

  return (
    <div>
      <h3>Contact List</h3>
      <ul>
        {contacts.map((c) => (
          <li key={`item-${c.id}`} onClick={handleClickItem}>
            <span>
              {c.name} - {c.phone}
            </span>
          </li>
        ))}
      </ul>
      <button>Go to Detail</button>
    </div>
  );
};

export default ContactList;

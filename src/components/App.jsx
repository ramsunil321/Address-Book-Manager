import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [contacts, setContacts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");

  const handleAddContact = (event) => {
    event.preventDefault();

    const existingContact = contacts.find((c) => c.mobile === mobile);
    if (existingContact) {
      alert("Mobile number already exists!");
      return;
    }

    const newContact = { name, mobile };
    setContacts([...contacts, newContact]);

    setName("");
    setMobile("");
  };

  const handleFilterName = (event) => {
    setNameFilter(event.target.value);
  };

  const handleFilterMobile = (event) => {
    setMobileFilter(event.target.value);
  };

  const handleDeleteContact = (mobile) => {
    const updatedContacts = contacts.filter((c) => c.mobile !== mobile);
    setContacts(updatedContacts);
  };

  const handleEditContact = (mobile, newName, newMobile) => {
    const updatedContacts = contacts.map((c) => {
      if (c.mobile === mobile) {
        const updatedName = newName !== undefined ? newName : c.name;
        const updatedMobile = newMobile !== undefined ? newMobile : c.mobile;
        return { name: updatedName, mobile: updatedMobile };
      } else {
        return c;
      }
    });
    setContacts(updatedContacts);
  };
  
  

  const filteredContacts = contacts.filter((c) => {
    const nameMatch = c.name.toLowerCase().includes(nameFilter.toLowerCase());
    const mobileMatch = c.mobile.includes(mobileFilter);
    return nameMatch && mobileMatch;
  });

  return (
    <div className="App">
      <Header />
      <main className="App-content">
        <div className="add-contact-form">
          <h2>Add a New Contact</h2>
          <form onSubmit={handleAddContact}>
            <label htmlFor="name-input">Name:</label>
            <input
              id="name-input"
              type="text"
              value={name}
              required
              autoFocus
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="mobile-input">Mobile Number:</label>
            <input
              id="mobile-input"
              type="number"
              value={mobile}
              required
              onChange={(event) => setMobile(event.target.value)}
            />
            <button type="submit">Add Contact</button>
          </form>
        </div>
        <div className="contact-list">
          <h2>Contact List</h2>
          <label htmlFor="name-filter-input">Filter by Name:</label>
          <input
            id="name-filter-input"
            type="text"
            value={nameFilter}
            onChange={handleFilterName}
          />
          <label htmlFor="mobile-filter-input">Filter by Mobile Number:</label>
          <input
            id="mobile-filter-input"
            type="number"
            value={mobileFilter}
            onChange={handleFilterMobile}
          />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr key={c.mobile}>
                  <td>{c.name}</td>
                  <td>{c.mobile}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleEditContact(
                          c.mobile,
                          prompt("Enter new name", c.name),
                          prompt("Enter new mobile number", c.mobile)
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteContact(c.mobile)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

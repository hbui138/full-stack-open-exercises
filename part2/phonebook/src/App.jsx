import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    personService.getAll().then((initialLists) => {
      setPersons(initialLists);
    });
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newPhone,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (!existingPerson) {
      personService.create(personObj).then((returnedList) => {
        setPersons(persons.concat(returnedList));
        setNewName("");
        setNewPhone("");

        handleAddMessage(personObj.name);
      });
    } else {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      );
      if (confirmation) {
        handleNumberUpdate(existingPerson.id, personObj.number);
      }
    }
  };

  const handleAddMessage = (personName) => {
    setMessageType("success")
    setMessage(`Added ${personName}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleDeleteMessage = (personName) => {
    setMessage(
      `Information of ${personName} has already been removed from the server`
    );
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleNumberUpdate = (id, newNumber) => {
    const personToUpdate = persons.find((person) => person.id === id);
    const changedPersonObj = { ...personToUpdate, number: newNumber };

    personService.update(id, changedPersonObj).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id === id ? returnedPerson : person))
      );
      setNewName("");
      setNewPhone("");
      handleAddMessage(returnedPerson.name);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeletion = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then((returnedPerson) => {
          persons.map((person) => (person.id !== id ? person : returnedPerson));
        })
        .catch((error) => {
          setMessageType("error")
          handleDeleteMessage(personToDelete.name);
          setPersons(persons.filter((person) => person.id !== id));
        });

      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  //Filter the array according to the term
  const personsToShow = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <Form
        newName={newName}
        newPhone={newPhone}
        handleAdd={handleAdd}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handleDeletion={handleDeletion} />
    </div>
  );
};

export default App;

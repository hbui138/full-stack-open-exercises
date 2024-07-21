const Persons = ({ personsToShow, handleDeletion }) => {
    return (
        <div>
        {personsToShow.map(person => <Person key={person.id} person={person} handleDeletion={handleDeletion}/>)}
        </div>
    )
}

const Person = ({ person, handleDeletion }) => {
    return (
        <div>
            {person.name} {person.number} 
            <button onClick={() => handleDeletion(person.id)}>delete</button>
        </div>
    )
}

export default Persons
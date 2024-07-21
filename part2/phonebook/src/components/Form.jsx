const Form = ({ newName, newPhone, handleAdd, handleNameChange, handlePhoneChange }) => {
    return (
        <form onSubmit={handleAdd}>
        <div>
            name: <input 
            value={newName}
            onChange={handleNameChange}
        />
        </div>
        <div>
            number: <input 
            value={newPhone}
            onChange={handlePhoneChange}
        />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default Form
  
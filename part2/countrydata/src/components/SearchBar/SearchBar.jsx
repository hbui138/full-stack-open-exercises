export const SearchBar = ({searchTerm, handleSearchChange}) => {
    return (
        <div>
            Find a country <input onChange={handleSearchChange} value={searchTerm}/>
        </div>
    )
}
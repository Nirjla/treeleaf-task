export default function SearchField({ searchTerm, setSearchTerm }) {
      // Search function
      const handleSearch = (event) => {
            setSearchTerm(event.target.value);
      };
      return (<>
            <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="p-2 border rounded"
            />
      </>)
}
export default function CommonSort({ selectedItem, setSelectedItem, data }) {
      return (<>
            <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="p-2 border rounded"
            >
                  <option value="">Select One</option>
                  {data.map((item) => (
                        <option key={item} value={item}>
                              {item}
                        </option>
                  ))}
            </select>

      </>)
}
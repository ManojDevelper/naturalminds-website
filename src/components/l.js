import React, { useState, useEffect } from 'react'
import axios from "axios";

function L() {
    const [filterValue, setFilterValue] = useState("")


    async function search() {
        let item = { filterValue }

        let result = await fetch("https://stagpay.spotcare.in/apinm/api/searchDoctors", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json()
        console.warn("result", result)
    }

    return (
        <div className="App">
            <h3>Search Filter</h3>
            <input type="text" placeholder="search..." value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
            <button onClick={search}>search</button>
        </div>
    )
}
export default L;

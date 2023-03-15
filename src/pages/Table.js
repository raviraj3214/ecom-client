import React, { useState, useEffect } from "react"

const Table = () => {
    const table = [
        {
            id: 1,
            name: "ravi",
        },
        {
            id: 2,
            name: "ram",
        },
        {
            id: 3,
            name: "raju",
        },
        {
            id: 4,
            name: "raj",
        },
    ]
    return (
        <div>
               { <ol>
                   
                    table.map((i)=>(
                      
                        <li>{i.id}</li>)
                       
                    )
                   
                </ol>}
        </div>
    )
}

export default Table

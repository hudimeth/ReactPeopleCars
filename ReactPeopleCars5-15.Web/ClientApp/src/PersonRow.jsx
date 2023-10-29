import React from 'react';
import { Link } from 'react-router-dom'

const PersonRow = ({ person }) => {
    const { id, firstName, lastName, age, cars } = person;
    return <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>{cars === null ? 0 : cars.length}</td>
        <td><Link to={ `/addcarforperson/${id}`} className='btn btn-warning'>Add Car</Link></td>
        <td><Link to={cars.length === 0 ? '/' : `/deletecars/${id}`} className='btn btn-danger'>Delete Cars</Link></td>
    </tr> 
}
export default PersonRow;
import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Home extends React.Component {

    state = {
        people: [],
        searchText: ''
    }
    refreshTable = async () => {
        const { data } = await axios.get('/api/personcars/getall');
        this.setState({ people: data });
        //console.log(data)
    }
    componentDidMount = async () => {
        await this.refreshTable();
    }
    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value })
    }
    onClearClicked = () => {
        this.setState({ searchText: '' })
    }
    //


    render() {
        const { people, searchText } = this.state;
        return <div className='container'>
            <Link to='/addperson' className='btn btn-primary mt-3'>Add Person</Link>
            <div className='row mt-5'>
                <div className='col'>
                    <input className='form-control' onChange={this.onSearchTextChange} placeholder='search people by name' name='searchText' value={this.state.searchText} />
                </div>
                <div className='col w-100'>
                    <button onClick={this.onClearClicked} className='btn btn-success'>Clear</button>
                </div>
            </div>
            <table className='mt-5 table table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </tr>
                </thead>
                <tbody>
                    {people.filter(p => `${p.firstName.toLowerCase()} ${p.lastName.toLowerCase()}`.includes(searchText.toLowerCase()))
                        .map(p => <PersonRow person={p}
                        key={p.id} />)}
                </tbody>
            </table>
        </div>
    }
}
export default Home;
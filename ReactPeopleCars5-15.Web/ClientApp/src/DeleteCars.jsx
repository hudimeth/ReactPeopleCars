import React from 'react'
import CarRow from './CarRow';
import axios from 'axios';

class DeleteCars extends React.Component {
    state = {
        person: {
            id: 0,
            firstName: '',
            lastName: '',
            age:'',
            cars:[]
        }
    }
    getPerson = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/personcars/getpersonbyid?id=${id}`);
        this.setState({ person: data });
    }
    componentDidMount = async () => {
        this.getPerson();
    }
    onYesClick = async () => {
        const { person } = this.state;
        await axios.post('/api/personcars/deletecarsforperson', person);
        //console.log(this.state.person)
        this.props.history.push('/')
    }
    onNoClick = () => {
        this.props.history.push('/');
    }
    onConsoleLogPersonClick = () => {
        console.log(this.state.person)
    }
    
    render() {
        const { person } = this.state;
        return <div className='container'>
            <button onClick={this.onConsoleLogPersonClick} className='btn btn-dark'>console.log person</button>
            <h2 className='text-center mt-5'>Cars for {person.firstName} {person.lastName }</h2>
            <table className='mt-5 table table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {person.cars.map(c => <CarRow car={c}
                        key={c.id }                    />)}
                </tbody>
            </table>
            <div className='row mt-5'>
                <h2 className='text-center'>Are you sure you'd like to delete all these cars?</h2>
                <div className='col-md-6 mt-2'>
                    <button onClick={this.onYesClick} className='btn btn-primary w-100'>YES</button>
                </div>
                <div className='col-md-6'>
                    <button onClick={ this.onNoClick} className='btn btn-danger w-100'>NO</button>
                </div>
            </div>
        </div>
    }
}

export default DeleteCars;
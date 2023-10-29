import React from 'react';
import { produce } from 'immer'
import axios from 'axios';

class AddCarForPerson extends React.Component {
    state = {
        person: {
            id: 0,
            firstName: '',
            lastName:''
        },
        car: {
            make: '',
            model: '',
            year:''
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/personcars/getpersonbyid?id=${id}`);
        this.setState({ person: data });
        //console.log(data)
    }

    onTextChange = (e) => {
        const nextState = produce(this.state, draft => {
            draft.car[e.target.name] = e.target.value;
        })
        this.setState(nextState);
        //console.log(this.state.car)
    }

    onSubmitClick = async () => {
        const { person, car } = this.state;
        console.log(person.id, car)
        await axios.post('/api/personcars/addcar', { ...car, personId: person.id })
        //const { data } = await axios.get('/api/personcars/getcarcountforperson', { id: person.id });
        //console.log(data);
        this.props.history.push('/')
    }

    render() {
        const { firstName, lastName } = this.state.person;
        const { make, model, year } = this.state.car;
        return <div className="container">
            <div className='row'>
                <div className="col-md-6 offset-md-3 card bg-light p-4">
                    <h2>Add car for {firstName} {lastName }</h2>
                    <input type="text" onChange={this.onTextChange} className="form-control" name="make" placeholder="Make" value={make} />
                    <input type="text" onChange={this.onTextChange} className="form-control mt-3" name="model" placeholder="Model" value={model} />
                    <input type="text" onChange={this.onTextChange} className="form-control mt-3" name="year" placeholder="Year" value={year} />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-lg btn-block mt-3">Submit</button>
                </div>
            </div>
        </div>
    }
}

export default AddCarForPerson;
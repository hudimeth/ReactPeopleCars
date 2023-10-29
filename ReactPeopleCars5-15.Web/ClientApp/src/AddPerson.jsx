import React from 'react';
import axios from 'axios';
import {produce } from 'immer'

class AddPerson extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        age:''
    }

    onSubmitClick = async () => {
        await axios.post('/api/personcars/addperson', { ...this.state, age: +this.state.age })
        this.props.history.push('/')
    }
    onTextChange = (e) => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        })
        this.setState(nextState);
    }

    render() {
        const {firstName, lastName, age } = this.state
        return <div className="container">
            <div className='row'>
                <div className="col-md-6 offset-md-3 card bg-light p-4">
                    <h2>Add a New Person</h2>
                    <input type="text" onChange={ this.onTextChange} className="form-control" name="firstName" placeholder="First Name" value={firstName} />
                    <input type="text" onChange={this.onTextChange} className="form-control mt-3" name="lastName" placeholder="Last Name" value={lastName} />
                    <input type="text" onChange={this.onTextChange} className="form-control mt-3" name="age" placeholder="Age" value={age} />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-lg btn-block mt-3">Submit</button>
                </div>
            </div>
        </div>
    } 
}
export default AddPerson;
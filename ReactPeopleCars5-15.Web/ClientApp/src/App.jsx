import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddPerson from './AddPerson';
import Home from './Home';
import { Route } from 'react-router-dom'
import Layout from './Layout'
import AddCarForPerson from './AddCarForPerson';
import DeleteCars from './DeleteCars';

class App extends React.Component {
    render() {
        return (
            <>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/AddPerson' component={AddPerson} />
                    <Route exact path='/addcarforperson/:id' component={AddCarForPerson} />
                    <Route exact path='/deletecars/:id' component={DeleteCars }/>
                </Layout>
            </>
        )
    }
};

export default App;
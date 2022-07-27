import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './navbar';
import Home from './content/home';
import Calculator from './content/calculator';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notFund';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/calculator' element={<Calculator />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/404' element={<NotFound />} />
                        <Route path="*" element={ <Navigate replace to="/404" /> } />  // 重定向其他没有定义的都跳转到404
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;
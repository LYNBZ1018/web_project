import React, { Component } from 'react';

class Base extends Component {
    state = {  } 
    render() { 
        return (
            <div class="card" style={{marginTop: "20px"}}>
                <div class="card-body">
                    <h4>{this.props.children}</h4>
                </div>
            </div>
        );
    }
}
 
export default Base;
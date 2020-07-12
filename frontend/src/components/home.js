import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import ProtoSection from './protoService';
import JsonSection from './jsonService';
import HelloSection from './helloPage';
import CurrencySection from './currency';
import Navbar from './navbar-component';


class HomeSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };

    }



    render() {
        return (
            <div>

                <BrowserRouter>
                    <Navbar></Navbar>
                    <div className="col-8">
                        <div className="tab-content" id="nav-tabContent">
                            {/* <div>{this.props.children}</div> */}
                            <Route path="/" component={HelloSection} exact />

                            <Route path="/services/proto" component={ProtoSection} exact />
                            <Route path="/services/json" component={JsonSection} exact />
                            <Route path="/services/curr" component={CurrencySection} exact />

                        </div>
                    </div>



                </BrowserRouter>
            </div>
        );
    }
}

export default HomeSection;
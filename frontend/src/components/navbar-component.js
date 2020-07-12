import React from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return (

            <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                    <Link to="/services/proto" className="list-group-item list-group-item-action" >Proto </Link>
                    <Link to="/services/json" className="list-group-item list-group-item-action">JSON </Link>
                    <Link to="/services/curr" className="list-group-item list-group-item-action">Curr </Link>
                </div>


            </div >
        )
    }
}

export default Navbar;
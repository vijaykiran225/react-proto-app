import React, { Component } from 'react';

var addressbook = require('../model/proto/address_book_pb');

class ProtoService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "",
            email: "",
            phone: "",
            phonetype: "",
            status: "try me"
        }
        this.handleChangeOfID = this.handleChangeOfID.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    handleChangeOfID(event) {

        this.setState({
            id: event.target.value
        });
    }

    doAction(event) {


        this.setState({
            status: "fetching"

        });
        let pers = new addressbook.Person();
        pers.setId(this.state.id);

        let url = "http://localhost:4200/proto"

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-protobuf'
            },
            body: pers.serializeBinary()
        })
            .then(data => data.json())
            .then(data => this.fixArrayType(data))
            .then(data => addressbook.Person.deserializeBinary(data))
            .then(respData => {

                this.setState({
                    name: respData.getName(),
                    email: respData.getEmail(),
                    phone: respData.getPhonesList()[0].getNumber(),
                    phonetype: respData.getPhonesList()[0].getType(),
                    status: "try me"

                });

            })
            .catch(e => {
                console.log("error happened", e);
                this.setState({
                    status: "retry me"
                });
            });


    }

    fixArrayType(protoData) {
        var ret = new Uint8Array(Object.keys(protoData).length);
        for (var i = 0; i < Object.keys(protoData).length; i++) {
            ret[i] = protoData[i];
        }
        return ret;
    }


    render() {
        return (
            <div>proto service

                <div>

                    <form name="vForm" id="formId"  >

                        <br />
                        <input
                            type="text"
                            value={this.state.id}
                            onChange={this.handleChangeOfID}
                        />
                        <br />
                        <input
                            type="text"

                            value={this.state.name}
                            readOnly="true"
                        /><br />
                        <input
                            type="text"


                            value={this.state.email}
                            readOnly="true"
                        /><br />

                        <input
                            type="text"

                            value={this.state.phone}
                            readOnly="true"
                        /><br />

                        <input
                            type="text"


                            value={this.state.phonetype}
                            readOnly="true"
                        /><br />
                        <button type="button" onClick={this.doAction} disabled={this.state.status === "fetching"}>{this.state.status} </button>
                    </form>
                </div>

            </div>
        );
    }
}

export default ProtoService;
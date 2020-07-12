import React, { Component } from 'react';

class JsonService extends Component {
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
        let pers = {
            id: this.state.id
        };

        let url = "http://localhost:4200/json"

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: pers
        })
            .then(data => data.json())
            .then(respData => {

                this.setState({
                    name: respData.name,
                    email: respData.email,
                    phone: respData.phones[0].phoneNumber,
                    phonetype: respData.phones[0].phoneType,
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

    render() {
        return (<div>json service
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
        </div>);
    }
}

export default JsonService;
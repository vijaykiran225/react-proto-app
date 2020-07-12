import React, { Component } from 'react';

class CurrencyService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            fromCurr: "",
            toCurr: "",
            answer: "",
            status: "try me"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFromCurr = this.handleChangeFromCurr.bind(this);
        this.handleChangeToCurr = this.handleChangeToCurr.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    doAction(event) {


        this.setState({
            status: "fetching"

        });

        let from = this.state.fromCurr;
        let to = this.state.toCurr;

        let url = `http://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`;


        fetch(url, {
            method: 'get'
        })
            .then(data => data.json())
            .then(respData => {

                this.setState({
                    answer: respData.amount,
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

    handleChange(event) {

        this.setState({
            amount: event.target.value
        });
    }

    handleChangeFromCurr(event) {

        this.setState({
            fromCurr: event.target.value
        });
    }

    handleChangeToCurr(event) {

        this.setState({
            toCurr: event.target.value
        });
    }

    render() {
        return (<div>curr serv

            <div>

                <form name="vForm" id="formId"  >

                    <br />
                    <input
                        type="text"
                        value={this.state.amount}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="from"
                        id="fromVal"
                        value={this.state.fromCurr}
                        onChange={this.handleChangeFromCurr}
                    /><br />
                    <input
                        type="text"
                        name="to"
                        id="toVal"

                        value={this.state.toCurr}
                        onChange={this.handleChangeToCurr}
                    /><br />
                    <input
                        type="text"
                        value={this.state.answer}
                        readOnly="true"
                    /><br />
                    <button type="button" onClick={this.doAction} disabled={this.state.status === "fetching"}>{this.state.status} </button>

                </form>
            </div>

        </div>);
    }
}

export default CurrencyService;
let express = require('express');
var cors = require('cors')
let AddressBook = require('./model/proto/address_book_pb');
var bodyParser = require('body-parser')
let app = express()

app.use(cors());
app.use(bodyParser.text({ type: 'application/x-protobuf' }));


app.post("/proto", (req, res) => {

    console.log("got a hit", Uint8Array.from(req.body, c => c.charCodeAt(0)));


    let data = AddressBook.Person.deserializeBinary(Uint8Array.from(req.body, c => c.charCodeAt(0)));
    // let data = new AddressBook.AddressBook();

    let pers = new AddressBook.Person();

    pers.setName("vijaykiran");
    pers.setId(data.getId());
    pers.setEmail("vijay@vj.com");

    let phone = new AddressBook.Person.PhoneNumber();

    phone.setNumber("9876543210");
    phone.setType(AddressBook.Person.PhoneType.WORK);

    pers.addPhones(phone);
    setTimeout(() => {
        res.set('Content-Type', 'application/x-protobuf');
        res.send(pers.serializeBinary());
    }, 3000);


});

app.post("/json", (req, res) => {

    let pers = {
        name: "vijaykiran Json",
        id: req.body.id,
        email: "Flash@json.com",
        phones: [
            {
                phoneNumber: "1234567890",
                phoneType: "MOBILE"
            }
        ]
    };

    setTimeout(() => {
        res.set('Content-Type', 'application/json');
        res.send(pers);
    }, 1800);


});


app.listen(4200, () => console.log("started"));
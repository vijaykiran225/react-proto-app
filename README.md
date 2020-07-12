protoc --proto_path=src --js_out=import_style=commonjs,binary:build/gen src/foo.proto src/bar/baz.proto

protoc --js_out=import_style=commonjs:proto  address_book.proto
 
protoc --js_out=import_style=commonjs:model/proto --proto_path=model model/address_book.proto

 
 protoc address_book.proto --js_out=import_style=commonjs:. --proto_path=~/Downloads/protobuf-3.12.3/src


 /* eslint-disable */ has to be added
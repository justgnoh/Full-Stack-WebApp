import './App.css';
import { useState, useEffect } from 'react';
import { Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from './Api';

function App() {
  const [response, setResponse] = useState('Request results show up here');
  const [result, setResult] = useState('Request results show up here');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (response) {
      if (Array.isArray(response)) {
        var res = "";
        for (let i = 0; i < response.length; i++) {
          res += response[i].name + " ";
        }
        console.log(res);
        setResult(res);
      } else {
        setResult(response);
      }
    }
  }, [response])

  async function doGetAllUsers() {
    const res = await getAllUsers();
    console.log(res);
    setResponse(res.data);
  }
  async function doGetUserById(id) {
    try {
      const res = await getUserById(id);
      console.log(res);
      setResponse(res.data);
    } catch (err) {
      setResponse("Please check if you have input valid id.");
    }

  }
  async function doAddUser(id, name, email) {
    try {
      const res = await addUser(id, name, email);
      console.log(res);
      setResponse(res.data);
    } catch (err) {
      setResponse("Please check if you have input valid id, name & email.");
    }

  }
  async function doUpdateUser(id, name, email) {
    try {
      const res = await updateUser(id, name, email);
      console.log(res);
      setResponse(res.data);
    } catch (err) {
      setResponse("Please check if you have input valid id, name & email.");
    }
  }
  async function doDeleteUser(id) {
    try {
      const res = await deleteUser(id);
    console.log(res);
    setResponse(res.data);
    } catch (err) {
      setResponse("Please check if you have input valid id.");
    }
    
  }

  function processResult(res) {
    console.log(res);
    var result = "";
    for (let i = 0; i < res.data.length; i++) {
      result += res[i]
    }
    return result;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>Task B</div>


        <Button variant="info" className={"mb-3"} onClick={() => doGetAllUsers()}>Get All User's Names</Button>
        <Button variant="info" className={"mb-3"} onClick={() => doGetUserById(id)}>Get user's name by id</Button>
        <Button variant="info" className={"mb-3"} onClick={() => doAddUser(id, name, email)}>Create new user</Button>
        <Button variant="info" className={"mb-3"} onClick={() => doUpdateUser(id, name, email)}>Update user details</Button>
        <Button variant="info" className={"mb-3"} onClick={() => doDeleteUser(id)}>Delete user</Button>

        <div className="d-flex">
          <Card style={{ "color": "black", "width": "30vw" }} className="m-3">
            <Card.Header>Request</Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">id</InputGroup.Text>
                <FormControl
                  placeholder="User id"
                  onChange={(e) => setId(e.target.value)}
                />
              </InputGroup>
            </Card.Body>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">name</InputGroup.Text>
                <FormControl
                  placeholder="User's Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Card.Body>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">email</InputGroup.Text>
                <FormControl
                  placeholder="User email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Card.Body>
            <p>When you are done, click on one of the buttons above to get the data</p>
          </Card>

          <Card style={{ "color": "black", "width": "30vw" }} className="m-3">
            <Card.Header>Result</Card.Header>
            <Card.Body>
              <Card.Text>{result}</Card.Text>
            </Card.Body>
          </Card>
        </div>


      </header>
    </div>
  );
}

export default App;

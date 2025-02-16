import { Alert } from './components/Alert';
import { Button } from './components/Button/Button';
import { LikeIcon } from './components/LikeIcon';
import { Fragment } from 'react';
import { useState } from 'react';
import ListGroup from './components/ListGroup';
import './App.css';
import { FaRegGrinTongue } from "react-icons/fa";

function App() {


  const [showAlert, setShowAlert] = useState(false);

  const onButtonClick = () => {
    setShowAlert(true);
  }

  const handleAlertClose = () => {
    setShowAlert(false);
  }

  return (
    <Fragment>
      <div>
        {showAlert ? <Alert onAlertClose={handleAlertClose}>My info alert</Alert> : null}
      </div>
      <ListGroup items={["Item 1", "Item 2", "Item 3"]} heading="List of items" onSelectItem={(item) => console.log(item)} />
      <Button handleClick={onButtonClick} color='success'>Show an alert</Button>
      <FaRegGrinTongue color="blue" size="40"  />
      <LikeIcon onClick={() => {console.log("like icon clicked")}} />
    </Fragment>
  );
}

export default App;
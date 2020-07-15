import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";

export interface PersonManualAPIReturn {
  numberOfRecords: number;
  manuals:         Manual[];
}

export interface Manual {
  id:                       string;
  name:                     string;
  description:              string;
  answerToTheMeaningOfLife: string;
}

function personManuals({}) {
  // Set up React Hooks
  const [personManualAPIReturn, setPersonManualAPIReturn] = useState<PersonManualAPIReturn>();
  const [manualIsLoading, setManualIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [personManualsAPIReturn, setPersonManualsAPIReturn] = useState<PersonManualAPIReturn>();
  const [personManualsIsLoading, setPersonManualsIsLoading] = useState(false);

  // When the page loads get available manuals from the server. 
  useEffect(() => {
    getPersonManuals()
  },[])

  async function getPersonManuals() {
    setPersonManualsIsLoading(true);
    const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`;

    setErrorMessage("");

    const res = await fetch(`${apiURL}`).catch((error) => {
      console.log("API Errored:");
      console.log(error);
      setErrorMessage(
        "We got an error trying to call the API to get person manuals ... Are the Azure Functions running?"
      );
    });
    if (errorMessage.length == 0) {
      if (res && res.ok) {
        let apiFuncReturn = await res.json();
        setPersonManualsAPIReturn(apiFuncReturn);
        setErrorMessage("");
      } else {
        console.log("Error from the get manuals Azure Function:");
        console.log(res);
        setErrorMessage(
          "We got an error back from the get person manuals Azure Function. Check the Console. "
        );
      }
    }
    setPersonManualsIsLoading(false);
  }
  var leftNavItems; 
  if (personManualsIsLoading) {
    leftNavItems = (
    <ul>
      <li>Loading....</li>
    </ul>
    );
  } else if (
    personManualsAPIReturn !== undefined &&
    personManualsAPIReturn.numberOfRecords > 0
  ) {
    console.log(personManualsAPIReturn);
    leftNavItems = (
      <ul>
        {
          personManualsAPIReturn.manuals.map((manual) => {
          return (
              <li key={manual.id}>
              <a href="#" onClick={() => getManualForPerson(`${manual.name}`)}>
              {manual.name}
              </a>
          </li>
            );
        })}
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
    );
  } else {
    console.log(personManualAPIReturn);
    leftNavItems = (
      <ul>
        <li>No Manuals from the API...</li>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
    );
  }

  async function getManualForPerson(name) {
    setManualIsLoading(true);
    const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`;

    setErrorMessage("");

    const res = await fetch(`${apiURL}?name=${name}`).catch((error) => {
      console.log("API Errored:");
      console.log(error);
      setErrorMessage(
        "We got an error trying to call the get person manual API ... Are the Azure Functions running?"
      );
    });
    if (errorMessage.length == 0) {
      if (res && res.ok) {
        let apiFuncReturn = await res.json();
        setPersonManualAPIReturn(apiFuncReturn);
        setErrorMessage("");
      } else {
        console.log("Error from the Azure Function:");
        console.log(res);
        setErrorMessage(
          "We got an error back from the get person manual Azure Function. Check the Console. "
        );
      }
    }
    setManualIsLoading(false);
  }

  // Some style sugar for our error title.
  // TODO: This should be in CSS!
  const errorStyle:React.CSSProperties = {
    color:'red',
    fontWeight:'bold'
  }

  // Work out what we should display in the Manual Card. 
  var CardReturn;
  if (manualIsLoading) {
    CardReturn = <p>Loading....</p>;
  } else if (errorMessage.length > 0) {
    CardReturn = (
      <div>
        <p style={errorStyle}>Error:</p>
        <p>{errorMessage}</p>
      </div>
    );
  } else if (
    personManualAPIReturn !== undefined &&
    personManualAPIReturn.numberOfRecords == 1
  ) {
    CardReturn = personManualAPIReturn.manuals.map((manual) => {
      return (
        <div className="card-big">
          <h1>{manual.name}</h1>
          <p className="description">{manual.description}</p>
        </div>
      );
    });
  } else {
    console.log(personManualAPIReturn);
    CardReturn = <div>Please Select a user on the left hand side.</div>;
  }

  // Return the whole page setup.
  return (
    <div className="project">
      <aside>
        <h3>Testing!!...</h3>
        {leftNavItems}
      </aside>
      <main>{CardReturn}</main>
    </div>
  );
}

// // This is just a bit of example code used to test if the NEXT_PUBLIC_API
// // environment variable can be seen both on server and client side.
// export async function getStaticProps() {
//   // Do our server side code
//   console.log("API address Server:")
//   console.log(process.env.NEXT_PUBLIC_API);
//
//   // Continue the page load!
//   return {props:{}}
// };

export default personManuals;

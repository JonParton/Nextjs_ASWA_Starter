import fetch from 'isomorphic-unfetch';


function Project({ personManualAPIReturn, name }) {

  var CardReturn;

  if (personManualAPIReturn.manualExists) {

    CardReturn = personManualAPIReturn.manual.map((manual) => {
      return (
        <div className="card-big">
          <h1>{manual.name}</h1>
          <p className="description">{manual.description}</p>
        </div>
      )
    })

  } else {
    CardReturn = <div>No Manual Found for user {name} </div>
  }

  return (
    <div className="project">
      <aside>
        <h3>Testing!!...</h3>
        <ul>
              <li key="1">
                <a href={`/InstructionManual/Jon`}>Jon</a>
              </li>
              <li key="2">
                <a href={`/InstructionManual/Anna`}>Anna</a>
              </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </aside>
      <main>
        {CardReturn}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const apiURL = `${process.env.REACT_APP_API}/PersonManual`
  
  const res = await fetch(`${apiURL}?name=${name}`);

  const personManualAPIReturn = await res.json();

  return { props: {personManualAPIReturn, name} };
};

export default Project;

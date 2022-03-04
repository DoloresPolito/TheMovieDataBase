import { useState, createContext} from "react";

const inicialPeople = { people: {}, changePeople: () => null };
export const PeopleContext = createContext(inicialPeople);

const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState({
    people: {},
    // changePeople: () => null,
  });

  const changePeople = (person) => setPeople({ people: person });

  return (
    <PeopleContext.Provider value={{ ...people, changePeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleProvider;

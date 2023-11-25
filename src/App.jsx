import { useState } from "react";
import HeaderInfo from "./components/headerInfo/HeaderInfo"
import Information from "./components/information/Information"
import Chat from "./components/chat/Chat";



function App() {

  const [activeComponent, setActiveComponent] = useState('information');

    const handleClick = (componentName) => {
        setActiveComponent(componentName);
    };

  return (
    <>
    <HeaderInfo onClick={handleClick} />
    {activeComponent === 'information' ? <Information /> : <Chat /> }
    </>
  )
}

export default App

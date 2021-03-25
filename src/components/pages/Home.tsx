import React from "react";
import {useUser} from "../../contexts/UserDataContext";

const Home: React.FC = (props) => {
    const user = useUser()!;
    console.log('maam', user);

    return <div>H!</div>;
};

export default Home;
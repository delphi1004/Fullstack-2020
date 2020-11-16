import React from "react";

const Header: React.FC<{ name: string }> = ({ name }) => {

    return (
        <div style={{ marginTop: 50, marginLeft: 50 , marginBottom:50}}>
            <h2>{name} </h2>
        </div>
    );
};

export default Header;
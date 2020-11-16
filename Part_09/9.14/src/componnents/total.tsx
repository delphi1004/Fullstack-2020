import React from "react";

const Total: React.FC<{ total: number }> = ({ total }) => {

    return (
        <div style={{ marginTop: 50, marginLeft: 50 }}>
            <h2>Number of exercises  {total}</h2>
        </div>
    );
};

export default Total;
import React from "react";

const Content: React.FC<{ name: string , excerciseCount:number}> = ({ name , excerciseCount}) => {

    return (
        <div style={{ marginTop: 20, marginLeft: 50 }}>
            <h3>{name} {excerciseCount}</h3>
        </div>
    );
};

export default Content;
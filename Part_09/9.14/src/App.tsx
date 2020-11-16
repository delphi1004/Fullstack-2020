import React from "react";
import './App.css';
import Header from './componnents/header';
import Content from './componnents/content';
import Total from './componnents/total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <hr style={{ marginLeft:50 , width: 450 }} />
      {courseParts.map((course , index, ) => <Content key={index} name={course.name} excerciseCount={course.exerciseCount} />)}
      <hr style={{ marginLeft:50 , width: 450 }} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;
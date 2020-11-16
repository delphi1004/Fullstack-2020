import React from "react";
import './App.css';
import Header from './componnents/header';
import Content from './componnents/content';
import Total from './componnents/total';
import { CoursePart } from './type';

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Excercise.9.15",
    exerciseCount: 14,
    description: "Excercise.9.15 description",
    courseLink: "https://fullstackopen.com/"
  }
];

const courseName = "Half Stack application development";

const App: React.FC = () => {

  return (
    <div>
      <Header name={courseName} />
      <hr style={{ marginLeft: 50, width: 750 }} />
      <Content coursePart={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;
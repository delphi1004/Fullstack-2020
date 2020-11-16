import React from "react";
import { CoursePart } from '../type';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Content: React.FC<{ coursePart: Array<CoursePart> }> = ({ coursePart }) => {

    const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
        switch (part.name) {
            case 'Fundamentals':
                return (
                    <>
                        <h3>name : {part.name}</h3>
                        <h3>description : {part.description}</h3>
                        <h3>exerciseCount : {part.exerciseCount}</h3>
                        <hr style={{ marginLeft: 0, width: 750 }} />
                    </>
                )

            case 'Using props to pass data':
                return (
                    <>
                        <h3>name : {part.name}</h3>
                        <h3>groupProjectCount : {part.groupProjectCount}</h3>
                        <h3>exerciseCount : {part.exerciseCount}</h3>
                        <hr style={{ marginLeft: 0, width: 750 }} />
                    </>
                )

            case 'Deeper type usage':
                return (
                    <>
                        <h3>name : {part.name}</h3>
                        <h3>exerciseSubmissionLink : {part.exerciseSubmissionLink}</h3>
                        <h3>exerciseCount : {part.exerciseCount}</h3>
                        <hr style={{ marginLeft: 0, width: 750 }} />
                    </>
                )

            case 'Excercise.9.15':
                return (
                    <>
                        <h3>name : {part.name}</h3>
                        <h3>course link : {part.courseLink}</h3>
                        <h3>exerciseCount : {part.exerciseCount}</h3>
                        <hr style={{ marginLeft: 0, width: 750 }} />
                    </>
                )

            default:
                return assertNever(part);
        }
    }

    return (
        <div style={{ marginTop: 20, marginLeft: 50 }}>
            { coursePart.map((part, index) => {
                return (
                    <div key={index}>
                        <Part part={part} />
                    </div>
                )
            })}
        </div>
    )
}

export default Content;
import { CoursePart } from '../types/CoursePartTypes'

const Part = (part: CoursePart) => {

    const partHTML = (part: CoursePart): JSX.Element => {
      switch (part.kind) {
        case "basic":
          return (
            <i> Description: {part.description}</i>
          );
        case "group":
          return (
            <span>Project exercises: {part.groupProjectCount}</span>
          );
        case "background":
          return (
            <span>
                <i> Description: {part.description}</i>
                <br></br>
                <span>Background material: {part.backgroundMaterial}</span>
            </span>
          );
        default:
          return <p>Unknown part kind</p>;
      }
    }

    return (
        <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br></br>
            {partHTML(part)}
        </p>
      );
    };
    
  export default Part
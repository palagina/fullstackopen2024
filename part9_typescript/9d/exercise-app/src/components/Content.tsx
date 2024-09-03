import { CoursePart } from '../types/CoursePartTypes'
import Part from './Part'
  
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {courseParts.map((part, index) => (
            <Part key={index} {...part} />
        ))}
      </div>
    );
  };
  
export default Content
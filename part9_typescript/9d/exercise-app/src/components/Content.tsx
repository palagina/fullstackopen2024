
interface ContentProps {
    courseParts: CoursePart[];
}

interface CoursePart {
    name: string;
    exerciseCount: number;
}
  
const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courseParts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exerciseCount}ц
          </p>
        ))}
      </div>
    );
  };
  
export default Content
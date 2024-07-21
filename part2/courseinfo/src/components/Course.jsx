const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({ courseName }) => {
    return <h2>{courseName}</h2>;
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        </div>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = ({parts}) => {
    const total =  parts.reduce((s, part) => s + part.exercises, 0)
    return (
        <b>total of {total} exercises</b>
    )
}

export default Course
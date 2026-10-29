import './Coursework.css';

const courses = [
  'Algorithms',
  'Data Structures',
  'Software Engineering',
  'Web Development',
  'Mobile Development',
  'Databases',
  'Cloud Applications',
  'Machine Learning',
  'Operating Systems',
  'Usability Engineering',
  'Networks',
  'Security',
];

export default function Coursework() {
  return (
    <section className='coursework' aria-labelledby='coursework-heading'>
      <div className='coursework-header'>
        <h3 id='coursework-heading'>Coursework</h3>
        <p>Oregon State University</p>
      </div>
      <ul className='coursework-list' role='list'>
        {courses.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </section>
  );
}

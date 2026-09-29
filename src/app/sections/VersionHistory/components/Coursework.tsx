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
        <h3 id='coursework-heading'>Relevant coursework</h3>
        <p>Oregon State University</p>
      </div>
      <div className='coursework-window'>
        <div className='coursework-track'>
          {[false, true].map((duplicate) => (
            <ul className='coursework-list' role='list' key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {courses.map((course) => (
                <li key={course}>
                  {course}<span className='coursework-dot' aria-hidden='true'>·</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

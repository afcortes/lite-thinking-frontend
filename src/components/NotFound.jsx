import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
        <>
          <h1>Oops!!</h1>
          <p>404 - Page not found!</p>
          <Link to='/'>
            Back to home!
          </Link>
        </>

  );
};

export default NotFound;
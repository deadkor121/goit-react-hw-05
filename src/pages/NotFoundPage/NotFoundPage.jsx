import { Link } from 'react-router-dom';
// import HomePage from '../HomePage/HomePage';
const NotFoundPage = () => {
  return (
    <div>
      Oops! Something went wrong!
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};
export default NotFoundPage;

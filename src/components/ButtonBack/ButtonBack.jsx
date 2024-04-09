import { useLocation, Link } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useRef } from 'react';
import css from './ButtonBack.module.css';

const ButtonBack = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  return (
    <Link to={backLinkRef.current} className={css.btnBack}>
      <HiOutlineArrowNarrowLeft />
      <span>Go Back</span>
    </Link>
  );
};
export default ButtonBack;

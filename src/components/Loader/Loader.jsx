import { Triangle } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loadWrapper}>
      <Triangle />
      <p>Laoding...</p>
    </div>
  );
};
export default Loader;
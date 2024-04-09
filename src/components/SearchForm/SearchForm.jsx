import { Field, Form, Formik } from 'formik';
import css from './SearchForm.module.css';

const SearchForm = ({ lastSearchQuery, handleSearch }) => {
  return (
    <Formik
      initialValues={{ query: lastSearchQuery }}
      onSubmit={(values, actions) => {
        handleSearch(values.query, actions);
      }}
    >
      <Form className={css.searchForm}>
        <Field
          name="query"
          placeholder="Search movies"
          className={css.formInput}
        />
        <button type="submit" className={css.formBtn}>
          Search
        </button>
      </Form>
    </Formik>
  );
};
export default SearchForm;

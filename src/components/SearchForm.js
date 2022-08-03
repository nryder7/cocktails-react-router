import React from 'react';
import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef('');
  useEffect(() => {
    searchValue.current.focus();
  }, []);
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <div className='form-control'>
          <label htmlFor='name'>Search favorite cocktail</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchValue}
            onChange={() => setSearchTerm(searchValue.current.value)}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;

// const SearchForm = () => {
//   const { searchTerm, setSearchTerm } = useGlobalContext();
//   return (
//     <section className='section search'>
//       <form className='search search-form'>
//         <div className='form-control'>
//           <label htmlFor='name'>Search favorite cocktail</label>
//           <input
//             type='text'
//             name='name'
//             id='name'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </form>
//     </section>
//   );
// };

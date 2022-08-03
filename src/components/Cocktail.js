import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Cocktail = ({ drinkThumb, drink, id, info, glass }) => {
  const { setSingleCocktail } = useGlobalContext();
  return (
    <article id={id} className='cocktail'>
      <div className='img-container'>
        <img src={drinkThumb} alt={drink} />
      </div>
      <div className='cocktail-footer'>
        <h3>{drink}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
          details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;

import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Cocktail = ({ drinkThumb, name, id, info, glass }) => {
  const { setSingleCocktail } = useGlobalContext();
  return (
    <article id={id} className='cocktail'>
      <div className='img-container'>
        <img src={drinkThumb} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
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

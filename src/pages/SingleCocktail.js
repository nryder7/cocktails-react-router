import React, { useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useEffect } from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const [singleDrink, setSingleDrink] = useState([]);

  const { id } = useParams();
  const { cocktails } = useGlobalContext();

  const setDrink = async () => {
    try {
      const selection = cocktails.filter((item) => {
        return item.id === id;
      });
      if (selection.length > 0) {
        const selectedDrink = selection[0];
        const { drink, drinkThumb, glass, instructions } = selectedDrink;
        let tempArr = [];
        let placeHolder = 0;
        for (const key in selectedDrink) {
          if (key.startsWith('ingredient')) {
            placeHolder++;
            const ingredient = selectedDrink[key];
            const measure = selectedDrink[`measure${placeHolder}`];
            tempArr.push({ ingredient, measure });
          }
        }
        await setSingleDrink({
          ingredients: tempArr,
          drink,
          drinkThumb,
          glass,
          instructions,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    setDrink();
    console.log(singleDrink);
  }, [id]);

  if (singleDrink.length < 1) {
    return (
      <div>
        <p>no drinks</p>
      </div>
    );
  } else {
    const { drink, drinkThumb, glass, instructions, ingredients } = singleDrink;
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          home
        </Link>
        <h2 className='section-title'>{drink}</h2>
        <div className='drink'>
          <img src={drinkThumb} alt={drink} />
          <div className='drink-info'>
            <p>
              <span className='drink-data'>{drink}</span>
            </p>
            <p>
              <span className='drink-data'>{glass}</span>
            </p>
            <p>
              <span className='drink-data'>{instructions}</span>
            </p>
            {ingredients.map((item, index) => (
              <p>
                <span className='drink-data'>
                  {item.ingredient} {item.measure}
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;

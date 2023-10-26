import {useDispatch, useSelector} from "react-redux"

import { getcategories, orderbyprice } from '../../Redux/actions';
import { useEffect, useState } from "react";

const Filters = () => {
   
   const dispatch = useDispatch();
   const product= useSelector((state)=> state.products)
   console.log(product);

  const handleOrderChange = (e) => {
    const orderDirection = e.target.value;
   dispatch ( orderbyprice( product,orderDirection)); 
  };
  

  const [categories, setCategories] = useState([]);  //Para seleccionar y guardar el valor de las categorias
  const [showCateMenus, setsShowCateMenus] = useState(false); //Para que se abra el menu de checkbox
  

  const handleCategories = (event) => {
    const category = event.target.value;
    let check;

    if(categories.includes(category)){
      setCategories(categories.filter(cate => cate!== category ))
      check = categories.filter(cate => cate !== category)
    }else{
      setCategories([...categories, category])
      check = [...categories, category]
    }

    dispatch(getcategories(product, check))
  }

    return (
        <div>
       <label>Ordenar por precio:</label>
       <select onChange={handleOrderChange}>
        <option value="Menor">Menor a Mayor</option>
        <option value="Mayor">Mayor a Menor</option>
      </select>

      <button onClick={() => {setsShowCateMenus(!showCateMenus)}}>
        Categorias
      </button>{
        showCateMenus && (
          <div>
            {
              categories.map(cat => (
                <div key={cat.id}>
                  <input
                    type="checkbox"
                    value={cat.name}
                    checked={categories.includes(cat.name)}
                    onChange={handleCategories}
                  />
                </div>
              ))
            }
          </div>
        )
      }

        </div>
    )

}

export default Filters
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { cleanDetail, getDetail } from "../../Redux/actions";

const Detail = () => {
  const {id} = useParams();
  const detailProduct = useSelector(state => state.products_Details);
  const dispatch = useDispatch();

  console.log(detailProduct);
  useEffect(() => {
    dispatch(getDetail(id))

    return () => dispatch(cleanDetail())
  }, [])

    return(
        <div>
            <h1>{detailProduct?.name}</h1>
        </div>
    )

}

export default Detail
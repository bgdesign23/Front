export const applyCombinedFilters = (products, filters) => {
    let filteredProducts = [...products]

    if(filters.byColor){
        filteredProducts = filteredProducts.filter(
            (product) => product.color === filters.byColor
        )
    }

    if(filters.byMaterial){
        filteredProducts = filteredProducts.filter(
            (product) => product.material === filters.byMaterial
        )
    }

    if(filters.category){
        filteredProducts = filteredProducts.filter(
            (product) => product.category.name === filters.category
        )
    }

    if(filters.type){
        filteredProducts = filteredProducts.filter(
            (product) => product.type === filters.type
        )
    }    

    return filteredProducts
}


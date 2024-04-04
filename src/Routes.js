import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    Products,
    ProductCreate, ProductEdit, ProductView,
    ProductList,
    ProductTiles
} from "screens";

const Component = (props) => {

    return (
        <Routes>



            <Route path="/" element={<Products {...props} title={'Product Table'} nolistbar={true} />} />
            <Route path="Products/view/:id" element={<ProductView {...props} title={'View Product'} />} />
            <Route path="Products/edit/:id" element={<ProductEdit {...props} title={'Edit Product'} />} />
            <Route path="Products/create" element={<ProductCreate {...props} title={'Create Product'} />} />

            <Route path="/p_table" element={<Products {...props} title={'Product Table'} />} />
            <Route path="/p_list" element={<ProductList {...props} title={'List Screen'} />} />
            <Route path="/p_tiles" element={<ProductTiles {...props} title={'Tiles Screen'} />} />
        </Routes>
    )

};

export default Component;
import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import getStore from 'app/config/store';

import entitiesReducers from './reducers';

import Customer from './customer';
import ProductCategory from './product/product-category';
import Notification from './notification/notification';
import ProductOrder from './product/product-order';
import Shipment from './invoice/shipment';
import OrderItem from './product/order-item';
import Invoice from './invoice/invoice';
import Product from './product/product';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  const store = getStore();
  store.injectReducer('store', combineReducers(entitiesReducers as ReducersMapObject));
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="customer/*" element={<Customer />} />
        <Route path="product-category/*" element={<ProductCategory />} />
        <Route path="notification/*" element={<Notification />} />
        <Route path="product-order/*" element={<ProductOrder />} />
        <Route path="shipment/*" element={<Shipment />} />
        <Route path="order-item/*" element={<OrderItem />} />
        <Route path="invoice/*" element={<Invoice />} />
        <Route path="product/*" element={<Product />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};

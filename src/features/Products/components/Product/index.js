import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { Box, Skeleton, Typography } from '@mui/material';


Product.propTypes = {

};

function Product({ product }) {
  return (
    <div>
      <Box padding={1}>
        <Skeleton variant="rectangular" width='100%' height={118} />
        <Typography>{product.name}</Typography>
        <Typography>{product.salePrice}</Typography>
      </Box>
    </div>
  );
}

export default Product;
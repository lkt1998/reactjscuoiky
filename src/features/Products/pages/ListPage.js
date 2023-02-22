import { Grid, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import productApi from 'api/productApi';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import styles from './ListPage.module.scss';

ListPage.propTypes = {

};

const cx = classNames.bind(styles)

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll({ _page: 1, _limit: 10 });
        setProductList(data);
      } catch (error) {
        console.log('failed to get product list', error);
      }
      setLoading(false)
    })()
  }, []);

  return (
    <Box pt={2}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={cx('left')}>
            <Paper elevation={0}>Left column</Paper>
          </Grid>

          <Grid item className={cx('right')}>
            <Paper elevation={0}>
              {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
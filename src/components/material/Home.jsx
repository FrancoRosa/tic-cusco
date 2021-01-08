import { Grid } from '@material-ui/core';
import HomeProduct from './HomeProduct';
import { connect } from 'react-redux';


const categoryFilter = (products, filter) => {
  if (filter.length <= 1) {
    return products;
  } else {
    const filtered = products.filter(product => product.categories.reduce((r,w) => r || w.includes(filter.toLowerCase()), false))
    return filtered;
  }
}

const Home = ({ products, filter }) => {
  return(
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      style={{backgroundColor: "#ebebeb",}}
    >
      {categoryFilter(products, filter).map(product => <HomeProduct product={product} />)}
    </Grid>
  )
}

const mapStateToProps = state => ({
  products: state.products,
  filter: state.filter,
})

export default connect(mapStateToProps)(Home);
import { Grid } from '@material-ui/core';
import HomeProduct from './HomeProduct';
import { connect } from 'react-redux';


const Home = ({ products }) => {
  return(
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      style={{backgroundColor: "#ebebeb",}}
    >
      {products.map(product => <HomeProduct product={product} />)}
    </Grid>
  )
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Home);
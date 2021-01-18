import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import HomeProduct from './HomeProduct';
import HomeCarrousel from './HomeCarrousel';
import './css/Home.css'

const categoryFilter = (products, filter) => {
  if (filter.length <= 1) {
    return products;
  } else {
    const byCategory = products.filter(product => product.categories.reduce((r,w) => r || w.includes(filter.toLowerCase()), false))
    const byBrand = products.filter(product => product.brand.toLowerCase().includes(filter.toLowerCase()));
    const filtered = byCategory
    byBrand.forEach(product => {
      if(!filtered.includes(product)) filtered.push(product)      
    })
    return filtered;
  }
}

const NoResults = () => {
  return(
    <div className="home__noresult">
      <p>
        No se encontraron resultados
      </p>
      <p>
        Intenta con otro producto o marca
      </p>
    </div>
  )
}

const Home = ({ products, filter }) => {
  return(
    <div>
      <HomeCarrousel />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{backgroundColor: "#ebebeb", marginTop: "-3rem"}}
      >
        {categoryFilter(products, filter).map(product => <HomeProduct product={product} />)}
        {categoryFilter(products, filter).length === 0 && <NoResults />}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.products,
  filter: state.filter,
})

export default connect(mapStateToProps)(Home);
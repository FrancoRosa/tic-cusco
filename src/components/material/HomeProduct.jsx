import { connect } from 'react-redux';
import { addToBasket } from '../../actions';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cx from 'clsx';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 250,
    height: 400,
    margin: "1rem",
  },
  media: {
    height: 240,
    padding: "1rem",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  }
});

const HomeProduct = ({ product, addToBasket }) => {
  const history = useHistory();
  const {
    id,
    title,
    price,
    brand,
    urls
  } = product;

  const classes = useStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  return (
    <Card className={cx(classes.root, shadowStyles.root)} >
      <CardActionArea>
        <CardMedia 
          className={classes.media}
          image={urls[0]}
          title={title}
          onClick={() => history.push(`/product/${id}`)}
        />
        
        <CardContent onClick={() => history.push(`/product/${id}`)}>
          <Typography gutterBottom variant="body" component="p"
            style={{
              position: 'relative',
              top: '2rem',
              color: 'green',
              textAlign: 'right'
          }}>
            {brand}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            <span>S/. </span>{price ? `${price}.00` : ''}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onMouseEnter={e=>console.log(e)}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions 
        className={classes.actions}
      >
        <Button
          startIcon={<AddIcon />}
          style={{textTransform: 'none'}}
          variant="outlined" size="small" color="black"
          onClick={() => addToBasket(product)}
        >
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  addToBasket: item => dispatch(addToBasket(item)),

});

export default connect(null, mapDispatchToProps)(HomeProduct);
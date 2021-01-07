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

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "2rem",
  },
  media: {
    height: 140,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  }
});

const HomeProduct = ({ product }) => {
  const {
    id,
    title,
    price,
    urls
  } = product;

  const classes = useStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  return (
    <Card className={cx(classes.root, shadowStyles.root)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={urls[0]}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <span>s/. </span>{`${price}.00`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions 
        className={classes.actions}
      >
        <Button 
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
  addToBasket: item => {
    dispatch(addToBasket(item));
  },
});

export default connect(null, mapDispatchToProps)(HomeProduct);
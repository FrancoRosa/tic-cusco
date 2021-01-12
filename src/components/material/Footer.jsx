import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MessageIcon from '@material-ui/icons/Message';
import RoomIcon from '@material-ui/icons/Room';
import Link from '@material-ui/core/Link';
import './css/Footer.css'

const Footer = () => {
  return (
    <div className="footer" component="footer">
      <div className="footer__social">
        <Link href="https://www.facebook.com/TecnoligiadeInteligenciaColectiva" target="_blank">
          <FacebookIcon fontSize="large" className="footer__icon"/>
        </Link>
        <Link href="http://m.me/TecnoligiadeInteligenciaColectiva" target="_blank">
          <MessageIcon fontSize="large" className="footer__icon"/>
        </Link>
        <Link href="http://wa.link/1fjg4y" target="_blank">
          <WhatsAppIcon fontSize="large" className="footer__icon"/>
        </Link>
        <Link href="https://g.page/centro-comercial-el-carmen?share" target="_blank">
          <RoomIcon fontSize="large" className="footer__icon"/>
        </Link>
      </div>
      <Typography>
        Tic-Cusco, Cel: +51 984 464086, e-mail: info@tic-cusco.com
      </Typography>
      <p>
        Calle Cruz Verde, {' '}
        <span className="footer__high">
        Centro Comercial El Carmen of. 218, {' '}
        </span>
        Cusco - Peru
      </p>
    </div>
  )
}

export default Footer;
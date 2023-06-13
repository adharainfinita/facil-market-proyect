import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className="footer-content">
        <div className="footer-import">
          <div className="footer-contact">
            <h2>Sobre Nosotros</h2>
            <ul>
              <li>email: acaVaUnEmail@outlook.com</li>
              <li><a href="/productos">quienes somos</a></li>
              <li>donennos tenemos hambre</li>
            </ul>
          </div>
          <div className="footer-Help">
            <h2>Ayuda</h2>
            <ul>
              <li>
                <a href="/ayuda" target="_blank">
                  Comprar
                </a>
              </li>
              <li>
                <a href="/ayuda" target="_blank">
                  Vender
                </a>
              </li>
              <li>
                <a href="/preguntas_precuentes" target="_blank">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-security">
            <h2>Seguridad</h2>
            <ul>
              <li>
                <a href="https://www.argentina.gob.ar/economia/comercio/defensadelconsumidor" target="_blank">
                  Defensa al Consumidor
                </a>
              </li>
              <li>
                <a href="/privacidad" target="_blank">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos_y_condiciones">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Tu Sitio Web. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

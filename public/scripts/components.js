function headerComponent() {
  const header = document.querySelector(".header");
  return (header.innerHTML = `
            <h1 class="header__title">GymFinder</h1>
            <nav class="header__menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="contact">Fale conosco</a></li>
                    <li><a href="about">Sobre</a></li>
                </ul>
            </nav>
          `);
}

function footerComponent() {
  const footer = document.querySelector(".footer");
  return (footer.innerHTML = `<h5 class="footer__content">© 2020 GymFinder Aula DWE All Rights Reserved</h5>`);
}

headerComponent();
footerComponent();

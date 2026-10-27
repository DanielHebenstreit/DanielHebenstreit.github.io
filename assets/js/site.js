const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.dataset.open === 'true';
    navigation.dataset.open = String(!isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.matches('a') && window.innerWidth <= 700) {
      navigation.dataset.open = 'false';
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

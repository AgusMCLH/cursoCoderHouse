//Ejecutar función en el evento click
document.getElementById('btn_open').addEventListener('click', open_close_menu);

//Declaramos variables
var side_menu = document.getElementById('menu_side');
var btn_open = document.getElementById('btn_open');
var body = document.getElementById('body');
var logo = document.getElementById('fab_nike');
var header = document.getElementById('header_content');
var searchcamp = document.getElementById('nav__search_input');
var searchbutton = document.getElementById('search_button');

searchbutton.addEventListener('click', () => {
  if (searchcamp.classList.contains('input_transition_active')) {
    console.log(searchcamp.value);
    searchcamp.classList.toggle('input_transition_active');
  } else {
    searchcamp.classList.toggle('input_transition_active');
  }
  // }
});

searchcamp.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    searchbutton.click();
  }
});

//Evento para mostrar y ocultar menú
function open_close_menu() {
  body.classList.toggle('body_move');
  side_menu.classList.toggle('menu__side_move');
  if (side_menu.classList.contains('menu__side_move')) {
    logo.classList.add('fab__nike_moved');
    header.classList.add('header__content_active');
  } else {
    logo.classList.remove('fab__nike_moved');
    header.classList.remove('header__content_active');
  }
}

//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página

if (window.innerWidth < 760) {
  body.classList.add('body_move');
  side_menu.classList.add('menu__side_move');
}

//Haciendo el menú responsive(adaptable)

window.addEventListener('resize', function () {
  if (window.innerWidth > 760) {
    body.classList.remove('body_move');
    side_menu.classList.remove('menu__side_move');
  }

  if (window.innerWidth < 760) {
    body.classList.add('body_move');
    side_menu.classList.add('menu__side_move');
  }
});

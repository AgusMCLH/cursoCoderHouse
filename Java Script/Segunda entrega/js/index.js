let collapseButton = document.getElementById('collapse');
let addButton = document.getElementById('addProduct');
let productName = document.getElementById('Nombre');
let productPrice = document.getElementById('Precio');
let productDiscount = document.getElementById('Descuento');
let productDescription = document.getElementById('Descripcion');
let productCategory = document.getElementById('Categoria');
//Crea un array de todos los campos que tengan que contener letras
const listaInputsLetras = [productName, productDescription, productCategory];
//Crea un array de todos los campos que tengan que contener números
const listaInputsNumber = [productPrice, productDiscount];
const regexLetter = /[a-zA-Z]/;
let productos = [];
let checkedCamps = 0;
let divProductos = document.getElementsByClassName('productos');
divProductos = divProductos[0];
let botonesComprar = [];

//Funcion del boton collapse
collapseButton.addEventListener('click', () => {
  let formulariosDiv = document.getElementsByClassName('formularios');
  let height = 0;
  for (let i = 0; i < formulariosDiv.length; i++) {
    if (formulariosDiv[i].clientHeight == 0) {
      height = formulariosDiv[i].scrollHeight;
    }
    formulariosDiv[i].style.height = height + 'px';
  }
});

//Ejecuta la funcion principal
addButton.addEventListener('click', () => {
  // funcion de validacion para letras
  const validarLetras = (camp) => {
    const haveNumber = (letter) => {
      for (let i = 0; i < letter.length; i++) {
        if (regexLetter.test(letter.charAt(i))) {
          return false;
        }
        return true;
      }
    };
    if (camp.value.length > 0 && !haveNumber(camp.value)) {
      colorChangeFunction(camp, 'green');
      return true;
    } else {
      colorChangeFunction(camp, 'red');
      return false;
    }
  };

  // Funcion de validacion para numeros
  const validarNumeros = (camp) => {
    const haveNumber = (letter) => {
      for (let i = 0; i < letter.length; i++) {
        if (isNaN(letter)) {
          return false;
        }
        return true;
      }
    };
    if (camp.value.length > 0 && haveNumber(camp.value)) {
      if (camp == productDiscount) {
        if (camp.value >= 0 && camp.value <= 100) {
          colorChangeFunction(camp, 'green');
          return true;
        } else {
          colorChangeFunction(camp, 'red');
          return false;
        }
      } else {
        colorChangeFunction(camp, 'green');
        return true;
      }
    } else {
      colorChangeFunction(camp, 'red');
      return false;
    }
  };

  //Recorre el array de los campos de letras validandolos
  checkedCamps = 0;
  for (let i = 0; i < listaInputsLetras.length; i++) {
    if (validarLetras(listaInputsLetras[i])) {
      checkedCamps++;
    } else {
      showErrorCard(
        `Error en el campo ${listaInputsLetras[i].id}`,
        'El campo solo admite letras'
      );
    }
  }
  //Recorre el array de los campos de numeros validandolos
  for (let i = 0; i < listaInputsNumber.length; i++) {
    if (validarNumeros(listaInputsNumber[i])) {
      checkedCamps++;
    } else {
      showErrorCard(
        `Error en el campo ${listaInputsNumber[i].id}`,
        'El campo solo admite numeros'
      );
    }
  }
  if (productDiscount.value <= 100 && productDiscount.value >= 0) {
    if (checkedCamps === listaInputsLetras.concat(listaInputsNumber).length) {
      agregar();
    } else {
    }
  } else {
    showErrorCard(
      `Error en el campo ${productDiscount.id}`,
      'El campo solo admite numeros entre 0 y 100'
    );
  }
});

//Cambia el color del borde del campo despues de la validacion
function colorChangeFunction(camp, color) {
  let interval = 500;

  camp.style.border = '2px solid ' + color;
  if (color == 'green') {
    setTimeout(() => {
      camp.style.border = '2px solid black';
    }, interval);
  }
}

//A cada campo le agrega un evento para que se desactive el borde rojo despues de presionar una tecla
listaInputsLetras.concat(listaInputsNumber).forEach((camp) => {
  camp.addEventListener('keydown', (e) => {
    camp.style.border = '2px solid black';
    if (e.key == 'Enter') {
      addButton.click();
    }
  });
});

const agregar = () => {
  productos.push({
    name: productName.value,
    price: productPrice.value,
    discount: productDiscount.value,
    desc: productDescription.value,
    category: productCategory.value,
  });
  showProducts();
  botonesComprar = document.getElementsByClassName('buy');
  for (let i = 0; i < botonesComprar.length; i++) {
    botonesComprar[i].addEventListener('click', () => {
      alert('No disp.');
    });
  }
};

let showProducts = () => {
  let acumulador = '';
  productos.forEach((producto) => {
    if (producto.discount == 0) {
      acumulador += `
      <div class="product">
      <div class="product__name">
        <h3>${producto.name}</h3>
        </div>
        <div class="product__price">
          <div class="product__originalprice">
            <p>${producto.price}</p>
            </div>
            <div class="product__discount">
            <p>N/A</p>
            </div>
            </div>
            <div class="product__description">
            <p>${producto.desc}</p>
            </div>
            <div class="product__category">
            <h3>${producto.category}</h3>
            </div>
            <a href="#" class="buy">Comprar</a>
            </div>`;
    } else {
      let discountedPrice =
        producto.price - (producto.price / 100) * producto.discount;
      acumulador += `
      <div class="product">
        <div class="product__name">
          <h3>${producto.name}</h3>
          </div>
        <div class="product__price_discounted">
          <div class="product__originalprice">
          <p>${producto.price}</p>
          </div>
          <div class="product__discount">
            <p>${producto.discount}% off</p>
            </div>
            <div class="product__finalPrice">
            <p>$${discountedPrice}</p>
          </div>
        </div>
        <div class="product__description">
          <p>${producto.desc}</p>
        </div>
        <div class="product__category">
          <h3>${producto.category}</h3>
        </div>
        <a href="#" class="buy">Comprar</a>
    </div>`;
    }
  });
  divProductos.innerHTML = acumulador;
  if (productos.length > 5) {
    document.getElementById('search__container').style.width = '80vw';
  }
};

const showErrorCard = (title, message) => {
  document.getElementById('error_toggler').style.right = '30px';
  document.getElementById('error_window').innerHTML = `
  <h3>${title}</h3>
  <p>${message}</p>`;
  setTimeout(() => {
    document.getElementById('error_toggler').style.right = '-350px';
  }, 2000);
};
document.getElementById('buscadorInput').addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    document.getElementById('buscadorButton').click();
  }
});
document.getElementById('buscadorButton').addEventListener('click', () => {
  let productoBuscado = productos.filter((producto) =>
    producto.name.includes(document.getElementById('buscadorInput').value)
  );
  let acumulador = '';
  productoBuscado.forEach((producto) => {
    if (producto.discount == 0) {
      acumulador += `
      <div class="product">
      <div class="product__name">
        <h3>${producto.name}</h3>
        </div>
        <div class="product__price">
          <div class="product__originalprice">
            <p>${producto.price}</p>
            </div>
            <div class="product__discount">
            <p>N/A</p>
            </div>
            </div>
            <div class="product__description">
            <p>${producto.desc}</p>
            </div>
            <div class="product__category">
            <h3>${producto.category}</h3>
            </div>
            <a href="#" class="buy">Comprar</a>
            </div>`;
    } else {
      let discountedPrice =
        producto.price - (producto.price / 100) * producto.discount;
      acumulador += `
      <div class="product">
        <div class="product__name">
          <h3>${producto.name}</h3>
          </div>
        <div class="product__price_discounted">
          <div class="product__originalprice">
          <p>${producto.price}</p>
          </div>
          <div class="product__discount">
            <p>${producto.discount}% off</p>
            </div>
            <div class="product__finalPrice">
            <p>$${discountedPrice}</p>
          </div>
        </div>
        <div class="product__description">
          <p>${producto.desc}</p>
        </div>
        <div class="product__category">
          <h3>${producto.category}</h3>
        </div>
        <a href="#" class="buy">Comprar</a>
    </div>`;
    }
  });
  divProductos.innerHTML = acumulador;
});

// document.getElementsByClassName("buy").forEach

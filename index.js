var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


// Get elements
var eNewProduct = document.getElementById("newProduct");
var eEditProduct = document.getElementById("editProduct");
var eBtnChange = document.getElementById("btnChange");

var eName = document.getElementById("name");
var eDesc = document.getElementById("description");
var eCategory = document.getElementById("category");
var ePrice = document.getElementById("price");

const develpomentAPi = "https://kamuistore.herokuapp.com/kamuiproducts";

function isNumber(n) {
    let bRes = false;
    if(!isNaN(parseFloat(n)) && isFinite(n)){
        bRes = true;
    }
    else 
    {
        Swal.fire({
            title: 'oops!',
            text: 'El campo precio debe de contener solo números.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }

    return bRes;

}


var isEdit = false;
function change(){

    if(!isEdit){

        eNewProduct.classList.remove("dblock");
        eNewProduct.classList.add("dnone");
        eEditProduct.classList.remove("dnone");
        eEditProduct.classList.add("dblock");
        eBtnChange.innerHTML = "N";
        isEdit = true;
    }
    else {
        eEditProduct.classList.remove("dblock");
        eEditProduct.classList.add("dnone");
        eNewProduct.classList.remove("dnone");
        eNewProduct.classList.add("dblock");
        eBtnChange.innerHTML = "E";
        isEdit = false;
    }
    
}

const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {

    e.preventDefault();

    if(!isNumber(ePrice.value)){
        return;
    }
    // let fileInput = document.querySelector('#image');
    // formdata.append("image", fileInput.files[0], fileInput.value);

    let fileInput = document.querySelector('#image');

    // var raw = JSON.stringify({
    //     "name":  eName.value,
    //     "description": eDesc.value,
    //     "price": ePrice.value,
    //     "category": eCategory.value
    //   });

    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };

    // fetch(develpomentAPi, requestOptions).then((response) => {
    //     console.log(response);
    //     if(response.status == 400)
    //     {
    //         console.log(error);
    //         Swal.fire('Error al Publicar..');
    //         return;
    //     }
        
    //     Swal.fire("Publicacion con Exito!");

    // }).catch(error =>Swal.fire('Error al Publicar..'));

    var formdata = new FormData();
    formdata.append("name",  eName.value);
    formdata.append("description", eDesc.value);
    formdata.append("price",  ePrice.value);
    formdata.append("category", eCategory.value);
    formdata.append("image", fileInput.files[0], fileInput.value);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch(develpomentAPi, requestOptions).then((response) => {
        if(response.status == 400)
        {
            console.log(error);
            Swal.fire('Error al Publicar..');
            return;
        }
        
        Swal.fire("Agregado con Exito!");
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
});
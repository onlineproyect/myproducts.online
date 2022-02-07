// Get elements
var eNewProduct = document.getElementById("newProduct");
var eEditProduct = document.getElementById("editProduct");
var eBtnChange = document.getElementById("btnChange");
var eBtnPublicar = document.getElementById("btnPublicar");

function writeUserData(name_,descripcion_,categoria_,precio_,imgUrl_) {
    db.collection('kamuiCaps').add({
        name: name_,
        descripcion: descripcion_,
        categoria: categoria_,
        precio: precio_,
        imgUrl: imgUrl_
        }).then(() => {
            mandarAlerta("Agregado con Exito!",1);
            eBtnPublicar.disabled = false;
        })
        .catch((error) => {
            Swal.fire('Error al Publicar..');
            mandarAlerta("Error al Publicar..",0);
            return;
        });
}


function pushDAta()
{
    eBtnPublicar.disabled = true;
    
    if(document.querySelector("#image").files[0] == undefined){
        mandarAlerta("Agregue una imagen",0);
        return;
    }

    let eName = document.getElementById("name").value;
    let eDesc = document.getElementById("description").value;
    let eCategory = document.getElementById("category").value;
    let ePrice = document.getElementById("price").value;
    let imgName = eName.replace(/\s/g, '');
    
    const ref = firebase.storage().ref();
    const file = document.querySelector("#image").files[0];
    const name = imgName;
    const metadata = {contentType: file.type};
    const task = ref.child(name).put(file, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => 
        {
            if(!url || url == ""){
                mandarAlerta('Error al cargar la imagen, refresque la pagina..',0);
                return;
            }

            writeUserData(eName,eDesc,eCategory,ePrice,url);
    }).catch(console.error);
}

function mandarAlerta(desc,type){
    
    Swal.fire({
        title: 'HEY!!',
        text: desc,
        icon: type == 1 ? 'success' : 'error',
        confirmButtonText: 'OK'
    });
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

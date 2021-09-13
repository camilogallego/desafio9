import express from "express";

const app = express();
const PORT = 8080;
const router = express.Router();

class Producto {
  constructor(title, price, thumbnail) {
    (this.title = title), (this.price = price), (this.thumbnail = thumbnail);
  }
}
const productos = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));

// GEt para ver todos los productos
router.get("/productos/lista", (req, res) => {
  if (productos.length != []) {
    res.json({ productos });
  } else {
    res.json({ error: "error no hay productos cargados" });
  }
});

// GEt para ver productos segun ID
router.get("/productos/lista/:id", (req, res) => {
  let params = req.params;
  console.log(params);
  let id = params.id;
  let produId = productos.find((x) => x.id == id);
  if (produId != undefined) {
    res.json(produId);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

// POST para agregar productos
router.post("/productos/guardar", (req, res) => {
  console.log(req.body);
  const { title, price, thumbnail } = req.body;
  const nuevoProducto = new Producto(title, price, thumbnail);
  let nuevoId = productos.length + 1;
  while (productos.find((x) => x.id === nuevoId)) {
    nuevoId++;
  }
  nuevoProducto.id = nuevoId;
  productos.push(nuevoProducto);
  console.log(`post request a api/productos/guardar con producto`);
  res.json(nuevoProducto);
});

router.delete("/productos/borrar/:title", (req, res) => {
    let params = req.params;
    let title = params.title;
    let produId = productos.find((x) => x.title == title);
    if (produId != undefined) {
        let delet = productos.splice(title-1,1)
        res.json(delet);
    } else {
      res.json({ error: "producto no encontrado" });
    }
  });




const estControl = {};
const db = require('./database.js');
//estControl.getEstudiantes = (req,res)=>res.send('<h1>Lista de estudiantes</h1><h2>Estudiante: Genesis Vargas</h2>');
//estControl.getEstudiantes = (req,res)=>res.json(db.estudiantes);

estControl.getEstudiantes = (req,res)=>res.json(db.estudiantes);
//estControl.getEstudiante = (req,res)=>res.json({mensaje: "Estudiante 1"});
//estControl.postEstudiante = (req,res)=>res.json({mensaje: "Estudiante agregado"});
//estControl.putEstudiante = (req,res)=>res.json({mensaje: "Estudiante actualizado"});
//estControl.deleteEstudiante = (req,res)=>res.json({mensaje: "Estudiante eliminado"});

estControl.getEstudiante = (req,res)=>{
    const estudiante = db.estudiantes.find(
        (est)=>est.id == req.params.id
    );

    res.json(estudiante);
}

estControl.postEstudiante = (req,res)=>{
    const {id, nombre,apellido} = req.body;
    if(!id || !nombre || !apellido){
        res.status(400).send("Datos incompletos {id, nombre, apellido}");
        return;
    }
    const estudiante = {
        id,
        nombre,
        apellido
    }
    db.estudiantes.push(estudiante);
    db.updateDB();
    res.send('Estudiante ingresado con éxito');
}

estControl.putEstudiante = (req,res)=>{
    const {nombre,apellido} = req.body;

    if(!nombre || !apellido){
        res.status(400).send("Datos incompletos {nombre, apellido}");
        return;
    }
    const estudiante = db.estudiantes.find(
        (est)=>est.id == req.params.id
    );
    estudiante.nombre = nombre;
    estudiante.apellido = apellido;
    db.updateDB();
    res.send('Estudiante actualizado');
}

estControl.deleteEstudiante = (req,res)=>{
    const index = db.estudiantes.findIndex(
        (est)=>est.id == req.params.id
    );
    if(index < 0){
        res.status(400).send("Id de estudiante no encontrado");
        return;
    }
    db.estudiantes.splice(index,1);
    db.updateDB();
    res.send('Estudiante eliminado');
}

module.exports = estControl;
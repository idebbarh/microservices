const StudentModel = require('../model/student');



exports.getAllStudents = async (req,res)=>{
    console.log("all")
    try{
        const students = await StudentModel.findAll();
        res.status(200).json({"result":students});
    }catch(err){
        res.status(500).send(err);
    };
};

exports.getStudentById = async (req,res)=>{
    const id = req.params.id;
    try{
    const student = await StudentModel.findByPk(id);
    if(!student){
        return res.status(404).send("student not found");
    }
    res.status(200).json({"result":student});
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    };
};


exports.addNewStudent = async (req,res)=>{
    const {nom,prenom,ville,filiere} = req.body;
    console.log(nom,prenom,ville,filiere);
    try{
        console.log(StudentModel)
        const studentCreated = await StudentModel.create({nom,prenom,ville,filiere});
        console.log(studentCreated)
        res.status(201).json({"result":studentCreated});
    }catch(err){
        console.log(err);
        res.status(500).send('error');
    };
};


exports.updateStudent = async (req,res)=>{
    const id = req.params.id;
    const {nom,prenom,ville,filiere} = req.body;
    try{
    const student = await StudentModel.findByPk(id);
    if(!student){
        return res.status(404).send("student not found");
    }
    student.nom = nom;
    student.prenom = prenom;
    student.ville = ville;
    student.filiere = filiere;
    const studentUpdated = student.save();
    res.status(200).json({"result":studentUpdated});
    }catch(err){
        res.status(500).send(err);
    };
}

exports.deleteStudent = async (req,res)=>{
    const id = req.params.id;
    try{
    const student = await StudentModel.findByPk(id);
    if(!student){
        return res.status(404).send("student not found");
    }
    // const studentDeleted = await student.destroy();
    res.status(202).json({"result":studentDeleted});
    }catch(err){
        res.status(500).send(err);
    };
};
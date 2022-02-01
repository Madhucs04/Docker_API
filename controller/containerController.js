const Container = require('../models/containerModel');

exports.getContainers = (req, res, next) => {
    Container.fetchAll(Containers => {
        res.json(Containers)
    });
};

exports.postEditContainer = (req, res, next) => {
    console.log('req.body::' + JSON.stringify(req.body));
    const Id = req.body.Id;
    const Name = req.body.Names[0];
    const Image = req.body.Image;
    const State = req.body.State;
    const Created = req.body.Created;   
    console.log('Id:' + Id); 
    
    const updatedContainer = new Container(
        Id,
        req.body.Names[0],                    
        req.body.Created,
        req.body.Image,
        req.body.State,
        req.body.ImageID,
        req.body.Command,
        req.body.Status

    );
    updatedContainer.save();
    res.status(204).json({ message: Id ? 'Container Updated Successfully' : 'Container Added Successfully' })
};